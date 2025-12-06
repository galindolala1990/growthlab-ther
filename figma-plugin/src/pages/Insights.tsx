import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useRoadmap } from "@/hooks/useRoadmap";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OpportunityCard } from "@/components/OpportunityCard";
import { BottleneckCard } from "@/components/BottleneckCard";
import { ActionCard } from "@/components/ActionCard";
import { PatternCard } from "@/components/PatternCard";
import { ClusterHealthCard } from "@/components/ClusterHealthCard";
import { Sparkles, Brain, TrendingUp, AlertTriangle, Lightbulb, Target, RefreshCw } from "lucide-react";

interface Insights {
  opportunities: any[];
  bottlenecks: any[];
  actions: any[];
  patterns: any[];
  cluster_health: any;
  quality_score: string;
  quality_reasoning: string;
  metadata?: {
    features_analyzed: number;
    experiments_analyzed: number;
    ideas_analyzed: number;
  };
}

const Insights = () => {
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const { roadmap, loading: roadmapLoading } = useRoadmap();
  const { toast } = useToast();
  const [insights, setInsights] = useState<Insights | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateInsights = async () => {
    if (!workspace || !roadmap) {
      toast({
        title: "Error",
        description: "Workspace or roadmap not found",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-insights", {
        body: {
          workspaceId: workspace.id,
          roadmapId: roadmap.id,
        },
      });

      if (error) {
        if (error.message?.includes("Rate limit")) {
          toast({
            title: "Rate Limit",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive",
          });
          return;
        }
        if (error.message?.includes("Payment required")) {
          toast({
            title: "Credits Required",
            description: "Please add credits to your Lovable workspace to use AI insights.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      setInsights(data);
      toast({
        title: "Insights Generated",
        description: "AI has analyzed your Growth Lab data.",
      });
    } catch (error: any) {
      console.error("Error generating insights:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate insights",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const getQualityScoreConfig = (score: string) => {
    switch (score) {
      case "strong":
        return { color: "bg-success/10 text-success border-success", icon: "🚀" };
      case "moderate":
        return { color: "bg-warning/10 text-warning border-warning", icon: "⚡" };
      case "fragmented":
        return { color: "bg-error/10 text-error border-error", icon: "⚠️" };
      default:
        return { color: "bg-neutral-500/10 text-neutral-600 border-neutral-500", icon: "📊" };
    }
  };

  if (workspaceLoading || roadmapLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6 max-w-7xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Insights</h1>
              <p className="text-muted-foreground">
                Your strategic co-pilot. What matters most + what to do next.
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={generateInsights}
          disabled={generating}
          className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent"
          size="lg"
        >
          {generating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Insights
            </>
          )}
        </Button>
      </div>

      {/* Empty State */}
      {!insights && !generating && (
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 border-2 border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to unlock strategic insights?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              AI will analyze your features, experiments, timeline, and canvas to provide actionable
              recommendations, identify bottlenecks, and reveal growth opportunities.
            </p>
            <Button
              onClick={generateInsights}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent"
            >
              <Sparkles className="w-4 h-4" />
              Generate Insights
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {generating && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI is analyzing your Growth Lab...</h3>
              <p className="text-muted-foreground">
                Synthesizing data across features, experiments, timeline, and canvas
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insights Content */}
      {insights && !generating && (
        <div className="space-y-8">
          {/* Quality Score Banner */}
          {insights.quality_score && (
            <Card className={`border-2 ${getQualityScoreConfig(insights.quality_score).color}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getQualityScoreConfig(insights.quality_score).icon}</span>
                    <div>
                      <CardTitle className="text-xl">
                        Roadmap Quality: <span className="capitalize">{insights.quality_score}</span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{insights.quality_reasoning}</p>
                    </div>
                  </div>
                  {insights.metadata && (
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{insights.metadata.features_analyzed} features analyzed</div>
                      <div>{insights.metadata.experiments_analyzed} experiments reviewed</div>
                      <div>{insights.metadata.ideas_analyzed} ideas considered</div>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          )}

          {/* Top Actions */}
          {insights.actions && insights.actions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Top Recommendations</h2>
                <Badge>{insights.actions.length} actions</Badge>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {insights.actions.map((action, idx) => (
                  <ActionCard key={idx} action={action} />
                ))}
              </div>
            </div>
          )}

          {/* Opportunities */}
          {insights.opportunities && insights.opportunities.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-success" />
                <h2 className="text-2xl font-bold">Growth Opportunities</h2>
                <Badge variant="success">{insights.opportunities.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.opportunities.map((opp, idx) => (
                  <OpportunityCard key={idx} opportunity={opp} />
                ))}
              </div>
            </div>
          )}

          {/* Bottlenecks */}
          {insights.bottlenecks && insights.bottlenecks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="text-2xl font-bold">Bottlenecks & Risks</h2>
                <Badge className="bg-destructive/10 text-destructive">{insights.bottlenecks.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.bottlenecks.map((bottleneck, idx) => (
                  <BottleneckCard key={idx} bottleneck={bottleneck} />
                ))}
              </div>
            </div>
          )}

          {/* Patterns */}
          {insights.patterns && insights.patterns.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Learning Patterns</h2>
                <Badge className="bg-primary-soft text-primary">{insights.patterns.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.patterns.map((pattern, idx) => (
                  <PatternCard key={idx} pattern={pattern} />
                ))}
              </div>
            </div>
          )}

          {/* Cluster Health */}
          {insights.cluster_health && Object.keys(insights.cluster_health).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Product Area Health</h2>
              </div>
              <ClusterHealthCard clusterHealth={insights.cluster_health} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Insights;