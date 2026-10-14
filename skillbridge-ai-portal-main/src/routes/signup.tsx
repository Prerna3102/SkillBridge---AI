import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GraduationCap } from "lucide-react";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — SkillBridge AI" },
      {
        name: "description",
        content:
          "Create your free SkillBridge AI account and start your placement prep.",
      },
      {
        property: "og:title",
        content: "Sign up — SkillBridge AI",
      },
      {
        property: "og:description",
        content: "Start your placement journey today.",
      },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Normal Signup
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    if (password.length < 8) {
      alert(
        "⚠️ Password must be at least 8 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");

        navigate({ to: "/login" });
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);

      alert(
        "❌ Unable to connect to backend. Make sure Flask is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      const googleUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(googleUser)
      );

      alert("✅ Google account connected!");

      navigate({ to: "/dashboard" });
    }  catch (error: any) {
  console.error("Google signup error:", error);

  alert(
    `❌ Google signup failed!\n\nCode: ${
      error?.code || "unknown"
    }\n\nMessage: ${
      error?.message || "Unknown error"
    }`
  );
} finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-12">

        {/* Logo */}
        <Link
          to="/"
          className="mb-8 flex items-center gap-2"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-hero shadow-elegant">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>

          <span className="text-xl font-bold">
            SkillBridge{" "}
            <span className="text-primary">
              AI
            </span>
          </span>
        </Link>

        <Card className="w-full border-border/60 p-8 shadow-elegant">

          <h1 className="text-2xl font-bold">
            Create your account
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Free forever. No credit card required.
          </p>

          {/* Normal Signup */}
          <form
            className="mt-6 space-y-4"
            onSubmit={handleSignup}
          >

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full name
              </Label>

              <Input
                id="name"
                placeholder="Ananya Sharma"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {/* Create Account */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-hero shadow-elegant hover:opacity-90"
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </Button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="text-xs text-muted-foreground">
              OR
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google Signup */}
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleSignup}
          >
            {googleLoading
              ? "Connecting..."
              : "Continue with Google"}
          </Button>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>

        </Card>
      </div>
    </div>
  );
}