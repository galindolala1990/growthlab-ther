import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FlowNode } from "@/components/FlowNode";
import { FlowConnector } from "@/components/FlowConnector";
import { format } from "date-fns";
import { 
  ExperimentTimelineData, 
  ExperimentPhase,
  FlowNode as FlowNodeType,
  FlowConnection 
} from "@/types/experiment-timeline";
import { Clock, TrendingUp, Target } from "lucide-react";

interface ExperimentTimelineFlowProps {
  data: ExperimentTimelineData;
  className?: string;
  showPhaseBar?: boolean;
  showMetrics?: boolean;
  height?: number;
}

const PHASE_COLORS: Record<ExperimentPhase, string> = {
  setup: 'bg-neutral-200 text-neutral-700',
  baseline: 'bg-blue-100 text-blue-700',
  running: 'bg-primary/20 text-primary',
  analyzing: 'bg-warning/20 text-warning',
  concluded: 'bg-success/20 text-success',
};

export function ExperimentTimelineFlow({
  data,
  className,
  showPhaseBar = true,
  showMetrics = true,
  height = 400,
}: ExperimentTimelineFlowProps) {
  const { phases, nodes, connections, currentPhase } = data;

  // Calculate phase widths based on duration
  const totalDuration = data.endDate.getTime() - data.startDate.getTime();
  const phaseWidths = phases.map(phase => {
    const phaseDuration = phase.endDate.getTime() - phase.startDate.getTime();
    return (phaseDuration / totalDuration) * 100;
  });

  // Calculate current time marker position if in progress
  const now = new Date();
  const isInProgress = now >= data.startDate && now <= data.endDate;
  const currentTimePosition = isInProgress
    ? ((now.getTime() - data.startDate.getTime()) / totalDuration) * 100
    : null;

  // Render flow nodes
  const renderNodes = () => {
    return nodes.map(node => {
      const winner = data.variants.find(v => v.id === node.variant?.id);
      
      return (
        <div
          key={node.id}
          className="absolute"
          style={{
            left: `${node.position.x}%`,
            top: `${node.position.y * 60 + 20}px`,
          }}
        >
          <FlowNode
            id={node.id}
            label={node.label}
            size="sm"
            variant={
              node.type === 'outcome' ? 'launch' :
              winner?.isWinner ? 'winner' :
              winner?.type === 'control' ? 'control' :
              'treatment'
            }
            variantLetter={winner?.name.split(' ')[1] || undefined}
            trafficSplit={winner?.trafficSplit ? `${winner.trafficSplit}%` : undefined}
            isWinner={winner?.isWinner}
            isControl={winner?.type === 'control'}
            isLaunch={node.type === 'outcome'}
            metric={node.metrics?.[0]?.value.toString()}
          />
        </div>
      );
    });
  };

  // Render flow connectors following /design-system/patterns/flow-connectors
  const renderConnectors = () => {
    return connections.map(conn => {
        const fromNode = nodes.find(n => n.id === conn.fromNodeId);
        const toNode = nodes.find(n => n.id === conn.toNodeId);
        
        if (!fromNode || !toNode) return null;

        // Calculate absolute positions (assuming container width)
        const containerWidth = 800; // Base width for calculation
        const fromX = (fromNode.position.x / 100) * containerWidth + 100; // +100 for node width
        const fromY = fromNode.position.y * 60 + 40; // Center of node
        const toX = (toNode.position.x / 100) * containerWidth;
        const toY = toNode.position.y * 60 + 40;

        // Control point offset: distance × 0.5 (design system spec)
        const controlOffset = Math.abs(toX - fromX) * 0.5;

        return (
          <FlowConnector
            key={conn.id}
            from={{ x: fromX, y: fromY }}
            to={{ x: toX, y: toY }}
            colorToken={conn.colorToken || 'default'}
            showStartDot={true}
            showEndDot={false}
          />
        );
      });
  };

  return (
    <Card className={cn("p-6 space-y-6", className)}>
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {data.name}
            </h3>
            {data.description && (
              <p className="text-sm text-text-muted">{data.description}</p>
            )}
          </div>
          
          {currentPhase && (
            <Badge className={cn("capitalize", PHASE_COLORS[currentPhase])}>
              {currentPhase}
            </Badge>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {format(data.startDate, 'MMM d')} → {format(data.endDate, 'MMM d, yyyy')}
          </div>
          {data.hypothesis && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              {data.hypothesis}
            </div>
          )}
        </div>
      </div>

      {/* Phase Timeline Bar */}
      {showPhaseBar && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-muted uppercase">Timeline Phases</p>
          <div className="flex h-12 rounded-lg overflow-hidden border border-border shadow-sm relative">
            {phases.map((phase, idx) => (
              <div
                key={phase.phase}
                className={cn(
                  "flex flex-col justify-center px-3 border-r border-border last:border-r-0",
                  "transition-colors",
                  PHASE_COLORS[phase.phase],
                  currentPhase === phase.phase && "ring-2 ring-primary ring-inset"
                )}
                style={{ width: `${phaseWidths[idx]}%` }}
              >
                <div className="text-xs font-semibold truncate">{phase.label}</div>
                <div className="text-2xs opacity-75">
                  {format(phase.startDate, 'MMM d')} - {format(phase.endDate, 'd')}
                </div>
              </div>
            ))}
            
            {/* Current time marker */}
            {currentTimePosition !== null && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 pointer-events-none"
                style={{ left: `${currentTimePosition}%` }}
              >
                <div className="absolute -top-6 -left-8 px-2 py-0.5 bg-primary text-text-on-primary text-2xs font-semibold rounded whitespace-nowrap">
                  Today
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flow Visualization */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-text-muted uppercase">Flow & Logic</p>
        <div 
          className="relative bg-gradient-to-b from-muted/20 to-transparent rounded-lg border border-border p-4"
          style={{ 
            minHeight: height,
            backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.04) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* SVG for connectors */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
            style={{ zIndex: 1 }}
          >
            {renderConnectors()}
          </svg>

          {/* Flow nodes */}
          <div className="relative" style={{ zIndex: 2 }}>
            {renderNodes()}
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      {showMetrics && data.variants.some(v => v.metrics) && (
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-text-muted uppercase">Results</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.variants.filter(v => v.metrics).map(variant => (
              <div key={variant.id} className="space-y-1">
                <div className="text-2xs text-text-muted">{variant.label}</div>
                <div className="text-sm font-semibold text-foreground">
                  {variant.metrics?.value} {variant.metrics?.primaryMetric}
                </div>
                {variant.metrics?.delta && (
                  <div className={cn(
                    "text-xs font-medium",
                    variant.metrics.delta > 0 ? "text-success" : "text-error"
                  )}>
                    {variant.metrics.delta > 0 ? '+' : ''}{variant.metrics.delta}% vs Control
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
