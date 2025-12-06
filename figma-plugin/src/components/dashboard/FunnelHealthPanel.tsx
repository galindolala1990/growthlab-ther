import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, AlertCircle } from "lucide-react";

interface FunnelStage {
  name: string;
  rate: number;
  dropoff?: number;
  needsAttention?: boolean;
}

export function FunnelHealthPanel() {
  const funnelStages: FunnelStage[] = [
    { name: "Signup", rate: 100 },
    { name: "Activation", rate: 68, dropoff: 32, needsAttention: true },
    { name: "Engagement", rate: 45, dropoff: 23, needsAttention: true },
    { name: "Monetization", rate: 12, dropoff: 33, needsAttention: false },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Health</CardTitle>
        <CardDescription>Conversion rates across key stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {funnelStages.map((stage, index) => (
            <div key={stage.name} className="relative">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{stage.name}</h4>
                    {stage.dropoff && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <TrendingDown className="h-3 w-3" />
                        {stage.dropoff}% drop-off
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{stage.rate}%</span>
                  {stage.needsAttention && (
                    <Badge variant="warning" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Test here
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
