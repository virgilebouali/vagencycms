import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SectionEditor } from '@/components/section-editor';

interface Section {
  id: string;
  type: string;
  content: any;
  order: number;
  pageId: string;
}

interface PageEditorProps {
  pageId: string;
  slug: string;
}

export function PageEditor({ pageId, slug }: PageEditorProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Charger les sections au montage du composant
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch page');
        }
        const data = await response.json();
        setSections(data.sections || []);
      } catch (error) {
        console.error('Error fetching page:', error);
        setError('Failed to load page');
        toast({
          title: "Error",
          description: "Failed to load page",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [slug, toast]);

  const handleAddSection = async (type: string) => {
    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          pageId,
          order: sections.length,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create section');
      }

      const newSection = await response.json();
      setSections([...sections, newSection]);
      toast({
        title: "Success",
        description: "Section added successfully",
      });
    } catch (error) {
      console.error('Error adding section:', error);
      toast({
        title: "Error",
        description: "Failed to add section",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSection = async (sectionId: string, data: Partial<Section>) => {
    try {
      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update section');
      }

      const updatedSection = await response.json();
      setSections(sections.map(section => 
        section.id === sectionId ? updatedSection : section
      ));
    } catch (error) {
      console.error('Error updating section:', error);
      toast({
        title: "Error",
        description: "Failed to update section",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete section');
      }

      setSections(sections.filter(section => section.id !== sectionId));
      toast({
        title: "Success",
        description: "Section deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting section:', error);
      toast({
        title: "Error",
        description: "Failed to delete section",
        variant: "destructive",
      });
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const savePromises = sections.map(section => 
        fetch(`/api/sections/${section.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(section),
        })
      );

      await Promise.all(savePromises);
      toast({
        title: "Success",
        description: "All sections saved successfully",
      });
    } catch (error) {
      console.error('Error saving sections:', error);
      toast({
        title: "Error",
        description: "Failed to save sections",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Page Editor</h2>
        <Button 
          onClick={handleSaveAll} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save All'}
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <SectionEditor
            key={section.id}
            section={section}
            onUpdate={(data) => handleUpdateSection(section.id, data)}
            onDelete={() => handleDeleteSection(section.id)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => handleAddSection('text')}>
          Add Text Section
        </Button>
        <Button onClick={() => handleAddSection('image')}>
          Add Image Section
        </Button>
      </div>
    </div>
  );
} 