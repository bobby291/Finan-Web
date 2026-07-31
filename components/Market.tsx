"use client";

import {
  TrendingUp,
  DollarSign,
  BarChart3,
  ChartNoAxesCombined,
} from "lucide-react";

const stats = [
  {
    title: "Market Cap",
    value: "$795.76B",
    icon: DollarSign,
  },
  {
    title: "52 Week High",
    value: "$849.11",
    icon: TrendingUp,
  },
  {
    title: "P/E Ratio",
    value: "73.45",
    icon: BarChart3,
  },
  {
    title: "Dividend Yield",
    value: "N/A",
    icon: ChartNoAxesCombined,
  },
];

export default function Market() {
  return (
    <section id="#market" className="relative bg-black py-24 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-40 top-32 w-96 h-96 rounded-full bg-[#D4A017]/10 blur-[180px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-[430px_1fr] gap-12">

          {/* LEFT */}

          <div>

            <p className="uppercase tracking-[0.25em] text-[#D4A017] text-sm font-semibold">
              Market Insights
            </p>

            <h2 className="mt-3 text-5xl font-bold leading-tight">

              <span className="text-white">
                Tesla Market.
              </span>

              <span className="text-[#D4A017]">
                {" "}Stronger Than Ever.
              </span>

            </h2>

            <p className="mt-10 text-gray-300 text-xl leading-10">

              Tesla continues to dominate the global market with
              groundbreaking technology, expanding industries,
              and relentless innovation.

              <br />
              <br />

              Strong investor confidence continues driving
              exceptional long-term growth across global markets.

            </p>

            <div className="mt-14">

              <p className="uppercase text-white text-2xl font-bold">
                Tesla Net Worth (Market Cap)
              </p>

              <h1 className="mt-5 text-[#D4A017] text-7xl font-black">
                $795.76B
              </h1>

              <div className="flex items-end gap-4 mt-6">

                <span className="text-green-400 text-5xl font-bold">
                  +12.45%
                </span>

                <span className="text-gray-300 text-xl mb-2">
                  Past 6 Months
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            {/* CHART */}

            <div className="rounded-3xl border border-[#D4A017]/30 bg-[#090909] p-8">

              <h3 className="text-3xl text-white font-bold mb-6">
                Tesla Stock Performance (6 Months)
              </h3>

              <svg
                viewBox="0 0 900 420"
                className="w-full h-auto"
              >

                {/* Grid */}

                {[...Array(7)].map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 60}
                    x2="900"
                    y2={i * 60}
                    stroke="#202020"
                  />
                ))}

                {[...Array(9)].map((_, i) => (
                  <line
                    key={i}
                    x1={i * 112}
                    y1="0"
                    x2={i * 112}
                    y2="420"
                    stroke="#202020"
                  />
                ))}

                {/* Area */}

                <path
                  d="
                  M0 330
                  L70 290
                  L140 230
                  L210 250
                  L280 180
                  L350 210
                  L420 170
                  L490 190
                  L560 120
                  L630 140
                  L700 90
                  L770 110
                  L840 60
                  L900 40
                  L900 420
                  L0 420
                  Z
                  "
                  fill="rgba(212,160,23,.08)"
                />

                {/* Line */}

                <path
                  d="
                  M0 330
                  L70 290
                  L140 230
                  L210 250
                  L280 180
                  L350 210
                  L420 170
                  L490 190
                  L560 120
                  L630 140
                  L700 90
                  L770 110
                  L840 60
                  L900 40
                  "
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

              </svg>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                    rounded-2xl
                    border
                    border-[#D4A017]/30
                    bg-[#090909]
                    p-6
                    hover:border-[#D4A017]
                    transition
                    duration-300
                    "
                  >

                    <Icon
                      className="text-[#D4A017]"
                      size={34}
                    />

                    <p className="mt-4 text-gray-300 text-lg">
                      {item.title}
                    </p>

                    <h4 className="mt-2 text-[#D4A017] text-4xl font-bold">
                      {item.value}
                    </h4>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
