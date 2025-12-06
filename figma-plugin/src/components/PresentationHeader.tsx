import { Button } from "@/components/ui/button";
import { Download, Presentation, Sparkles, Grid3x3, Wand2, RefreshCw, History, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface PresentationHeaderProps {
  onViewChange?: (view: "canvas" | "timeline") => void;
  currentView: "canvas" | "timeline";
  onAIAction?: (action: string) => void;
}
export const PresentationHeader = ({ onViewChange, currentView, onAIAction }: PresentationHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              PathFinder 2025
            </span>
          </h1>
          <Badge className="bg-gradient-to-r from-primary to-accent text-on-primary border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Visual lifecycle of products and features — designed for team rituals and stakeholder presentations
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30"
            >
              <Wand2 className="w-4 h-4 text-primary" />
              AI Actions
              <Sparkles className="w-3 h-3 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem onClick={() => onAIAction?.("summarize")}>
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              <div>
                <div className="font-semibold">Visual Summarization</div>
                <div className="text-xs text-muted-foreground">Generate snapshots from Figma</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAIAction?.("auto-roadmap")}>
              <RefreshCw className="w-4 h-4 mr-2 text-primary" />
              <div>
                <div className="font-semibold">Auto-Generate Roadmap</div>
                <div className="text-xs text-muted-foreground">From Jira, Miro & Figma</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAIAction?.("smart-group")}>
              <Grid3x3 className="w-4 h-4 mr-2 text-success" />
              <div>
                <div className="font-semibold">Smart Grouping</div>
                <div className="text-xs text-muted-foreground">Cluster related work</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAIAction?.("storytelling")}>
              <History className="w-4 h-4 mr-2 text-warning" />
              <div>
                <div className="font-semibold">Design Storytelling</div>
                <div className="text-xs text-muted-foreground">Show product evolution</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAIAction?.("launch-viz")}>
              <Presentation className="w-4 h-4 mr-2 text-accent" />
              <div>
                <div className="font-semibold">Launch Storyboard</div>
                <div className="text-xs text-muted-foreground">Generate exec-ready deck</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={currentView === "canvas" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onViewChange?.("canvas")}
            className="gap-2"
          >
            <Grid3x3 className="w-4 h-4" />
            Canvas
          </Button>
          <Button
            variant={currentView === "timeline" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onViewChange?.("timeline")}
            className="gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Roadmap
          </Button>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <Presentation className="w-4 h-4" />
          Present
        </Button>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};
