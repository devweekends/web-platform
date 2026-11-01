'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, EyeOff, ExternalLink, Loader2, Search, Trash2 } from 'lucide-react';

interface FeedPost {
  _id: string;
  activityId: string;
  url: string;
  author: string;
  title: string;
  excerpt: string;
  topic: string;
  postedAt?: string;
  source: 'seed' | 'olostep-search-index' | 'community-submission' | 'admin-import';
  status: 'approved' | 'pending' | 'hidden';
  createdAt: string;
}

const TABS = [
  { value: 'pending', label: 'Pending review' },
  { value: 'approved', label: 'Live' },
  { value: 'hidden', label: 'Hidden' },
] as const;

const SOURCE_LABELS: Record<FeedPost['source'], string> = {
  seed: 'Starter list',
  'olostep-search-index': 'Found by Olostep',
  'community-submission': 'Submitted',
  'admin-import': 'Imported',
};

/** Olostep charges about 5 credits per search */
const CREDITS_PER_SEARCH = 5;
const DEEP_SEARCHES = 40;

export default function AdminFeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<FeedPost['status']>('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [collecting, setCollecting] = useState(false);
  const [collectMessage, setCollectMessage] = useState('');
  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/feed');
      if (res.ok) setPosts(await res.json());
    } catch (error) {
      console.error('Failed to fetch feed posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const setStatus = async (id: string, status: FeedPost['status']) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/feed/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) setPosts((current) => current.map((post) => (post._id === id ? { ...post, status } : post)));
    } catch (error) {
      console.error('Failed to update post', error);
    } finally {
      setProcessingId(null);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post from the feed? If it is found again by search, it will come back.')) return;
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/feed/${id}`, { method: 'DELETE' });
      if (res.ok) setPosts((current) => current.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Failed to delete post', error);
    } finally {
      setProcessingId(null);
    }
  };

  const collect = async (searches?: number) => {
    if (
      searches &&
      !confirm(`Run ${searches} Olostep searches? This uses about ${searches * CREDITS_PER_SEARCH} credits and can take a few minutes.`)
    ) {
      return;
    }
    setCollecting(true);
    setCollectMessage('');
    try {
      const res = await fetch('/api/admin/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'collect', searches }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCollectMessage(data.error ?? 'Collection failed.');
        return;
      }
      setCollectMessage(
        `Ran ${data.queries} of ${data.searchListSize} searches${data.failedQueries ? ` (${data.failedQueries} failed)` : ''}: ${data.added} new posts, ${data.enriched} updated.`
      );
      await fetchPosts();
    } catch {
      setCollectMessage('Collection failed.');
    } finally {
      setCollecting(false);
    }
  };

  const importLinks = async () => {
    setImporting(true);
    setImportMessage('');
    try {
      const res = await fetch('/api/admin/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'import', urls: importText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setImportMessage(data.error ?? 'Import failed.');
        return;
      }
      setImportMessage(
        `${data.added} added, ${data.alreadyThere} already on the feed${data.invalid ? `, ${data.invalid} not LinkedIn post links` : ''}.`
      );
      if (data.added > 0) setImportText('');
      await fetchPosts();
    } catch {
      setImportMessage('Import failed.');
    } finally {
      setImporting(false);
    }
  };

  const counts = Object.fromEntries(TABS.map(({ value }) => [value, posts.filter((post) => post.status === value).length]));
  const shown = posts.filter((post) => post.status === tab);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community Feed</h1>
          <p className="text-muted-foreground">
            LinkedIn posts shown on <a href="/feed" target="_blank" className="underline">/feed</a>. Submissions wait here for review.
          </p>
        </div>
        <div className="max-w-sm text-right">
          <div className="flex flex-wrap justify-end gap-2">
            <Button onClick={() => collect()} disabled={collecting}>
              {collecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Find new posts
            </Button>
            <Button variant="outline" onClick={() => collect(DEEP_SEARCHES)} disabled={collecting}>
              Deep search ({DEEP_SEARCHES})
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Each search uses about {CREDITS_PER_SEARCH} Olostep credits. Runs continue where the last one stopped.
          </p>
          {collectMessage && <p className="mt-2 text-sm">{collectMessage}</p>}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Add posts by link</CardTitle>
          <p className="text-sm text-muted-foreground">
            Paste LinkedIn post links, one per line or separated by spaces, e.g. collected from WhatsApp groups. They go live straight away.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <label htmlFor="feed-import" className="sr-only">
            LinkedIn post links
          </label>
          <textarea
            id="feed-import"
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            rows={4}
            placeholder="https://www.linkedin.com/posts/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={importLinks} disabled={importing || !importText.trim()}>
              {importing && <Loader2 className="h-4 w-4 animate-spin" />}
              Add posts
            </Button>
            {importMessage && <p className="text-sm">{importMessage}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {TABS.map(({ value, label }) => (
          <Button key={value} variant={tab === value ? 'default' : 'outline'} onClick={() => setTab(value)}>
            {label} ({counts[value]})
          </Button>
        ))}
      </div>

      {shown.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Nothing here.</CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {shown.map((post) => (
            <Card key={post._id}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {post.author}
                      {post.postedAt && ` · ${new Date(post.postedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{post.topic}</Badge>
                    <Badge variant="secondary">{SOURCE_LABELS[post.source]}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {post.excerpt && <p className="text-sm">{post.excerpt}</p>}
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open on LinkedIn
                    </a>
                  </Button>
                  {post.status !== 'approved' && (
                    <Button size="sm" onClick={() => setStatus(post._id, 'approved')} disabled={processingId === post._id}>
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {post.status !== 'hidden' && (
                    <Button variant="outline" size="sm" onClick={() => setStatus(post._id, 'hidden')} disabled={processingId === post._id}>
                      <EyeOff className="h-4 w-4" />
                      Hide
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => deletePost(post._id)} disabled={processingId === post._id}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
