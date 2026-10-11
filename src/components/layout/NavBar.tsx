"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  ShoppingBasket,
  UserRound,
  UserPlus,
  LogOut,
  Menu,
  X,
  CalendarDays,
  LoaderCircle,
  Home,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/product";

export default function Navbar() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [banglaDate, setBanglaDate] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const signingOutRef = useRef(false);
  const { data: session, isPending } = authClient.useSession();

  // Load categories and date after the component mounts.
  useEffect(() => {
    let isMounted = true;

    getCategories()
      .then((data) => {
        if (isMounted) {
          setCategories(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsCategoriesLoading(false);
        }
      });

    const date = new Date().toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });

    setBanglaDate(date);

    return () => {
      isMounted = false;
    };
  }, []);

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    if (signingOutRef.current) return;

    signingOutRef.current = true;
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      window.location.assign("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      signingOutRef.current = false;
      setIsSigningOut(false);
    }
  }

  function navLinkClass(href: string) {
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return `inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive
        ? "bg-emerald-800 text-white shadow-sm"
        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-900"
    }`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl">
      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="বাজার দর হোম"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-sm">
            <ShoppingBasket size={24} strokeWidth={2.2} />
          </span>

          <span className="min-w-0">
            <span className="block text-xl font-extrabold leading-tight tracking-tight text-emerald-950 sm:text-2xl">
              বাজার দর
            </span>
            <span className="hidden text-xs text-gray-500 sm:block">
              প্রতিদিনের বাজারের হিসাব
            </span>
          </span>
        </Link>

        {/* Date - Desktop */}
        <div className="hidden items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 lg:flex">
          <CalendarDays size={18} className="text-emerald-800" />
          <div>
            <p className="text-[11px] text-gray-500">আজকের তারিখ</p>
            <p className="text-sm font-semibold text-emerald-950">
              {banglaDate || "তারিখ লোড হচ্ছে..."}
            </p>
          </div>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
          ) : session ? (
            <>
              <Link
                href="/profile"
                className={`inline-flex max-w-48 items-center gap-2 truncate rounded-xl border px-3 py-2.5 text-sm font-semibold transition sm:px-4 ${
                  pathname.startsWith("/profile")
                    ? "border-emerald-800 bg-emerald-50 text-emerald-900"
                    : "border-gray-200 text-gray-700 hover:border-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <UserRound size={17} className="shrink-0" />
                <span className="max-w-32 truncate">
                  {session.user.name || "প্রোফাইল"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
              >
                {isSigningOut ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <LogOut size={17} />
                )}
                {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-800 px-3 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 sm:px-4"
              >
                <UserRound size={17} />
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 sm:px-4"
              >
                <UserPlus size={17} />
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          aria-label={isMobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={isMobileMenuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-emerald-50 sm:hidden"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop Category Navigation */}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="hidden border-t border-gray-100 sm:block"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <Link href="/" className={navLinkClass("/")}>
            <Home size={16} />
            সব পণ্য
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={navLinkClass(`/category/${category.slug}`)}
            >
              <span>{category.icon}</span>
              {category.nameBn}
            </Link>
          ))}

          {isCategoriesLoading && (
            <span className="px-3 py-2 text-sm text-gray-400">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg sm:hidden">
          {/* Mobile Date */}
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3">
            <CalendarDays size={18} className="text-emerald-800" />
            <div>
              <p className="text-xs text-gray-500">আজকের তারিখ</p>
              <p className="text-sm font-semibold text-emerald-950">
                {banglaDate || "তারিখ লোড হচ্ছে..."}
              </p>
            </div>
          </div>

          {/* Mobile Authentication */}
          <div className="mb-4 grid grid-cols-1 gap-2">
            {isPending ? (
              <div className="h-11 animate-pulse rounded-xl bg-gray-100" />
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-emerald-50"
                >
                  <UserRound size={18} />
                  {session.user.name || "আমার প্রোফাইল"}
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-60"
                >
                  {isSigningOut ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}
                  {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-800 px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
                >
                  <UserRound size={18} />
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
                >
                  <UserPlus size={18} />
                  নতুন অ্যাকাউন্ট তৈরি করুন
                </Link>
              </>
            )}
          </div>

          {/* Mobile Categories */}
          <div className="mb-3 border-t border-gray-100 pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              পণ্যের ক্যাটাগরি
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className={navLinkClass("/")}>
                <Home size={16} />
                সব পণ্য
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={navLinkClass(`/category/${category.slug}`)}
                >
                  <span>{category.icon}</span>
                  <span className="truncate">{category.nameBn}</span>
                </Link>
              ))}
            </div>

            {isCategoriesLoading && (
              <p className="mt-3 text-center text-sm text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
