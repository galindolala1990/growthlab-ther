// Growth Labs Experiment Flow Visualizer — Serialization
// Functions to export and import experiment flows as JSON

import { ExperimentFlow } from './model';
import { createStepFrame, createVariantFrame, createEdgeConnector } from './figma-nodes';

/**
 * Export the entire experiment flow to a JSON string.
 */
export function exportFlowToJson(flow: ExperimentFlow): string {
  return JSON.stringify(flow, null, 2);
}

/**
 * Import an experiment flow from a JSON string.
 * Rebuilds the flow and regenerates Figma nodes.
 */
export function importFlowFromJson(json: string): ExperimentFlow {
  const flow: ExperimentFlow = JSON.parse(json);

  // Regenerate Figma nodes for each step and variant
  for (const step of flow.steps) {
    const stepFrame = createStepFrame(step);
    for (const variantId of step.variantIds) {
      const variant = flow.variants.find(v => v.id === variantId);
      if (variant) {
        const variantFrame = createVariantFrame(variant);
        stepFrame.appendChild(variantFrame);
      }
    }
    figma.currentPage.appendChild(stepFrame);
  }
  // Regenerate connectors
  for (const edge of flow.edges) {
    const sourceVariant = flow.variants.find(v => v.id === edge.fromVariantId);
    const targetStep = flow.steps.find(s => s.id === edge.toStepId);
    if (sourceVariant && targetStep) {
      const sourceFrame = figma.getNodeById(sourceVariant.figmaNodeId!) as FrameNode;
      const targetFrame = figma.getNodeById(targetStep.figmaNodeId!) as FrameNode;
      const connector = createEdgeConnector(edge, sourceFrame, targetFrame);
      figma.currentPage.appendChild(connector);
    }
  }

  return flow;
}

// Phase 7 complete.
