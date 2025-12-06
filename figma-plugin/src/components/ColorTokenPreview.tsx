import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tokens } from "@/theme/tokens";

interface ColorToken {
  name: string;
  value: string;
  description?: string;
}

interface ColorGroup {
  title: string;
  description?: string;
  tokens: ColorToken[];
}

const colorGroups: ColorGroup[] = [
  {
    title: "Brand",
    description: "Primary brand purple and interactive states.",
    tokens: [
      { name: "color.primary.DEFAULT", value: tokens.color.primary.DEFAULT, description: "Primary brand blue" },
      { name: "color.primary.hover", value: tokens.color.primary.hover, description: "Hover state" },
      { name: "color.primary.active", value: tokens.color.primary.active, description: "Active/pressed state" },
      { name: "color.primary.soft", value: tokens.color.primary.soft, description: "10% tint for backgrounds" },
    ],
  },
  {
    title: "Backgrounds (Light)",
    description: "Canvas and surface backgrounds for light mode.",
    tokens: [
      { name: "color.bg.DEFAULT", value: tokens.color.bg.DEFAULT, description: "Default page background" },
      { name: "color.bg.subtle", value: tokens.color.bg.subtle, description: "Muted canvas" },
      { name: "color.bg.surface", value: tokens.color.bg.surface, description: "Cards and panels" },
    ],
  },
  {
    title: "Backgrounds (Dark)",
    description: "Canvas and surface backgrounds for dark mode.",
    tokens: [
      { name: "color.bgDark.DEFAULT", value: tokens.color.bgDark.DEFAULT, description: "Default dark canvas" },
      { name: "color.bgDark.subtle", value: tokens.color.bgDark.subtle, description: "Muted dark canvas" },
      { name: "color.bgDark.surface", value: tokens.color.bgDark.surface, description: "Dark cards" },
    ],
  },
  {
    title: "Text (Light)",
    description: "Text tokens on light backgrounds.",
    tokens: [
      { name: "color.text.DEFAULT", value: tokens.color.text.DEFAULT, description: "Primary text" },
      { name: "color.text.muted", value: tokens.color.text.muted, description: "Secondary labels" },
      { name: "color.text.subtle", value: tokens.color.text.subtle, description: "Dividers or icon-only" },
      { name: "color.text.onPrimary", value: tokens.color.text.onPrimary, description: "Text on primary surfaces" },
    ],
  },
  {
    title: "Text (Dark)",
    description: "Text tokens on dark backgrounds.",
    tokens: [
      { name: "color.textDark.DEFAULT", value: tokens.color.textDark.DEFAULT, description: "Primary text" },
      { name: "color.textDark.muted", value: tokens.color.textDark.muted, description: "Secondary labels" },
      { name: "color.textDark.subtle", value: tokens.color.textDark.subtle, description: "Dividers or icon-only" },
    ],
  },
  {
    title: "Borders",
    description: "Border tokens for light and dark surfaces.",
    tokens: [
      { name: "color.border.DEFAULT", value: tokens.color.border.DEFAULT, description: "Default border" },
      { name: "color.border.subtle", value: tokens.color.border.subtle, description: "Light dividers" },
      { name: "color.border.strong", value: tokens.color.border.strong, description: "Emphasized separators" },
      { name: "color.borderDark.DEFAULT", value: tokens.color.borderDark.DEFAULT, description: "Default dark border" },
      { name: "color.borderDark.subtle", value: tokens.color.borderDark.subtle, description: "Muted dark border" },
      { name: "color.borderDark.strong", value: tokens.color.borderDark.strong, description: "Emphasized dark separators" },
    ],
  },
  {
    title: "Semantic",
    description: "Status colors for system feedback.",
    tokens: [
      { name: "color.success.DEFAULT", value: tokens.color.success.DEFAULT, description: "Success" },
      { name: "color.success.soft", value: tokens.color.success.soft, description: "Success tint" },
      { name: "color.success.text", value: tokens.color.success.text, description: "Text on success surfaces" },
      { name: "color.warning.DEFAULT", value: tokens.color.warning.DEFAULT, description: "Warning" },
      { name: "color.warning.soft", value: tokens.color.warning.soft, description: "Warning tint" },
      { name: "color.warning.text", value: tokens.color.warning.text, description: "Text on warning surfaces" },
      { name: "color.error.DEFAULT", value: tokens.color.error.DEFAULT, description: "Error" },
      { name: "color.error.soft", value: tokens.color.error.soft, description: "Error tint" },
      { name: "color.error.text", value: tokens.color.error.text, description: "Text on error surfaces" },
      { name: "color.info.DEFAULT", value: tokens.color.info.DEFAULT, description: "Info" },
      { name: "color.info.soft", value: tokens.color.info.soft, description: "Info tint" },
      { name: "color.info.text", value: tokens.color.info.text, description: "Text on info surfaces" },
    ],
  },
  {
    title: "Neutrals",
    description: "Neutral gray scale for backgrounds and borders.",
    tokens: Object.entries(tokens.color.neutral).map(([step, value]) => ({
      name: `color.neutral.${step}`,
      value,
    })),
  },
];

function getTextColor(hex: string) {
  const normalized = hex.replace("#", "");
  const hexValue = normalized.length === 8 ? normalized.slice(0, 6) : normalized;
  const r = parseInt(hexValue.slice(0, 2), 16);
  const g = parseInt(hexValue.slice(2, 4), 16);
  const b = parseInt(hexValue.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Use neutral tokens for text contrast instead of hard-coded values
  return luminance > 0.6 ? "hsl(var(--neutral-900))" : "hsl(var(--neutral-0))";
}

function ColorSwatch({ name, value, description }: ColorToken) {
  const textColor = getTextColor(value);

  return (
    <div className="rounded-lg border bg-muted/40 p-3 shadow-sm flex items-center gap-3">
      <div
        className="h-14 w-14 shrink-0 rounded-md border shadow-inner flex items-center justify-center text-xs font-semibold"
        style={{ backgroundColor: value, color: textColor }}
      >
        {value.replace("#", "")}
      </div>
      <div className="space-y-1 min-w-0">
        <p className="font-medium leading-none text-foreground truncate" title={name}>
          {name}
        </p>
        <p className="text-sm text-muted-foreground truncate">{value}</p>
        {description && <p className="text-xs text-muted-foreground leading-snug">{description}</p>}
      </div>
    </div>
  );
}

export function ColorTokenPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Tokens</CardTitle>
        <CardDescription>Preview the semantic color set that powers the interface.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">{group.title}</p>
                {group.description && (
                  <p className="text-sm text-muted-foreground max-w-2xl">{group.description}</p>
                )}
              </div>
              <Badge variant="secondary" className="shrink-0">
                {group.tokens.length} token{group.tokens.length === 1 ? "" : "s"}
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.tokens.map((token) => (
                <ColorSwatch key={`${group.title}-${token.name}`} {...token} />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default ColorTokenPreview;
