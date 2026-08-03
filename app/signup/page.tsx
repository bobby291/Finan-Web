"use client";  
  
import Image from "next/image";  
import Link from "next/link"; 
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import {  
  User,  
  Mail,  
  Lock,  
  Eye,  
  ArrowRight,  
  ArrowLeft,  
} from "lucide-react";  
  
export default function SignupPage() { 
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // handle Signup controller
    async function handleSignup(
    e: React.FormEvent<HTMLFormElement>
    ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
        const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error);
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
      <div className="hidden lg:flex w-1/2 relative">  
        <Image  
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"  
          alt="Tesla"  
          fill  
          priority  
          className="object-cover"  
        />  
  
        <div className="absolute inset-0 bg-black/50" />  
  
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />  
      </div>  
  
      {/* RIGHT SIDE */}  
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-14">  
        <div className="w-full max-w-xl">  
  
          {/* Heading */}  
  
          <h1 className="text-5xl font-bold leading-tight">  
            Create Your Account.  
          </h1>  
  
          <h2 className="text-5xl font-bold text-amber-400 mt-2">  
            Start Investing Today.  
          </h2>  
  
          <p className="text-zinc-400 text-lg mt-8 leading-8">  
            Create your Tesla Investment account in seconds  
            <br />  
            and begin your investment journey.  
          </p>  
  
          {/* FORM */}  
  
          <form 
          onSubmit={handleSignup}
          className="space-y-8 mt-14">  
  
            {/* Full Name */}  
  
            <div>  
              <label className="block mb-3 font-semibold text-xl">  
                Full Name  
              </label>  
  
              <div className="flex items-center border border-zinc-700 rounded-2xl h-16 px-5 bg-zinc-950">  
                <User className="text-amber-400 mr-4" size={26} />  
  
                <input  
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}  
                  placeholder="Enter your full name"  
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500"  
                />  
              </div>  
            </div>  
  
            {/* Email */}  
  
            <div>  
              <label className="block mb-3 font-semibold text-xl">  
                Email Address  
              </label>  
  
              <div className="flex items-center border border-zinc-700 rounded-2xl h-16 px-5 bg-zinc-950">  
                <Mail className="text-amber-400 mr-4" size={26} />  
  
                <input  
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email address"  
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500"  
                />  
              </div>  
            </div>  
  
            {/* Password */}  
  
            <div>  
              <label className="block mb-3 font-semibold text-xl">  
                Password  
              </label>  
  
              <div className="flex items-center border border-zinc-700 rounded-2xl h-16 px-5 bg-zinc-950">  
                <Lock className="text-amber-400 mr-4" size={26} />  
  
                <input  
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  
                  placeholder="Enter your password"  
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500"  
                />  
  
                <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}>  
                  <Eye className="text-amber-400" size={24} />  
                </button>  
              </div>  
  
              <p className="text-zinc-500 text-sm mt-3">  
                Password must be at least 8 characters long.  
              </p>  
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
  
            {/* Button */}  
  
            <button 
              type="submit"
              disabled={loading} 
              className={`w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-black font-bold text-2xl flex items-center justify-center gap-5 hover:scale-[1.02] duration-300 ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"}`}  
            >  {
              loading ? "Creating Account...." : "CREATE ACCOUNT"
            }
              {
                !loading && <ArrowRight size={30} />  
              }
              
            </button>  
  
            {/* Divider */}  
  
            <div className="flex items-center gap-5 pt-2">  
              <div className="flex-1 border-t border-zinc-700"></div>  
  
              <span className="text-zinc-500">or</span>  
  
              <div className="flex-1 border-t border-zinc-700"></div>  
            </div>  
  
            {/* Login */}  
  
            <p className="text-center text-xl text-zinc-300">  
              Already have an account?{" "}  
              <Link  
                href="/Login"  
                className="text-amber-400 font-semibold hover:text-yellow-300"  
              >  
                Login  
              </Link>  
            </p>  
  
            {/* Home */}  
  
            <div className="flex justify-center pt-4">  
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
      </div>  
    </main>  
  );  
}  
