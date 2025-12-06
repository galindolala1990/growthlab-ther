import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { X } from "lucide-react";
import { getFeatureStageConfig, getPriorityConfig } from "@/config/badge-config";
import { ALL_STAGES, ALL_PRIORITIES } from "@/lib/roadmap-constants";

interface AdvancedFiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStages: string[];
  selectedPriorities: string[];
  onToggleStage: (stage: string) => void;
  onTogglePriority: (priority: string) => void;
  onClearAll: () => void;
}

// Future filter options (not yet implemented)
const SAMPLE_OWNERS = ["Alice", "Bob", "Charlie", "Diana"];
const SAMPLE_CATEGORIES = ["Feature", "Bug", "Improvement", "Research"];
const SAMPLE_AREAS = ["Frontend", "Backend", "Design", "Infra"];
const SAMPLE_TAGS = ["MVP", "Nice-to-have", "Tech-debt", "Customer-request"];
const SAMPLE_OWNERS = ["Alice", "Bob", "Charlie", "Diana"];
const SAMPLE_CATEGORIES = ["Feature", "Bug", "Improvement", "Research"];
const SAMPLE_AREAS = ["Frontend", "Backend", "Design", "Infra"];
const SAMPLE_TAGS = ["MVP", "Nice-to-have", "Tech-debt", "Customer-request"];
const SAMPLE_STATUSES = ["Active", "Paused", "Blocked", "Archived"];

export function AdvancedFiltersPanel({
  isOpen,
  onClose,
  onApply,
  onClear,
  initialFilters,
}: AdvancedFiltersPanelProps) {
  const [filters, setFilters] = useState<AllFilters>(initialFilters || {
    stages: ALL_STAGES,
    priorities: ALL_PRIORITIES,
    owners: [],
    categories: [],
    areas: [],
    tags: [],
    statuses: [],
  });

  const toggleFilter = (category: keyof AllFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const handleClear = () => {
    setFilters({
      stages: ALL_STAGES,
      priorities: ALL_PRIORITIES,
      owners: [],
      categories: [],
      areas: [],
      tags: [],
      statuses: [],
    });
    onClear();
  };

  const handleApply = () => {
    onApply(filters);
  };

  // Calculate total selected (excluding stages and priorities which default to all)
  const totalSelected = 
    filters.owners.length + 
    filters.categories.length + 
    filters.areas.length + 
    filters.tags.length + 
    filters.statuses.length +
    (filters.stages.length < ALL_STAGES.length ? filters.stages.length : 0) +
    (filters.priorities.length < ALL_PRIORITIES.length ? filters.priorities.length : 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[400px] bg-bg-surface shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-text">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Stage */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Stage
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_STAGES.map(stage => (
                <Chip
                  key={stage}
                  variant={filters.stages.includes(stage) ? "primary-soft" : "outline"}
                  selected={filters.stages.includes(stage)}
                  label={getFeatureStageConfig(stage).label}
                  onClick={() => toggleFilter("stages", stage)}
                />
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Priority
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_PRIORITIES.map(priority => (
                <Chip
                  key={priority}
                  variant={filters.priorities.includes(priority) ? "primary-soft" : "outline"}
                  selected={filters.priorities.includes(priority)}
                  label={getPriorityConfig(priority).label}
                  onClick={() => toggleFilter("priorities", priority)}
                />
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Owner
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_OWNERS.map(owner => (
                <Chip
                  key={owner}
                  variant={filters.owners.includes(owner) ? "primary-soft" : "outline"}
                  selected={filters.owners.includes(owner)}
                  label={owner}
                  onClick={() => toggleFilter("owners", owner)}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_CATEGORIES.map(category => (
                <Chip
                  key={category}
                  variant={filters.categories.includes(category) ? "primary-soft" : "outline"}
                  selected={filters.categories.includes(category)}
                  label={category}
                  onClick={() => toggleFilter("categories", category)}
                />
              ))}
            </div>
          </div>

          {/* Area */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Area
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_AREAS.map(area => (
                <Chip
                  key={area}
                  variant={filters.areas.includes(area) ? "primary-soft" : "outline"}
                  selected={filters.areas.includes(area)}
                  label={area}
                  onClick={() => toggleFilter("areas", area)}
                />
              ))}
            </div>
          </div>

          {/* Tag */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TAGS.map(tag => (
                <Chip
                  key={tag}
                  variant={filters.tags.includes(tag) ? "primary-soft" : "outline"}
                  selected={filters.tags.includes(tag)}
                  label={tag}
                  onClick={() => toggleFilter("tags", tag)}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_STATUSES.map(status => (
                <Chip
                  key={status}
                  variant={filters.statuses.includes(status) ? "primary-soft" : "outline"}
                  selected={filters.statuses.includes(status)}
                  label={status}
                  onClick={() => toggleFilter("statuses", status)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-2">
          {totalSelected > 0 && (
            <p className="text-xs text-text-muted text-center">
              {totalSelected} filter{totalSelected !== 1 ? 's' : ''} selected
            </p>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex-1"
              disabled={totalSelected === 0}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
