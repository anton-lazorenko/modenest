"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderUserDropdown from "../components/HeaderUserDropdown";
import { Heart, Scale, ShoppingCart } from "lucide-react";
import SearchInput from "./SearchInput";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300
        ${scrolled ? "bg-white shadow-md text-black" : "bg-white/60 text-black"}
      `}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-16">

        {/* Логотип */}
        <div className="text-2xl font-bold">
          <Link href="/">ModeNest</Link>
        </div>
        <SearchInput />
        {/* Навигация */}
        <nav className="flex items-center space-x-6">
          <div className="relative group">
            <button className="hover:opacity-80">
              Categories
            </button>

            <div className="absolute right-0 top-full w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100
                      pointer-events-none group-hover:pointer-events-auto z-50 transition-opacity">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/men">For Him</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/women">For Her</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/kids">For Kids</Link>
                </li>
              </ul>
            </div>
          </div>

          <Link href="/delivery" className="hover:opacity-80">
            Shipping
          </Link>
        </nav>

        {/* Иконки */}
        <div className="flex items-center space-x-4">
          <button className="p-4 hover:bg-gray-200/30 rounded-full">
            <ShoppingCart />
          </button>
          <button className="p-4 hover:bg-gray-200/30 rounded-full">
            <Scale />
          </button>
          <button className="p-4 hover:bg-gray-200/30 rounded-full">
            <Heart />
          </button>

          <HeaderUserDropdown />
        </div>
      </div>
    </header>
  );
}