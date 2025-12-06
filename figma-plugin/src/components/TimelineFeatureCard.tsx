import { Feature } from "@/hooks/useFeatures";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { ExternalLink, Sparkles } from "lucide-react";
import { getFeatureStageConfig, getPriorityConfig, SPECIAL_BADGES } from "@/config/badge-config";

interface TimelineFeatureCardProps {
  feature: Feature;
  onClick?: () => void;
}

export function TimelineFeatureCard({ feature, onClick }: TimelineFeatureCardProps) {
  const stageConfig = getFeatureStageConfig(feature.stage);
  const priorityConfig = getPriorityConfig(feature.priority);

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* Image section with overlays */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {feature.preview_image_url ? (
          <img
            src={feature.preview_image_url}
            alt={feature.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="text-muted-foreground text-sm">No preview available</div>
          </div>
        )}

        {/* Status pill - top left */}
        <div className="absolute top-3 left-3">
          <Badge className={`${stageConfig.className} shadow-md capitalize font-medium`}>
            {stageConfig.label}
          </Badge>
        </div>

        {/* Priority pill - top right */}
        <div className="absolute top-3 right-3">
          <Badge className={`${priorityConfig.badgeClass} shadow-md capitalize font-medium`}>
            {priorityConfig.label}
          </Badge>
        </div>

        {/* Experiment type - bottom right */}
        {feature.is_experiment && (
          <div className="absolute bottom-3 right-3">
            <Badge className="shadow-md font-medium gap-1">
              <Sparkles className="w-3 h-3" />
              A/B Test
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title and description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          {feature.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {feature.description}
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="text-foreground font-semibold">{feature.progress}%</span>
          </div>
          <Progress value={feature.progress} className="h-2" />
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-mono">
              {format(new Date(feature.start_date), "MMM d")}
            </span>
            {feature.team && (
              <>
                <span>•</span>
                <span className="capitalize">{feature.team}</span>
              </>
            )}
          </div>

          {feature.figma_url && (
            <a
              href={feature.figma_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View design</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
