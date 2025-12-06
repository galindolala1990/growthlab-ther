import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useFeatures } from "@/hooks/useFeatures";
import { Zap, Target, TrendingUp, Award, Sparkles, FlaskConical } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LiveExperimentsPanel } from "@/components/dashboard/LiveExperimentsPanel";
import { BiggestWinsPanel } from "@/components/dashboard/BiggestWinsPanel";
import { FunnelHealthPanel } from "@/components/dashboard/FunnelHealthPanel";
import { AIInsightsDashboard } from "@/components/dashboard/AIInsightsDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
const Dashboard = () => {
  const { stats, loading: statsLoading } = useDashboardStats();
  const { metrics, loading: metricsLoading } = useDashboardMetrics();
  const { features, loading: featuresLoading } = useFeatures();

  const loading = statsLoading || metricsLoading || featuresLoading;
  if (loading) {
    return (
      <div className="container mx-auto p-8 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!stats || !metrics) return null;

  const experiments = features.filter((f) => f.is_experiment);
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Real-time insights into experiments, wins, and growth opportunities
        </p>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          icon={Zap}
          label="Experiment Velocity"
          value={`${metrics.experimentVelocity.started}→${metrics.experimentVelocity.completed}`}
          subtitle={`Started vs. Completed (30d)`}
          iconColor="text-primary"
        />
        <MetricCard
          icon={Target}
          label="Win Rate"
          value={`${metrics.winRate}%`}
          subtitle="Last 30 days"
          trend={metrics.winRate > 50 ? "up" : "neutral"}
          iconColor="text-primary"
        />
        <MetricCard
          icon={TrendingUp}
          label="Cumulative Impact"
          value={`+${metrics.cumulativeImpact}%`}
          subtitle="Total lift from all wins"
          trend="up"
          iconColor="text-success"
        />
        <MetricCard
          icon={FlaskConical}
          label="Active Experiments"
          value={metrics.activeExperiments}
          subtitle={`${stats.completedExperiments} completed`}
          iconColor="text-primary"
        />
        <MetricCard
          icon={Sparkles}
          label="AI Opportunity Score"
          value={metrics.aiOpportunityScore}
          subtitle="Data quality & readiness"
          trend={metrics.aiOpportunityScore > 70 ? "up" : "neutral"}
          iconColor="text-primary"
        />
      </div>

      {/* Two-column layout for main content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <LiveExperimentsPanel experiments={experiments} />
          <FunnelHealthPanel />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <BiggestWinsPanel experiments={experiments} />
          <AIInsightsDashboard />
        </div>
      </div>

      {/* Recent Activity - Full width */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and completed experiments</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-2">
              {stats.recentActivity.slice(0, 8).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded ${activity.type === "experiment" ? "bg-primary/10" : "bg-muted"}`}>
                      {activity.type === "experiment" ? (
                        <FlaskConical className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Award className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight">{activity.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{activity.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;