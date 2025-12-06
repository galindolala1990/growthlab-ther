import { SegmentedControl, SegmentedControlOption } from "@/components/ui/segmented-control";

export type ZoomLevel = "weeks" | "months" | "quarters";

interface TimelineZoomControlProps {
  zoom: ZoomLevel;
  onZoomChange: (zoom: ZoomLevel) => void;
}

const zoomOptions: SegmentedControlOption[] = [
  { id: "weeks", label: "Weeks" },
  { id: "months", label: "Months" },
  { id: "quarters", label: "Quarters" },
];

export function TimelineZoomControl({ zoom, onZoomChange }: TimelineZoomControlProps) {
  return (
    <SegmentedControl
      options={zoomOptions}
      value={zoom}
      onChange={(value) => onZoomChange(value as ZoomLevel)}
      size="sm"
    />
  );
}
