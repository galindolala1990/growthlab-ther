// Growth Labs Experiment Flow Visualizer — Figma Node Creation
// Functions to generate and update Figma nodes for steps, variants, and connectors.

import { StepNode, VariantNode, Edge } from './model';

/**
 * Create or update a Figma frame for a step node.
 * Applies basic styling and text.
 */
export function createStepFrame(step: StepNode): FrameNode {
  let frame: FrameNode | undefined = undefined;
  if (step.figmaNodeId) {
    frame = figma.getNodeById(step.figmaNodeId) as FrameNode;
  }
  if (!frame) {
    frame = figma.createFrame();
    frame.resize(180, 80);
    frame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.98, b: 1 } }];
    frame.cornerRadius = 12;
    frame.strokes = [{ type: 'SOLID', color: { r: 0.2, g: 0.4, b: 0.7 } }];
    frame.strokeWeight = 2;
    frame.name = step.title;
  }
  // Add/update step title text
  let titleText = frame.children.find(n => n.type === 'TEXT' && n.name === 'StepTitle') as TextNode;
  if (!titleText) {
    titleText = figma.createText();
    titleText.name = 'StepTitle';
    frame.appendChild(titleText);
  }
  titleText.characters = step.title;
  titleText.fontSize = 18;
  titleText.fontName = { family: 'Inter', style: 'Bold' };
  titleText.x = 16;
  titleText.y = 16;
  // Optionally add KPI, status, etc.
  return frame;
}

/**
 * Create or update a Figma frame for a variant node.
 * Applies basic styling and text.
 */
export function createVariantFrame(variant: VariantNode): FrameNode {
  let frame: FrameNode | undefined = undefined;
  if (variant.figmaNodeId) {
    frame = figma.getNodeById(variant.figmaNodeId) as FrameNode;
  }
  if (!frame) {
    frame = figma.createFrame();
    frame.resize(160, 60);
    frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.99 } }];
    frame.cornerRadius = 8;
    frame.strokes = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.7 } }];
    frame.strokeWeight = 1;
    frame.name = variant.title;
  }
  // Add/update variant title text
  let titleText = frame.children.find(n => n.type === 'TEXT' && n.name === 'VariantTitle') as TextNode;
  if (!titleText) {
    titleText = figma.createText();
    titleText.name = 'VariantTitle';
    frame.appendChild(titleText);
  }
  titleText.characters = variant.title;
  titleText.fontSize = 16;
  titleText.fontName = { family: 'Inter', style: 'Bold' };
  titleText.x = 12;
  titleText.y = 12;
  // Optionally add traffic %, status, etc.
  return frame;
}

/**
 * Create or update a connector line (edge) between a variant and a step node.
 * Applies basic styling.
 */
export function createEdgeConnector(edge: Edge, sourceVariantNode: FrameNode, targetStepNode: FrameNode): VectorNode {
  let connector: VectorNode | undefined = undefined;
  if (edge.figmaConnectorId) {
    connector = figma.getNodeById(edge.figmaConnectorId) as VectorNode;
  }
  if (!connector) {
    connector = figma.createVector();
    connector.name = 'Connector';
  }
  // Calculate start/end points based on node positions
  const startX = sourceVariantNode.x + sourceVariantNode.width;
  const startY = sourceVariantNode.y + sourceVariantNode.height / 2;
  const endX = targetStepNode.x;
  const endY = targetStepNode.y + targetStepNode.height / 2;
  // Draw a straight line (polyline)
  connector.vectorPaths = [{
    data: `M ${startX} ${startY} L ${endX} ${endY}`,
    windingRule: 'NONE',
  }];
  connector.strokeWeight = 3;
  connector.strokes = [{ type: 'SOLID', color: { r: 0.2, g: 0.4, b: 0.7 } }];
  return connector;
}

// Phase 4 complete.
