import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Trophy, MoveHorizontal } from "lucide-react";

interface Variant {
  id: string;
  name: string;
  image_url?: string;
  conversion_rate: number;
}

interface VariantComparisonSliderProps {
  variantA: Variant;
  variantB: Variant;
  winningVariantId?: string;
}

export function VariantComparisonSlider({
  variantA,
  variantB,
  winningVariantId,
}: VariantComparisonSliderProps) {
  const [sliderValue, setSliderValue] = useState([50]);
  const isAWinner = variantA.id === winningVariantId;
  const isBWinner = variantB.id === winningVariantId;

  return (
    <div className="space-y-4">
      {/* Comparison Container */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border-2 border-border">
        {/* Variant B (Background/Right) */}
        <div className="absolute inset-0">
          {variantB.image_url ? (
            <img
              src={variantB.image_url}
              alt={variantB.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
              <div className="text-6xl opacity-50">🎨</div>
            </div>
          )}
          {isBWinner && (
            <div className="absolute inset-0 border-4 border-success pointer-events-none" />
          )}
        </div>

        {/* Variant A (Foreground/Left) with Clip Path */}
        <div
          className="absolute inset-0 transition-all duration-150 ease-out"
          style={{
            clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)`,
          }}
        >
          {variantA.image_url ? (
            <img
              src={variantA.image_url}
              alt={variantA.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="text-6xl opacity-50">🎨</div>
            </div>
          )}
          {isAWinner && (
            <div className="absolute inset-0 border-4 border-success pointer-events-none" />
          )}
        </div>

        {/* Slider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-background shadow-lg pointer-events-none transition-all duration-150 ease-out z-10"
          style={{
            left: `${sliderValue[0]}%`,
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-2 shadow-xl border-2 border-primary">
            <MoveHorizontal className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Variant Labels */}
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-background/90 backdrop-blur-sm text-foreground border shadow-lg">
            {variantA.name}
            {isAWinner && <Trophy className="w-3 h-3 ml-1 text-success" />}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 z-20">
          <Badge className="bg-background/90 backdrop-blur-sm text-foreground border shadow-lg">
            {variantB.name}
            {isBWinner && <Trophy className="w-3 h-3 ml-1 text-success" />}
          </Badge>
        </div>

        {/* Conversion Rate Indicators */}
        <div className="absolute bottom-3 left-3 z-20">
          <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold border shadow-lg">
            <span className="text-primary">{variantA.conversion_rate}%</span>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 z-20">
          <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold border shadow-lg">
            <span className="text-accent">{variantB.conversion_rate}%</span>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="px-2">
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          min={0}
          max={100}
          step={1}
          className="cursor-grab active:cursor-grabbing"
        />
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-muted-foreground">
            Drag to compare variants
          </p>
        </div>
      </div>
    </div>
  );
}
