"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "David Johnson",
    role: "Investor",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    message:
      "Tesla Investment changed my financial future. The returns have been beyond my expectations!",
  },
  {
    name: "Sophia Martinez",
    role: "Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    message:
      "Professional, transparent, and highly rewarding. I'm proud to be part of the Tesla family.",
  },
  {
    name: "Michael Anderson",
    role: "Business Owner",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    message:
      "The best investment decision I've made. Outstanding growth and support!",
  },
];

export default function Testimonies() {
  return (
    <section id="#testimonies" className="relative overflow-hidden bg-black py-24">

      {/* Gold Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#D4A017]/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <div className="mb-16">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A017]">
            Testimonies
          </p>

          <h2 className="mt-3 text-5xl font-bold">

            <span className="text-white">
              Trusted by Investors.
            </span>

            <span className="text-[#D4A017]">
              {" "}Proven by Results.
            </span>

          </h2>

        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="
              group
              rounded-3xl
              border
              border-[#D4A017]/35
              bg-[#070707]
              p-8
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-[#D4A017]
              hover:shadow-[0_20px_60px_rgba(212,160,23,.20)]
              "
            >

              <div className="flex items-start gap-6">

                {/* Profile */}

                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-[3px] border-[#D4A017]/70">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="flex-1">

                  <Quote
                    className="mb-4 text-[#D4A017]"
                    size={34}
                    strokeWidth={2.5}
                  />

                  <p className="text-lg leading-9 text-gray-300">
                    {item.message}
                  </p>

                  {/* Stars */}

                  <div className="mt-6 flex gap-1">

                    {[1,2,3,4,5].map((star)=>(
                      <Star
                        key={star}
                        size={18}
                        className="fill-[#D4A017] text-[#D4A017]"
                      />
                    ))}

                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-lg text-gray-400">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Pagination */}

        <div className="mt-12 flex justify-center gap-4">

          <span className="h-4 w-4 rounded-full bg-[#D4A017]" />

          <span className="h-4 w-4 rounded-full bg-white/20" />

          <span className="h-4 w-4 rounded-full bg-white/20" />

          <span className="h-4 w-4 rounded-full bg-white/20" />

        </div>

      </div>

    </section>
  );
}
