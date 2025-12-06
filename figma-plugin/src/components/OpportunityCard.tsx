import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Target } from "lucide-react";
import { getImpactConfig, getConfidenceConfig } from "@/config/badge-config";

interface Opportunity {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: "high" | "medium" | "low";
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const impactConfig = getImpactConfig(opportunity.impact);
  const confidenceConfig = getConfidenceConfig(opportunity.confidence);

  return (
    <Card className={`border-2 ${impactConfig.className} hover:shadow-lg transition-all`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base mb-1">{opportunity.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{opportunity.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={confidenceConfig.className}>
              {confidenceConfig.label}
            </Badge>
            <div className="flex items-center gap-1 text-sm font-medium">
              {opportunity.impact === "high" && <Zap className="w-4 h-4 text-success" />}
              {opportunity.impact === "medium" && <TrendingUp className="w-4 h-4 text-warning" />}
              <span className="capitalize">{opportunity.impact} impact</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}