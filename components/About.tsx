"use client";

import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <section id="#about" className="relative overflow-hidden bg-black py-20 lg:py-32">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#D4A017]/10 blur-[150px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">

        {/* LEFT */}

        <div>

          <span className="inline-block rounded-full border border-[#D4A017]/30 bg-[#D4A017]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A017] sm:text-sm">
            About Tesla Investment
          </span>

          <h2 className="mt-8 leading-tight">

            <span className="block text-4xl font-black text-white sm:text-5xl lg:text-6xl">
              Invest in the Future.
            </span>

            <span className="mt-2 block text-4xl font-black text-[#D4A017] sm:text-5xl lg:text-6xl">
              Invest in Tesla.
            </span>

          </h2>

          <p className="mt-8 text-base leading-8 text-gray-300 sm:text-lg lg:text-xl lg:leading-10">

            Tesla Investment provides investors with access to
            innovative opportunities inspired by one of the
            worlds most recognized technology companies.

            <br />
            <br />

            Through intelligent portfolio strategies,
            transparent market analysis, and long-term wealth
            planning, investors can confidently grow their
            financial future.

            <br />
            <br />

            Join thousands of investors building sustainable
            wealth through technology-driven investment.

          </p>

          <button
            className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-xl
            border
            border-[#D4A017]
            px-7
            py-4
            font-semibold
            text-[#D4A017]
            transition
            hover:bg-[#D4A017]
            hover:text-black
            "
          >
            Learn More

            <ArrowUpRight size={20} />

          </button>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80"
            alt="Stock Trading Dashboard"
            width={900}
            height={650}
            className="rounded-3xl border border-[#D4A017]/20 object-cover shadow-2xl"
          />

          {/* Overlay */}

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          {/* Floating Card */}

          <div className="absolute bottom-6 left-6 rounded-2xl border border-[#D4A017]/30 bg-black/80 p-5 backdrop-blur-lg">

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-[#D4A017]/20 p-3">

                <TrendingUp
                  className="text-[#D4A017]"
                  size={28}
                />

              </div>

              <div>

                <p className="text-sm text-gray-400">
                  Annual Growth
                </p>

                <h3 className="text-3xl font-bold text-[#D4A017]">
                  +28.4%
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
