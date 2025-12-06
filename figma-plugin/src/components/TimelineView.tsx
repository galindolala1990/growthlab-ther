import { Feature } from "@/hooks/useFeatures";
import { TimelineFeatureCard } from "./TimelineFeatureCard";
import { format } from "date-fns";

interface TimelineViewProps {
  features: Feature[];
  onFeatureClick?: (feature: Feature) => void;
}

export function TimelineView({ features, onFeatureClick }: TimelineViewProps) {
  // Group features by month
  const sortedFeatures = [...features].sort((a, b) => 
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );

  const groupedFeatures = sortedFeatures.reduce((acc, feature) => {
    const monthKey = format(new Date(feature.start_date), "MMM yyyy");
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <div className="relative max-w-5xl mx-auto py-12">
      {/* Vertical timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

      {/* Timeline content */}
      <div className="space-y-16">
        {Object.entries(groupedFeatures).map(([month, monthFeatures]) => (
          <div key={month} className="relative">
            {/* Date marker */}
            <div className="flex items-center mb-8">
              <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-card border-2 border-primary rounded-full shadow-md">
                <span className="text-sm font-semibold text-primary">{month.split(" ")[0]}</span>
              </div>
              <div className="ml-4 text-muted-foreground font-mono text-sm">
                {month}
              </div>
            </div>

            {/* Feature cards for this month */}
            <div className="ml-24 space-y-8">
              {monthFeatures.map((feature) => (
                <TimelineFeatureCard
                  key={feature.id}
                  feature={feature}
                  onClick={() => onFeatureClick?.(feature)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
