import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ExperimentFiltersProps {
  statusFilter: string;
  metricFilter: string;
  segmentFilter: string;
  timeRange: string;
  onStatusChange: (value: string) => void;
  onMetricChange: (value: string) => void;
  onSegmentChange: (value: string) => void;
  onTimeRangeChange: (value: string) => void;
}

export function ExperimentFilters({
  statusFilter,
  metricFilter,
  segmentFilter,
  timeRange,
  onStatusChange,
  onMetricChange,
  onSegmentChange,
  onTimeRangeChange,
}: ExperimentFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 p-4 border rounded-lg bg-muted/30">
      <div className="flex-1 min-w-[150px]">
        <Label className="text-xs mb-2 block">Time Range</Label>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label className="text-xs mb-2 block">Status</Label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="analyzing">Analyzing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label className="text-xs mb-2 block">Metric</Label>
        <Select value={metricFilter} onValueChange={onMetricChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Metrics</SelectItem>
            <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
            <SelectItem value="click_through_rate">Click-Through Rate</SelectItem>
            <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="retention">Retention</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label className="text-xs mb-2 block">Segment</Label>
        <Select value={segmentFilter} onValueChange={onSegmentChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="all_users">All Users</SelectItem>
            <SelectItem value="new_users">New Users</SelectItem>
            <SelectItem value="returning_users">Returning Users</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}