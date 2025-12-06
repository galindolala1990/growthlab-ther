import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDesignIterations } from "@/hooks/useDesignIterations";
import { format } from "date-fns";
import { ImageIcon, ExternalLink, Clock, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DesignIterationsPanelProps {
  featureId: string;
  featureTitle: string;
}

export const DesignIterationsPanel = ({ featureId, featureTitle }: DesignIterationsPanelProps) => {
  const { iterations, loading } = useDesignIterations(featureId);
  const [selectedIteration, setSelectedIteration] = useState<number | null>(null);
  const [isStoryMode, setIsStoryMode] = useState(false);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Design Iterations</h3>
        </div>
        <p className="text-sm text-muted-foreground">Loading iterations...</p>
      </Card>
    );
  }

  if (iterations.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Design Iterations</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          No design iterations yet. Upload design snapshots to track visual evolution.
        </p>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Design Iterations</h3>
              <Badge>{iterations.length} versions</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setIsStoryMode(true)}
            >
              <PlayCircle className="w-4 h-4" />
              Play Story
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-6 space-y-4">
            {iterations.map((iteration, index) => (
              <div
                key={iteration.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedIteration(index)}
              >
                <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all">
                  {/* Thumbnail */}
                  <div className="w-32 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <img
                      src={iteration.image_url}
                      alt={iteration.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          v{iteration.version}
                        </Badge>
                        <h4 className="font-semibold text-sm truncate">
                          {iteration.title}
                        </h4>
                      </div>
                      {iteration.figma_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(iteration.figma_url!, "_blank");
                          }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Figma
                        </Button>
                      )}
                    </div>

                    {iteration.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {iteration.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {format(new Date(iteration.created_at), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                </div>

                {/* Timeline connector */}
                {index < iterations.length - 1 && (
                  <div className="absolute left-[88px] top-full w-0.5 h-4 bg-border" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Story Mode Dialog */}
      <Dialog open={isStoryMode} onOpenChange={setIsStoryMode}>
        <DialogContent className="max-w-5xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>{featureTitle} - Design Evolution</DialogTitle>
          </DialogHeader>
          <StoryModeView
            iterations={iterations}
            onClose={() => setIsStoryMode(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

interface StoryModeViewProps {
  iterations: any[];
  onClose: () => void;
}

const StoryModeView = ({ iterations }: StoryModeViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIteration = iterations[currentIndex];

  const handleNext = () => {
    if (currentIndex < iterations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Image viewer */}
      <div className="flex-1 bg-muted/20 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={currentIteration.image_url}
          alt={currentIteration.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Iteration details */}
      <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">
              v{currentIteration.version}
            </Badge>
            <h3 className="font-semibold">{currentIteration.title}</h3>
          </div>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {iterations.length}
          </span>
        </div>

        {currentIteration.description && (
          <p className="text-sm text-muted-foreground">
            {currentIteration.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {format(new Date(currentIteration.created_at), "MMM d, yyyy")}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === iterations.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
