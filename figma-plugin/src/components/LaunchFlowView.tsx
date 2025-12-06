import { Feature, LifecycleStage } from "@/types/roadmap";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

interface LaunchFlowViewProps {
  features: Feature[];
}

const stageConfig: Record<LifecycleStage, { label: string; color: string; icon: string }> = {
  planning: { label: "Concept", color: "text-stage-planning", icon: "planning" },
  design: { label: "Design", color: "text-stage-design", icon: "design" },
  development: { label: "Development", color: "text-stage-development", icon: "dev" },
  testing: { label: "QA", color: "text-stage-testing", icon: "qa" },
  launch: { label: "Launch", color: "text-stage-launch", icon: "launch" },
};

const stages: LifecycleStage[] = ["planning", "design", "development", "testing", "launch"];

export const LaunchFlowView = ({ features }: LaunchFlowViewProps) => {
  const getStageIndex = (stage: LifecycleStage) => stages.indexOf(stage);
  
  const getFeaturesByStage = (stage: LifecycleStage) => {
    return features.filter((f) => f.stage === stage);
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl border border-border/50">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Feature Maturity Flow</h2>
        <div className="text-sm text-muted-foreground">
          {features.length} features in pipeline
        </div>
      </div>

      {/* Flow visualization */}
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          {stages.map((stage, index) => {
            const stageFeatures = getFeaturesByStage(stage);
            const config = stageConfig[stage];
            
            return (
              <div key={stage} className="flex items-center flex-1">
                <div className="flex-1 space-y-3">
                  {/* Stage header */}
                  <div className="text-center space-y-2">
                    <div
                      className={cn(
                        "mx-auto w-16 h-16 rounded-full flex items-center justify-center",
                        "border-4 transition-all duration-300",
                        stageFeatures.length > 0
                          ? `${config.color} border-current bg-current/10 shadow-lg`
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {stageFeatures.length > 0 ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : (
                        <Circle className="w-8 h-8" />
                      )}
                    </div>
                    <div>
                      <p className={cn("font-semibold text-sm", stageFeatures.length > 0 ? config.color : "text-muted-foreground")}>
                        {config.label}
                      </p>
                      <Badge
                        variant={stageFeatures.length > 0 ? "default" : "outline"}
                        className="text-xs mt-1"
                      >
                        {stageFeatures.length}
                      </Badge>
                    </div>
                  </div>

                  {/* Feature list */}
                  {stageFeatures.length > 0 && (
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {stageFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="text-xs p-2 rounded bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <p className="font-medium truncate">{feature.title}</p>
                          <p className="text-muted-foreground text-2xs">
                            {feature.progress}% complete
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow connector */}
                {index < stages.length - 1 && (
                  <div className="flex items-center justify-center w-12 -mt-12">
                    <ArrowRight
                      className={cn(
                        "w-6 h-6 transition-colors",
                        stageFeatures.length > 0 ? "text-primary" : "text-muted-foreground/30"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-border -z-10 rounded-full" />
        <div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-stage-planning via-stage-design to-stage-development rounded-full -z-10 transition-all duration-500"
          style={{
            width: `${(features.filter(f => getStageIndex(f.stage) >= 2).length / features.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
