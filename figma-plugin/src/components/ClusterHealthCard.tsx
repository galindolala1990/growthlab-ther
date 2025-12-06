import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Users, DollarSign } from "lucide-react";
import { getHealthConfig } from "@/config/badge-config";

interface ClusterStatus {
  status: "strong" | "moderate" | "weak" | "unknown";
  reason: string;
}

interface ClusterHealth {
  activation?: ClusterStatus;
  growth?: ClusterStatus;
  retention?: ClusterStatus;
  monetization?: ClusterStatus;
}

interface ClusterHealthCardProps {
  clusterHealth: ClusterHealth;
}

export function ClusterHealthCard({ clusterHealth }: ClusterHealthCardProps) {
  const clusters = [
    { key: "activation", label: "Activation", icon: Activity, data: clusterHealth.activation },
    { key: "growth", label: "Growth", icon: TrendingUp, data: clusterHealth.growth },
    { key: "retention", label: "Retention", icon: Users, data: clusterHealth.retention },
    { key: "monetization", label: "Monetization", icon: DollarSign, data: clusterHealth.monetization },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cluster Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {clusters.map(({ key, label, icon: Icon, data }) => {
          if (!data) return null;
          
          // Map cluster status to health status
          const healthStatus = data.status === "strong" ? "healthy" : 
                              data.status === "moderate" ? "warning" : 
                              data.status === "weak" ? "critical" : "unknown";
          const config = getHealthConfig(healthStatus);
          
          return (
            <div key={key} className={`p-4 rounded-lg border-2 ${config.className}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-background rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{label}</h4>
                      <Badge className={config.className}>
                        {data.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{data.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}