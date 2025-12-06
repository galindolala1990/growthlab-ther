import { useState, useRef, useEffect, useCallback } from "react";
import { Feature, useFeatures } from "@/hooks/useFeatures";
import { Idea, useIdeas } from "@/hooks/useIdeas";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { IdeaCard } from "./IdeaCard";
import { StickyNoteCard } from "./StickyNoteCard";
import { ConvertToRoadmapDialog } from "./ConvertToRoadmapDialog";
import { CanvasControlPanel } from "./CanvasControlPanel";
import { useRoadmap } from "@/hooks/useRoadmap";

interface CanvasFeature extends Feature {
  x: number;
  y: number;
  width: number;
  height: number;
  cluster?: string;
  type: "feature";
}

interface CanvasIdea extends Idea {
  x: number;
  y: number;
  width: number;
  height: number;
  cluster?: string;
  type: "idea";
}

type CanvasItem = CanvasFeature | CanvasIdea;

interface EnhancedInfiniteCanvasProps {
  onFeatureClick?: (feature: Feature) => void;
}

const themes = [
  { id: "activation", label: "Activation", color: "hsl(var(--stage-design))" },
  { id: "growth", label: "Growth", color: "hsl(var(--stage-development))" },
  { id: "retention", label: "Retention", color: "hsl(var(--stage-testing))" },
  { id: "monetization", label: "Monetization", color: "hsl(var(--stage-launch))" },
];

const statusColors = {
  planning: "bg-stage-planning",
  design: "bg-stage-design",
  development: "bg-stage-development",
  testing: "bg-stage-testing",
  launch: "bg-stage-launch",
};

export function EnhancedInfiniteCanvas({ onFeatureClick }: EnhancedInfiniteCanvasProps) {
  const { features, createFeature, updateFeature } = useFeatures();
  const { ideas, createIdea, updateIdea, deleteIdea } = useIdeas();
  const { roadmap } = useRoadmap();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isArranging, setIsArranging] = useState(false);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const dragStart = useRef({ x: 0, y: 0 });

  // Initialize canvas items with persisted positions
  useEffect(() => {
    const allItems: CanvasItem[] = [];
    
    // Add committed features with persisted positions
    features.forEach((feature, idx) => {
      allItems.push({
        ...feature,
        type: "feature",
        x: feature.canvas_x || (200 + (idx % 4) * 350),
        y: feature.canvas_y || (150 + Math.floor(idx / 4) * 300),
        width: 300,
        height: 200,
        cluster: feature.team || (idx % 2 === 0 ? "growth" : "activation"),
      });
    });

    // Add ideas with persisted positions
    ideas.forEach((idea, idx) => {
      allItems.push({
        ...idea,
        type: "idea",
        x: idea.cluster_x || (1500 + (idx % 3) * 350),
        y: idea.cluster_y || (150 + Math.floor(idx / 3) * 300),
        width: idea.sticky_note_color ? 240 : 280,
        height: idea.sticky_note_color ? 200 : 180,
        cluster: idea.theme || "activation",
      });
    });

    setCanvasItems(allItems);
  }, [features, ideas]);

  const handleMouseDown = (e: React.MouseEvent, itemId?: string) => {
    if (itemId) {
      setDraggedItem(itemId);
      const item = canvasItems.find(i => i.id === itemId);
      if (item) {
        dragStart.current = {
          x: (e.clientX - panOffset.x) / zoom - item.x,
          y: (e.clientY - panOffset.y) / zoom - item.y,
        };
      }
    } else {
      setIsDragging(true);
      setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggedItem) {
      const mouseX = (e.clientX - panOffset.x) / zoom;
      const mouseY = (e.clientY - panOffset.y) / zoom;
      
      setCanvasItems(prev =>
        prev.map(item =>
          item.id === draggedItem
            ? { ...item, x: mouseX - dragStart.current.x, y: mouseY - dragStart.current.y }
            : item
        )
      );
    } else if (isDragging) {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  }, [draggedItem, isDragging, panOffset, startPan, zoom]);

  const handleMouseUp = useCallback(async () => {
    // Persist position on drag end
    if (draggedItem) {
      const item = canvasItems.find(i => i.id === draggedItem);
      if (item) {
        if (item.type === "feature") {
          await updateFeature(item.id, { canvas_x: item.x, canvas_y: item.y });
        } else {
          await updateIdea(item.id, { cluster_x: item.x, cluster_y: item.y });
        }
      }
    }
    setIsDragging(false);
    setDraggedItem(null);
  }, [draggedItem, canvasItems, updateFeature, updateIdea]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMagicArrange = async (arrangeBy: string) => {
    setIsArranging(true);
    try {
      const { data, error } = await supabase.functions.invoke("canvas-arrange", {
        body: {
          items: canvasItems.map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            theme: item.type === "idea" ? (item as CanvasIdea).theme : undefined,
            stage: item.type === "feature" ? (item as CanvasFeature).stage : undefined,
            priority: item.type === "feature" ? (item as CanvasFeature).priority : undefined,
            impact: item.type === "idea" ? (item as CanvasIdea).impact : undefined,
          })),
          arrangeBy,
        },
      });

      if (error) throw error;

      if (data?.positions) {
        // Update positions with animation
        setCanvasItems(prev =>
          prev.map(item => {
            const newPos = data.positions.find((p: any) => p.id === item.id);
            return newPos ? { ...item, x: newPos.x, y: newPos.y, cluster: newPos.cluster } : item;
          })
        );

        // Persist all new positions
        for (const pos of data.positions) {
          const item = canvasItems.find(i => i.id === pos.id);
          if (item) {
            if (item.type === "feature") {
              await updateFeature(item.id, { canvas_x: pos.x, canvas_y: pos.y });
            } else {
              await updateIdea(item.id, { cluster_x: pos.x, cluster_y: pos.y });
            }
          }
        }

        toast.success(`AI reorganized canvas by ${arrangeBy}!`);
      }
    } catch (error) {
      console.error("Magic arrange error:", error);
      toast.error("Failed to arrange items. Please try again.");
    } finally {
      setIsArranging(false);
    }
  };

  const getThemeColor = (themeId?: string) => {
    const theme = themes.find(t => t.id === themeId);
    return theme?.color || "hsl(var(--muted))";
  };

  const handleAddIdea = async () => {
    if (!roadmap) return;

    await createIdea({
      title: "New Idea",
      description: "Double-click to edit",
      theme: "growth",
      impact: "medium",
      stage: "idea",
      cluster_x: 1500,
      cluster_y: 150,
      tags: [],
      canvas_cluster: null,
      canvas_impact_score: null,
      sticky_note_color: null,
    });
  };

  const handleAddSticky = async () => {
    if (!roadmap) return;

    await createIdea({
      title: "Quick note...",
      description: null,
      theme: null,
      impact: null,
      stage: "idea",
      cluster_x: 1500 + Math.random() * 200,
      cluster_y: 150 + Math.random() * 200,
      tags: [],
      canvas_cluster: null,
      canvas_impact_score: null,
      sticky_note_color: "yellow",
    });
  };

  const handleConvertToRoadmap = async (data: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    stage: string;
    priority: string;
    team: string;
  }) => {
    if (!roadmap || !selectedIdea) return;

    try {
      await createFeature({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        stage: data.stage as Feature["stage"],
        priority: data.priority as Feature["priority"],
        team: data.team,
        progress: 0,
        swimlane: null,
        is_experiment: false,
        experiment_status: null,
        winning_variant_id: null,
        figma_url: null,
        jira_key: null,
        preview_image_url: null,
        design_images: null,
        canvas_x: null,
        canvas_y: null,
        hypothesis: null,
        primary_metric: null,
        secondary_metrics: null,
        lift: null,
        p_value: null,
        launched_at: null,
        experiment_owner: null,
        experiment_segment: null,
        experiment_notes: null,
        experiment_decision: null,
      });

      await deleteIdea(selectedIdea.id);
      toast.success("Idea converted to committed feature!");
      setConvertDialogOpen(false);
      setSelectedIdea(null);
    } catch (error) {
      console.error("Convert error:", error);
      toast.error("Failed to convert idea");
    }
  };

  const handleThemeToggle = (themeId: string) => {
    setSelectedThemes(prev =>
      prev.includes(themeId)
        ? prev.filter(t => t !== themeId)
        : [...prev, themeId]
    );
  };

  // Filter items by selected themes
  const filteredItems = selectedThemes.length > 0
    ? canvasItems.map(item => ({
        ...item,
        dimmed: !selectedThemes.includes(item.cluster || ""),
      }))
    : canvasItems.map(item => ({ ...item, dimmed: false }));

  return (
    <div className="relative w-full h-[800px] bg-background border border-border rounded-lg overflow-hidden">
      <CanvasControlPanel
        zoom={zoom}
        onZoomIn={() => setZoom(prev => Math.max(0.5, Math.min(2, prev + 0.1)))}
        onZoomOut={() => setZoom(prev => Math.max(0.5, Math.min(2, prev - 0.1)))}
        onZoomReset={() => {
          setZoom(1);
          setPanOffset({ x: 0, y: 0 });
        }}
        onAddIdea={handleAddIdea}
        onAddSticky={handleAddSticky}
        onMagicArrange={handleMagicArrange}
        isArranging={isArranging}
        selectedThemes={selectedThemes}
        onThemeToggle={handleThemeToggle}
        themes={themes}
      />

      {/* Legend */}
      <div className="absolute top-4 left-4 z-20 bg-card border border-border rounded-lg p-3 shadow-lg">
        <div className="text-xs font-semibold mb-2">Themes & Bets</div>
        <div className="space-y-1">
          {themes.map(theme => (
            <div key={theme.id} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: theme.color }} />
              <span>{theme.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-dashed border-accent" />
            <span>Ideas (unscheduled)</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded border-2 border-primary" />
            <span>Committed features</span>
          </div>
        </div>
      </div>

      {/* Infinite Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleMouseDown(e)}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          transition: isDragging || draggedItem ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 w-[4000px] h-[4000px]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              opacity: 0.3,
            }}
          />
        </div>

        {/* Canvas items */}
        {filteredItems.map(item => {
          const itemWithDim = item as CanvasItem & { dimmed: boolean };

          // Sticky note
          if (item.type === "idea" && (item as CanvasIdea).sticky_note_color) {
            const idea = item as CanvasIdea;
            return (
              <div
                key={idea.id}
                style={{ opacity: itemWithDim.dimmed ? 0.4 : 1, transition: "opacity 0.3s" }}
              >
                <StickyNoteCard
                  idea={idea}
                  x={idea.x}
                  y={idea.y}
                  isDragging={draggedItem === idea.id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleMouseDown(e, idea.id);
                  }}
                  onUpdate={(updates) => updateIdea(idea.id, updates)}
                  onConvertToRoadmap={() => {
                    setSelectedIdea(idea);
                    setConvertDialogOpen(true);
                  }}
                  onDelete={() => deleteIdea(idea.id)}
                />
              </div>
            );
          }

          // Regular idea card
          if (item.type === "idea") {
            const idea = item as CanvasIdea;
            return (
              <div
                key={idea.id}
                style={{ opacity: itemWithDim.dimmed ? 0.4 : 1, transition: "opacity 0.3s" }}
              >
                <IdeaCard
                  idea={idea}
                  x={idea.x}
                  y={idea.y}
                  width={idea.width}
                  height={idea.height}
                  clusterColor={getThemeColor(idea.cluster)}
                  isDragging={draggedItem === idea.id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleMouseDown(e, idea.id);
                  }}
                  onClick={() => {
                    if (!draggedItem) {
                      setSelectedIdea(idea);
                    }
                  }}
                  onConvertToRoadmap={() => {
                    setSelectedIdea(idea);
                    setConvertDialogOpen(true);
                  }}
                  onDelete={() => deleteIdea(idea.id)}
                />
              </div>
            );
          }

          // Committed feature card
          const feature = item as CanvasFeature;
          return (
            <div
              key={feature.id}
              style={{ opacity: itemWithDim.dimmed ? 0.4 : 1, transition: "opacity 0.3s" }}
            >
              <Card
                className="absolute cursor-move shadow-lg hover:shadow-xl transition-all border-4 hover:scale-105"
                style={{
                  left: feature.x,
                  top: feature.y,
                  width: feature.width,
                  height: feature.height,
                  borderColor: getThemeColor(feature.cluster),
                  zIndex: draggedItem === feature.id ? 10 : 2,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, feature.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!draggedItem) {
                    onFeatureClick?.(feature);
                  }
                }}
              >
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm line-clamp-2">{feature.title}</h4>
                      <Badge
                        className={`${
                          statusColors[feature.stage as keyof typeof statusColors]
                        } text-white text-xs capitalize shrink-0`}
                      >
                        {feature.stage}
                      </Badge>
                    </div>
                    {feature.description && (
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {feature.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline" className="capitalize">
                        {feature.priority}
                      </Badge>
                      {feature.team && (
                        <span className="text-muted-foreground">{feature.team}</span>
                      )}
                    </div>
                    <div className="text-xs text-accent font-semibold">📅 Scheduled</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <ConvertToRoadmapDialog
        idea={selectedIdea}
        isOpen={convertDialogOpen}
        onClose={() => {
          setConvertDialogOpen(false);
          setSelectedIdea(null);
        }}
        onConvert={handleConvertToRoadmap}
      />
    </div>
  );
}
