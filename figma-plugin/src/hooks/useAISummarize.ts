import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SummarizeOptions {
  featureData: any;
  source: "figma" | "jira" | "manual";
}

export function useAISummarize() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const summarize = async ({ featureData, source }: SummarizeOptions): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-summarize", {
        body: { featureData, source },
      });

      if (error) {
        console.error("Summarization error:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to generate summary",
          variant: "destructive",
        });
        return null;
      }

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return null;
      }

      return data.summary;
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { summarize, isLoading };
}
