import { Swimlane, Feature } from "@/types/roadmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beaker, TrendingUp, Users, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ExperimentClusterPanelProps {
  swimlanes: Swimlane[];
}

interface ClusterStats {
  productArea: string;
  totalExperiments: number;
  totalVariants: number;
  avgConversion: number;
  avgEngagement: number;
  totalUsers: number;
  experiments: Feature[];
}

export const ExperimentClusterPanel = ({ swimlanes }: ExperimentClusterPanelProps) => {
  // Calculate statistics per product area
  const clusterStats: ClusterStats[] = swimlanes.map((swimlane) => {
    const experiments = swimlane.features.filter((f) => f.isExperiment);
    
    if (experiments.length === 0) return null;

    const totalVariants = experiments.reduce(
      (sum, exp) => sum + (exp.variants?.length || 0),
      0
    );

    let totalConversion = 0;
    let totalEngagement = 0;
    let totalUsers = 0;
    let metricsCount = 0;

    experiments.forEach((exp) => {
      exp.variants?.forEach((variant) => {
        if (variant.metrics?.conversion) {
          totalConversion += variant.metrics.conversion;
          metricsCount++;
        }
        if (variant.metrics?.engagement) {
          totalEngagement += variant.metrics.engagement;
        }
        if (variant.metrics?.users) {
          totalUsers += variant.metrics.users;
        }
      });
    });

    return {
      productArea: swimlane.name,
      totalExperiments: experiments.length,
      totalVariants,
      avgConversion: metricsCount > 0 ? totalConversion / metricsCount : 0,
      avgEngagement: metricsCount > 0 ? totalEngagement / metricsCount : 0,
      totalUsers,
      experiments,
    };
  }).filter(Boolean) as ClusterStats[];

  if (clusterStats.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Beaker className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Experiment Clusters</h3>
      </div>

      {clusterStats.map((cluster) => (
        <Card key={cluster.productArea} className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="truncate">{cluster.productArea}</span>
              <Badge className="ml-2">
                {cluster.totalExperiments} tests
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Total Variants */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>Total Variants</span>
              </div>
              <span className="text-sm font-semibold">{cluster.totalVariants}</span>
            </div>

            {/* Average Conversion */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Avg Conversion</span>
                </div>
                <span className="text-sm font-semibold">
                  {cluster.avgConversion.toFixed(1)}%
                </span>
              </div>
              <Progress value={cluster.avgConversion} className="h-2" />
            </div>

            {/* Average Engagement */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Avg Engagement</span>
                </div>
                <span className="text-sm font-semibold">
                  {cluster.avgEngagement.toFixed(1)}%
                </span>
              </div>
              <Progress value={cluster.avgEngagement} className="h-2" />
            </div>

            {/* Total Users */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Total Users</span>
              </div>
              <span className="text-sm font-semibold">
                {cluster.totalUsers.toLocaleString()}
              </span>
            </div>

            {/* Running Experiments */}
            <div className="pt-2 border-t border-border/50">
              <div className="text-xs text-muted-foreground mb-2">Running Tests:</div>
              <div className="flex flex-wrap gap-1">
                {cluster.experiments
                  .filter((exp) => exp.experimentStatus === "running")
                  .map((exp) => (
                    <Badge key={exp.id} variant="outline" className="text-xs">
                      {exp.title}
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
