import { GrowthExperimentCard } from "@/components/GrowthExperimentCard";
import { ExperimentDetailView } from "@/components/ExperimentDetailView";
import { ExperimentCreationDialog } from "@/components/ExperimentCreationDialog";
import { ExperimentListView } from "@/components/ExperimentListView";
import { ExperimentFilters } from "@/components/ExperimentFilters";
import { VariantComparisonView } from "@/components/VariantComparisonView";
import { useFeatures } from "@/hooks/useFeatures";
import { useExperimentVariants } from "@/hooks/useExperimentVariants";
import { useWorkspace } from "@/hooks/useWorkspace";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FlaskConical, TrendingUp, LayoutGrid, List as ListIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Feature } from "@/hooks/useFeatures";
const Experiments = () => {
  const {
    features,
    loading,
    refetch
  } = useFeatures();
  const {
    activeRoadmap
  } = useWorkspace();
  const [selectedExperiment, setSelectedExperiment] = useState<Feature | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreationOpen, setIsCreationOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "cards" | "comparison">("list");

  // Filters
  const [timeRange, setTimeRange] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [metricFilter, setMetricFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");

  // Filter experiments
  const experiments = useMemo(() => {
    let filtered = features.filter(f => f.is_experiment);

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(e => e.experiment_status === statusFilter);
    }

    // Apply metric filter
    if (metricFilter !== "all") {
      filtered = filtered.filter(e => e.primary_metric === metricFilter);
    }

    // Apply segment filter
    if (segmentFilter !== "all") {
      filtered = filtered.filter(e => e.experiment_segment === segmentFilter);
    }

    // Apply time range filter
    if (timeRange !== "all") {
      const days = parseInt(timeRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(e => {
        if (!e.created_at) return true;
        return new Date(e.created_at) >= cutoffDate;
      });
    }
    return filtered;
  }, [features, statusFilter, metricFilter, segmentFilter, timeRange]);
  const runningExperiments = experiments.filter(e => e.experiment_status === "running");
  const completedExperiments = experiments.filter(e => e.experiment_status === "completed" || e.experiment_status === "shipped");

  // Calculate average lift
  const avgLift = useMemo(() => {
    const experimentsWithLift = completedExperiments.filter(e => e.lift !== null && e.lift !== undefined);
    if (experimentsWithLift.length === 0) return 0;
    const total = experimentsWithLift.reduce((sum, e) => sum + (e.lift || 0), 0);
    return total / experimentsWithLift.length;
  }, [completedExperiments]);
  const handleExperimentClick = (experiment: Feature) => {
    setSelectedExperiment(experiment);
    setIsDetailOpen(true);
  };
  if (loading) {
    return <div className="container mx-auto p-6 space-y-6 max-w-7xl">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-96" />)}
        </div>
      </div>;
  }
  if (experiments.length === 0 && statusFilter === "all") {
    return <div className="container mx-auto p-6 max-w-7xl">
        <EmptyState icon={<FlaskConical className="w-12 h-12" />} title="No growth experiments yet" description="Start testing hypotheses to optimize conversion and engagement. Track variants, metrics, and learnings in one place." action={{
        label: "Create Experiment",
        onClick: () => setIsCreationOpen(true)
      }} />

        {activeRoadmap && <ExperimentCreationDialog isOpen={isCreationOpen} onClose={() => setIsCreationOpen(false)} roadmapId={activeRoadmap.id} onSuccess={refetch} />}
      </div>;
  }
  return <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Experiments</h1>
          <p className="text-muted-foreground">Your experimentation source of truth.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={v => setViewMode(v as any)}>
            <TabsList>
              <TabsTrigger value="list" className="gap-2">
                <ListIcon className="w-4 h-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="cards" className="gap-2">
                <LayoutGrid className="w-4 h-4" />
                Cards
              </TabsTrigger>
              <TabsTrigger value="comparison" className="gap-2">
                <LayoutGrid className="w-4 h-4" />
                Compare
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="gap-2" onClick={() => setIsCreationOpen(true)}>
            <Plus className="w-4 h-4" />
            New Experiment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => setStatusFilter("all")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setStatusFilter("all");
            }
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Experiments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{experiments.length}</div>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => setStatusFilter("running")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setStatusFilter("running");
            }
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{runningExperiments.length}</div>
              {runningExperiments.length > 0 && <Badge className="bg-accent animate-pulse text-slate-950">Live</Badge>}
            </div>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => setStatusFilter("completed")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setStatusFilter("completed");
            }
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{completedExperiments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Lift</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-5 h-5 text-success" />
              <div className="text-3xl font-bold text-success">{avgLift > 0 ? `+${avgLift.toFixed(1)}%` : "—"}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ExperimentFilters statusFilter={statusFilter} metricFilter={metricFilter} segmentFilter={segmentFilter} timeRange={timeRange} onStatusChange={setStatusFilter} onMetricChange={setMetricFilter} onSegmentChange={setSegmentFilter} onTimeRangeChange={setTimeRange} />

      {/* Content based on view mode */}
      {viewMode === "list" ? <ExperimentListView experiments={experiments} onExperimentClick={handleExperimentClick} /> : viewMode === "cards" ? <>
          {runningExperiments.length > 0 && <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-accent rounded-full animate-pulse" />
                <h2 className="text-xl font-bold">Live Experiments</h2>
                <Badge className="bg-accent animate-pulse">{runningExperiments.length}</Badge>
              </div>
              <div className="space-y-6">
                {runningExperiments.map(experiment => <ExperimentCardWithVariants key={experiment.id} feature={experiment} onClick={handleExperimentClick} />)}
              </div>
            </div>}

          {completedExperiments.length > 0 && <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-success rounded-full" />
                <h2 className="text-xl font-bold">Completed Experiments</h2>
                <Badge className="bg-success">{completedExperiments.length}</Badge>
              </div>
              <div className="space-y-6">
                {completedExperiments.map(experiment => <ExperimentCardWithVariants key={experiment.id} feature={experiment} onClick={handleExperimentClick} />)}
              </div>
            </div>}

          {experiments.length === 0 && <div className="text-center py-12 text-muted-foreground">
              <p>No experiments match the current filters</p>
            </div>}
        </> : <div className="space-y-8">
          {experiments.map(experiment => <ComparisonViewWithVariants key={experiment.id} feature={experiment} />)}
        </div>}

      {/* Experiment Detail Modal */}
      {selectedExperiment && activeRoadmap && <ExperimentDetailView experiment={selectedExperiment} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} onRefresh={refetch} />}

      {/* Creation Dialog */}
      {activeRoadmap && <ExperimentCreationDialog isOpen={isCreationOpen} onClose={() => setIsCreationOpen(false)} roadmapId={activeRoadmap.id} onSuccess={refetch} />}
    </div>;
};

// Helper component to load variants for each experiment
function ExperimentCardWithVariants({
  feature,
  onClick
}: {
  feature: Feature;
  onClick: (feature: Feature) => void;
}) {
  const {
    variants
  } = useExperimentVariants(feature.id);
  const formattedVariants = variants.map(v => ({
    id: v.id,
    name: v.name,
    description: v.description || "",
    conversion_rate: v.conversion_rate || 0,
    engagement_rate: v.engagement_rate || 0,
    user_count: v.user_count || 0,
    image_url: undefined
  }));
  return <div onClick={() => onClick(feature)} className="cursor-pointer">
      <GrowthExperimentCard feature={feature} variants={formattedVariants} />
    </div>;
}

// Helper component for comparison view
function ComparisonViewWithVariants({
  feature
}: {
  feature: Feature;
}) {
  const {
    variants
  } = useExperimentVariants(feature.id);
  return <VariantComparisonView variants={variants} winningVariantId={feature.winning_variant_id} featureTitle={feature.title} onSendToRoadmap={() => {
    // TODO: Implement send to roadmap
    console.log("Send to roadmap:", feature);
  }} />;
}
export default Experiments;