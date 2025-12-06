import { InfiniteCanvas } from "@/components/InfiniteCanvas";
import { EnhancedInfiniteCanvas } from "@/components/EnhancedInfiniteCanvas";
import { NodeTimeline } from "@/components/NodeTimeline";
import { EnhancedHorizontalTimeline } from "@/components/EnhancedHorizontalTimeline";
import { StoryModeView } from "@/components/StoryModeView";
import { useFeatures } from "@/hooks/useFeatures";
import { useRoadmap } from "@/hooks/useRoadmap";
import { useRoadmapFilters } from "@/hooks/useRoadmapFilters";
import { EmptyState } from "@/components/EmptyState";
import { RoadmapEmptyState } from "@/components/RoadmapEmptyState";
import { Button } from "@/components/ui/button";
import { Map, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FeatureDetailsPanel } from "@/components/FeatureDetailsPanel";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Feature } from "@/hooks/useFeatures";
import { GlobalViewControls } from "@/components/GlobalViewControls";
import { PipelineSummaryBar } from "@/components/PipelineSummaryBar";
import { createSampleData } from "@/lib/sampleData";
import { add2025TestData } from "@/lib/add2025TestData";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useToast } from "@/hooks/use-toast";
import { validateRoadmapFilters, logValidationResults } from "@/lib/roadmap-filter-helpers";

const Roadmap = () => {
  const { features, loading } = useFeatures();
  const { roadmap } = useRoadmap();
  const { workspace } = useWorkspace();
  const { toast } = useToast();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "timeline";
  
  // Use centralized filtering hook - single source of truth
  const roadmapFilters = useRoadmapFilters({
    features,
  });

  // Development validation - verify filter logic consistency
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && view === 'timeline') {
      const pipelineCounts = {
        planning: roadmapFilters.visibleItems.filter(f => f.stage === 'planning').length,
        design: roadmapFilters.visibleItems.filter(f => f.stage === 'design').length,
        development: roadmapFilters.visibleItems.filter(f => f.stage === 'development').length,
        testing: roadmapFilters.visibleItems.filter(f => f.stage === 'testing').length,
        launch: roadmapFilters.visibleItems.filter(f => f.stage === 'launch').length,
      };

      const experimentCount = roadmapFilters.visibleItems.filter(f => f.is_experiment).length;
      const experimentPercentage = roadmapFilters.visibleItems.length > 0
        ? Math.round((experimentCount / roadmapFilters.visibleItems.length) * 100)
        : 0;

      const result = validateRoadmapFilters(
        features,
        roadmapFilters.itemsInRange,
        roadmapFilters.visibleItems,
        roadmapFilters.filterState.year,
        roadmapFilters.filterState.stages,
        roadmapFilters.filterState.priorities,
        pipelineCounts,
        {
          percentage: experimentPercentage,
          experimentCount: experimentCount,
          totalCount: roadmapFilters.visibleItems.length,
        }
      );

      logValidationResults(result);
    }
  }, [roadmapFilters.visibleItems, roadmapFilters.filterState.year, view, features]);
  
  const handleLoadSampleData = async () => {
    if (!workspace || !roadmap) return;
    
    try {
      await createSampleData(workspace.id, roadmap.id);
      toast({
        title: "Sample data loaded!",
        description: "Your roadmap has been populated with example features.",
      });
      // Reload to show new data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error loading sample data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddTestData = async () => {
    if (!roadmap) return;
    
    const currentYear = new Date().getFullYear();
    
    try {
      const result = await add2025TestData(roadmap.id, currentYear);
      if (result.success) {
        toast({
          title: "Test data added!",
          description: result.message || `Added ${result.added} items for ${currentYear}`,
        });
        // Set year to current year and reload
        roadmapFilters.setYear(currentYear);
        window.location.reload();
      } else {
        throw result.error;
      }
    } catch (error: any) {
      toast({
        title: "Error adding test data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsPanelOpen(true);
  };
  
  const handleAddFeature = () => {
    // TODO: Implement feature creation modal
    toast({
      title: "Coming soon!",
      description: "Feature creation UI will be implemented in a future update.",
    });
  };
  
  const handlePlayEvolution = () => {
    setSearchParams({
      view: "story",
    });
  };

  // Use visibleItems from the hook instead of manual filtering
  const filteredFeatures = roadmapFilters.visibleItems;
  
  if (loading) {
    return (
      <div className="px-8 py-6 space-y-6 bg-bg-subtle min-h-screen">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }
  
  // Show empty state for all three cases (handled by RoadmapEmptyState component)
  const shouldShowEmptyState = view === "timeline" && (
    features.length === 0 || // Case 1: No items at all
    roadmapFilters.itemsInRange.length === 0 || // Case 2: No items in year
    (roadmapFilters.visibleItems.length === 0 && roadmapFilters.hasActiveFilters) // Case 3: Filtered out
  );
  
  return (
    <div className="px-8 py-6 space-y-6 bg-bg-subtle min-h-screen max-w-[1600px] mx-auto">
      {/* Page Header - Title, Description, Primary Action */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text">
            {view === "canvas" ? "Strategy Canvas" : view === "story" ? "Story Mode" : "Visual Roadmap"}
          </h1>
          <p className="text-text-muted text-sm">
            {view === "canvas"
              ? "Strategic thinking space • Brainstorm bets, cluster themes, map relationships"
              : view === "story"
                ? "Visual evolution playback • See how your product evolved over time"
                : "Design-centric timeline • Rich cards with preview images, progress, and variants"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {process.env.NODE_ENV === 'development' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddTestData}
              className="gap-2"
            >
              Add Test Data
            </Button>
          )}
          
          <Button size="md" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Feature
          </Button>
        </div>
      </div>

      {/* Layer 1: Global View Controls - How you see the roadmap + Filters */}
      {view === "timeline" && !shouldShowEmptyState && (
        <GlobalViewControls
          selectedYear={roadmapFilters.filterState.year}
          onYearChange={roadmapFilters.setYear}
          timeScale={roadmapFilters.filterState.timeScale}
          onTimeScaleChange={roadmapFilters.setTimeScale}
          viewStyle={roadmapFilters.filterState.view}
          onViewStyleChange={roadmapFilters.setView}
          density={roadmapFilters.filterState.density}
          onDensityChange={roadmapFilters.setDensity}
          selectedStages={roadmapFilters.filterState.stages}
          selectedPriorities={roadmapFilters.filterState.priorities}
          onToggleStage={roadmapFilters.toggleStage}
          onTogglePriority={roadmapFilters.togglePriority}
          onClearAllFilters={roadmapFilters.clearFilters}
          hasActiveFilters={roadmapFilters.hasActiveFilters}
        />
      )}

      {/* Content Block - Timeline/Canvas/Story */}
      <div className="space-y-6">
        {view === "canvas" ? (
          <EnhancedInfiniteCanvas onFeatureClick={handleFeatureClick} />
        ) : view === "story" ? (
          <StoryModeView features={filteredFeatures} />
        ) : shouldShowEmptyState ? (
          <RoadmapEmptyState
            itemsInRange={roadmapFilters.itemsInRange}
            visibleItems={roadmapFilters.visibleItems}
            selectedYear={roadmapFilters.filterState.year}
            hasActiveFilters={roadmapFilters.hasActiveFilters}
            allFeatures={features}
            onClearFilters={roadmapFilters.clearFilters}
            onChangeYear={roadmapFilters.setYear}
            onAddFeature={handleAddFeature}
          />
        ) : roadmapFilters.filterState.view === "cards" ? (
          <EnhancedHorizontalTimeline 
            features={filteredFeatures} 
            onFeatureClick={handleFeatureClick} 
            zoom={roadmapFilters.filterState.timeScale} 
            isCompact={roadmapFilters.filterState.density === "compact"} 
          />
        ) : (
          <NodeTimeline 
            features={filteredFeatures} 
            onFeatureClick={handleFeatureClick} 
            zoom={roadmapFilters.filterState.timeScale} 
            isCompact={roadmapFilters.filterState.density === "compact"} 
          />
        )}
      </div>

      <FeatureDetailsPanel feature={selectedFeature} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
  );
};
export default Roadmap;
