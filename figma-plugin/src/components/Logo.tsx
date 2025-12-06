import { tokens } from "@/theme/tokens";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Logo = ({ className = "w-8 h-8", variant = "light" }: LogoProps) => {
  const primaryColor = tokens.color.primary.DEFAULT;
  
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minimalist geometric logo: Stylized branching "K" - two paths merging */}
      <g>
        {/* Left element - thick curved shape extending horizontally to the right, curving slightly upward */}
        <path
          d="M 4 20 L 10 20 Q 12 19, 13 18"
          stroke={primaryColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Merge point - smaller rounded shape positioned between the two branches, slightly to the right of where they diverge */}
        <circle
          cx="15"
          cy="18"
          r="2.5"
          fill={primaryColor}
        />
        
        {/* Upper branch - curves sharply upwards and to the right, ending in rounded tip */}
        <path
          d="M 13 18 Q 15 14, 18 10 Q 20 8, 22 7"
          stroke={primaryColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Lower branch - curves downwards and to the right, ending in rounded tip */}
        <path
          d="M 13 18 Q 15 22, 18 26 Q 20 28, 22 29"
          stroke={primaryColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
