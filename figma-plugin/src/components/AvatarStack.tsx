import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  owners: string[];
  maxDisplay?: number;
  size?: "sm" | "md";
  className?: string;
}

export function AvatarStack({ owners, maxDisplay = 3, size = "sm", className }: AvatarStackProps) {
  if (!owners || owners.length === 0) return null;

  const displayOwners = owners.slice(0, maxDisplay);
  const remainingCount = owners.length - maxDisplay;

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs"
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    // Generate consistent color based on name
    const colors = [
      "bg-primary text-primary-foreground",
      "bg-accent text-accent-foreground",
      "bg-success text-success-foreground",
      "bg-warning text-warning-foreground",
      "bg-info text-info-foreground",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {displayOwners.map((owner, idx) => (
        <Avatar
          key={idx}
          className={cn(
            sizeClasses[size],
            "border-2 border-background ring-1 ring-border"
          )}
        >
          <AvatarFallback className={cn("font-semibold", getAvatarColor(owner))}>
            {getInitials(owner)}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar
          className={cn(
            sizeClasses[size],
            "border-2 border-background ring-1 ring-border"
          )}
        >
          <AvatarFallback className="bg-neutral-200 text-neutral-700 font-semibold">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
