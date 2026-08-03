"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import {
  Mail,
  Lock,
  Eye,
  UserCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

       // handle Login controller
    async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
    ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
        const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Login failed");
        }

      router.push("/dashboard");

    } catch (err) {
        setError(
        err instanceof Error
            ? err.message
            : "Something went wrong."
        );
    } finally {
        setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
          alt="Tesla"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10 bg-black">
        <div className="w-full max-w-xl border border-amber-400/60 rounded-[30px] px-8 md:px-10 py-10">

          {/* ICON */}

          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full border-2 border-amber-400 flex items-center justify-center">
              <UserCircle2
                size={52}
                className="text-amber-400"
                strokeWidth={1.6}
              />
            </div>
          </div>

          {/* HEADING */}

          <h1 className="text-center mt-8 text-5xl font-bold leading-tight">
            Welcome Back.
          </h1>

          <h2 className="text-center text-amber-400 text-5xl font-bold leading-tight mt-2">
            Continue Your
            <br />
            Investment Journey.
          </h2>

          <p className="text-center text-zinc-400 text-xl mt-8 leading-9">
            Sign in to access your dashboard, portfolio,
            <br />
            wallet balance, and investment insights.
          </p>

          {/* FORM */}

          <form 
          onSubmit={handleLogin}
          className="mt-12 space-y-8">

            {/* EMAIL */}

            <div>
              <label className="block mb-3 text-xl font-semibold">
                Email Address
              </label>

              <div className="h-16 rounded-2xl border border-zinc-700 bg-[#111111] flex items-center px-5">
                <Mail
                  className="text-amber-400 mr-4"
                  size={26}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block mb-3 text-xl font-semibold">
                Password
              </label>

              <div className="h-16 rounded-2xl border border-zinc-700 bg-[#111111] flex items-center px-5">
                <Lock
                  className="text-amber-400 mr-4"
                  size={26}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500"
                />

                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  <Eye
                    size={24}
                    className="text-amber-400"
                  />
                </button>
              </div>

              <div className="flex justify-end mt-4">
                <Link
                  href="/"
                  className="text-amber-400 hover:text-yellow-300 transition"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {error && (
                <div 
                className="
                rounded-2xl 
                border 
                border-red-500 
                bg-red-500/10 
                px-5 
                py-4 
                text-base">
                  {error}

                </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-black font-bold text-2xl flex justify-center items-center gap-5 hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In...." : "LOGIN"}
              <ArrowRight size={30} />
            </button>

            {/* DIVIDER */}

            <div className="flex items-center gap-5">
              <div className="flex-1 border-t border-zinc-700"></div>

              <span className="text-zinc-500">or</span>

              <div className="flex-1 border-t border-zinc-700"></div>
            </div>

            {/* CREATE ACCOUNT */}

            <p className="text-center text-xl text-zinc-300">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-amber-400 font-semibold hover:text-yellow-300"
              >
                Create Account
              </Link>
            </p>

            {/* BACK */}

            <div className="flex justify-center pt-3">
              <Link
                href="/"
                className="flex items-center gap-3 text-amber-400 hover:text-yellow-300 text-xl"
              >
                <ArrowLeft size={22} />
                Back to Home
              </Link>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}