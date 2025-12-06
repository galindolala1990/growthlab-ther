import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "./useWorkspace";

export function useAnalytics() {
  const { workspace } = useWorkspace();

  const trackEvent = async (eventType: string, eventData?: any, featureId?: string) => {
    if (!workspace) return;

    try {
      await supabase.from("analytics_events").insert({
        workspace_id: workspace.id,
        event_type: eventType,
        event_data: eventData,
        feature_id: featureId,
      });
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  };

  const trackFeatureView = (featureId: string) => {
    trackEvent("feature_viewed", { feature_id: featureId }, featureId);
  };

  const trackFeatureCreate = (featureId: string) => {
    trackEvent("feature_created", { feature_id: featureId }, featureId);
  };

  const trackFeatureUpdate = (featureId: string, updates: any) => {
    trackEvent("feature_updated", { feature_id: featureId, updates }, featureId);
  };

  const trackExperimentStart = (featureId: string) => {
    trackEvent("experiment_started", { feature_id: featureId }, featureId);
  };

  const trackExperimentComplete = (featureId: string, winningVariant: string) => {
    trackEvent("experiment_completed", { feature_id: featureId, winning_variant: winningVariant }, featureId);
  };

  return {
    trackEvent,
    trackFeatureView,
    trackFeatureCreate,
    trackFeatureUpdate,
    trackExperimentStart,
    trackExperimentComplete,
  };
}
