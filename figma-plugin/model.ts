// Growth Labs Experiment Flow Visualizer Data Model
// This file defines the core data structures for experiment flows, steps, variants, and edges.

/**
 * Status of an experiment node or variant.
 */
export type ExperimentStatus =
  | 'Running'
  | 'Paused'
  | 'Winner'
  | 'Launched'
  | 'Backlog';

/**
 * Represents a step node in the experiment flow.
 * Can have multiple variants and outgoing edges.
 */
export interface StepNode {
  id: string; // Unique node ID
  title: string;
  description?: string;
  kpi?: string;
  status?: ExperimentStatus;
  figmaNodeId?: string; // Optional Figma node ID for UI sync
  variantIds: string[]; // IDs of associated variants
}

/**
 * Represents a variant node (e.g., Control, A, B, C).
 */
export interface VariantNode {
  id: string; // Unique variant ID
  title: string;
  trafficPercent?: number;
  status?: ExperimentStatus;
  winner?: boolean;
  launched?: boolean;
  figmaNodeId?: string; // Optional Figma node ID for UI sync
  nextStepId?: string; // ID of the next step node (for edge modeling)
}

/**
 * Represents a directed edge from a variant to a step node.
 */
export interface Edge {
  id: string; // Unique edge ID
  fromVariantId: string;
  toStepId: string;
  figmaConnectorId?: string; // Optional Figma connector node ID for UI sync
}

/**
 * The overall experiment flow, containing all steps, variants, and edges.
 */
export interface ExperimentFlow {
  steps: StepNode[];
  variants: VariantNode[];
  edges: Edge[];
}

// Phase 1 complete.
