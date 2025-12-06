import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check } from "lucide-react";

interface Pattern {
  title: string;
  insight: string;
  examples?: string[];
}

interface PatternCardProps {
  pattern: Pattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-soft rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base mb-2">{pattern.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-3">{pattern.insight}</p>
            {pattern.examples && pattern.examples.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                <div className="space-y-1">
                  {pattern.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}