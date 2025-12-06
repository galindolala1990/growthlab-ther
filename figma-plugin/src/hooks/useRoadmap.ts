import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "./useWorkspace";
import { useToast } from "@/hooks/use-toast";
import { createSampleData } from "@/lib/sampleData";

export interface Roadmap {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: "active" | "archived" | "draft";
  created_at: string;
  updated_at: string;
}

export function useRoadmap() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const { workspace } = useWorkspace();
  const { toast } = useToast();

  useEffect(() => {
    if (!workspace) {
      setLoading(false);
      return;
    }

    fetchOrCreateRoadmap();
  }, [workspace]);

  const fetchOrCreateRoadmap = async () => {
    if (!workspace) return;

    try {
      // Try to fetch existing active roadmap
      const { data: roadmaps, error: fetchError } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("workspace_id", workspace.id)
        .eq("status", "active")
        .limit(1);

      if (fetchError) throw fetchError;

      if (roadmaps && roadmaps.length > 0) {
        setRoadmap(roadmaps[0] as Roadmap);
      } else {
        // Create default roadmap
        const { data: newRoadmap, error: createError } = await supabase
          .from("roadmaps")
          .insert({
            workspace_id: workspace.id,
            name: "Product Roadmap 2024",
            description: "Main product roadmap",
            status: "active",
          })
          .select()
          .single();

        if (createError) throw createError;
        setRoadmap(newRoadmap as Roadmap);
        
        // Create sample data for new roadmap
        await createSampleData(workspace.id, newRoadmap.id);
      }
    } catch (error: any) {
      console.error("Roadmap error:", error);
      toast({
        title: "Error loading roadmap",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { roadmap, loading };
}
