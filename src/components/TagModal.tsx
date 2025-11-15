import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';

interface TagModalProps {
  open: boolean;
  onClose: () => void;
  onAddTags: (tags: string[]) => void;
}

export function TagModal({ open, onClose, onAddTags }: TagModalProps) {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (tags.length > 0) {
      onAddTags(tags);
      setTags([]);
      setTagInput('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="tag-input" className="text-gray-700">Enter tags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="tag-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a tag and press Enter"
                className="flex-1"
              />
              <Button onClick={handleAddTag} type="button" className="bg-teal-600 hover:bg-teal-700 text-white">
                Add
              </Button>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div>
              <Label className="text-gray-700">Added tags:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-gray-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={tags.length === 0}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Add Tags
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
