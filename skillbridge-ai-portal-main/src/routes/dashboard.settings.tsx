import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Moon,
  Bell,
  Globe,
  User,
  Lock,
  LogOut,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [name, setName] = useState("Prerna");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  // Load user information
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setName(user.name || "Prerna");
      setEmail(user.email || "");
    }
  }, []);

  // Dark mode
  const handleDarkMode = (value: boolean) => {
    setDarkMode(value);

    if (value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", String(value));
  };

  // Save profile
  const handleSaveProfile = () => {
    const user = {
      name: name,
      email: email,
    };

    localStorage.setItem("currentUser", JSON.stringify(user));
    setEditProfile(false);

    alert("Profile updated successfully!");
  };

  // Change password
  const handleChangePassword = () => {
    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }

    alert("Password changed successfully!");
    setNewPassword("");
    setChangePassword(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your preferences and account settings.
        </p>
      </div>

      {/* Appearance */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Appearance</h2>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Change the appearance of the dashboard.
              </p>
            </div>
          </div>

          <Switch
            checked={darkMode}
            onCheckedChange={handleDarkMode}
          />
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Notifications</h2>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive updates about your placement preparation.
              </p>
            </div>
          </div>

          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
      </Card>

      {/* Language */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Language</h2>

        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-md border bg-background p-2 text-sm"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>
      </Card>

      {/* Account */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Account</h2>

        <div className="space-y-4">

          {/* Edit Profile */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />

              <div>
                <p className="font-medium">Edit Profile</p>
                <p className="text-sm text-muted-foreground">
                  Update your name and email.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setEditProfile(!editProfile)}
            >
              Edit
            </Button>
          </div>

          {editProfile && (
            <div className="space-y-3 rounded-lg bg-muted/40 p-4">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button onClick={handleSaveProfile}>
                Save Profile
              </Button>
            </div>
          )}

          {/* Change Password */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />

              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your account password.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setChangePassword(!changePassword)}
            >
              Change
            </Button>
          </div>

          {changePassword && (
            <div className="space-y-3 rounded-lg bg-muted/40 p-4">
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button onClick={handleChangePassword}>
                Update Password
              </Button>
            </div>
          )}

          {/* Logout */}
          <div className="flex items-center justify-between rounded-lg border border-red-200 p-4">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-red-500" />

              <div>
                <p className="font-medium">Logout</p>
                <p className="text-sm text-muted-foreground">
                  Sign out from your account.
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

        </div>
      </Card>

    </div>
  );
}