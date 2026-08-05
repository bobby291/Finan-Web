"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  TrendingUp,
  BarChart3,
  DollarSign,
  LifeBuoy,
  GraduationCap,
  Eye,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showBalance, setShowBalance] = useState(true);

    const [user, setUser] = useState({
      name: "",
      email: "",
    });

    const [wallet, setWallet] = useState({
      balance: 0,
      investedBalance: 0,
      totalProfit: 0,
      totalDeposits: 0,
      totalWithdrawals: 0,
    });

      // Logout Loader
    async function logout() {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });

      router.replace("/signup");
    }

      // Dashboard Loader
    async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const meResponse = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (meResponse.status === 401) {
        router.replace("/Login");
        return;
      }

      if (!meResponse.ok) {
        throw new Error("Unable to load user.");
      }

      const meData = await meResponse.json();

      setUser(meData.user);

      const accountResponse = await fetch("/api/account", {
        credentials: "include",
        cache: "no-store",
      });

      if (!accountResponse.ok) {
        throw new Error("Unable to load wallet.");
      }

      const accountData = await accountResponse.json();

      setWallet(accountData.account);
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

  useEffect(() => {
  loadDashboard();
}, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="h-14 w-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-6 text-zinc-400">
            Loading Dashboard...
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80"
          alt="Tesla Investment"
          fill
          priority
          className="object-cover opacity-[0.08]"
        />
      </div>

      {/* Header */}

      <header className="border-b border-yellow-500/10 backdrop-blur-xl bg-black/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}

        <div className="flex items-center gap-4">

            <Image
                src="/tesla.png"
                alt="Dwell Sync Logo"
                width={70}
                height={100}
                className="object-contain"
                priority
            /> 

        </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-amber-500 text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </header>

      {/* Body */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Greeting */}

        <div className="mb-8">

          <p className="text-zinc-400 text-lg">
            Welcome Back,
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Tesla {" "}
            <span className="text-yellow-400">
                Investments
            </span>
          </h1>

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

        {/* Balance Card */}

        <div className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-[#161616] via-[#101010] to-black shadow-[0_0_50px_rgba(245,158,11,0.15)]">

          {/* Glow */}

          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-yellow-500/10 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[2fr_auto] gap-10 p-10">

            {/* Left */}

            <div>

              <h3 className="text-4xl font-bold">
                Hello{" "}
                <span className="text-yellow-400">
                  {user.name}
                </span>
              </h3>

              <div className="flex items-center gap-3 mt-8">

                <span className="text-zinc-400 text-2xl">
                  Available Balance
                </span>

                <Eye
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-yellow-400"
                    size={24}
                />

              </div>

              <h1 className="text-6xl md:text-7xl font-extrabold mt-5 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                {showBalance
                  ? `$${wallet.balance.toFixed(2)}`
                  : "••••••"
                } USD
              </h1>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-6 mt-10">

                <div className="rounded-2xl bg-white/5 border border-yellow-500/10 p-5">

                  <p className="text-zinc-500 text-sm">
                    Invested Balance
                  </p>

                  <h4 className="text-2xl font-bold mt-2">
                    ${wallet.investedBalance.toFixed(2)}
                  </h4>

                </div>

                <div className="rounded-2xl bg-white/5 border border-yellow-500/10 p-5">

                  <p className="text-zinc-500 text-sm">
                    Total Profit
                  </p>

                  <h4 className="text-2xl font-bold mt-2 text-yellow-400">
                    ${wallet.totalProfit.toFixed(2)}
                  </h4>

                </div>

                <div className="rounded-2xl bg-white/5 border border-yellow-500/10 p-5">

                  <p className="text-zinc-500 text-sm">
                    Total Deposits
                  </p>

                  <h4 className="text-2xl font-bold mt-2">
                    ${wallet.totalDeposits.toFixed(2)}
                  </h4>

                </div>

                <div className="rounded-2xl bg-white/5 border border-yellow-500/10 p-5">

                  <p className="text-zinc-500 text-sm">
                    Total Withdrawal
                  </p>

                  <h4 className="text-2xl font-bold mt-2">
                    ${wallet.totalWithdrawals.toFixed(2)}
                  </h4>

                </div>

              </div>

            </div>

            {/* Withdraw */}

            <div className="flex lg:items-start items-end">

              <button className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black text-2xl font-bold flex items-center gap-4 hover:scale-105 duration-300">

                Withdraw

                <ArrowUpRight
                  size={26}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                />

              </button>

            </div>

          </div>

        </div>

        {/* PART 2 STARTS BELOW */}        
        
        {/* Dashboard Actions */}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

          {/* Deposit */}

          <Link 
            href={"/login"} 
           className="group rounded-3xl border border-yellow-500/10 bg-[#111111] hover:border-yellow-400 hover:bg-[#171717] transition-all duration-300 p-8">

            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 duration-300">
              <Wallet size={38} className="text-yellow-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Deposit
            </h3>

            <p className="mt-2 text-zinc-500 text-sm">
              Fund your investment wallet.
            </p>

          </Link>

          {/* Yield */}

          <button className="group rounded-3xl border border-yellow-500/10 bg-[#111111] hover:border-yellow-400 hover:bg-[#171717] transition-all duration-300 p-8">

            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 duration-300">
              <TrendingUp size={38} className="text-yellow-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Yield
            </h3>

            <p className="mt-2 text-zinc-500 text-sm">
              View investment returns.
            </p>

          </button>

          {/* Market */}

          <button className="group rounded-3xl border border-yellow-500/10 bg-[#111111] hover:border-yellow-400 hover:bg-[#171717] transition-all duration-300 p-8">

            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 duration-300">
              <BarChart3 size={38} className="text-yellow-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Market
            </h3>

            <p className="mt-2 text-zinc-500 text-sm">
              Live market statistics.
            </p>

          </button>

          {/* Profit */}

          <button className="group rounded-3xl border border-yellow-500/10 bg-[#111111] hover:border-yellow-400 hover:bg-[#171717] transition-all duration-300 p-8">

            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 duration-300">
              <DollarSign size={38} className="text-yellow-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Profit
            </h3>

            <p className="mt-2 text-zinc-500 text-sm">
              Track your earnings.
            </p>

          </button>

          {/* Support */}

          <button className="group rounded-3xl border border-yellow-500/10 bg-[#111111] hover:border-yellow-400 hover:bg-[#171717] transition-all duration-300 p-8">

            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 duration-300">
              <LifeBuoy size={38} className="text-yellow-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Support
            </h3>

            <p className="mt-2 text-zinc-500 text-sm">
              Contact our support team.
            </p>

          </button>

          {/* Learn */}

          <button className="group rounded-3xl border border-yellow-500/10 bg-[#111111] hover:border-yellow-400 hover:bg-[#171717] transition-all duration-300 p-8">

            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 duration-300">
              <GraduationCap size={38} className="text-yellow-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Learn
            </h3>

            <p className="mt-2 text-zinc-500 text-sm">
              Investment education.
            </p>

          </button>

        </div>

        {/* Bottom Buttons */}

        <div className="grid md:grid-cols-2 gap-6 mt-14">

          <button className="h-20 rounded-3xl bg-[#121212] border border-yellow-500/10 hover:border-yellow-400 text-2xl font-bold transition-all duration-300">
            Transaction History
          </button>

          <button className="h-20 rounded-3xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black text-2xl font-bold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">

            <GraduationCap size={30} />

            Learn More

          </button>

        </div>

      </section>

    </main>
  );
}
