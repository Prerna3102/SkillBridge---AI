import { useState, useEffect } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { userData } from "@/data/userData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);

  // Profile data
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      name: userData.name,
      course: userData.course,
      location: userData.location,
      college: "Sandip Institute of Technology & Research Centre",
      cgpa: userData.cgpa,
      photo:
        "https://ui-avatars.com/api/?name=Ananya+Sharma&background=4f46e5&color=fff&size=150",
    };
  });

  // Social links
  const [socialLinks, setSocialLinks] = useState(() => {
    const saved = localStorage.getItem("socialLinks");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      github: "",
      linkedin: "",
      portfolio: "",
    };
  });

  // Save profile
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  // Save social links
  useEffect(() => {
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
  }, [socialLinks]);

  return (
    <div className="space-y-6">

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col items-center">

          <img
            src={profile.photo}
            alt="Profile"
            className="h-28 w-28 rounded-full"
          />

          <h2 className="mt-4 text-2xl font-bold">
            {profile.name}
          </h2>

          <p className="text-muted-foreground">
            {profile.course}
          </p>

          <p className="text-sm text-muted-foreground">
            📍 {profile.location}
          </p>

          <Button
            className="mt-5"
            onClick={() => setOpen(true)}
          >
            ✏ Edit Profile
          </Button>

          {open && (
            <EditProfileDialog
              profile={profile}
              onClose={() => setOpen(false)}
              onSave={(data) =>
                setProfile((prev: typeof profile) => ({
                  ...prev,
                  name: data.name,
                  college: data.college,
                  cgpa: data.cgpa,
                  photo: data.photo,
                }))
              }
            />
          )}

        </div>
      </Card>

      {/* Profile Completion */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          📈 Profile Completion
        </h3>

        <progress value={85} className="mt-4" />

        <p className="mt-3 text-sm text-muted-foreground">
          Your profile is <b>85% complete</b>. Add GitHub and LinkedIn to
          reach 100%.
        </p>

        <div className="mt-5 space-y-2">
          <div>✅ Personal Information</div>
          <div>✅ Education</div>
          <div>✅ Skills</div>
          <div>✅ Internship</div>
          <div>❌ GitHub Profile</div>
          <div>❌ LinkedIn Profile</div>
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          📊 Statistics
        </h3>

        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">

          <Card className="p-4 text-center">
            <h2 className="text-2xl font-bold">8</h2>
            <p>Projects</p>
          </Card>

          <Card className="p-4 text-center">
            <h2 className="text-2xl font-bold">6</h2>
            <p>Certificates</p>
          </Card>

          <Card className="p-4 text-center">
            <h2 className="text-2xl font-bold">15</h2>
            <p>Skills</p>
          </Card>

          <Card className="p-4 text-center">
            <h2 className="text-2xl font-bold">82%</h2>
            <p>Interview Score</p>
          </Card>

        </div>
      </Card>

      {/* Career Goal */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          🎯 Career Goal
        </h3>

        <p className="mt-3 text-muted-foreground">
          Aspiring Data Analyst passionate about Python, SQL,
          Machine Learning and building AI-powered applications.
        </p>
      </Card>

      {/* Education */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          🎓 Education
        </h3>

        <div className="mt-4 space-y-3">

          <div>
            <p className="font-medium">
              B.Tech Information Technology
            </p>

            <p className="text-sm text-muted-foreground">
              {profile.college}
            </p>
          </div>

          <div>
            <p className="font-medium">
              Current CGPA
            </p>

            <p className="text-sm text-muted-foreground">
              {profile.cgpa}
            </p>
          </div>

        </div>
      </Card>

      {/* Internship */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          💼 Internship
        </h3>

        <p className="mt-3 font-medium">
          AI & Data Science Intern
        </p>

        <p className="text-sm text-muted-foreground">
          Worked on AI-based projects, Resume Analyzer,
          Career Roadmap and Machine Learning concepts.
        </p>
      </Card>

      {/* Certificates */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          🏆 Certificates
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {userData.certificates.map((certificate) => (
            <Badge key={certificate}>
              {certificate}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          💻 Skills
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {userData.skills.map((skill) => (
            <Badge key={skill}>
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          ⭐ Achievements
        </h3>

        <ul className="mt-4 space-y-2">
          {userData.achievements.map((achievement) => (
            <li key={achievement}>
              🏅 {achievement}
            </li>
          ))}
        </ul>
      </Card>

      {/* Social Links */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          🔗 Social Links
        </h3>

        <div className="mt-5 space-y-4">

          {/* GitHub */}
          <div className="flex items-center justify-between gap-3">
            <span>GitHub</span>

            {socialLinks.github ? (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Open Link
              </a>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  const link = prompt("Enter your GitHub link");

                  if (link) {
                    setSocialLinks({
                      ...socialLinks,
                      github: link,
                    });
                  }
                }}
              >
                Add Link
              </Button>
            )}
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-between gap-3">
            <span>LinkedIn</span>

            {socialLinks.linkedin ? (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Open Link
              </a>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  const link = prompt("Enter your LinkedIn link");

                  if (link) {
                    setSocialLinks({
                      ...socialLinks,
                      linkedin: link,
                    });
                  }
                }}
              >
                Add Link
              </Button>
            )}
          </div>

          {/* Portfolio */}
          <div className="flex items-center justify-between gap-3">
            <span>Portfolio</span>

            {socialLinks.portfolio ? (
              <a
                href={socialLinks.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Open Link
              </a>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  const link = prompt("Enter your Portfolio link");

                  if (link) {
                    setSocialLinks({
                      ...socialLinks,
                      portfolio: link,
                    });
                  }
                }}
              >
                Add Link
              </Button>
            )}
          </div>

        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          🕒 Recent Activity
        </h3>

        <div className="mt-5 space-y-3">
          <p>✅ Resume uploaded</p>
          <p>✅ Completed SQL Assessment</p>
          <p>✅ Built Netflix Data Analysis Project</p>
          <p>✅ Updated Skills</p>
        </div>
      </Card>

      {/* AI Suggestions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          🤖 AI Suggestions
        </h3>

        <div className="mt-5 space-y-3">
          <p>💡 Add your GitHub profile.</p>
          <p>💡 Upload your latest resume.</p>
          <p>💡 Improve React skills.</p>
          <p>💡 Complete one more AI project.</p>
        </div>
      </Card>

      {/* Portfolio */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">
          📂 Portfolio
        </h3>

        <div className="mt-4 space-y-2">
          <p>🔗 GitHub : {socialLinks.github || "Not added"}</p>
          <p>💼 LinkedIn : {socialLinks.linkedin || "Not added"}</p>
          <p>🌐 Portfolio : {socialLinks.portfolio || "Not added"}</p>

          <Button className="mt-4">
            📄 Download Resume
          </Button>
        </div>
      </Card>

    </div>
  );
}