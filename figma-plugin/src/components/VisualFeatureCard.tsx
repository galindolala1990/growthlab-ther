import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, TrendingUp, ExternalLink } from "lucide-react";
import { Feature } from "@/hooks/useFeatures";
import { format } from "date-fns";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";

interface VisualFeatureCardProps {
  feature: Feature;
  onClick?: () => void;
}

export function VisualFeatureCard({ feature, onClick }: VisualFeatureCardProps) {
  const stageConfig = getFeatureStageConfig(feature.stage);

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View feature details for ${feature.title}`}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Large Visual Preview */}
      <div className="relative aspect-[16/9] bg-muted overflow-hidden">
        {feature.preview_image_url ? (
          <img
            src={feature.preview_image_url}
            alt={feature.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="text-center p-6">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-sm text-muted-foreground">No design preview yet</p>
            </div>
          </div>
        )}
        
        {/* Stage Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge className={`${stageConfig.className} border-0 shadow-lg`}>
            {stageConfig.label}
          </Badge>
        </div>

        {/* Priority Badge */}
        {feature.priority && feature.priority !== "low" && (
          <div className="absolute top-3 right-3">
            <Badge variant={getPriorityConfig(feature.priority).variant} className="shadow-lg">
              {getPriorityConfig(feature.priority).label}
            </Badge>
          </div>
        )}

        {/* Experiment Badge */}
        {feature.is_experiment && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-accent text-accent-foreground shadow-lg">
              <TrendingUp className="w-3 h-3 mr-1" />
              A/B Test
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {feature.description || "No description"}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium">{feature.progress}%</span>
          </div>
          <Progress value={feature.progress} className="h-2" />
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{format(new Date(feature.start_date), "MMM d")}</span>
          </div>
          {feature.team && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{feature.team}</span>
            </div>
          )}
          {feature.figma_url && (
            <div className="flex items-center gap-1 ml-auto">
              <ExternalLink className="w-3 h-3" />
              <span>Figma</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
