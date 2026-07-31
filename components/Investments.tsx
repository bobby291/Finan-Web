"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  TrendingUp,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";

const investments = [
  {
    title: "PORTFOLIOS",
    description:
      "Diversified investment portfolios designed to balance risk and maximize long-term growth.",
    icon: BriefcaseBusiness,
  },
  {
    title: "INDEXES",
    description:
      "Gain exposure to top-performing indexes and sectors driving the future of innovation.",
    icon: TrendingUp,
  },
  {
    title: "RETURNS",
    description:
      "Enjoy competitive returns with transparent performance and consistent long-term growth.",
    icon: CircleDollarSign,
  },
];

export default function Investment() {
  return (
    <section id="#investment" className="relative overflow-hidden bg-black py-16 md:py-20 lg:py-24">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4A017]/10 blur-[150px] md:h-96 md:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

        {/* Heading */}

        <div className="mb-12 text-center lg:mb-16">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A017] sm:text-sm">
            Investment Options
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">

            <span className="text-white">
              Smart Portfolios.
            </span>

            <span className="text-[#D4A017]">
              {" "}Stronger Returns.
            </span>

          </h2>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {investments.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[#D4A017]/40
                bg-gradient-to-br
                from-[#b8860b]
                via-[#b98a16]
                to-[#8a6610]
                p-6
                sm:p-8
                lg:p-10
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_60px_rgba(212,160,23,.35)]
                "
              >

                {/* Hover Glow */}

                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative z-10">

                  {/* Icon */}

                  <div className="flex flex-col items-center text-center gap-5 sm:flex-row sm:text-left">

                    <div
                      className="
                      flex
                      h-20
                      w-20
                      sm:h-24
                      sm:w-24
                      lg:h-28
                      lg:w-28
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      shadow-xl
                      "
                    >

                      <Icon
                        className="text-[#D4A017]"
                        size={42}
                      />

                    </div>

                    <h3 className="text-2xl font-black text-white sm:text-3xl">
                      {item.title}
                    </h3>

                  </div>

                  {/* Description */}

                  <p className="mt-6 text-center text-base leading-8 text-white/90 sm:text-left sm:text-lg lg:text-xl lg:leading-9">
                    {item.description}
                  </p>

                  {/* Divider */}

                  <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-[#D4A017] sm:mx-0" />

                  {/* Button */}

                  <Link
                    href="/investment"
                    className="
                    mt-8
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    border
                    border-[#D4A017]
                    py-4
                    text-base
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-black
                    hover:text-[#D4A017]
                    sm:w-auto
                    sm:px-6
                    "
                  >

                    Learn More

                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-2"
                    />

                  </Link>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
