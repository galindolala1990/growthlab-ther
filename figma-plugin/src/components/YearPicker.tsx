import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface YearPickerProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  minYear?: number;
  maxYear?: number;
  className?: string;
}

export function YearPicker({ 
  selectedYear, 
  onYearChange, 
  minYear = 2020, 
  maxYear = 2030,
  className 
}: YearPickerProps) {
  const currentYear = new Date().getFullYear();
  const isTodayOutsideSelectedYear = currentYear !== selectedYear;
  
  const handlePrevYear = () => {
    if (selectedYear > minYear) {
      onYearChange(selectedYear - 1);
    }
  };

  const handleNextYear = () => {
    if (selectedYear < maxYear) {
      onYearChange(selectedYear + 1);
    }
  };

  const handleYearClick = (year: number) => {
    onYearChange(year);
  };
  
  const handleJumpToToday = () => {
    onYearChange(currentYear);
  };

  // Generate year grid (3 years before and after current selection)
  const generateYearRange = () => {
    const years: number[] = [];
    const start = Math.max(minYear, selectedYear - 3);
    const end = Math.min(maxYear, selectedYear + 3);
    
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2 min-w-[100px]", className)}
        >
          <Calendar className="w-3.5 h-3.5" />
          {selectedYear}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-3">
          {/* Today hint */}
          {isTodayOutsideSelectedYear && (
            <div className="text-xs text-text-muted text-center pb-2 border-b border-border">
              Today is in {currentYear}
            </div>
          )}
          
          {/* Year navigation */}
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevYear}
              disabled={selectedYear <= minYear}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm font-semibold text-text min-w-[60px] text-center">
              {selectedYear}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextYear}
              disabled={selectedYear >= maxYear}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick jump to current year */}
          {selectedYear !== currentYear && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onYearChange(currentYear)}
              className="w-full text-xs"
            >
              Jump to {currentYear}
            </Button>
          )}

          {/* Year grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {generateYearRange().map((year) => (
              <Button
                key={year}
                variant={year === selectedYear ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleYearClick(year)}
                className={cn(
                  "h-8 text-xs",
                  year === currentYear && year !== selectedYear && "border border-primary/30"
                )}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
