import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      <Card className="p-6">
        <h2 className="text-2xl font-bold">⚙ Settings</h2>
        <p className="text-muted-foreground mt-2">
          Customize your SkillBridge AI experience.
        </p>
      </Card>

      <Card className="p-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">🌙 Dark Mode</h3>
          <p className="text-sm text-muted-foreground">
            Enable dark appearance
          </p>
        </div>

        <Switch />
      </Card>

      <Card className="p-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">🔔 Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Daily reminders & interview alerts
          </p>
        </div>

        <Switch defaultChecked />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">
          🌐 Language
        </h3>

        <Select defaultValue="english">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="marathi">Marathi</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold">
          👤 Account
        </h3>

        <div className="mt-5 space-y-3">
          <Button className="w-full">
            Edit Profile
          </Button>

          <Button variant="outline" className="w-full">
            Change Password
          </Button>

          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </div>
      </Card>

    </div>
  );
}