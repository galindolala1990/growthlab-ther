export type LifecycleStage = "planning" | "design" | "development" | "testing" | "launch";

export interface ExperimentVariant {
  id: string;
  name: string;
  description: string;
  metrics?: {
    conversion?: number;
    engagement?: number;
    users?: number;
  };
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  stage: LifecycleStage;
  progress: number;
  startDate: Date;
  endDate: Date;
  team: string;
  dependencies?: string[];
  priority: "low" | "medium" | "high" | "critical";
  isExperiment?: boolean;
  experimentStatus?: "draft" | "running" | "completed" | "paused";
  variants?: ExperimentVariant[];
  winningVariant?: string;
}

export interface Swimlane {
  id: string;
  name: string;
  features: Feature[];
}
