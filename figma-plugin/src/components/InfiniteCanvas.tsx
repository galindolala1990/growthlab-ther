import { useState, useRef, useEffect, useCallback } from "react";
import { Feature, useFeatures } from "@/hooks/useFeatures";
import { Idea, useIdeas } from "@/hooks/useIdeas";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ZoomIn, ZoomOut, Maximize2, Plus, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { IdeaCard } from "./IdeaCard";
import { ConvertToRoadmapDialog } from "./ConvertToRoadmapDialog";
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

interface InfiniteCanvasProps {
  onFeatureClick?: (feature: Feature) => void;
}

const themes = [
  { id: "activation", label: "Activation", color: "hsl(var(--stage-design))" },
  { id: "growth", label: "Growth", color: "hsl(var(--stage-development))" },
  { id: "retention", label: "Retention", color: "hsl(var(--stage-testing))" },
  { id: "monetization", label: "Monetization", color: "hsl(var(--stage-launch))" },
];

const swimlanes = [
  { id: "q1", label: "Q1 2024", y: 100 },
  { id: "q2", label: "Q2 2024", y: 400 },
  { id: "q3", label: "Q3 2024", y: 700 },
  { id: "q4", label: "Q4 2024", y: 1000 },
];

const statusColors = {
  planning: "bg-stage-planning",
  design: "bg-stage-design",
  development: "bg-stage-development",
  testing: "bg-stage-testing",
  launch: "bg-stage-launch",
};

export function InfiniteCanvas({ onFeatureClick }: InfiniteCanvasProps) {
  const { features, createFeature } = useFeatures();
  const { ideas, createIdea, deleteIdea } = useIdeas();
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
  const dragStart = useRef({ x: 0, y: 0 });

  // Initialize canvas items (features + ideas) with positions
  useEffect(() => {
    const allItems: CanvasItem[] = [];
    
    // Add committed features
    features.forEach((feature, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      
      allItems.push({
        ...feature,
        type: "feature",
        x: 200 + col * 350,
        y: 150 + row * 300,
        width: 300,
        height: 200,
        cluster: feature.team || (idx % 2 === 0 ? "growth" : "activation"),
      });
    });

    // Add ideas (fuzzy, unscheduled bets)
    ideas.forEach((idea, idx) => {
      allItems.push({
        ...idea,
        type: "idea",
        x: idea.cluster_x || (1500 + (idx % 3) * 350),
        y: idea.cluster_y || (150 + Math.floor(idx / 3) * 300),
        width: 280,
        height: 180,
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

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggedItem(null);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const handleZoomReset = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMagicArrange = async () => {
    setIsArranging(true);
    try {
      const { data, error } = await supabase.functions.invoke("magic-arrange", {
        body: {
          items: canvasItems.map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
          })),
          themes,
          swimlanes,
        },
      });

      if (error) throw error;

      if (data?.positions) {
        setCanvasItems(prev =>
          prev.map(item => {
            const newPos = data.positions.find((p: any) => p.id === item.id);
            return newPos ? { ...item, x: newPos.x, y: newPos.y, cluster: newPos.cluster } : item;
          })
        );
        toast.success("Items arranged intelligently!");
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
      description: "Click to edit",
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

  return (
    <div className="relative w-full h-[800px] bg-background border border-border rounded-lg overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleZoom(0.1)}
          className="gap-2"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleZoom(-0.1)}
          className="gap-2"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleZoomReset}
          className="gap-2"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddIdea}
          className="gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          Add Idea
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleMagicArrange}
          disabled={isArranging}
          className="gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {isArranging ? "Arranging..." : "Magic Arrange"}
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-20 bg-card border border-border rounded-lg p-3 shadow-lg">
        <div className="text-xs font-semibold mb-2">Themes & Bets</div>
        <div className="space-y-1">
          {themes.map(theme => (
            <div key={theme.id} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: theme.color }}
              />
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

        {/* Swimlanes */}
        {swimlanes.map(lane => (
          <div
            key={lane.id}
            className="absolute left-0 right-0 border-t-2 border-dashed border-border/50"
            style={{ top: lane.y }}
          >
            <div className="absolute left-4 -top-3 bg-muted px-3 py-1 rounded-full text-xs font-semibold">
              {lane.label}
            </div>
          </div>
        ))}

        {/* Relationship lines - only between committed features */}
        <svg className="absolute inset-0 w-[4000px] h-[4000px] pointer-events-none" style={{ zIndex: 1 }}>
          {canvasItems.filter(i => i.type === "feature").map((item, idx, filteredItems) => {
            if (idx === 0) return null;
            const prevItem = filteredItems[idx - 1];
            return (
              <line
                key={`line-${item.id}`}
                x1={prevItem.x + prevItem.width / 2}
                y1={prevItem.y + prevItem.height / 2}
                x2={item.x + item.width / 2}
                y2={item.y + item.height / 2}
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.4"
              />
            );
          })}
        </svg>

        {/* Canvas items - Ideas and Features */}
        {canvasItems.map(item => {
          if (item.type === "idea") {
            const idea = item as CanvasIdea;
            return (
              <IdeaCard
                key={idea.id}
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
            );
          }

          // Committed feature card
          const feature = item as CanvasFeature;
          return (
            <Card
              key={feature.id}
              className="absolute cursor-move shadow-lg hover:shadow-xl transition-all border-4"
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
                  {feature.cluster && (
                    <Badge
                      className="text-xs w-full justify-center"
                      style={{ backgroundColor: `${getThemeColor(feature.cluster)}20` }}
                    >
                      {themes.find(t => t.id === feature.cluster)?.label}
                    </Badge>
                  )}
                  <div className="text-xs text-muted-foreground">
                    📅 Scheduled
                  </div>
                </div>
              </CardContent>
            </Card>
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
