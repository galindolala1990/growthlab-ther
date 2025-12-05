// Growth Labs Experiment Flow Visualizer Core Logic
// Pure TypeScript functions for manipulating the experiment flow model.

import {
  ExperimentFlow,
  StepNode,
  VariantNode,
  Edge,
  ExperimentStatus
} from './model';

/**
 * Create a new experiment skeleton with a single step and a control variant.
 */
export function createExperimentSkeleton(name: string): ExperimentFlow {
  const controlVariant: VariantNode = {
    id: 'variant-control',
    title: 'Control',
    trafficPercent: 100,
    status: 'Running',
    figmaNodeId: undefined,
  };

  const step: StepNode = {
    id: 'step-1',
    title: name,
    description: '',
    kpi: '',
    status: 'Running',
    figmaNodeId: undefined,
    variantIds: [controlVariant.id],
  };

  return {
    steps: [step],
    variants: [controlVariant],
    edges: [],
  };
}

/**
 * Add a new variant to a step node.
 */
export function addVariantToStep(flow: ExperimentFlow, stepId: string, variantTitle: string): ExperimentFlow {
  const step = flow.steps.find(s => s.id === stepId);
  if (!step) throw new Error('Step not found');

  const newVariantId = `variant-${Date.now()}`;
  const newVariant: VariantNode = {
    id: newVariantId,
    title: variantTitle,
    trafficPercent: 0,
    status: 'Backlog',
    figmaNodeId: undefined,
  };

  return {
    ...flow,
    steps: flow.steps.map(s =>
      s.id === stepId ? { ...s, variantIds: [...s.variantIds, newVariantId] } : s
    ),
    variants: [...flow.variants, newVariant],
  };
}

/**
 * Add a new step after a variant node (creates edge from variant to new step).
 */
export function addStepAfterVariant(flow: ExperimentFlow, sourceVariantId: string, stepTitle: string): ExperimentFlow {
  const newStepId = `step-${Date.now()}`;
  const newStep: StepNode = {
    id: newStepId,
    title: stepTitle,
    description: '',
    kpi: '',
    status: 'Backlog',
    figmaNodeId: undefined,
    variantIds: [],
  };

  const newEdge: Edge = {
    id: `edge-${Date.now()}`,
    fromVariantId: sourceVariantId,
    toStepId: newStepId,
    figmaConnectorId: undefined,
  };

  return {
    ...flow,
    steps: [...flow.steps, newStep],
    edges: [...flow.edges, newEdge],
  };
}

/**
 * Connect an existing variant to an existing step (creates edge).
 */
export function connectVariantToStep(flow: ExperimentFlow, sourceVariantId: string, targetStepId: string): ExperimentFlow {
  // Prevent duplicate edges
  if (flow.edges.some(e => e.fromVariantId === sourceVariantId && e.toStepId === targetStepId)) {
    return flow;
  }
  const newEdge: Edge = {
    id: `edge-${Date.now()}`,
    fromVariantId: sourceVariantId,
    toStepId: targetStepId,
    figmaConnectorId: undefined,
  };
  return {
    ...flow,
    edges: [...flow.edges, newEdge],
  };
}

/**
 * Mark a variant as the winner.
 */
export function markVariantAsWinner(flow: ExperimentFlow, variantId: string): ExperimentFlow {
  return {
    ...flow,
    variants: flow.variants.map(v =>
      v.id === variantId ? { ...v, winner: true, status: 'Winner' } : { ...v, winner: false }
    ),
  };
}

/**
 * Launch the winner for a given step. Ensures only the winner is launched.
 */
export function launchWinnerForStep(flow: ExperimentFlow, stepId: string): ExperimentFlow {
  const step = flow.steps.find(s => s.id === stepId);
  if (!step) throw new Error('Step not found');
  const winnerId = flow.variants.find(v => v.winner && step.variantIds.includes(v.id))?.id;
  if (!winnerId) throw new Error('No winner variant for this step');

  return {
    ...flow,
    variants: flow.variants.map(v =>
      v.id === winnerId ? { ...v, launched: true, status: 'Launched' } : v
    ),
  };
}

// Phase 2 complete.
