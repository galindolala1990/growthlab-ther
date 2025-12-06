/**
 * Experiment Flow Pattern Templates
 * 
 * Reusable instances for A/B tests, multi-variant experiments, and decision trees.
 * Based on design system patterns from /design-system/patterns/flow-connectors
 */

import React from "react";
import { Badge } from "@/components/ui/badge";
import { FlowNode } from "@/components/FlowNode";
import { Rocket } from "lucide-react";

export interface ExperimentNode {
  id: string;
  label: string;
  variantLetter?: string;
  isControl?: boolean;
  isVariant?: boolean;
  isWinner?: boolean;
  isLaunch?: boolean;
  trafficSplit?: string;
  metric?: string;
  position: { x: number; y: number };
}

export interface ExperimentConnection {
  from: string;
  to: string;
  colorToken: "variantA" | "variant" | "variantC" | "winner";
  isDashed?: boolean;
  isWinnerPath?: boolean;
}

export interface ExperimentFlowTemplate {
  type: "ab-test" | "multi-variant" | "decision-tree";
  nodes: ExperimentNode[];
  connections: ExperimentConnection[];
  canvasHeight: number;
}

/**
 * Pattern 1: Simple A/B Test
 * Control (50%) vs Treatment (50%) → Winner → Launch
 */
export const createABTestTemplate = (
  controlLabel: string = "Blue Button",
  treatmentLabel: string = "Green Button",
  winnerMetric: string = "+31% CTR"
): ExperimentFlowTemplate => ({
  type: "ab-test",
  canvasHeight: 180,
  nodes: [
    {
      id: "control",
      label: controlLabel,
      variantLetter: "A",
      isControl: true,
      trafficSplit: "50%",
      position: { x: 6, y: 40 }
    },
    {
      id: "variant-b",
      label: treatmentLabel,
      variantLetter: "B",
      isVariant: true,
      isWinner: true,
      trafficSplit: "50%",
      position: { x: 50, y: 120 }
    },
    {
      id: "launch",
      label: "Launched",
      isLaunch: true,
      metric: winnerMetric,
      position: { x: 75, y: 120 }
    }
  ],
  connections: [
    {
      from: "control",
      to: "variant-b",
      colorToken: "variantB",
      isDashed: true
    },
    {
      from: "variant-b",
      to: "launch",
      colorToken: "winner",
      isWinnerPath: true
    }
  ]
});

/**
 * Pattern 2: Multi-Variant Test (3 variants)
 * Control → Variant B + Variant C → Winner C → Launch
 */
export const createMultiVariantTemplate = (
  controlLabel: string = "Monthly Only",
  variantBLabel: string = "15% Discount",
  variantCLabel: string = "25% Discount",
  winnerMetric: string = "+42% Conversion"
): ExperimentFlowTemplate => ({
  type: "multi-variant",
  canvasHeight: 240,
  nodes: [
    {
      id: "control",
      label: controlLabel,
      variantLetter: "A",
      isControl: true,
      trafficSplit: "34%",
      position: { x: 6, y: 50 }
    },
    {
      id: "variant-b",
      label: variantBLabel,
      variantLetter: "B",
      isVariant: true,
      trafficSplit: "33%",
      position: { x: 50, y: 25 }
    },
    {
      id: "variant-c",
      label: variantCLabel,
      variantLetter: "C",
      isVariant: true,
      isWinner: true,
      trafficSplit: "33%",
      position: { x: 50, y: 83 }
    },
    {
      id: "launch",
      label: "Launched",
      isLaunch: true,
      metric: winnerMetric,
      position: { x: 75, y: 83 }
    }
  ],
  connections: [
    {
      from: "control",
      to: "variant-b",
      colorToken: "variantA",
      isDashed: true
    },
    {
      from: "control",
      to: "variant-c",
      colorToken: "variantC",
      isDashed: true
    },
    {
      from: "variant-c",
      to: "launch",
      colorToken: "winner",
      isWinnerPath: true
    }
  ]
});

/**
 * Pattern 3: Decision Tree
 * Signup → Decision Node → 3 Persona Paths → Outcomes
 */
export const createDecisionTreeTemplate = (
  entryLabel: string = "Signup",
  decisionLabel: string = "User Type?",
  path1Label: string = "Generic",
  path2Label: string = "Developer",
  path3Label: string = "Business"
): ExperimentFlowTemplate => ({
  type: "decision-tree",
  canvasHeight: 220,
  nodes: [
    {
      id: "entry",
      label: entryLabel,
      position: { x: 6, y: 50 }
    },
    {
      id: "decision",
      label: decisionLabel,
      position: { x: 33, y: 50 }
    },
    {
      id: "path-1",
      label: path1Label,
      variantLetter: "A",
      position: { x: 66, y: 8 }
    },
    {
      id: "path-2",
      label: path2Label,
      variantLetter: "B",
      isWinner: true,
      position: { x: 66, y: 50 }
    },
    {
      id: "path-3",
      label: path3Label,
      variantLetter: "C",
      position: { x: 66, y: 92 }
    }
  ],
  connections: [
    {
      from: "entry",
      to: "decision",
      colorToken: "variantA",
      isDashed: false
    },
    {
      from: "decision",
      to: "path-1",
      colorToken: "variantA",
      isDashed: true
    },
    {
      from: "decision",
      to: "path-2",
      colorToken: "variantB",
      isDashed: true
    },
    {
      from: "decision",
      to: "path-3",
      colorToken: "variantC",
      isDashed: true
    }
  ]
});

/**
 * Color mapping per design system
 */
const CONNECTOR_COLORS = {
  variantA: "hsl(257 100% 70% / 0.7)",  // Purple
  variant: "hsl(220 90% 65% / 0.7)",   // Blue
  variantC: "hsl(180 80% 60% / 0.7)",   // Cyan
  winner: "hsl(142 76% 45% / 0.8)"      // Green
};

interface ExperimentFlowCanvasProps {
  template: ExperimentFlowTemplate;
  className?: string;
  onNodeClick?: (nodeId: string) => void;
}

/**
 * Renders experiment flow canvas from template
 * Follows /design-system/patterns/flow-connectors best practices
 */
export const ExperimentFlowCanvas: React.FC<ExperimentFlowCanvasProps> = ({
  template,
  className = "",
  onNodeClick
}) => {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = React.useState(0);

  React.useEffect(() => {
    if (canvasRef.current) {
      setCanvasWidth(canvasRef.current.offsetWidth);
    }
  }, []);

  // Convert percentage positions to absolute pixels
  const getAbsolutePosition = (node: ExperimentNode) => ({
    x: (node.position.x / 100) * canvasWidth,
    y: node.position.y
  });

  return (
    <div 
      ref={canvasRef}
      className={`relative bg-background rounded-lg border border-border ${className}`}
      style={{ 
        height: `${template.canvasHeight}px`,
        backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        backgroundPosition: '0 0'
      }}
    >
      {/* SVG Connectors */}
      {canvasWidth > 0 && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            {/* Arrow marker for winner paths */}
            <marker 
              id="arrowhead-winner"
              markerWidth="10" 
              markerHeight="10" 
              refX="9" 
              refY="3" 
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill={CONNECTOR_COLORS.winner} />
            </marker>
          </defs>
          
          {template.connections.map((conn, idx) => {
            const fromNode = template.nodes.find(n => n.id === conn.from);
            const toNode = template.nodes.find(n => n.id === conn.to);
            
            if (!fromNode || !toNode) return null;
            
            const from = getAbsolutePosition(fromNode);
            const to = getAbsolutePosition(toNode);
            
            // Bezier control points (Distance × 0.5 per design system)
            const distance = Math.abs(to.x - from.x);
            const controlOffset = distance * 0.5;
            
            const pathD = `M ${from.x + 100},${from.y + 16} C ${from.x + 100 + controlOffset},${from.y + 16} ${to.x - 8 - controlOffset},${to.y + 16} ${to.x - 8},${to.y + 16}`;
            
            return (
              <path
                key={`${conn.from}-${conn.to}-${idx}`}
                d={pathD}
                stroke={CONNECTOR_COLORS[conn.colorToken]}
                strokeWidth={conn.isWinnerPath ? "2" : "2"}
                strokeDasharray={conn.isDashed ? "4 2" : undefined}
                fill="none"
                markerEnd={conn.isWinnerPath ? "url(#arrowhead-winner)" : undefined}
              />
            );
          })}
        </svg>
      )}

      {/* Flow Nodes */}
      {canvasWidth > 0 && template.nodes.map(node => {
        const pos = getAbsolutePosition(node);
        
        return (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              zIndex: node.isWinner ? 10 : 2
            }}
          >
            <div className={node.isWinner ? "shadow-md rounded-full" : node.isLaunch ? "shadow-lg rounded-full" : ""}>
              <FlowNode
                id={node.id}
                label={node.label}
                variantLetter={node.variantLetter}
                isControl={node.isControl}
                isVariant={node.isVariant}
                isWinner={node.isWinner}
                isLaunch={node.isLaunch}
                trafficSplit={node.trafficSplit}
                metric={node.metric}
                size="sm"
                onClick={() => onNodeClick?.(node.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Pre-built experiment components for common use cases
 */

export const ABTestFlow: React.FC<{
  controlLabel?: string;
  treatmentLabel?: string;
  winnerMetric?: string;
  onNodeClick?: (nodeId: string) => void;
}> = ({ controlLabel, treatmentLabel, winnerMetric, onNodeClick }) => {
  const template = createABTestTemplate(controlLabel, treatmentLabel, winnerMetric);
  return <ExperimentFlowCanvas template={template} onNodeClick={onNodeClick} />;
};

export const MultiVariantFlow: React.FC<{
  controlLabel?: string;
  variantBLabel?: string;
  variantCLabel?: string;
  winnerMetric?: string;
  onNodeClick?: (nodeId: string) => void;
}> = ({ controlLabel, variantBLabel, variantCLabel, winnerMetric, onNodeClick }) => {
  const template = createMultiVariantTemplate(controlLabel, variantBLabel, variantCLabel, winnerMetric);
  return <ExperimentFlowCanvas template={template} onNodeClick={onNodeClick} />;
};

export const DecisionTreeFlow: React.FC<{
  entryLabel?: string;
  decisionLabel?: string;
  path1Label?: string;
  path2Label?: string;
  path3Label?: string;
  onNodeClick?: (nodeId: string) => void;
}> = ({ entryLabel, decisionLabel, path1Label, path2Label, path3Label, onNodeClick }) => {
  const template = createDecisionTreeTemplate(entryLabel, decisionLabel, path1Label, path2Label, path3Label);
  return <ExperimentFlowCanvas template={template} onNodeClick={onNodeClick} />;
};
