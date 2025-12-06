import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DesignIteration {
  id: string;
  feature_id: string;
  version: number;
  title: string;
  description: string | null;
  image_url: string;
  figma_url: string | null;
  created_by: string | null;
  created_at: string;
}

export function useDesignIterations(featureId: string | null) {
  const [iterations, setIterations] = useState<DesignIteration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!featureId) {
      setIterations([]);
      setLoading(false);
      return;
    }

    fetchIterations();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`design-iterations-${featureId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "design_iterations",
          filter: `feature_id=eq.${featureId}`,
        },
        () => {
          fetchIterations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [featureId]);

  const fetchIterations = async () => {
    if (!featureId) return;

    try {
      const { data, error } = await supabase
        .from("design_iterations")
        .select("*")
        .eq("feature_id", featureId)
        .order("version", { ascending: false });

      if (error) throw error;
      setIterations(data || []);
    } catch (error: any) {
      console.error("Error fetching design iterations:", error);
      toast({
        title: "Error loading design iterations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createIteration = async (
    iteration: Omit<DesignIteration, "id" | "created_at" | "created_by">
  ) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from("design_iterations")
        .insert({
          ...iteration,
          created_by: user.user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Design iteration created",
        description: "Successfully added new design iteration",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error creating iteration",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { iterations, loading, createIteration };
}
