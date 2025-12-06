import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { getSeverityConfig } from "@/config/badge-config";

interface Bottleneck {
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  affected_items?: string[];
}

interface BottleneckCardProps {
  bottleneck: Bottleneck;
}

export function BottleneckCard({ bottleneck }: BottleneckCardProps) {
  const severityConfig = getSeverityConfig(bottleneck.severity);
  
  // Icon based on severity
  const Icon = bottleneck.severity === "critical" ? AlertTriangle : AlertCircle;

  return (
    <Card className={`border-2 ${severityConfig.className} hover:shadow-lg transition-all`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Icon className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base mb-1">{bottleneck.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-3">{bottleneck.description}</p>
              {bottleneck.affected_items && bottleneck.affected_items.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Affected:</p>
                  <div className="flex flex-wrap gap-1">
                    {bottleneck.affected_items.slice(0, 3).map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {bottleneck.affected_items.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{bottleneck.affected_items.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Badge className={severityConfig.className}>
            {severityConfig.label}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}