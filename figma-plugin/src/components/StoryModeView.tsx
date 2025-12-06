import { useState, useEffect, useCallback } from "react";
import { Feature } from "@/hooks/useFeatures";
import { useDesignIterations } from "@/hooks/useDesignIterations";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StoryModeViewProps {
  features: Feature[];
  onClose?: () => void;
}

export function StoryModeView({ features, onClose }: StoryModeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { iterations } = useDesignIterations(features[0]?.id);

  // Flatten all design iterations across features
  const allSlides = features.flatMap(feature => {
    const featureIterations = iterations.filter(i => i.feature_id === feature.id);
    return featureIterations.length > 0
      ? featureIterations.map(iteration => ({
          id: iteration.id,
          featureTitle: feature.title,
          title: iteration.title,
          description: iteration.description,
          imageUrl: iteration.image_url,
          date: iteration.created_at,
          version: iteration.version,
        }))
      : [{
          id: feature.id,
          featureTitle: feature.title,
          title: feature.title,
          description: feature.description,
          imageUrl: feature.preview_image_url,
          date: feature.start_date,
          version: 1,
        }];
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const currentSlide = allSlides[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % allSlides.length);
  }, [allSlides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + allSlides.length) % allSlides.length);
  }, [allSlides.length]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === " ") {
      e.preventDefault();
      setIsPlaying(prev => !prev);
    }
    if (e.key === "Escape") {
      setIsFullscreen(false);
      onClose?.();
    }
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(handleNext, 3000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, handleNext]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  if (!currentSlide) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">No design iterations available</p>
          <p className="text-sm">Add design iterations to features to enable Story Mode</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'relative'} flex flex-col`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={allSlides.length <= 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={allSlides.length <= 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {allSlides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden">
        <Card className="max-w-6xl w-full overflow-hidden shadow-2xl">
          {/* Image */}
          <div className="relative aspect-video bg-muted">
            {currentSlide.imageUrl ? (
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No preview available
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="p-8 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">{currentSlide.featureTitle}</h2>
                  <span className="text-sm text-muted-foreground">v{currentSlide.version}</span>
                </div>
                <h3 className="text-xl text-muted-foreground">{currentSlide.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(currentSlide.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
            {currentSlide.description && (
              <p className="text-lg text-foreground/80">{currentSlide.description}</p>
            )}
          </div>
        </Card>
      </div>

      {/* Timeline Scrubber */}
      <div className="p-4 border-t border-border bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto space-y-2">
          <Progress value={(currentIndex / (allSlides.length - 1)) * 100} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{new Date(allSlides[0]?.date).toLocaleDateString()}</span>
            <span>{new Date(allSlides[allSlides.length - 1]?.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
