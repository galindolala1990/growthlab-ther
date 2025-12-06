import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Sparkles } from "lucide-react";
import { Feature } from "@/hooks/useFeatures";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { isHappeningNow } from "@/lib/timeline-utils";

interface VisualRoadmapCardProps {
  feature: Feature;
  onClick?: () => void;
  className?: string;
  isCompact?: boolean;
}

export function VisualRoadmapCard({ feature, onClick, className, isCompact = false }: VisualRoadmapCardProps) {
  const statusInfo = getFeatureStageConfig(feature.stage);
  const priorityInfo = getPriorityConfig(feature.priority);
  const happeningNow = isHappeningNow(new Date(feature.start_date), new Date(feature.end_date));
  
  // Parse variants from experiment_variants if available
  const variants = feature.is_experiment ? ["Variant A", "Variant B"] : [];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover-lift",
        isCompact ? "w-[240px]" : "w-[280px]",
        className
      )}
      onClick={onClick}
    >
      {/* Preview Image - reduced height */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {feature.preview_image_url ? (
          <img
            src={feature.preview_image_url}
            alt={feature.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-3xl opacity-40">🎨</div>
          </div>
        )}
        
        {/* Now badge for active features */}
        {happeningNow && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-text-on-primary text-2xs px-2 py-0.5 animate-pulse shadow-lg">
              Now
            </Badge>
          </div>
        )}
        
        {/* Progress bar overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
          <div 
            className={cn("h-full transition-all duration-300", statusInfo.className)}
            style={{ width: `${feature.progress}%` }}
          />
        </div>
      </div>

      {/* Content - reduced padding and spacing */}
      <div className={cn("space-y-2", isCompact ? "p-2" : "p-3")}>
        {/* Title + Status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn("font-semibold line-clamp-1 leading-tight flex-1", isCompact ? "text-xs" : "text-sm")}>
            {feature.title}
          </h3>
          <Badge className={cn("shrink-0 text-xs", statusInfo.className)}>
            {statusInfo.label}
          </Badge>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>
            {format(new Date(feature.start_date), "MMM d")} - {format(new Date(feature.end_date), "MMM d")}
          </span>
        </div>

        {/* Tags - compact */}
        <div className="flex flex-wrap gap-1.5">
          {!isCompact && feature.team && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              {feature.team}
            </Badge>
          )}
          {feature.priority && feature.priority !== "low" && (
            <Badge className={cn("text-xs px-2 py-0.5", priorityInfo.badgeClass)}>
              {priorityInfo.label}
            </Badge>
          )}
          {feature.is_experiment && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 gap-1">
              <Sparkles className="w-3 h-3" />
              A/B Test
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
