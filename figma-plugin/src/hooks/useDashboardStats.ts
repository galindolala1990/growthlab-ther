import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "./useWorkspace";
import { useToast } from "@/hooks/use-toast";

export interface DashboardStats {
  totalFeatures: number;
  featuresByStage: Record<string, number>;
  activeExperiments: number;
  completedExperiments: number;
  experimentsWithLift: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
  }>;
  progressMetrics: {
    averageProgress: number;
    featuresInProgress: number;
    featuresCompleted: number;
  };
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { workspace } = useWorkspace();
  const { toast } = useToast();

  useEffect(() => {
    if (!workspace) {
      setLoading(false);
      return;
    }

    fetchStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [workspace]);

  const fetchStats = async () => {
    if (!workspace) return;

    try {
      // Get roadmap for workspace
      const { data: roadmaps } = await supabase
        .from("roadmaps")
        .select("id")
        .eq("workspace_id", workspace.id)
        .eq("status", "active")
        .limit(1);

      if (!roadmaps || roadmaps.length === 0) {
        setStats({
          totalFeatures: 0,
          featuresByStage: {},
          activeExperiments: 0,
          completedExperiments: 0,
          experimentsWithLift: 0,
          recentActivity: [],
          progressMetrics: {
            averageProgress: 0,
            featuresInProgress: 0,
            featuresCompleted: 0,
          },
        });
        setLoading(false);
        return;
      }

      const roadmapId = roadmaps[0].id;

      // Fetch features
      const { data: features, error: featuresError } = await supabase
        .from("features")
        .select("*")
        .eq("roadmap_id", roadmapId);

      if (featuresError) throw featuresError;

      // Calculate features by stage
      const featuresByStage: Record<string, number> = {};
      let totalProgress = 0;
      let featuresInProgress = 0;
      let featuresCompleted = 0;

      features?.forEach((feature) => {
        featuresByStage[feature.stage] = (featuresByStage[feature.stage] || 0) + 1;
        totalProgress += feature.progress || 0;
        
        if (feature.progress && feature.progress > 0 && feature.progress < 100) {
          featuresInProgress++;
        } else if (feature.progress === 100 || feature.stage === "launch") {
          featuresCompleted++;
        }
      });

      const averageProgress = features && features.length > 0
        ? Math.round(totalProgress / features.length)
        : 0;

      // Count experiments
      const experimentsCount = features?.filter((f) => f.is_experiment).length || 0;
      const activeExperiments = features?.filter(
        (f) => f.is_experiment && f.experiment_status === "running"
      ).length || 0;
      const completedExperiments = features?.filter(
        (f) => f.is_experiment && f.experiment_status === "completed"
      ).length || 0;

      // Get variant data for experiments with lift
      const experimentIds = features
        ?.filter((f) => f.is_experiment)
        .map((f) => f.id) || [];

      let experimentsWithLift = 0;
      if (experimentIds.length > 0) {
        const { data: variants } = await supabase
          .from("experiment_variants")
          .select("feature_id, conversion_rate")
          .in("feature_id", experimentIds);

        const featuresWithPositiveLift = new Set(
          variants
            ?.filter((v) => v.conversion_rate && v.conversion_rate > 0)
            .map((v) => v.feature_id)
        );

        experimentsWithLift = featuresWithPositiveLift.size;
      }

      // Get recent activity (last 10 updated features)
      const recentActivity = features
        ?.sort((a, b) => 
          new Date(b.updated_at || b.created_at).getTime() - 
          new Date(a.updated_at || a.created_at).getTime()
        )
        .slice(0, 10)
        .map((f) => ({
          id: f.id,
          type: f.is_experiment ? "experiment" : "feature",
          title: f.title,
          timestamp: f.updated_at || f.created_at,
        })) || [];

      setStats({
        totalFeatures: features?.length || 0,
        featuresByStage,
        activeExperiments,
        completedExperiments,
        experimentsWithLift,
        recentActivity,
        progressMetrics: {
          averageProgress,
          featuresInProgress,
          featuresCompleted,
        },
      });
    } catch (error: any) {
      console.error("Error fetching dashboard stats:", error);
      toast({
        title: "Error loading dashboard",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refresh: fetchStats };
}
