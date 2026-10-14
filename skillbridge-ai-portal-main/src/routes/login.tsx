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

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SkillBridge AI" },
      {
        name: "description",
        content: "Log in to your SkillBridge AI account.",
      },
      {
        property: "og:title",
        content: "Log in — SkillBridge AI",
      },
      {
        property: "og:description",
        content: "Access your placement prep dashboard.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Normal email/password login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("⚠️ Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );

        alert("✅ Login successful!");

        navigate({ to: "/dashboard" });
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
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

      alert("✅ Google login successful!");

      navigate({ to: "/dashboard" });
    }  catch (error: any) {
  console.error("Google login error:", error);

  alert(
    `❌ Google login failed!\n\nCode: ${
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
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Log in to continue your prep journey.
          </p>

          {/* Email Login */}
          <form
            className="mt-6 space-y-4"
            onSubmit={handleLogin}
          >

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

              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password
                </Label>

                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() =>
                    alert(
                      "Password reset will be available soon."
                    )
                  }
                >
                  Forgot?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-hero shadow-elegant hover:opacity-90"
            >
              {loading
                ? "Logging in..."
                : "Log in"}
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

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleLogin}
          >
            {googleLoading
              ? "Connecting..."
              : "Continue with Google"}
          </Button>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>

        </Card>
      </div>
    </div>
  );
}