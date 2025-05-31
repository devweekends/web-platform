'use client';

import { useState, useEffect } from 'react';
import { Tags, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Tag {
  _id: string;
  name: string;
  description?: string;
  color: string;
}

interface TagAssignmentProps {
  personId: string;
  personType: 'mentor' | 'mentee';
  personName: string;
  currentTags: Tag[];
  onTagsUpdated: (updatedTags: Tag[]) => void;
}

export default function TagAssignment({ 
  personId, 
  personType, 
  personName, 
  currentTags, 
  onTagsUpdated 
}: TagAssignmentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTags();
      setSelectedTagIds(currentTags.map(tag => tag._id));
    }
  }, [isOpen, currentTags]);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/admin/tags');
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      setAvailableTags(data);
    } catch (error) {
      setError('Failed to load available tags');
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/assign-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personId,
          personType,
          tagIds: selectedTagIds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to assign tags');
      }

      const result = await response.json();
      const updatedTags = availableTags.filter(tag => selectedTagIds.includes(tag._id));
      onTagsUpdated(updatedTags);
      setIsOpen(false);
    } catch (error: any) {
      setError(error.message || 'Failed to assign tags');
    } finally {
      setLoading(false);
    }
  };

  const TagBadge = ({ tag }: { tag: Tag }) => (
    <span 
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: tag.color }}
    >
      {tag.name}
    </span>
  );

  return (
    <div className="space-y-2">
      {/* Display current tags */}
      <div className="flex flex-wrap gap-2">
        {currentTags.map((tag) => (
          <TagBadge key={tag._id} tag={tag} />
        ))}
        {currentTags.length === 0 && (
          <span className="text-xs text-muted-foreground">No tags assigned</span>
        )}
      </div>

      {/* Assign tags button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Tags className="mr-2 h-3 w-3" />
            Manage Tags
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Tags</DialogTitle>
            <DialogDescription>
              Select tags for {personName} ({personType})
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {availableTags.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Tags className="h-8 w-8 mx-auto mb-2" />
                <p>No tags available</p>
                <p className="text-xs">Create tags in the Tags management page first.</p>
              </div>
            ) : (
              availableTags.map((tag) => (
                <div key={tag._id} className="flex items-center space-x-3">
                  <Checkbox
                    id={tag._id}
                    checked={selectedTagIds.includes(tag._id)}
                    onCheckedChange={() => handleTagToggle(tag._id)}
                  />
                  <div className="flex-1 min-w-0">
                    <TagBadge tag={tag} />
                    {tag.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {tag.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={loading || availableTags.length === 0}
            >
              {loading ? 'Saving...' : 'Save Tags'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 