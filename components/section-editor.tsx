import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Section {
  id: string;
  type: string;
  content: any;
  order: number;
  pageId: string;
}

interface SectionEditorProps {
  section: Section;
  onUpdate: (data: Partial<Section>) => void;
  onDelete: () => void;
}

export function SectionEditor({ section, onUpdate, onDelete }: SectionEditorProps) {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      content: e.target.value
    });
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {section.type === 'text' ? 'Text Section' : 'Image Section'}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {section.type === 'text' ? (
        <textarea
          value={section.content || ''}
          onChange={handleContentChange}
          className="w-full min-h-[100px] p-2 border rounded-md"
          placeholder="Enter your text here..."
        />
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={section.content?.url || ''}
            onChange={(e) => onUpdate({ content: { url: e.target.value } })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter image URL..."
          />
          {section.content?.url && (
            <img
              src={section.content.url}
              alt="Section preview"
              className="max-w-full h-auto rounded-md"
            />
          )}
        </div>
      )}
    </div>
  );
} 