"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBasket, UserRound, UserPlus } from "lucide-react";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/product";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((error) => {
        console.error("Failed to load categories:", error);
      });

    setBanglaDate(
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }),
    );
  }, []);

  // TODO: Connect with Better Auth session.
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      {" "}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        {" "}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          {" "}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-white">
            {" "}
            <ShoppingBasket size={25} />{" "}
          </span>
          <span>
            <span className="block text-xl font-extrabold text-emerald-900">
              বাজার দর
            </span>
            <span className="hidden text-xs text-gray-500 sm:block">
              প্রতিদিনের বাজারের হিসাব
            </span>
          </span>
        </Link>
        <div className="hidden text-right md:block">
          <p className="text-xs text-gray-500">আজকের তারিখ</p>
          <p className="mt-1 text-sm font-semibold text-gray-800">
            {banglaDate || "তারিখ লোড হচ্ছে..."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-emerald-700 hover:text-emerald-800"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                className="rounded-xl bg-emerald-800 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-800 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:px-4"
              >
                <UserRound size={16} />
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900 sm:px-4"
              >
                <UserPlus size={16} />
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white"
          >
            সব পণ্য
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-800"
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
