import { Feature } from "@/types/roadmap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, ArrowRight, Sparkles, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesignStoryViewProps {
  features: Feature[];
  previewImages?: Record<string, string>;
}

interface TimelineEvent {
  id: string;
  date: Date;
  type: "concept" | "design" | "iteration" | "launch";
  feature: Feature;
  version?: string;
  previewImage?: string;
  aiGenerated?: boolean;
}

const stageColors = {
  planning: "from-stage-planning to-stage-planning/50",
  design: "from-stage-design to-stage-design/50",
  development: "from-stage-development to-stage-development/50",
  testing: "from-stage-testing to-stage-testing/50",
  launch: "from-stage-launch to-stage-launch/50",
};

export const DesignStoryView = ({ features, previewImages = {} }: DesignStoryViewProps) => {
  // Create timeline events from features
  const timelineEvents: TimelineEvent[] = features
    .map((feature) => ({
      id: feature.id,
      date: feature.startDate,
      type: feature.stage === "launch" ? "launch" : 
            feature.stage === "design" ? "design" :
            feature.stage === "development" ? "iteration" : "concept",
      feature,
      version: feature.stage === "launch" ? "v1.0" : 
               feature.stage === "testing" ? "beta" : "alpha",
      previewImage: previewImages[feature.id],
      aiGenerated: true,
    } as TimelineEvent))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-warning/10 via-accent/10 to-background border-warning/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-warning to-accent">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Design Story Timeline</h2>
              <p className="text-sm text-muted-foreground">
                AI-generated visual journey of product evolution
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-warning to-accent text-white border-0 gap-1">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </Badge>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/20" />

        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative flex gap-6 group">
              {/* Timeline node */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br border-4 border-background shadow-lg",
                  "transition-transform group-hover:scale-110",
                  stageColors[event.feature.stage]
                )}>
                  <span className="text-2xl font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                {index < timelineEvents.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mt-4 rotate-90" />
                )}
              </div>

              {/* Event card */}
              <Card className={cn(
                "flex-1 p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl",
                "bg-gradient-to-br border-2",
                event.feature.stage === "launch" 
                  ? "from-stage-launch/20 to-background border-stage-launch/40"
                  : "from-background to-background border-border"
              )}>
                <div className="flex gap-6">
                  {/* Preview Image */}
                  {event.previewImage && (
                    <div className="w-64 h-40 rounded-lg overflow-hidden shrink-0 bg-muted">
                      <img
                        src={event.previewImage}
                        alt={event.feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{event.feature.title}</h3>
                          {event.aiGenerated && (
                            <Badge variant="outline" className="bg-primary-soft text-primary border-primary/30 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.feature.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={cn(
                          "capitalize font-semibold",
                          event.feature.stage === "launch" 
                            ? "bg-stage-launch text-white"
                            : "bg-muted text-foreground"
                        )}>
                          {event.feature.stage}
                        </Badge>
                        {event.version && (
                          <Badge variant="outline" className="text-xs">
                            {event.version}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.feature.team} Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-xs">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span className="font-semibold">{event.feature.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full bg-gradient-to-r transition-all",
                                stageColors[event.feature.stage]
                              )}
                              style={{ width: `${event.feature.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        View in Figma
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        See Jira Issues
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Miro Board
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};