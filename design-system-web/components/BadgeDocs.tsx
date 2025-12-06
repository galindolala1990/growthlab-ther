import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComponentAuditMetrics } from "@/components/design-system/ComponentAuditMetrics";
import { 
  PRIORITY_CONFIG, 
  EXPERIMENT_STATUS_CONFIG, 
  FEATURE_STAGE_CONFIG,
  getPriorityConfig,
  getExperimentStatusConfig,
  getFeatureStageConfig
} from "@/config/badge-config";

const BadgeDocs = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Badge</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Read-only labels for status, type, priority, and metadata. Not interactive.
        </p>
      </div>

      {/* Component Audit Report */}
      <ComponentAuditMetrics
        data={{
          totalInstances: 169,
          componentAdoption: 100,
          wcagCompliant: 100,
          issuesFound: 0,
          adoptionStatus: "active",
          keyFindings: [
            "✓ 169 Badge instances - widely adopted across entire application",
            "✓ 100% token compliance - all instances use semantic design tokens",
            "✓ 100% WCAG AA compliant - all variants meet accessibility standards",
            "✓ Used consistently for status, priority, and metadata display",
            "✓ Zero technical debt - production-ready component"
          ],
          currentUsage: [
            "✓ Experiments page - Status indicators (Running, Paused, Completed)",
            "✓ Features - Priority badges (Critical, High, Medium, Low)",
            "✓ Roadmap - Stage labels (Planning, Design, Development, Launch)",
            "✓ Metrics cards - Trend indicators and category labels",
            "✓ Documentation - Component status and variant displays"
          ],
          designSystemStatus: [
            "✓ Active production component - 169 instances across codebase",
            "✓ 100% design token compliance - complete migration successful",
            "✓ Zero technical debt - ready for new features and expansion"
          ]
        }}
        variant="success"
      />

      <Card className="p-6 bg-info-soft/30 border-info/30">
        <h3 className="font-semibold text-foreground mb-2">Use Badge for...</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✓ Status indicators (Live, Paused, Completed)</li>
          <li>✓ Priority levels (Critical, High, Low)</li>
          <li>✓ Type/category labels (Experiment, Feature Flag)</li>
          <li>✓ Read-only metadata that doesn't change via user interaction</li>
        </ul>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Variants & Status Types</h2>
        <Card className="p-6 space-y-6">
          {/* Base Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Base Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Status & Priority Labels</h3>
            
            {/* Grid of all status types */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Priority */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priority</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityConfig("critical").badgeClass}>P0</Badge>
                    <span className="text-xs text-muted-foreground">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityConfig("high").badgeClass}>P1</Badge>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityConfig("medium").badgeClass}>P2</Badge>
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityConfig("low").badgeClass}>P3</Badge>
                    <span className="text-xs text-muted-foreground">Low</span>
                  </div>
                </div>
              </div>

              {/* Feature Stages */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Feature Stages</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge className={getFeatureStageConfig("planning").className}>
                      {getFeatureStageConfig("planning").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Ideation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getFeatureStageConfig("design").className}>
                      {getFeatureStageConfig("design").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">UX/UI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getFeatureStageConfig("development").className}>
                      {getFeatureStageConfig("development").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Building</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getFeatureStageConfig("testing").className}>
                      {getFeatureStageConfig("testing").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">QA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getFeatureStageConfig("launch").className}>
                      {getFeatureStageConfig("launch").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
              </div>

              {/* Experiment Status */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experiment Status</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge className={getExperimentStatusConfig("draft").className}>
                      {getExperimentStatusConfig("draft").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Not started</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getExperimentStatusConfig("running").className}>
                      {getExperimentStatusConfig("running").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getExperimentStatusConfig("analyzing").className}>
                      {getExperimentStatusConfig("analyzing").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getExperimentStatusConfig("completed").className}>
                      {getExperimentStatusConfig("completed").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Done</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getExperimentStatusConfig("paused").className}>
                      {getExperimentStatusConfig("paused").label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Halted</span>
                  </div>
                </div>
              </div>

              {/* Type Labels */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type Labels</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Experiment</Badge>
                    <span className="text-xs text-muted-foreground">Test</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">A/B Test</Badge>
                    <span className="text-xs text-muted-foreground">Variant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Winner</Badge>
                    <span className="text-xs text-muted-foreground">Best</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral">Control</Badge>
                    <span className="text-xs text-muted-foreground">Baseline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Implementation</h3>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`import { getPriorityConfig, getFeatureStageConfig, getExperimentStatusConfig } from "@/config/badge-config";

// Priority
<Badge className={getPriorityConfig(priority).badgeClass}>
  {getPriorityConfig(priority).label}
</Badge>

// Feature Stage
<Badge className={getFeatureStageConfig(stage).className}>
  {getFeatureStageConfig(stage).label}
</Badge>

// Experiment Status
<Badge className={getExperimentStatusConfig(status).className}>
  {getExperimentStatusConfig(status).label}
</Badge>`}
            </pre>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Badge vs Chip</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 border-success/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">DO: Badge for status</h3>
            </div>
            <Card className="p-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email redesign</span>
                <Badge variant="success">Live</Badge>
              </div>
            </Card>
            <p className="text-xs text-muted-foreground">Status is read-only metadata</p>
          </Card>

          <Card className="p-6 space-y-3 border-error/50">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-foreground">DON'T: Badge for filters</h3>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">Planning</Badge>
              <Badge variant="neutral">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Can't be clicked/toggled — use Chip instead</p>
          </Card>
        </div>
      </section>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-2">Related</h3>
        <div className="flex gap-4 text-sm">
          <a href="/design-system/components/chip" className="text-primary hover:underline">Chip Component →</a>
          <a href="/design-system/foundations/semantic" className="text-primary hover:underline">Semantic Colors →</a>
        </div>
      </Card>
    </div>
  );
};

export default BadgeDocs;
