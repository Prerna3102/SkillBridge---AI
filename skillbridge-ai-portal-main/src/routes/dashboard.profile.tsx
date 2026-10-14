import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../components/Profile/ProfilePage";

export const Route = createFileRoute("/dashboard/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="mx-auto max-w-6xl">
      <ProfilePage />
    </div>
  );
}