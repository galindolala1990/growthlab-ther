import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, X } from "lucide-react";
import { Idea } from "@/hooks/useIdeas";

interface StickyNoteCardProps {
  idea: Idea;
  x: number;
  y: number;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onUpdate: (updates: Partial<Idea>) => void;
  onConvertToRoadmap: () => void;
  onDelete: () => void;
}

const stickyColors = {
  yellow: "hsl(var(--warning-soft))",
  pink: "hsl(var(--danger-soft))",
  blue: "hsl(var(--info-soft))",
  green: "hsl(var(--success-soft))",
  purple: "hsl(var(--primary-soft))",
};

export function StickyNoteCard({
  idea,
  x,
  y,
  isDragging,
  onMouseDown,
  onUpdate,
  onConvertToRoadmap,
  onDelete,
}: StickyNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(idea.title);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (title.trim() !== idea.title) {
      onUpdate({ title: title.trim() });
    }
    setIsEditing(false);
  };

  const color = idea.sticky_note_color && stickyColors[idea.sticky_note_color as keyof typeof stickyColors]
    ? stickyColors[idea.sticky_note_color as keyof typeof stickyColors]
    : stickyColors.yellow;

  return (
    <Card
      className="absolute cursor-move shadow-md hover:shadow-xl transition-all border-none"
      style={{
        left: x,
        top: y,
        width: 240,
        height: 200,
        backgroundColor: color,
        transform: isDragging ? "rotate(-2deg)" : "rotate(0deg)",
        zIndex: isDragging ? 10 : 2,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Delete button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="w-3 h-3" />
        </Button>

        {/* Editable content */}
        {isEditing ? (
          <textarea
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
              if (e.key === "Escape") {
                setTitle(idea.title);
                setIsEditing(false);
              }
            }}
            className="w-full h-32 bg-transparent border-none outline-none resize-none text-sm font-handwriting text-neutral-800"
          />
        ) : (
          <div
            className="flex-1 text-sm font-handwriting whitespace-pre-wrap overflow-hidden text-neutral-800"
          >
            {idea.title}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-border/30">
          <div className="text-xs opacity-60 text-neutral-800">
            {idea.impact || "idea"}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 gap-1 text-xs hover:bg-black/10 text-neutral-800"
            onClick={(e) => {
              e.stopPropagation();
              onConvertToRoadmap();
            }}
          >
            <ArrowRight className="w-3 h-3" />
            Schedule
          </Button>
        </div>
      </div>
    </Card>
  );
}
