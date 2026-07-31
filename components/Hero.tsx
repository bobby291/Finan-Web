"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="#hero" className="relative overflow-hidden bg-black">

      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2200&q=80"
        alt="Stock Market"
        fill
        priority
        className="object-cover opacity-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />

      {/* Gold Glow */}
      <div className="absolute -right-24 top-20 h-[350px] w-[350px] rounded-full bg-[#D4A017]/20 blur-[120px] lg:h-[600px] lg:w-[600px]" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-32 pb-20 sm:px-8 lg:px-10">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <div className="order-2 lg:order-1">

            <span className="inline-block rounded-full border border-[#D4A017]/40 bg-[#D4A017]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A017] sm:text-sm">
              Tesla Investment Platform
            </span>

            <h1 className="mt-8 leading-none">

              <span className="block text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl">
                TESLA
              </span>

              <span className="mt-2 block text-4xl font-black text-[#D4A017] sm:text-5xl md:text-6xl xl:text-7xl">
                INVESTMENT
              </span>

            </h1>

            <div className="mt-8 space-y-3">

              <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-white sm:text-xl lg:text-2xl">
                Driven by Innovation.
              </h2>

              <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-[#D4A017] sm:text-xl lg:text-2xl">
                Powered by Vision.
              </h2>

            </div>

            <p className="mt-8 max-w-xl text-base leading-8 text-gray-300 sm:text-lg lg:text-xl lg:leading-10">
              Join the future of sustainable wealth through
              cutting-edge investment opportunities inspired by
              innovation. Build your portfolio with confidence
              and watch your investments grow.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <button
                className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#D4A017]
                px-8
                py-4
                text-base
                font-bold
                text-black
                shadow-[0_0_40px_rgba(212,160,23,.45)]
                transition
                hover:bg-[#E8B52E]
                sm:text-lg
                "
              >
                Start Investing

                <ArrowRight size={22} />

              </button>

              <button
                className="
                rounded-xl
                border
                border-[#D4A017]
                px-8
                py-4
                font-semibold
                text-[#D4A017]
                transition
                hover:bg-[#D4A017]
                hover:text-black
                "
              >
                Learn More
              </button>

            </div>

          </div>          {/* RIGHT CONTENT */}

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">

            <div className="relative w-full max-w-lg lg:max-w-2xl">

              {/* Background Chart */}

              <Image
                src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1400&q=80"
                alt="Market Chart"
                width={900}
                height={700}
                className="rounded-3xl border border-[#D4A017]/20 object-cover shadow-[0_20px_60px_rgba(0,0,0,.6)]"
              />

              {/* Floating Coin Image */}

              <Image
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=900&q=80"
                alt="Bitcoin Coins"
                width={260}
                height={260}
                className="absolute -bottom-10 -left-8 hidden rounded-2xl border border-[#D4A017]/30 shadow-2xl lg:block"
              />

              {/* Profit Card */}

              <div className="absolute right-4 top-4 rounded-2xl border border-[#D4A017]/30 bg-black/70 p-5 backdrop-blur-md">

                <p className="text-sm text-gray-400">
                  Portfolio Growth
                </p>

                <h3 className="mt-2 text-3xl font-bold text-[#D4A017]">
                  +18.4%
                </h3>

                <p className="mt-1 text-sm text-green-400">
                  ▲ This Month
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D4A017]/40" />

    </section>
  );
}
