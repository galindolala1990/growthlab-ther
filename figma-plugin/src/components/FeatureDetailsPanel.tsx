import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, ExternalLink, TrendingUp, Image, Target, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { Feature as DBFeature } from "@/hooks/useFeatures";
import { Feature as RoadmapFeature } from "@/types/roadmap";
import { DesignIterationsPanel } from "@/components/DesignIterationsPanel";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { AvatarStack } from "@/components/AvatarStack";
import { cn } from "@/lib/utils";

type FeatureUnion = DBFeature | RoadmapFeature;

interface FeatureDetailsPanelProps {
  feature: FeatureUnion | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FeatureDetailsPanel({ feature, isOpen, onClose }: FeatureDetailsPanelProps) {
  if (!feature) return null;

  // Helper to check if feature is from roadmap (has Date objects) or DB (has strings)
  const isRoadmapFeature = (f: FeatureUnion): f is RoadmapFeature => {
    return f && 'startDate' in f;
  };

  const startDate = isRoadmapFeature(feature) 
    ? feature.startDate 
    : new Date((feature as DBFeature).start_date);
  
  const endDate = isRoadmapFeature(feature) 
    ? feature.endDate 
    : new Date((feature as DBFeature).end_date);

  const previewImage = isRoadmapFeature(feature) 
    ? undefined 
    : (feature as DBFeature).preview_image_url;

  const isExperiment = isRoadmapFeature(feature) 
    ? feature.isExperiment 
    : (feature as DBFeature).is_experiment;

  const experimentStatus = isRoadmapFeature(feature) 
    ? feature.experimentStatus 
    : (feature as DBFeature).experiment_status;

  const figmaUrl = isRoadmapFeature(feature) 
    ? undefined 
    : (feature as DBFeature).figma_url;

  const jiraKey = isRoadmapFeature(feature) 
    ? undefined 
    : (feature as DBFeature).jira_key;

  // Check if this is a DB feature with an ID (for design iterations)
  const featureId = !isRoadmapFeature(feature) ? (feature as DBFeature).id : null;

  // Get owner information
  const dbFeature = !isRoadmapFeature(feature) ? (feature as DBFeature) : null;
  const owners = dbFeature?.experiment_owner 
    ? [dbFeature.experiment_owner] 
    : dbFeature?.team 
      ? dbFeature.team.split(',').map(t => t.trim())
      : [];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-3">
            <div className="flex-1">
                {/* Priority badge hidden for simplification */}
            </div>
            {/* Removed Feature Stage badge for simplification */}
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="iterations" disabled={!featureId}>
              <Image className="w-4 h-4 mr-2" />
              Design Iterations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Experiment Hypothesis & Metrics - Prominent for experiments */}
          {isExperiment && dbFeature && (
            <div className="bg-primary-soft border-l-4 border-primary rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1 space-y-3">
                  {dbFeature.hypothesis && (
                    <div>
                      <h3 className="font-semibold text-sm text-primary mb-1">Hypothesis</h3>
                      <p className="text-sm text-foreground">{dbFeature.hypothesis}</p>
                    </div>
                  )}
                  
                  {(dbFeature.primary_metric || dbFeature.secondary_metrics) && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Key Metrics
                      </h3>
                      {dbFeature.primary_metric && (
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-primary text-primary-foreground">Primary</Badge>
                          <span className="text-sm font-medium">{dbFeature.primary_metric}</span>
                        </div>
                      )}
                      {dbFeature.secondary_metrics && dbFeature.secondary_metrics.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs text-text-muted">Secondary metrics:</p>
                          <div className="flex flex-wrap gap-2">
                            {dbFeature.secondary_metrics.map((metric, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {experimentStatus && (
                    <div>
                      <span className="text-xs text-text-muted">Status: </span>
                      <Badge className="text-xs">{experimentStatus}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Preview Image */}
          {previewImage && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={previewImage}
                alt={feature.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Start Date</span>
              </div>
              <p className="font-medium">{format(startDate, "MMM dd, yyyy")}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>End Date</span>
              </div>
              <p className="font-medium">{format(endDate, "MMM dd, yyyy")}</p>
            </div>

            {feature.team && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Team / Owner</span>
                </div>
                <div className="flex items-center gap-2">
                  <AvatarStack owners={owners} size="sm" />
                  <p className="font-medium text-sm">{feature.team}</p>
                </div>
              </div>
            )}

            {dbFeature?.experiment_owner && !feature.team && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Owner</span>
                </div>
                <div className="flex items-center gap-2">
                  <AvatarStack owners={[dbFeature.experiment_owner]} size="sm" />
                  <p className="font-medium text-sm">{dbFeature.experiment_owner}</p>
                </div>
              </div>
            )}

            {feature.priority && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Priority</span>
                </div>
                <Badge className={getPriorityConfig(feature.priority).badgeClass}>
                  {getPriorityConfig(feature.priority).label}
                </Badge>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{feature.progress || 0}%</span>
            </div>
            <Progress value={feature.progress || 0} className="h-2" />
          </div>

          <Separator />

          {/* External Links */}
          <div className="space-y-3">
            {figmaUrl && (
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View in Figma
                </a>
              </Button>
            )}
            {jiraKey && (
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href={`https://jira.atlassian.com/browse/${jiraKey}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View in Jira ({jiraKey})
                </a>
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="iterations" className="mt-6">
          {featureId && (
            <DesignIterationsPanel
              featureId={featureId}
              featureTitle={feature.title}
            />
          )}
        </TabsContent>
      </Tabs>
      </SheetContent>
    </Sheet>
  );
}
