import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Plus,
  Lightbulb,
  StickyNote,
  Grid3x3,
  Layers,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CanvasControlPanelProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onAddIdea: () => void;
  onAddSticky: () => void;
  onMagicArrange: (arrangeBy: string) => void;
  isArranging: boolean;
  selectedThemes: string[];
  onThemeToggle: (theme: string) => void;
  themes: Array<{ id: string; label: string; color: string }>;
}

export function CanvasControlPanel({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onAddIdea,
  onAddSticky,
  onMagicArrange,
  isArranging,
  selectedThemes,
  onThemeToggle,
  themes,
}: CanvasControlPanelProps) {
  return (
    <>
      {/* Top-right controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onZoomIn} className="gap-2">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={onZoomOut} className="gap-2">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={onZoomReset} className="gap-2">
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onAddSticky} className="gap-2">
          <StickyNote className="w-4 h-4" />
          Sticky
        </Button>
        <Button variant="outline" size="sm" onClick={onAddIdea} className="gap-2">
          <Lightbulb className="w-4 h-4" />
          Idea
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="primary"
              size="sm"
              disabled={isArranging}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isArranging ? "Arranging..." : "AI Arrange"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onMagicArrange("theme")}>
              <Layers className="w-4 h-4 mr-2" />
              By Theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMagicArrange("lifecycle")}>
              <Grid3x3 className="w-4 h-4 mr-2" />
              By Lifecycle Stage
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMagicArrange("impact")}>
              <Sparkles className="w-4 h-4 mr-2" />
              By Impact
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMagicArrange("quarter")}>
              <Grid3x3 className="w-4 h-4 mr-2" />
              By Quarter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Theme filter chips */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2 bg-card border border-border rounded-lg p-3 shadow-lg">
        <div className="text-xs font-semibold mb-1">Filter by Theme</div>
        {themes.map((theme) => (
          <Badge
            key={theme.id}
            variant={selectedThemes.includes(theme.id) ? "default" : "outline"}
            className="cursor-pointer justify-start gap-2"
            style={{
              backgroundColor: selectedThemes.includes(theme.id) ? theme.color : undefined,
            }}
            onClick={() => onThemeToggle(theme.id)}
          >
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: theme.color }}
            />
            {theme.label}
          </Badge>
        ))}
        {selectedThemes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedThemes.forEach(onThemeToggle)}
            className="text-xs"
          >
            Clear filters
          </Button>
        )}
      </div>
    </>
  );
}
