"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  {
    name: "Home",
    href: "/",
    active: true,
  },
  {
    name: "Investment",
    href: "#investment",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Market",
    href: "#market",
  },
  {
    name: "Testimonies",
    href: "#testimonies",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#9f7a1d]/30 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-[90px] max-w-[1550px] items-center justify-between px-5 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-full">
              <Image
                src="/tesla.png"
                alt="Dwell Sync Logo"
                width={170}
                height={170}
                className="object-contain"
                priority
              /> 
            </div>

          </div>

          <div className="leading-none">

            <h2 className="text-[15px] font-bold tracking-[0.22em] text-white">
              TESLA
            </h2>

            <h3 className="text-[15px] font-semibold tracking-[0.14em] text-white">
              INVESTMENT
            </h3>

          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-16 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-[17px] font-medium transition ${
                item.active
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.name}

              {item.active && (
                <span className="absolute -bottom-5 left-0 h-[3px] w-full rounded-full bg-[#D4A017]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}

        <Link
          href="/signup"
          className="hidden rounded-md border border-[#D4A017] px-8 py-3 text-[17px] font-semibold text-[#D4A017] transition hover:bg-[#D4A017] hover:text-black lg:block"
        >
          Sign In
        </Link>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#D4A017] lg:hidden"
        >
          {menuOpen ? (
            <X size={32} />
          ) : (
            <Menu size={32} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden bg-black transition-all duration-500 lg:hidden ${
          menuOpen
            ? "max-h-[500px] border-t border-[#D4A017]/30"
            : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-5">

          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-4 text-lg transition ${
                item.active
                  ? "bg-[#D4A017]/10 text-[#D4A017]"
                  : "text-white hover:bg-[#D4A017]/10 hover:text-[#D4A017]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-6 rounded-lg border border-[#D4A017] py-4 text-center text-lg font-semibold text-[#D4A017] transition hover:bg-[#D4A017] hover:text-black"
          >
            Sign In
          </Link>

        </nav>
      </div>
    </header>
  );
}
