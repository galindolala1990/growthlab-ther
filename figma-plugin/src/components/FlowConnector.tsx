import { cn } from "@/lib/utils";
import { useState } from "react";

interface FlowConnectorProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  colorToken?: "control" | "variantA" | "variant" | "winner" | "default";
  offsetIndex?: number;
  showStartDot?: boolean;
  showEndDot?: boolean;
}

const colorMap = {
  control: {
    stroke: "hsl(var(--muted-foreground))",
    fill: "hsl(var(--muted))",
    shadow: "hsl(var(--muted-foreground) / 0.2)",
  },
  variantA: {
    stroke: "hsl(257 100% 70%)", // Purple tint
    fill: "hsl(257 100% 65%)",
    shadow: "hsl(257 100% 65% / 0.3)",
  },
  variant: {
    stroke: "hsl(220 90% 65%)", // Blue tint
    fill: "hsl(220 90% 60%)",
    shadow: "hsl(220 90% 60% / 0.3)",
  },
  winner: {
    stroke: "hsl(142 76% 45%)", // Success green
    fill: "hsl(142 76% 40%)",
    shadow: "hsl(142 76% 40% / 0.4)",
  },
  default: {
    stroke: "hsl(var(--primary))",
    fill: "hsl(var(--primary))",
    shadow: "hsl(var(--primary) / 0.3)",
  },
};

export function FlowConnector({
  from,
  to,
  colorToken = "default",
  offsetIndex = 0,
  showStartDot = true,
  showEndDot = false,
}: FlowConnectorProps) {
  const colors = colorMap[colorToken];
  
  // Apply vertical offset for fanning out multiple connections
  const verticalOffset = offsetIndex * 8;
  const adjustedFrom = { x: from.x, y: from.y + verticalOffset };
  const adjustedTo = { x: to.x, y: to.y + verticalOffset };
  
  // Calculate Bezier control points for smooth curves
  // Use horizontal distance to determine curve strength
  const dx = adjustedTo.x - adjustedFrom.x;
  const dy = adjustedTo.y - adjustedFrom.y;
  
  // Control point offset - stronger curves for longer distances
  const controlPointOffset = Math.min(dx * 0.5, 80);
  
  // Create gentle S-curve with offset control points for fan-out effect
  const cp1x = adjustedFrom.x + controlPointOffset;
  const cp1y = adjustedFrom.y + (offsetIndex * 4); // Slight vertical arc
  const cp2x = adjustedTo.x - controlPointOffset;
  const cp2y = adjustedTo.y - (offsetIndex * 4); // Mirror arc
  
  // Build the SVG path
  const pathData = `M ${adjustedFrom.x} ${adjustedFrom.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${adjustedTo.x} ${adjustedTo.y}`;
  
  return (
    <g className="flow-connector">
      {/* Drop shadow filter */}
      <defs>
        <filter id={`connector-shadow-${colorToken}-${offsetIndex}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Connection path (visible) */}
      <path
        d={pathData}
        fill="none"
        stroke={colors.stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      />
      
      {/* Start anchor dot (port) - Fixed size */}
      {showStartDot && (
        <circle
          cx={adjustedFrom.x}
          cy={adjustedFrom.y}
          r="4"
          fill={colors.fill}
          stroke="white"
          strokeWidth="1.5"
          style={{
            filter: `drop-shadow(0 1px 2px ${colors.shadow})`,
            pointerEvents: 'none',
          }}
        />
      )}
      
      {/* End anchor dot (optional) - Fixed size */}
      {showEndDot && (
        <circle
          cx={adjustedTo.x}
          cy={adjustedTo.y}
          r="4"
          fill={colors.fill}
          stroke="white"
          strokeWidth="1.5"
          style={{
            filter: `drop-shadow(0 1px 2px ${colors.shadow})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </g>
  );
}
