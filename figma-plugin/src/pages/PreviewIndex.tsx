import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ColorTokenPreview from "@/components/ColorTokenPreview";
import PreviewTypography from "./PreviewTypography";
import PreviewSpacing from "./PreviewSpacing";



const tabs = [
  { id: "colors", title: "Colors" },
  { id: "typography", title: "Typography" },
  { id: "spacing", title: "Spacing" },
];

const PreviewIndex = () => {
  const location = useLocation();

  const active = useMemo(() => {
    const hash = (location.hash || "").replace("#", "");
    if (hash) return hash;
    if (location.pathname.endsWith("/colors")) return "colors";
    if (location.pathname.endsWith("/typography")) return "typography";
    if (location.pathname.endsWith("/spacing")) return "spacing";
    return "colors";
  }, [location]);

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-5xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Preview</h1>
        <p className="text-muted-foreground">Design token preview (colors, typography, spacing)</p>
      </div>

      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`${location.pathname.split("#")[0]}#${tab.id}`}
            className={`px-3 py-1 rounded-md border ${active === tab.id ? "bg-primary text-on-primary" : "bg-background text-foreground hover:bg-muted"}`}
          >
            {tab.title}
          </a>
        ))}
      </div>

      <div className="pt-4">
        {active === "colors" && <ColorTokenPreview />}
        {active === "typography" && <PreviewTypography />}
        {active === "spacing" && <PreviewSpacing />}
      </div>
    </div>
  );
};

export default PreviewIndex;
