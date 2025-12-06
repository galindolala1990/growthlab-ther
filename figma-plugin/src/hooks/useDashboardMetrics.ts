import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "./useWorkspace";
import { useToast } from "@/hooks/use-toast";

export interface DashboardMetrics {
  experimentVelocity: {
    started: number;
    completed: number;
  };
  winRate: number;
  cumulativeImpact: number;
  activeExperiments: number;
  aiOpportunityScore: number;
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { workspace } = useWorkspace();
  const { toast } = useToast();

  useEffect(() => {
    if (!workspace) {
      setLoading(false);
      return;
    }

    fetchMetrics();
  }, [workspace]);

  const fetchMetrics = async () => {
    if (!workspace) return;

    try {
      const { data: roadmaps } = await supabase
        .from("roadmaps")
        .select("id")
        .eq("workspace_id", workspace.id)
        .eq("status", "active")
        .limit(1);

      if (!roadmaps || roadmaps.length === 0) {
        setMetrics({
          experimentVelocity: { started: 0, completed: 0 },
          winRate: 0,
          cumulativeImpact: 0,
          activeExperiments: 0,
          aiOpportunityScore: 0,
        });
        setLoading(false);
        return;
      }

      const roadmapId = roadmaps[0].id;

      const { data: features } = await supabase
        .from("features")
        .select("*")
        .eq("roadmap_id", roadmapId)
        .eq("is_experiment", true);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const startedThisMonth = features?.filter(
        (f) => f.start_date && new Date(f.start_date) > thirtyDaysAgo
      ).length || 0;

      const completedThisMonth = features?.filter(
        (f) => 
          f.experiment_status === "completed" && 
          f.updated_at && 
          new Date(f.updated_at) > thirtyDaysAgo
      ).length || 0;

      const completedExperiments = features?.filter(
        (f) => f.experiment_status === "completed" || f.experiment_status === "shipped"
      ) || [];

      const winningExperiments = completedExperiments.filter((f) => f.lift && f.lift > 0);
      const winRate = completedExperiments.length > 0
        ? Math.round((winningExperiments.length / completedExperiments.length) * 100)
        : 0;

      const cumulativeImpact = winningExperiments.reduce((sum, f) => sum + (f.lift || 0), 0);

      const activeExperiments = features?.filter(
        (f) => f.experiment_status === "running"
      ).length || 0;

      // Simple AI opportunity score based on data quality
      const aiOpportunityScore = Math.min(
        100,
        Math.round(
          (activeExperiments * 10) +
          (winRate * 0.5) +
          (features?.length || 0) * 2
        )
      );

      setMetrics({
        experimentVelocity: { started: startedThisMonth, completed: completedThisMonth },
        winRate,
        cumulativeImpact: Math.round(cumulativeImpact * 10) / 10,
        activeExperiments,
        aiOpportunityScore,
      });
    } catch (error: any) {
      console.error("Error fetching dashboard metrics:", error);
      toast({
        title: "Error loading metrics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, refresh: fetchMetrics };
}
