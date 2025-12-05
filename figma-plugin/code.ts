// Growth Labs Experiment Flow Visualizer — Main Plugin Entry
// Listens for UI messages, updates model, generates Figma nodes, and persists data.

import {
  createExperimentSkeleton,
  addVariantToStep,
  addStepAfterVariant,
  connectVariantToStep,
  markVariantAsWinner,
  launchWinnerForStep
} from './logic';
import { autoLayoutFlow } from './layout';
import {
  createStepFrame,
  createVariantFrame,
  createEdgeConnector
} from './figma-nodes';
import { ExperimentFlow } from './model';

// Persisted experiment model
let experimentFlow: ExperimentFlow | null = null;

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'CREATE_EXPERIMENT': {
      experimentFlow = createExperimentSkeleton(msg.name);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    case 'ADD_VARIANT': {
      if (!experimentFlow) return;
      experimentFlow = addVariantToStep(experimentFlow, msg.stepId, msg.variantTitle);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    case 'ADD_STEP': {
      if (!experimentFlow) return;
      experimentFlow = addStepAfterVariant(experimentFlow, msg.sourceVariantId, msg.stepTitle);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    case 'CONNECT_NODES': {
      if (!experimentFlow) return;
      experimentFlow = connectVariantToStep(experimentFlow, msg.sourceVariantId, msg.targetStepId);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    case 'MARK_WINNER': {
      if (!experimentFlow) return;
      experimentFlow = markVariantAsWinner(experimentFlow, msg.variantId);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    case 'LAUNCH_WINNER': {
      if (!experimentFlow) return;
      experimentFlow = launchWinnerForStep(experimentFlow, msg.stepId);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    case 'AUTO_LAYOUT': {
      if (!experimentFlow) return;
      const layout = autoLayoutFlow(experimentFlow);
      // Generate/update Figma nodes for each step and variant
      for (const step of experimentFlow.steps) {
        const stepFrame = createStepFrame(step);
        // Position step frame
        const pos = layout[step.id];
        if (pos) {
          stepFrame.x = pos.x;
          stepFrame.y = pos.y;
        }
        for (const variantId of step.variantIds) {
          const variant = experimentFlow.variants.find(v => v.id === variantId);
          if (variant) {
            const variantFrame = createVariantFrame(variant);
            const vpos = layout[variant.id];
            if (vpos) {
              variantFrame.x = vpos.x;
              variantFrame.y = vpos.y;
            }
            stepFrame.appendChild(variantFrame);
          }
        }
        figma.currentPage.appendChild(stepFrame);
      }
      // Generate/update connectors
      for (const edge of experimentFlow.edges) {
        const sourceVariant = experimentFlow.variants.find(v => v.id === edge.fromVariantId);
        const targetStep = experimentFlow.steps.find(s => s.id === edge.toStepId);
        if (sourceVariant && targetStep) {
          const sourceFrame = figma.getNodeById(sourceVariant.figmaNodeId!) as FrameNode;
          const targetFrame = figma.getNodeById(targetStep.figmaNodeId!) as FrameNode;
          const connector = createEdgeConnector(edge, sourceFrame, targetFrame);
          figma.currentPage.appendChild(connector);
        }
      }
      break;
    }
    case 'EXPORT_JSON': {
      if (!experimentFlow) return;
      figma.ui.postMessage({ type: 'EXPORT_JSON', data: JSON.stringify(experimentFlow, null, 2) });
      break;
    }
    case 'IMPORT_JSON': {
      if (!msg.data) return;
      experimentFlow = JSON.parse(msg.data);
      figma.root.setPluginData('experimentFlow', JSON.stringify(experimentFlow));
      break;
    }
    default:
      figma.notify('Unknown message type');
  }
};

// Phase 5 complete.
