import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TimelineLegendProps {
  className?: string;
}

export function TimelineLegend({ className }: TimelineLegendProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className={cn("gap-1.5 bg-bg-surface/95 backdrop-blur-sm", className)}
        title="Show timeline legend"
      >
        <Info className="w-3.5 h-3.5" />
        Legend
      </Button>
    );
  }

  return (
    <Card className={cn("p-3 bg-bg-surface/95 backdrop-blur-sm border-border shadow-sm", className)}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-text uppercase tracking-wide">Legend</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="h-5 w-5 p-0"
            title="Close legend"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-2 text-2xs">
          {/* Stage colors */}
          <div className="space-y-1">
            <div className="text-text-muted font-medium">Stages</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-stage-planning shrink-0" />
                <span className="text-text-subtle">Planning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-stage-design shrink-0" />
                <span className="text-text-subtle">Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-stage-development shrink-0" />
                <span className="text-text-subtle">Development</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-stage-testing shrink-0" />
                <span className="text-text-subtle">Testing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-stage-launch shrink-0" />
                <span className="text-text-subtle">Launch</span>
              </div>
            </div>
          </div>

          {/* Experiment variants */}
          <div className="space-y-1 pt-1 border-t border-border">
            <div className="text-text-muted font-medium">A/B Tests</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-5 h-4 rounded bg-stage-testing text-white text-2xs font-bold border-2 border-white/70">
                  A
                </div>
                <span className="text-text-subtle">Control (solid border)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-5 h-4 rounded bg-stage-testing text-white text-2xs font-bold border border-dashed border-white/60">
                  B
                </div>
                <span className="text-text-subtle">Variant (dashed border)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-5 h-4 rounded bg-white text-primary text-2xs font-bold shadow-sm">
                  A
                </div>
                <Rocket className="w-3 h-3 text-text-muted" />
                <span className="text-text-subtle">Winner (shipped)</span>
              </div>
            </div>
          </div>

          {/* Priority borders */}
          <div className="space-y-1 pt-1 border-t border-border">
            <div className="text-text-muted font-medium">Priority</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-neutral-200 border-2 border-red-500 shrink-0" />
                <span className="text-text-subtle">P0 Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-neutral-200 border-2 border-amber-500 shrink-0" />
                <span className="text-text-subtle">P1 High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-neutral-200 border-2 border-blue-500 shrink-0" />
                <span className="text-text-subtle">P2 Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-neutral-200 border-2 border-neutral-400 shrink-0" />
                <span className="text-text-subtle">P3 Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
