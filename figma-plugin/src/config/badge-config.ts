/**
 * Badge Configuration
 * 
 * Single source of truth for all badge/chip styling across the app.
 * Replaces 15+ duplicate color mapping functions with centralized, type-safe config.
 * 
 * Usage:
 * ```tsx
 * import { getExperimentStatusConfig, PRIORITY_CONFIG } from "@/config/badge-config";
 * 
 * <Badge className={getExperimentStatusConfig("running").className}>
 *   {getExperimentStatusConfig("running").label}
 * </Badge>
 * ```
 */

import { BadgeProps } from "@/components/ui/badge";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Experiment lifecycle statuses
 */
export type ExperimentStatus = 
  | "draft"        // Initial state, not yet running
  | "running"      // Currently active A/B test
  | "analyzing"    // Test complete, analyzing results
  | "completed"    // Analysis done, winner chosen
  | "shipped"      // Winner deployed to production
  | "paused"       // Temporarily halted
  | "archived";    // Historical/cancelled

/**
 * Feature roadmap stages (lifecycle phases)
 */
export type FeatureStage = 
  | "planning"     // Ideation/scoping
  | "design"       // UX/UI design phase
  | "development"  // Engineering implementation
  | "testing"      // QA/testing phase
  | "launch";      // Launched/live

/**
 * Priority levels (urgency/importance)
 */
export type Priority = 
  | "low"          // Nice to have
  | "medium"       // Standard priority
  | "high"         // Important, time-sensitive
  | "critical";    // Urgent, blocking

/**
 * Impact/confidence levels (opportunity scoring)
 */
export type ImpactLevel = "low" | "medium" | "high";
export type ConfidenceLevel = "low" | "medium" | "high";

/**
 * Health/severity indicators
 */
export type HealthStatus = "healthy" | "warning" | "critical" | "unknown";
export type SeverityLevel = "low" | "medium" | "high" | "critical";

/**
 * Growth experiment themes
 */
export type GrowthTheme = 
  | "activation"    // User onboarding/activation
  | "growth"        // User acquisition/expansion
  | "retention"     // Engagement/retention
  | "monetization"; // Revenue/conversion

/**
 * Badge configuration object shape
 */
export interface BadgeConfig {
  label: string;                    // Display text
  variant?: BadgeProps["variant"];  // shadcn Badge variant
  className?: string;               // Custom Tailwind classes (using design tokens)
  description?: string;             // Optional tooltip/docs
}

/**
 * Priority config with additional styling options
 */
export interface PriorityConfig extends BadgeConfig {
  badgeClass: string;    // Badge-specific classes
  borderClass: string;   // For border indicators
  textClass: string;     // For text-only displays
}

// ============================================================================
// Experiment Status Configuration
// ============================================================================

/**
 * Centralized experiment status badge configuration.
 * All classes use design tokens from src/theme/tokens.ts
 */
export const EXPERIMENT_STATUS_CONFIG: Record<ExperimentStatus, BadgeConfig> = {
  draft: {
    label: "Draft",
    variant: "neutral",
    className: "bg-neutral-50 text-text-muted",
    description: "Experiment not yet started"
  },
  running: {
    label: "Running",
    variant: "default",
    className: "bg-primary-soft text-primary animate-pulse",
    description: "Currently collecting data"
  },
  analyzing: {
    label: "Analyzing",
    variant: "warning",
    className: "bg-warning-soft text-warning",
    description: "Test complete, analyzing results"
  },
  completed: {
    label: "Completed",
    variant: "success",
    className: "bg-success-soft text-success",
    description: "Winner chosen, ready to ship"
  },
  shipped: {
    label: "Shipped",
    variant: "success",
    className: "bg-success-soft text-success",
    description: "Winner deployed to production"
  },
  paused: {
    label: "Paused",
    variant: "warning",
    className: "bg-warning-soft text-warning",
    description: "Temporarily halted"
  },
  archived: {
    label: "Archived",
    variant: "neutral",
    className: "bg-neutral-50 text-text-subtle",
    description: "Historical or cancelled"
  }
};

/**
 * Helper function to get experiment status badge config
 */
export function getExperimentStatusConfig(status?: ExperimentStatus | string): BadgeConfig {
  const normalizedStatus = (status || "draft") as ExperimentStatus;
  return EXPERIMENT_STATUS_CONFIG[normalizedStatus] || EXPERIMENT_STATUS_CONFIG.draft;
}

// ============================================================================
// Feature Stage Configuration
// ============================================================================

/**
 * Centralized feature stage badge configuration.
 * Uses custom stage design tokens defined in tailwind.config.ts
 */
export const FEATURE_STAGE_CONFIG: Record<FeatureStage, BadgeConfig> = {
  planning: {
    label: "Planning",
    className: "bg-stage-planning text-white",
    description: "Initial planning and scoping"
  },
  design: {
    label: "Design",
    className: "bg-stage-design text-white",
    description: "UX/UI design phase"
  },
  development: {
    label: "Development",
    className: "bg-stage-development text-white",
    description: "Engineering implementation"
  },
  testing: {
    label: "Testing",
    className: "bg-stage-testing text-white",
    description: "QA and testing"
  },
  launch: {
    label: "Launch",
    className: "bg-stage-launch text-white",
    description: "Launched or live"
  }
};

/**
 * Helper function to get feature stage badge config
 */
export function getFeatureStageConfig(stage?: FeatureStage | string): BadgeConfig {
  const normalizedStage = (stage || "planning") as FeatureStage;
  return FEATURE_STAGE_CONFIG[normalizedStage] || FEATURE_STAGE_CONFIG.planning;
}

// ============================================================================
// Priority Configuration
// ============================================================================

/**
 * Centralized priority badge configuration with multiple styling options.
 * Supports badges, borders, and text-only displays.
 * 
 * Best practice color system:
 * - P0 (Critical): Red - Immediate attention, blocking
 * - P1 (High): Amber/Yellow - Important, should be addressed soon
 * - P2 (Medium): Blue - Normal priority, steady progress
 * - P3 (Low): Gray/Neutral - Low urgency, backlog items
 */
export const PRIORITY_CONFIG: Record<Priority, PriorityConfig> = {
  low: {
    label: "P3",
    variant: "neutral",
    badgeClass: "bg-neutral-100 text-neutral-600 border border-neutral-200",
    borderClass: "border-neutral-300",
    textClass: "text-neutral-600",
    description: "Nice to have, low urgency"
  },
  medium: {
    label: "P2",
    variant: "default",
    badgeClass: "bg-blue-50 text-blue-700 border border-blue-200",
    borderClass: "border-blue-400",
    textClass: "text-blue-700",
    description: "Standard priority"
  },
  high: {
    label: "P1",
    variant: "warning",
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-300",
    borderClass: "border-amber-500",
    textClass: "text-amber-700",
    description: "Important and time-sensitive"
  },
  critical: {
    label: "P0",
    variant: "error",
    badgeClass: "bg-red-50 text-red-700 border border-red-300",
    borderClass: "border-red-500",
    textClass: "text-red-700",
    description: "Urgent, blocking issue"
  }
};

/**
 * Helper function to get priority badge config
 */
export function getPriorityConfig(priority?: Priority | string): PriorityConfig {
  const normalizedPriority = (priority || "medium") as Priority;
  return PRIORITY_CONFIG[normalizedPriority] || PRIORITY_CONFIG.medium;
}

/**
 * Get priority border class for Gantt timeline left borders
 */
export function getPriorityBorderClass(priority?: Priority | string): string {
  const config = getPriorityConfig(priority);
  return `border-l-4 ${config.borderClass}`;
}

// ============================================================================
// Impact & Confidence Configuration
// ============================================================================

/**
 * Impact level configuration (for opportunity cards)
 */
export const IMPACT_CONFIG: Record<ImpactLevel, BadgeConfig> = {
  low: {
    label: "Low Impact",
    className: "bg-neutral-50 text-text-muted border border-neutral-200",
    description: "Minor improvement"
  },
  medium: {
    label: "Medium Impact",
    className: "bg-warning-soft text-warning border border-warning",
    description: "Moderate improvement"
  },
  high: {
    label: "High Impact",
    className: "bg-success-soft text-success border border-success",
    description: "Significant improvement"
  }
};

/**
 * Confidence level configuration (for opportunity cards)
 */
export const CONFIDENCE_CONFIG: Record<ConfidenceLevel, BadgeConfig> = {
  low: {
    label: "Low Confidence",
    className: "bg-neutral-50 text-text-muted",
    description: "Hypothesis, needs validation"
  },
  medium: {
    label: "Medium Confidence",
    className: "bg-warning-soft text-warning",
    description: "Some data supports this"
  },
  high: {
    label: "High Confidence",
    className: "bg-success-soft text-success",
    description: "Strong data support"
  }
};

/**
 * Helper function to get impact badge config
 */
export function getImpactConfig(impact?: ImpactLevel | string): BadgeConfig {
  const normalizedImpact = (impact || "medium") as ImpactLevel;
  return IMPACT_CONFIG[normalizedImpact] || IMPACT_CONFIG.medium;
}

/**
 * Helper function to get confidence badge config
 */
export function getConfidenceConfig(confidence?: ConfidenceLevel | string): BadgeConfig {
  const normalizedConfidence = (confidence || "medium") as ConfidenceLevel;
  return CONFIDENCE_CONFIG[normalizedConfidence] || CONFIDENCE_CONFIG.medium;
}

// ============================================================================
// Health & Severity Configuration
// ============================================================================

/**
 * Health status configuration (for cluster health cards)
 */
export const HEALTH_CONFIG: Record<HealthStatus, BadgeConfig> = {
  healthy: {
    label: "Healthy",
    variant: "success",
    className: "bg-success-soft text-success border border-success",
    description: "All systems nominal"
  },
  warning: {
    label: "Warning",
    variant: "warning",
    className: "bg-warning-soft text-warning border border-warning",
    description: "Needs attention"
  },
  critical: {
    label: "Critical",
    variant: "error",
    className: "bg-error-soft text-error border border-error",
    description: "Immediate action required"
  },
  unknown: {
    label: "Unknown",
    variant: "neutral",
    className: "bg-neutral-50 text-text-muted border border-neutral-200",
    description: "Status unavailable"
  }
};

/**
 * Severity level configuration (for bottleneck cards)
 */
export const SEVERITY_CONFIG: Record<SeverityLevel, BadgeConfig> = {
  low: {
    label: "Low",
    className: "bg-neutral-50 text-text-muted",
    description: "Minor issue"
  },
  medium: {
    label: "Medium",
    className: "bg-warning-soft text-warning",
    description: "Moderate issue"
  },
  high: {
    label: "High",
    className: "bg-warning text-warning-foreground",
    description: "Significant issue"
  },
  critical: {
    label: "Critical",
    className: "bg-error text-error-foreground",
    description: "Severe blocking issue"
  }
};

/**
 * Helper function to get health status badge config
 */
export function getHealthConfig(health?: HealthStatus | string): BadgeConfig {
  const normalizedHealth = (health || "unknown") as HealthStatus;
  return HEALTH_CONFIG[normalizedHealth] || HEALTH_CONFIG.unknown;
}

/**
 * Helper function to get severity badge config
 */
export function getSeverityConfig(severity?: SeverityLevel | string): BadgeConfig {
  const normalizedSeverity = (severity || "medium") as SeverityLevel;
  return SEVERITY_CONFIG[normalizedSeverity] || SEVERITY_CONFIG.medium;
}

// ============================================================================
// Growth Theme Configuration
// ============================================================================

/**
 * Growth theme configuration (for idea clustering)
 * Maps to stage design tokens for visual consistency
 */
export const GROWTH_THEME_CONFIG: Record<GrowthTheme, BadgeConfig> = {
  activation: {
    label: "Activation",
    className: "bg-stage-design text-white",
    description: "User onboarding and activation"
  },
  growth: {
    label: "Growth",
    className: "bg-stage-development text-white",
    description: "User acquisition and expansion"
  },
  retention: {
    label: "Retention",
    className: "bg-stage-testing text-white",
    description: "Engagement and retention"
  },
  monetization: {
    label: "Monetization",
    className: "bg-stage-launch text-white",
    description: "Revenue and conversion"
  }
};

/**
 * Helper function to get growth theme badge config
 */
export function getGrowthThemeConfig(theme?: GrowthTheme | string): BadgeConfig {
  const normalizedTheme = (theme || "growth") as GrowthTheme;
  return GROWTH_THEME_CONFIG[normalizedTheme] || GROWTH_THEME_CONFIG.growth;
}

/**
 * Get theme color for canvas clustering (returns CSS custom property)
 */
export function getThemeColor(theme?: GrowthTheme | string): string {
  const themeColors = {
    activation: "hsl(var(--stage-design))",
    growth: "hsl(var(--stage-development))",
    retention: "hsl(var(--stage-testing))",
    monetization: "hsl(var(--stage-launch))"
  };
  const normalizedTheme = (theme || "growth") as GrowthTheme;
  return themeColors[normalizedTheme] || themeColors.growth;
}

// ============================================================================
// Special Badge Configurations
// ============================================================================

/**
 * Special purpose badges (winner, variant, live, etc.)
 */
export const SPECIAL_BADGES = {
  winner: {
    label: "Winner",
    variant: "success" as const,
    className: "bg-success text-success-foreground",
    description: "Winning variant"
  },
  winnerChosen: {
    label: "Winner Chosen",
    variant: "success" as const,
    className: "bg-success text-success-foreground",
    description: "Winner has been selected"
  },
  control: {
    label: "Control",
    variant: "outline" as const,
    className: "border-neutral-200 text-text-muted",
    description: "Control variant (baseline)"
  },
  variantA: {
    label: "Variant A",
    variant: "outline" as const,
    className: "border-primary text-primary",
    description: "Test variant A"
  },
  variantB: {
    label: "Variant B",
    variant: "outline" as const,
    className: "border-primary text-primary",
    description: "Test variant B"
  },
  abTest: {
    label: "A/B Test",
    variant: "default" as const,
    className: "bg-primary-soft text-primary",
    description: "Experiment in progress"
  },
  live: {
    label: "Live",
    variant: "success" as const,
    className: "bg-success text-success-foreground",
    description: "Currently live in production"
  }
} as const;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get all available statuses for a given type (useful for filters/dropdowns)
 */
export function getAvailableStatuses(type: "experiment" | "feature" | "priority"): string[] {
  switch (type) {
    case "experiment":
      return Object.keys(EXPERIMENT_STATUS_CONFIG);
    case "feature":
      return Object.keys(FEATURE_STAGE_CONFIG);
    case "priority":
      return Object.keys(PRIORITY_CONFIG);
    default:
      return [];
  }
}

/**
 * Validate if a status string is valid for its type
 */
export function isValidStatus(
  status: string, 
  type: "experiment" | "feature" | "priority"
): boolean {
  return getAvailableStatuses(type).includes(status);
}

/**
 * Get badge props object ready for spreading into Badge component
 * 
 * Usage:
 * ```tsx
 * <Badge {...getBadgeProps(getExperimentStatusConfig("running"))}>
 *   Running
 * </Badge>
 * ```
 */
export function getBadgeProps(config: BadgeConfig): {
  variant?: BadgeProps["variant"];
  className?: string;
} {
  return {
    variant: config.variant,
    className: config.className
  };
}
