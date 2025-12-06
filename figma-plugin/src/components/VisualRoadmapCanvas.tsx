import { useState } from "react";
import { Feature } from "@/hooks/useFeatures";
import { VisualFeatureCard } from "./VisualFeatureCard";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { LayoutGrid, Clock, Play } from "lucide-react";

interface VisualRoadmapCanvasProps {
  features: Feature[];
  onFeatureClick?: (feature: Feature) => void;
}

export function VisualRoadmapCanvas({ features, onFeatureClick }: VisualRoadmapCanvasProps) {
  const [view, setView] = useState<"grid" | "timeline" | "story">("grid");

  // Group by swimlane
  const swimlaneGroups = features.reduce(
    (acc, feature) => {
      const swimlane = feature.swimlane || "General";
      if (!acc[swimlane]) acc[swimlane] = [];
      acc[swimlane].push(feature);
      return acc;
    },
    {} as Record<string, Feature[]>,
  );

  // Sort by date for timeline
  const sortedFeatures = [...features].sort(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
  );

  return (
    <div className="space-y-6">
      {/* View Switcher */}
      <div className="flex items-center justify-between">
        <SegmentedControl
          options={[
            { id: "grid", label: "Canvas View", icon: LayoutGrid },
            { id: "timeline", label: "Roadmap", icon: Clock },
            { id: "story", label: "Story Mode", icon: Play }
          ]}
          value={view}
          onChange={(value) => setView(value as any)}
          size="md"
          ariaLabel="Roadmap view mode"
        />

        <Button variant="outline" className="gap-2">
          <Play className="w-4 h-4" />
          Play Evolution
        </Button>
      </div>

      {/* Grid View - By Swimlane */}
      {view === "grid" && (
        <div className="space-y-8">
          {Object.entries(swimlaneGroups).map(([swimlane, swimlaneFeatures]) => (
            <div key={swimlane} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-primary rounded-full" />
                <h2 className="text-xl font-bold">{swimlane}</h2>
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground">{swimlaneFeatures.length} features</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {swimlaneFeatures.map((feature) => (
                  <VisualFeatureCard key={feature.id} feature={feature} onClick={() => onFeatureClick?.(feature)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline View - Chronological */}
      {view === "timeline" && (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

          <div className="space-y-8">
            {sortedFeatures.map((feature, index) => (
              <div key={feature.id} className="relative pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg" />

                {/* Date Label */}
                <div className="absolute left-0 top-8 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  {new Date(feature.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* Feature Card */}
                <div className="w-full max-w-2xl">
                  <VisualFeatureCard feature={feature} onClick={() => onFeatureClick?.(feature)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Story Mode - Full Width Visual Narrative */}
      {view === "story" && (
        <div className="space-y-12">
          {sortedFeatures.map((feature, index) => (
            <div key={feature.id} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary/20">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h2 className="text-2xl font-bold">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>

              {/* Large Visual */}
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-2xl">
                {feature.preview_image_url ? (
                  <img src={feature.preview_image_url} alt={feature.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-lg text-muted-foreground">Visual coming soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Story Metadata */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-card rounded-lg border">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Stage</div>
                  <div className="font-medium capitalize">{feature.stage}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Progress</div>
                  <div className="font-medium">{feature.progress}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Team</div>
                  <div className="font-medium">{feature.team || "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Roadmap</div>
                  <div className="font-medium">
                    {new Date(feature.start_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
