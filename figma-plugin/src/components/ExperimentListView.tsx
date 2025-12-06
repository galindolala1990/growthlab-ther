import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Feature } from "@/hooks/useFeatures";
import { ExternalLink, Trophy } from "lucide-react";
import { format } from "date-fns";
import { getExperimentStatusConfig, SPECIAL_BADGES } from "@/config/badge-config";
interface ExperimentListViewProps {
  experiments: Feature[];
  onExperimentClick: (experiment: Feature) => void;
}
export function ExperimentListView({
  experiments,
  onExperimentClick
}: ExperimentListViewProps) {
  return <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Experiment</TableHead>
            <TableHead>Hypothesis</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Metric</TableHead>
            <TableHead>Lift</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiments.length === 0 ? <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No experiments found
              </TableCell>
            </TableRow> : experiments.map(experiment => <TableRow key={experiment.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onExperimentClick(experiment)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium">{experiment.title}</div>
                      {experiment.winning_variant_id && <Badge className={SPECIAL_BADGES.winnerChosen.className}>
                          <Trophy className="w-3 h-3 mr-1" />
                          {SPECIAL_BADGES.winnerChosen.label}
                        </Badge>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs truncate text-sm text-muted-foreground">
                    {experiment.hypothesis || "—"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getExperimentStatusConfig(experiment.experiment_status).className}>
                    {getExperimentStatusConfig(experiment.experiment_status).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">
                    {experiment.primary_metric?.replace(/_/g, " ") || "—"}
                  </span>
                </TableCell>
                <TableCell>
                  {experiment.lift ? <span className="font-semibold text-success">
                      +{experiment.lift.toFixed(1)}%
                    </span> : <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {experiment.start_date && experiment.end_date ? <>
                        <div>{format(new Date(experiment.start_date), "MMM d")}</div>
                        <div className="text-muted-foreground">
                          {format(new Date(experiment.end_date), "MMM d, yyyy")}
                        </div>
                      </> : <span className="text-muted-foreground">Not scheduled</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{experiment.experiment_owner || experiment.team || "—"}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={e => {
              e.stopPropagation();
              onExperimentClick(experiment);
            }}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>)}
        </TableBody>
      </Table>
    </div>;
}