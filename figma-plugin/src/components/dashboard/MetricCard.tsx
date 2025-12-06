import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  iconColor?: string;
}

export function MetricCard({ icon: Icon, label, value, subtitle, trend, iconColor = "text-primary" }: MetricCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="border-border/50 hover:border-primary/20 transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-lg bg-primary/10`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          {subtitle && (
            <p className={`text-xs ${trend ? trendColors[trend] : "text-muted-foreground"}`}>
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
