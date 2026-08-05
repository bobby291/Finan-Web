"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  LogOut,
  TriangleAlert,
  Lock,
  WalletIcon,
  Send,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Wallet } from "@/lib/types";

export default function AdminPage() {

  const router = useRouter();

  const [adminSecret, setAdminSecret] = useState("");

  const [authorized, setAuthorized] = useState(false);

  const [wallets, setWallets] = useState<Wallet[]>([]);

  const [email, setEmail] = useState("");

  const [amount, setAmount] = useState("");

  const [setExactBalance, setSetExactBalance] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [updatedWallet, setUpdatedWallet] = useState<UpdatedWallet | null>(null);


/** Update Wallet */
interface UpdatedWallet {
  email: string;
  oldBalance: number;
  newBalance: number;
}

useEffect(() => {
    if (authorized) {
      loadWallets();
    }
}, [authorized])

    async function unlockAdmin() {
    if (!adminSecret.trim()) {
      setError("Please enter the admin secret.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/wallets", {
        method: "GET",
        headers: {
          "x-admin-secret": adminSecret,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Invalid admin secret."
        );
      }

      setWallets(data.wallets || []);
      setAuthorized(true);
      setSuccess("Admin unlocked successfully.");
    } catch (err: any) {
      setAuthorized(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function injectFunds() {
    if (!email.trim()) {
      setError("Please enter the user's email.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Save the current balance before updating
      const previousWallet = wallets.find(
        (wallet) =>
          wallet.email.toLowerCase() === email.trim().toLowerCase()
      );

      const oldBalance = previousWallet
        ? previousWallet.balance
        : 0;

      const body = setExactBalance
        ? {
            email,
            balance: Number(amount),
          }
        : {
            email,
            amount: Number(amount),
          };

      const res = await fetch("/api/admin/inject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Unable to update wallet."
        );
      }

      setUpdatedWallet({
        email: data.wallet.email,
        oldBalance,
        newBalance: data.wallet.balance,
      });

      setSuccess(data.message);

      // Refresh wallet list
      const latestWallets = await loadWallets();

        if (latestWallets) {
          const wallet = latestWallets.find(
            (w: Wallet) =>
              w.email.toLowerCase() ===
              email.toLowerCase()
        );

        if (wallet) {
            setUpdatedWallet({
              email: wallet.email,
              oldBalance,
              newBalance: wallet.balance,
            });
        }
      }

      // Clear form
      setEmail("");
      setAmount("");
      setSetExactBalance(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setAuthorized(false);
      setWallets([]);
      setUpdatedWallet(null);

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

    async function loadWallets():
    Promise<Wallet[] | null> {
      try {
        const res = await fetch("/api/admin/wallets", {
          headers: {
            "x-admin-secret": adminSecret,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || "Unable to load wallets."
          );
        }

        setWallets(data.wallets);

        return data.wallets as Wallet[];
      } catch (err: any) {
        setError(err.message);
        return null;
      }
    }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=80"
          alt="Tesla"
          fill
          priority
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-xl font-bold text-black">
              T
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Tesla Investment
              </h1>
              <p className="text-sm text-yellow-400">
                Admin Portal
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-yellow-500/30 
            bg-gradient-to-r from-yellow-300 to-amber-500 px-5 py-3 font-semibold text-black 
            transition hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Center Title */}
        <div className="mb-12 text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/10">
              <ShieldCheck
                size={42}
                className="text-yellow-400"
              />
            </div>
          </div>
          <h1 className="text-6xl font-extrabold tracking-wide">
            <span className="text-yellow-400">
              ADMIN
            </span>
            <br />
            DASHBOARD
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-zinc-400">
            Manage user wallets, balances and platform funds securely
            using the Tesla Investment administration panel.
          </p>
        </div>

        {/* Grid Starts Here */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Demo Warning Card */}
          <div className="lg:col-span-2 rounded-3xl border border-yellow-500/20 bg-[#111111]/90 backdrop-blur-xl p-8">
            <div className="flex items-start gap-5">
              <div className="h-16 w-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <TriangleAlert
                  size={34}
                  className="text-yellow-400"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">
                  DEMO ADMIN TOOL
                </h2>
                <p className="mt-3 text-zinc-400 text-lg leading-8">
                  Balances modified here are
                  <span className="text-yellow-400 font-semibold">
                    {" "}NOT{" "}
                  </span>
                  real funds. This dashboard is intended for
                  demonstration and development purposes only.
                </p>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Admin Secret */}
            <div className="rounded-3xl border border-yellow-500/20 bg-[#111111]/90 backdrop-blur-xl p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-300/20 to-amber-500/20 border border-yellow-500/30 flex items-center justify-center">
                  <Lock
                    size={30}
                    className="text-yellow-400"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    ADMIN SECRET
                  </h2>
                  <p className="text-zinc-500 mt-1">
                    Authenticate administrator access
                  </p>
                </div>
              </div>

              {/* Secret Input */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter admin secret"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  className="w-full h-16 rounded-2xl border border-yellow-500/20 bg-black/40 px-6 pr-14 text-lg outline-none placeholder:text-zinc-500 focus:border-yellow-400"
                />
                <Lock
                  size={22}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-yellow-400"
                />
              </div>

              {/* Unlock */}
              <button 
                onClick={unlockAdmin}
                disabled={loading}
                className="mt-8 w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black font-bold text-xl transition hover:scale-[1.02]">
                {loading ? "Unlocking..." : "Unlock"}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}

            {success && (
              <p className="mt-4 text-green-400 text-sm">{success}</p>
            )}

            {/* Inject Wallet Balance */}
            {authorized && (

            
            <div className="rounded-3xl border border-yellow-500/20 bg-[#111111]/90 backdrop-blur-xl p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="h-16 w-16 rounded-full border border-yellow-500/30 bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center">
                  <WalletIcon
                    size={30}
                    className="text-yellow-400"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    INJECT WALLET BALANCE
                  </h2>
                  <p className="text-zinc-500 mt-1">
                    Credit or update a user's wallet.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block mb-3 text-lg font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => 
                  setEmail(e.target.value)}
                  className="w-full h-16 rounded-2xl border border-yellow-500/20 bg-black/40 
                  px-6 text-lg outline-none placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-3 text-lg font-medium text-zinc-300">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => 
                    setAmount(e.target.value)}
                    className="w-full h-16 rounded-2xl border border-yellow-500/20 bg-black/40 px-6 pr-24 text-lg outline-none placeholder:text-zinc-500 focus:border-yellow-400"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-yellow-400 font-semibold">
                    USD
                  </span>
                </div>
              </div>

              {/* Checkbox */}
              <label className="mt-6 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-yellow-400"
                  checked={setExactBalance}
                  onChange={(e) => setSetExactBalance(e.target.checked)}
                />
                <span className="text-zinc-300">
                  Set Exact Balance
                </span>
              </label>

              {/* Button */}
              <button 
                onClick={injectFunds}
                disabled={loading}
                className="mt-8 w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-300 
                via-yellow-400 to-amber-500 text-black text-xl font-bold flex items-center 
                justify-center gap-3 transition hover:scale-[1.02] disable:opacity-60">
                <Send size={22} />
                {loading ? "Injecting..." : "Inject Funds"}
              </button>
            </div>
            )}
          </div>

          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}

          {success && (
            <p className="mt-4 text-green-400 text-sm">{success}</p>
          )}

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Wallet List */}
            <div className="rounded-3xl border border-yellow-500/20 bg-[#111111]/90 backdrop-blur-xl p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="h-16 w-16 rounded-full border border-yellow-500/30 bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center">
                  <WalletIcon
                    size={30}
                    className="text-yellow-400"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    WALLETS
                  </h2>
                  <p className="text-zinc-500 mt-1">
                    Registered investment accounts.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-yellow-500/20">
                <table className="w-full">
                  <thead className="bg-yellow-500/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-yellow-400">
                        Email
                      </th>
                      <th className="px-6 py-4 text-right text-yellow-400">
                        Balance
                      </th>
                    </tr>
                  </thead>
                    <tbody>
                      {wallets.length === 0 ? (
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-8 text-center text-zinc-500"
                          >
                            No wallets found.
                          </td>
                        </tr>
                      ) : (
                        wallets.map((wallet) => (
                          <tr
                            key={wallet.email}
                            className="border-t border-yellow-500/10 hover:bg-yellow-500/5"
                          >
                            <td className="px-6 py-5">
                              {wallet.email}
                            </td>

                            <td className="px-6 py-5 text-right font-semibold">
                              $
                              {Number(wallet.balance).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
              </div>

              <button 
                onClick={loadWallets}
                disabled={loading}
                className="mt-8 w-full h-14 rounded-2xl border border-yellow-500/20 
              bg-yellow-500/10 text-yellow-400 font-semibold flex items-center 
              justify-center gap-3 hover:bg-yellow-500/20 transition">
                <RefreshCcw size={20} />
                {loading ? "Refreshing.." : "Refresh List"}
              </button>
            </div>

            {/* Wallet Updated Successfully */}
            <div className="rounded-3xl border border-yellow-500/20 bg-[#111111]/90 backdrop-blur-xl p-8 overflow-hidden relative">
              {/* Background Glow */}
              <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-[100px]" />
              <div className="relative">
                <div className="flex items-center gap-5 mb-8">
                  <div className="h-16 w-16 rounded-full border border-yellow-500/30 bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center">
                    <CheckCircle2
                      size={30}
                      className="text-yellow-400"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-yellow-400">
                      WALLET UPDATED SUCCESSFULLY
                    </h2>
                    <p className="text-zinc-500 mt-1">
                      Wallet balance has been updated.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {!updatedWallet ? (
                    <div className="py-8 text-center text-zinc-500">
                      No wallet has been updated yet.
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-zinc-500">
                          Email
                        </p>

                        <h3 className="text-xl font-semibold">
                          {updatedWallet.email}
                        </h3>
                      </div>

                      <div>
                        <p className="text-zinc-500">
                          Old Balance
                        </p>

                        <h3 className="text-3xl font-bold">
                          $
                          {Number(
                            updatedWallet.oldBalance
                          ).toFixed(2)}
                        </h3>
                      </div>

                      <div>
                        <p className="text-zinc-500">
                          New Balance
                        </p>

                        <h2 className="mt-2 text-5xl font-extrabold text-yellow-400">
                          $
                          {Number(
                            updatedWallet.newBalance
                          ).toFixed(2)}
                        </h2>
                      </div>
                    </>
                  )}
                </div>

                {/* Decorative Chart */}
                <div className="mt-10 h-52 rounded-2xl border border-yellow-500/10 bg-gradient-to-br from-yellow-500/5 to-transparent flex items-end justify-evenly px-6 pb-6">
                  <div className="w-8 h-8 bg-yellow-400/20 rounded-t"></div>
                  <div className="w-8 h-14 bg-yellow-400/30 rounded-t"></div>
                  <div className="w-8 h-20 bg-yellow-400/40 rounded-t"></div>
                  <div className="w-8 h-28 bg-yellow-400/50 rounded-t"></div>
                  <div className="w-8 h-36 bg-yellow-400/60 rounded-t"></div>
                  <div className="w-8 h-48 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
