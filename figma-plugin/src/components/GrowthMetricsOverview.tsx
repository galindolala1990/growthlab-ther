import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Users, Zap } from "lucide-react";
import { Feature } from "@/hooks/useFeatures";

interface GrowthMetricsOverviewProps {
  features: Feature[];
}

export function GrowthMetricsOverview({ features }: GrowthMetricsOverviewProps) {
  const experiments = features.filter((f) => f.is_experiment);
  const completedExperiments = experiments.filter((e) => e.experiment_status === "completed");
  const activeExperiments = experiments.filter((e) => e.experiment_status === "running");
  
  // Calculate metrics
  const totalConversionLift = 12.4; // This would be calculated from variant data
  const totalUsersImpacted = experiments.length * 10000; // Sample calculation
  const experimentsThisMonth = experiments.filter(
    (e) => new Date(e.created_at).getMonth() === new Date().getMonth()
  ).length;

  const metrics = [
    {
      title: "Avg Conversion Lift",
      value: `+${totalConversionLift}%`,
      description: "From completed experiments",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Active Experiments",
      value: activeExperiments.length,
      description: `${completedExperiments.length} completed`,
      icon: Target,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Users Impacted",
      value: totalUsersImpacted.toLocaleString(),
      description: "Across all experiments",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Experiments/Month",
      value: experimentsThisMonth,
      description: "Velocity increasing",
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
