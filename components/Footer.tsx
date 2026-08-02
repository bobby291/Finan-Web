"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";

import {
  Zap,
  Globe,
  Mail,
  Icon,
  Phone,
  MapPin,
  User,
} from "lucide-react"

const navigation = [
  "Home",
  "Investment",
  "About",
  "Market",
  "Testimonies",
];

const quickLinks = [
  "Portfolios",
  "Indexes",
  "Returns",
  "Market Insights",
  "FAQ",
];

export default function Footer() {
  return (
    <footer id="#contact" className="relative overflow-hidden border-t border-[#D4A017]/30 bg-[#050505]">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#D4A017]/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_auto]">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center">

                <Image
                    src="/tesla.png"
                    alt="Dwell Sync Logo"
                    width={170}
                    height={170}
                    className="object-contain"
                    priority
                /> 

              </div>

              <div>

                <h2 className="text-3xl font-bold tracking-[0.18em] text-white">
                  TESLA
                </h2>

                <p className="text-2xl font-semibold tracking-[0.14em] text-[#D4A017]">
                  INVESTMENT
                </p>

              </div>

            </div>

            <p className="mt-8 text-xl leading-9 text-gray-300">
              Invest in innovation.
              <br />
              Invest in the future.
            </p>

            {/* Social */}

            <div className="mt-8 flex gap-4">

              {[
                FaXTwitter,
                ,
                FaYoutube,
                Globe,
              ].map((Icon, index) => (
                <div
                  key={index}
                  className="
                  flex
                  h-12
                  w-12
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D4A017]
                  text-[#D4A017]
                  transition-all
                  duration-300
                  hover:bg-[#a39162]
                  hover:text-black
                  "
                >
                 {/**<Icon size={20} /> */}
                </div>
              ))}

            </div>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="mb-6 text-xl font-bold uppercase text-[#D4A017]">
              Navigation
            </h3>

            <ul className="space-y-4">

              {navigation.map((item) => (

                <li key={item}>

                  <Link
                    href="#"
                    className="text-lg text-gray-300 transition hover:text-[#D4A017]"
                  >
                    {item}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-bold uppercase text-[#D4A017]">
              Quick Links
            </h3>

            <ul className="space-y-4">

              {quickLinks.map((item) => (

                <li key={item}>

                  <Link
                    href="#"
                    className="text-lg text-gray-300 transition hover:text-[#D4A017]"
                  >
                    {item}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold uppercase text-[#D4A017]">
              Contact Us
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">

                <Mail
                  className="mt-1 text-[#D4A017]"
                  size={22}
                />

                <p className="text-lg text-gray-300">
                  invest@teslainvestment.com
                </p>

              </div>

              <div className="flex items-start gap-4">

                <Phone
                  className="mt-1 text-[#D4A017]"
                  size={22}
                />

                <p className="text-lg text-gray-300">
                  +1 (888) 123-4567
                </p>

              </div>

              <div className="flex items-start gap-4">

                <MapPin
                  className="mt-1 text-[#D4A017]"
                  size={22}
                />

                <p className="text-lg leading-8 text-gray-300">
                  3500 Deer Creek Rd
                  <br />
                  Palo Alto, CA 94304, USA
                </p>

              </div>

            </div>

          </div>

          {/* Button */}

          <div className="flex items-start lg:justify-end">

            <button
              className="
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-[#D4A017]
              px-10
              py-5
              text-2xl
              font-semibold
              text-[#D4A017]
              transition-all
              duration-300
              hover:bg-[#D4A017]
              hover:text-black
              "
            >
              <User size={24} />

              Sign In

            </button>

          </div>

        </div>

        {/* Divider */}

        <div className="mt-14 border-t border-[#D4A017]/20 pt-8">

          <div className="flex flex-col items-center justify-between gap-5 text-gray-400 lg:flex-row">

            <p className="text-lg">
              © 2024 Tesla Investment. All Rights Reserved.
            </p>

            <div className="flex gap-8">

              <Link
                href="#"
                className="transition hover:text-[#D4A017]"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="transition hover:text-[#D4A017]"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}
