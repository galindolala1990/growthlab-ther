import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ExperimentVariant {
  id: string;
  feature_id: string;
  name: string;
  description: string | null;
  conversion_rate: number | null;
  engagement_rate: number | null;
  user_count: number;
  is_control: boolean;
  is_winner: boolean;
  created_at: string;
  updated_at: string;
}

export function useExperimentVariants(featureId?: string) {
  const [variants, setVariants] = useState<ExperimentVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!featureId) {
      setLoading(false);
      return;
    }

    fetchVariants();
  }, [featureId]);

  const fetchVariants = async () => {
    if (!featureId) return;

    try {
      const { data, error } = await supabase
        .from("experiment_variants")
        .select("*")
        .eq("feature_id", featureId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setVariants((data || []) as ExperimentVariant[]);
    } catch (error: any) {
      console.error("Variants error:", error);
      toast({
        title: "Error loading variants",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createVariant = async (variant: Omit<ExperimentVariant, "id" | "created_at" | "updated_at" | "feature_id">) => {
    if (!featureId) return;

    try {
      const { data, error } = await supabase
        .from("experiment_variants")
        .insert({
          ...variant,
          feature_id: featureId,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Variant created",
        description: "New experiment variant has been added.",
      });

      return data;
    } catch (error: any) {
      console.error("Create variant error:", error);
      toast({
        title: "Error creating variant",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { variants, loading, createVariant };
}
