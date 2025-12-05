// Growth Labs Experiment Flow Visualizer Autolayout Logic
// Calculates coordinates for steps and variants for visual layout (no Figma API yet).

import { ExperimentFlow, StepNode, VariantNode } from './model';

/**
 * Layout coordinates for a node or variant.
 */
export interface LayoutPosition {
  x: number;
  y: number;
}

/**
 * Layout map for all steps and variants in the flow.
 * Keys are node/variant IDs, values are positions.
 */
export type LayoutMap = Record<string, LayoutPosition>;

/**
 * Automatically calculates layout positions for steps and variants in the experiment flow.
 * Steps are sorted by orderIndex (left to right), variants stacked vertically (control on top).
 * Returns a layout map for Figma node placement.
 */
export function autoLayoutFlow(flow: ExperimentFlow): LayoutMap {
  // Constants for spacing
  const STEP_GAP_X = 300; // Horizontal gap between steps
  const VARIANT_GAP_Y = 120; // Vertical gap between variants
  const START_X = 40;
  const START_Y = 80;

  // Sort steps by orderIndex (assume orderIndex is encoded in step.id or add property if needed)
  // For now, sort by step array order
  const sortedSteps = flow.steps;

  const layout: LayoutMap = {};

  sortedSteps.forEach((step, stepIdx) => {
    // Position step node
    const stepX = START_X + stepIdx * STEP_GAP_X;
    const stepY = START_Y;
    layout[step.id] = { x: stepX, y: stepY };

    // Stack variants vertically under step
    let variantY = stepY;
    // Control variant first (if exists)
    const controlId = step.variantIds.find(id => {
      const v = flow.variants.find(vv => vv.id === id);
      return v && v.title.toLowerCase() === 'control';
    });
    if (controlId) {
      layout[controlId] = { x: stepX + 0, y: variantY };
      variantY += VARIANT_GAP_Y;
    }
    // Other variants
    step.variantIds.forEach(variantId => {
      if (variantId === controlId) return;
      layout[variantId] = { x: stepX + 0, y: variantY };
      variantY += VARIANT_GAP_Y;
    });
  });

  return layout;
}

// Phase 3 complete.
