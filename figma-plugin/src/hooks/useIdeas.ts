import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRoadmap } from "./useRoadmap";
import { useToast } from "@/hooks/use-toast";

export interface Idea {
  id: string;
  roadmap_id: string;
  title: string;
  description: string | null;
  theme: string | null;
  impact: string | null;
  stage: string;
  cluster_x: number | null;
  cluster_y: number | null;
  tags: string[] | null;
  canvas_cluster: string | null;
  canvas_impact_score: number | null;
  sticky_note_color: string | null;
  created_at: string;
  updated_at: string;
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const { roadmap } = useRoadmap();
  const { toast } = useToast();

  useEffect(() => {
    if (!roadmap) {
      setLoading(false);
      return;
    }

    fetchIdeas();

    // Set up real-time subscription
    const channel = supabase
      .channel("ideas-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ideas",
          filter: `roadmap_id=eq.${roadmap.id}`,
        },
        () => {
          fetchIdeas();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roadmap]);

  const fetchIdeas = async () => {
    if (!roadmap) return;

    try {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .eq("roadmap_id", roadmap.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setIdeas((data || []) as Idea[]);
    } catch (error: any) {
      console.error("Ideas error:", error);
      toast({
        title: "Error loading ideas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createIdea = async (idea: Omit<Idea, "id" | "created_at" | "updated_at" | "roadmap_id">) => {
    if (!roadmap) return;

    try {
      const { data, error } = await supabase
        .from("ideas")
        .insert({
          ...idea,
          roadmap_id: roadmap.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Idea created",
        description: "New idea added to canvas",
      });

      return data;
    } catch (error: any) {
      console.error("Create idea error:", error);
      toast({
        title: "Error creating idea",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateIdea = async (id: string, updates: Partial<Idea>) => {
    try {
      const { error } = await supabase
        .from("ideas")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    } catch (error: any) {
      console.error("Update idea error:", error);
      toast({
        title: "Error updating idea",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteIdea = async (id: string) => {
    try {
      const { error } = await supabase.from("ideas").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Idea deleted",
        description: "Idea removed from canvas",
      });
    } catch (error: any) {
      console.error("Delete idea error:", error);
      toast({
        title: "Error deleting idea",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { ideas, loading, createIdea, updateIdea, deleteIdea };
}
