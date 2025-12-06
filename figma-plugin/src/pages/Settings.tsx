import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ColorTokenPreview } from "@/components/ColorTokenPreview";

const Settings = () => {
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your roadmap preferences and integrations</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect your tools to auto-sync roadmap data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="figma-token">Figma Access Token</Label>
              <Input id="figma-token" type="password" placeholder="Enter your Figma access token" />
              <p className="text-xs text-muted-foreground">Used to fetch design previews and frames</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="jira-email">Jira Email</Label>
              <Input id="jira-email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jira-token">Jira API Token</Label>
              <Input id="jira-token" type="password" placeholder="Enter your Jira API token" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jira-domain">Jira Domain</Label>
              <Input id="jira-domain" placeholder="yourcompany.atlassian.net" />
              <p className="text-xs text-muted-foreground">Used to sync task status and progress</p>
            </div>

            <Button className="w-full">Save Integration Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your roadmap experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-sync Figma frames</Label>
                <p className="text-xs text-muted-foreground">Automatically update preview images</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show experiment badges</Label>
                <p className="text-xs text-muted-foreground">Display A/B test indicators</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI auto-summarize</Label>
                <p className="text-xs text-muted-foreground">Generate feature summaries with AI</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <ColorTokenPreview />
      </div>
    </div>
  );
};

export default Settings;
