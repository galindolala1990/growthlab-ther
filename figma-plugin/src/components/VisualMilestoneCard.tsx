import { Feature } from "@/types/roadmap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ExternalLink, Figma, FileCode, GitBranch, FlaskConical, TrendingUp, Sparkles, Link2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFeatureStageConfig, getExperimentStatusConfig } from "@/config/badge-config";

interface VisualMilestoneCardProps {
  feature: Feature;
  previewImage?: string;
  aiGenerated?: boolean;
  smartGroup?: string;
}

const stageColors = {
  planning: "from-stage-planning/20 to-stage-planning/5 border-stage-planning/30",
  design: "from-stage-design/20 to-stage-design/5 border-stage-design/30",
  development: "from-stage-development/20 to-stage-development/5 border-stage-development/30",
  testing: "from-stage-testing/20 to-stage-testing/5 border-stage-testing/30",
  launch: "from-stage-launch/20 to-stage-launch/5 border-stage-launch/30",
};

const stageBadgeColors = {
  planning: "bg-stage-planning text-white",
  design: "bg-stage-design text-white",
  development: "bg-stage-development text-white",
  testing: "bg-stage-testing text-white",
  launch: "bg-stage-launch text-white",
};

const experimentStatusColors = {
  draft: "bg-muted text-muted-foreground",
  running: "bg-success text-success-foreground",
  completed: "bg-primary text-on-primary",
  paused: "bg-warning text-warning-foreground",
};

export const VisualMilestoneCard = ({ feature, previewImage, aiGenerated = false, smartGroup }: VisualMilestoneCardProps) => {
  return (
    <TooltipProvider>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer border-2",
          "bg-gradient-to-br",
          stageColors[feature.stage]
        )}
        style={{ width: "320px", minHeight: "400px" }}
      >
        {/* Preview Image */}
        {previewImage && (
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={previewImage}
              alt={feature.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            {aiGenerated && (
              <Badge className="absolute top-2 right-2 bg-primary text-on-primary border-0 backdrop-blur-sm gap-1">
                <Sparkles className="w-3 h-3" />
                AI
              </Badge>
            )}
          </div>
        )}

        {/* Smart Group Indicator */}
        {smartGroup && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-success text-success-foreground border-0 backdrop-blur-sm gap-1">
              <Link2 className="w-3 h-3" />
              {smartGroup}
            </Badge>
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground leading-tight">
                    {feature.title}
                  </h3>
                  {feature.isExperiment && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FlaskConical className="w-4 h-4 text-primary" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs">A/B Experiment</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Badge className={cn("capitalize shrink-0 text-xs font-semibold", stageBadgeColors[feature.stage])}>
                  {getFeatureStageConfig(feature.stage).label}
                </Badge>
                {feature.isExperiment && feature.experimentStatus && (
                  <Badge className={cn("capitalize shrink-0 text-xs font-semibold", experimentStatusColors[feature.experimentStatus])}>
                    {getExperimentStatusConfig(feature.experimentStatus).label}
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {feature.description}
            </p>
          </div>

          {/* Experiment Variants */}
          {feature.isExperiment && feature.variants && feature.variants.length > 0 && (
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span>Variants</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {feature.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={cn(
                      "p-2 rounded border text-xs",
                      feature.winningVariant === variant.id
                        ? "bg-success-soft border-success/30"
                        : "bg-background/50 border-border/50"
                    )}
                  >
                    <div className="font-semibold text-foreground flex items-center gap-1">
                      {variant.name}
                      {feature.winningVariant === variant.id && (
                        <span className="text-success">✓</span>
                      )}
                    </div>
                    {variant.metrics && (
                      <div className="mt-1 space-y-0.5 text-muted-foreground">
                        {variant.metrics.conversion && (
                          <div>CVR: {variant.metrics.conversion}%</div>
                        )}
                        {variant.metrics.engagement && (
                          <div>Eng: {variant.metrics.engagement}%</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Progress</span>
              <span className="font-bold text-foreground">{feature.progress}%</span>
            </div>
            <Progress value={feature.progress} className="h-2" />
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">{feature.team} Team</span>
            <Badge variant="outline" className="capitalize text-xs">
              {feature.priority}
            </Badge>
          </div>

          {/* Quick Links - Visible on hover */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  <Figma className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">View in Figma</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  <GitBranch className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Jira: 3 issues</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  <FileCode className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">View prototype</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Dependency indicator */}
        {feature.dependencies && feature.dependencies.length > 0 && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge className="text-xs backdrop-blur-sm bg-background/80">
              {feature.dependencies.length} dependencies
            </Badge>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};
