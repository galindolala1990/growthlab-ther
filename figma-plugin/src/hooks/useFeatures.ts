import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRoadmap } from "./useRoadmap";
import { useToast } from "@/hooks/use-toast";

export interface Feature {
  id: string;
  roadmap_id: string;
  title: string;
  description: string | null;
  stage: "planning" | "design" | "development" | "testing" | "launch";
  progress: number;
  start_date: string | null;
  end_date: string | null;
  team: string | null;
  priority: "low" | "medium" | "high" | "critical" | null;
  swimlane: string | null;
  is_experiment: boolean;
  experiment_status: "draft" | "running" | "analyzing" | "completed" | "shipped" | "paused" | "archived" | null;
  winning_variant_id: string | null;
  figma_url: string | null;
  jira_key: string | null;
  preview_image_url: string | null;
  design_images: any;
  canvas_x: number | null;
  canvas_y: number | null;
  hypothesis: string | null;
  primary_metric: string | null;
  secondary_metrics: string[] | null;
  lift: number | null;
  p_value: number | null;
  launched_at: string | null;
  experiment_owner: string | null;
  experiment_segment: string | null;
  experiment_notes: string | null;
  experiment_decision: string | null;
  created_at: string;
  updated_at: string;
}

export function useFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const { roadmap } = useRoadmap();
  const { toast } = useToast();

  useEffect(() => {
    if (!roadmap) {
      setLoading(false);
      return;
    }

    fetchFeatures();

    // Set up realtime subscription
    const channel = supabase
      .channel("features-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "features",
          filter: `roadmap_id=eq.${roadmap.id}`,
        },
        () => {
          fetchFeatures();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roadmap]);

  const fetchFeatures = async () => {
    if (!roadmap) return;

    try {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .eq("roadmap_id", roadmap.id)
        .order("start_date", { ascending: true });

      if (error) throw error;
      setFeatures((data || []) as Feature[]);
    } catch (error: any) {
      console.error("Features error:", error);
      toast({
        title: "Error loading features",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFeature = async (feature: Omit<Feature, "id" | "created_at" | "updated_at" | "roadmap_id">) => {
    if (!roadmap) return;

    try {
      const { data, error } = await supabase
        .from("features")
        .insert({
          ...feature,
          roadmap_id: roadmap.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Feature created",
        description: "New feature has been added to the roadmap.",
      });

      return data;
    } catch (error: any) {
      console.error("Create feature error:", error);
      toast({
        title: "Error creating feature",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateFeature = async (id: string, updates: Partial<Feature>) => {
    try {
      const { error } = await supabase
        .from("features")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Feature updated",
        description: "Feature has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Update feature error:", error);
      toast({
        title: "Error updating feature",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteFeature = async (id: string) => {
    try {
      const { error } = await supabase
        .from("features")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Feature deleted",
        description: "Feature has been removed from the roadmap.",
      });
    } catch (error: any) {
      console.error("Delete feature error:", error);
      toast({
        title: "Error deleting feature",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { features, loading, refetch: fetchFeatures, createFeature, updateFeature, deleteFeature };
}
