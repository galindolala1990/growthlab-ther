import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Experiments from "./pages/Experiments";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PreviewComponents from "./pages/PreviewComponents";

// Design System Pages
import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import DesignSystemIndex from "./pages/design-system/DesignSystemIndex";
import ColorSystem from "./pages/design-system/foundations/ColorSystem";
import SemanticColors from "./pages/design-system/foundations/SemanticColors";
import Typography from "./pages/design-system/foundations/Typography";
import SpacingLayout from "./pages/design-system/foundations/SpacingLayout";
import ColorTokens from "./pages/design-system/tokens/ColorTokens";
import SemanticTokens from "./pages/design-system/tokens/SemanticTokens";
import ButtonDocs from "./pages/design-system/components/ButtonDocs";
import BadgeDocs from "./pages/design-system/components/BadgeDocs";
import ChipDocs from "./pages/design-system/components/ChipDocs";
import CardDocs from "./pages/design-system/components/CardDocs";
import SegmentedControlDocs from "./pages/design-system/components/SegmentedControlDocs";
import TabsDocs from "./pages/design-system/components/TabsDocs";
import FlowNodeDocs from "./pages/design-system/components/FlowNodeDocs";
import FlowConnectorDocs from "./pages/design-system/components/FlowConnectorDocs";
import FilterPatterns from "./pages/design-system/patterns/FilterPatterns";
import ExperimentTimelinePattern from "./pages/design-system/patterns/ExperimentTimelinePattern";
import TimelineBarsPattern from "./pages/design-system/patterns/TimelineBarsPattern";
import FlowConnectorsPattern from "./pages/design-system/patterns/FlowConnectorsPattern";
import ExperimentFlowMapDocs from "./pages/ExperimentFlowMapDocs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Main App Routes - Protected and wrapped in DashboardLayout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/experiments" element={<Experiments />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/preview-components" element={<PreviewComponents />} />
              </Route>
            </Route>
            
            {/* Design System Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/design-system" element={<DesignSystemLayout />}>
                <Route index element={<DesignSystemIndex />} />
              
              {/* Foundations */}
              <Route path="foundations/colors" element={<ColorSystem />} />
              <Route path="foundations/semantic" element={<SemanticColors />} />
              <Route path="foundations/typography" element={<Typography />} />
              <Route path="foundations/spacing" element={<SpacingLayout />} />
              
              {/* Tokens */}
              <Route path="tokens/colors" element={<ColorTokens />} />
              <Route path="tokens/semantic" element={<SemanticTokens />} />
              
              {/* Components */}
              <Route path="components/button" element={<ButtonDocs />} />
              <Route path="components/badge" element={<BadgeDocs />} />
              <Route path="components/chip" element={<ChipDocs />} />
              <Route path="components/card" element={<CardDocs />} />
              <Route path="components/segmented-control" element={<SegmentedControlDocs />} />
              <Route path="components/tabs" element={<TabsDocs />} />
              <Route path="components/flow-node" element={<FlowNodeDocs />} />
              <Route path="components/flow-connector" element={<FlowConnectorDocs />} />
              
              {/* Patterns */}
              <Route path="patterns/filters" element={<FilterPatterns />} />
              <Route path="patterns/experiment-timeline-flow" element={<ExperimentTimelinePattern />} />
              <Route path="patterns/timeline-bars" element={<TimelineBarsPattern />} />
              <Route path="patterns/flow-connectors" element={<FlowConnectorsPattern />} />
              <Route path="patterns/experiment-flow-map" element={<ExperimentFlowMapDocs />} />
              </Route>
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
