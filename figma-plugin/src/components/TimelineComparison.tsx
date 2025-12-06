import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useFeatures } from "@/hooks/useFeatures";
import { HorizontalTimeline } from "@/components/HorizontalTimeline";
import { NodeTimeline } from "@/components/NodeTimeline";
import { Feature } from "@/hooks/useFeatures";
import { Info } from "lucide-react";

/**
 * TimelineComparison
 * 
 * Side-by-side comparison of Timeline Bars vs Flow Nodes visualization approaches
 */

export function TimelineComparison() {
  const { features } = useFeatures();
  const [visualStyle, setVisualStyle] = useState<"bars" | "nodes">("bars");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  // Filter to show only experiments for clearer comparison
  const experimentFeatures = features.filter(f => f.is_experiment);
  const displayFeatures = experimentFeatures.length > 0 ? experimentFeatures.slice(0, 3) : features.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Timeline Bars vs Flow Nodes</h1>
          <p className="text-lg text-text-muted">
            Compare two approaches: Timeline Bars (duration-focused) vs Flow Nodes (step-focused)
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-4">
          <SegmentedControl
            options={[
              { id: "bars", label: "Timeline Bars" },
              { id: "nodes", label: "Flow Nodes" },
            ]}
            value={visualStyle}
            onChange={(value) => setVisualStyle(value as "bars" | "nodes")}
            size="md"
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-foreground">Timeline Bars</h3>
              <p className="text-xs text-text-muted">
                Shows temporal duration with pill-shaped bars. Best for seeing "when" and "how long" experiments run.
                Bars stretch across time periods showing start/end dates.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-success/5 border-success/20">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-foreground">Flow Nodes</h3>
              <p className="text-xs text-text-muted">
                Shows logical steps with pill-shaped action nodes. Best for seeing "what connects to what" in a workflow.
                Nodes are positioned at key moments, emphasizing relationships over duration.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Visualization */}
      {visualStyle === "bars" ? (
        <HorizontalTimeline
          features={displayFeatures}
          onFeatureClick={setSelectedFeature}
          zoom="months"
          isCompact={false}
        />
      ) : (
        <NodeTimeline
          features={displayFeatures}
          onFeatureClick={setSelectedFeature}
          zoom="months"
          isCompact={false}
        />
      )}

      {/* Comparison Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                <th className="text-left py-3 px-4 font-semibold">Timeline Bars</th>
                <th className="text-left py-3 px-4 font-semibold">Flow Nodes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-medium">Visual Focus</td>
                <td className="py-3 px-4 text-text-muted">Temporal duration</td>
                <td className="py-3 px-4 text-text-muted">Logical steps/workflow</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Shape</td>
                <td className="py-3 px-4 text-text-muted">Stretched pills (width = time)</td>
                <td className="py-3 px-4 text-text-muted">Compact pills (fixed width)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Best For</td>
                <td className="py-3 px-4 text-text-muted">Gantt charts, project timelines</td>
                <td className="py-3 px-4 text-text-muted">Workflow builders, automation flows</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Connectors</td>
                <td className="py-3 px-4 text-text-muted">Show relationships between periods</td>
                <td className="py-3 px-4 text-text-muted">Show data flow between steps</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Space Efficiency</td>
                <td className="py-3 px-4 text-text-muted">Requires width for duration</td>
                <td className="py-3 px-4 text-text-muted">More compact, consistent sizing</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Similar Tools</td>
                <td className="py-3 px-4 text-text-muted">Asana Timeline, Monday.com</td>
                <td className="py-3 px-4 text-text-muted">Zapier, n8n, Postman Flows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
