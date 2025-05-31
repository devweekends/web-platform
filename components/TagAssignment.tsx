'use client';

import { useState, useEffect } from 'react';
import { Tags, Plus, X, Loader2, Check, CheckCircle } from 'lucide-react';
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
  const [processing, setProcessing] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTags();
      setSelectedTagIds(currentTags.map(tag => tag._id));
    }
  }, [isOpen, currentTags]);

  // Clear success state after a short time
  useEffect(() => {
    if (justUpdated) {
      const timer = setTimeout(() => setJustUpdated(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [justUpdated]);

  // Handle success toast
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => setShowSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

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
    setProcessing(true);
    setError('');

    // Retry mechanism for production network issues
    const maxRetries = 2;
    let retryCount = 0;

    const makeRequest = async (): Promise<any> => {
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

        return await response.json();
      } catch (error: any) {
        // Retry on network errors or 5xx errors
        if (retryCount < maxRetries && (
          error.name === 'TypeError' || // Network error
          error.message.includes('fetch') || // Fetch errors
          (error.status && error.status >= 500) // Server errors
        )) {
          retryCount++;
          setRetryAttempt(retryCount);
          // Wait a bit before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, retryCount * 1000));
          return makeRequest();
        }
        throw error;
      }
    };

    try {
      const result = await makeRequest();
      const updatedTags = availableTags.filter(tag => selectedTagIds.includes(tag._id));
      onTagsUpdated(updatedTags);
      setIsOpen(false);
      setJustUpdated(true);
      setShowSuccessToast(true);
      
      // Notify other tabs/windows about the tag update
      try {
        localStorage.setItem('tags-updated', Date.now().toString());
        localStorage.removeItem('tags-updated'); // Trigger storage event
        
        localStorage.setItem('mentorship-data-updated', JSON.stringify({
          type: 'tags',
          action: 'update',
          timestamp: Date.now()
        }));
        localStorage.removeItem('mentorship-data-updated'); // Trigger storage event
        
        // Also dispatch custom events for the current window
        window.dispatchEvent(new CustomEvent('tags-updated', {
          detail: { personId, personType, updatedTags }
        }));
        
        window.dispatchEvent(new CustomEvent('mentorship-data-updated', {
          detail: { type: 'tags', action: 'update', personId, personType, updatedTags }
        }));
      } catch (error) {
        // localStorage might not be available, continue without cross-tab sync
        console.warn('Cross-tab communication not available:', error);
      }
    } catch (error: any) {
      let errorMessage = error.message || 'Failed to assign tags';
      
      // Provide more user-friendly error messages
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      setProcessing(false);
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

  const getButtonIcon = () => {
    if (processing) {
      return <Loader2 className="mr-2 h-3 w-3 animate-spin" />;
    }
    if (justUpdated) {
      return <Check className="mr-2 h-3 w-3 text-green-600" />;
    }
    return <Tags className="mr-2 h-3 w-3" />;
  };

  const getButtonText = () => {
    if (processing) {
      if (retryAttempt > 0) {
        return `Retrying... (${retryAttempt}/2)`;
      }
      return 'Updating...';
    }
    if (justUpdated) return 'Updated!';
    return 'Manage Tags';
  };

  const getButtonVariant = () => {
    if (justUpdated) return 'default';
    return 'outline';
  };

  return (
    <div className="space-y-2">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-sm">Tags updated successfully!</p>
              <p className="text-xs text-green-600">Changes are now visible across all views</p>
            </div>
          </div>
        </div>
      )}

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
          <Button 
            variant={getButtonVariant()} 
            size="sm" 
            className={`w-full transition-all duration-200 ${
              justUpdated ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : ''
            }`}
            disabled={processing}
          >
            {getButtonIcon()}
            {getButtonText()}
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
                    disabled={loading}
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={loading || availableTags.length === 0}
              className="min-w-[100px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {retryAttempt > 0 ? `Retrying... (${retryAttempt}/2)` : 'Saving...'}
                </>
              ) : (
                'Save Tags'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 