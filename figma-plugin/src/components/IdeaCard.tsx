import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Trash2 } from "lucide-react";
import { Idea } from "@/hooks/useIdeas";

interface IdeaCardProps {
  idea: Idea;
  x: number;
  y: number;
  width: number;
  height: number;
  clusterColor: string;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onConvertToRoadmap: () => void;
  onDelete: () => void;
}

const themeColors = {
  activation: "hsl(var(--stage-design))",
  growth: "hsl(var(--stage-development))",
  retention: "hsl(var(--stage-testing))",
  monetization: "hsl(var(--stage-launch))",
};

const impactColors = {
  low: "text-muted-foreground",
  medium: "text-accent",
  high: "text-destructive",
  critical: "text-destructive font-bold",
};

export function IdeaCard({
  idea,
  x,
  y,
  width,
  height,
  clusterColor,
  isDragging,
  onMouseDown,
  onClick,
  onConvertToRoadmap,
  onDelete,
}: IdeaCardProps) {
  return (
    <Card
      className="absolute cursor-move shadow-md hover:shadow-xl transition-all border-4 border-dashed"
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: clusterColor,
        backgroundColor: `${clusterColor}08`,
        zIndex: isDragging ? 10 : 2,
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Lightbulb className="w-4 h-4 text-accent shrink-0" />
              <h4 className="font-bold text-sm line-clamp-2">{idea.title}</h4>
            </div>
            <Badge variant="outline" className="text-xs capitalize shrink-0">
              {idea.stage}
            </Badge>
          </div>
          {idea.description && (
            <p className="text-xs text-muted-foreground line-clamp-3">
              {idea.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {idea.theme && (
              <Badge
                className="text-xs capitalize"
                style={{ 
                  backgroundColor: `${themeColors[idea.theme as keyof typeof themeColors] || "hsl(var(--muted))"}20` 
                }}
              >
                {idea.theme}
              </Badge>
            )}
            {idea.impact && (
              <Badge
                variant="outline"
                className={`text-xs capitalize ${impactColors[idea.impact as keyof typeof impactColors]}`}
              >
                {idea.impact} impact
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="primary"
              className="flex-1 gap-1 text-xs h-7"
              onClick={(e) => {
                e.stopPropagation();
                onConvertToRoadmap();
              }}
            >
              <ArrowRight className="w-3 h-3" />
              To Roadmap
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
