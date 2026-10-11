"use client";

import { Suspense, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShoppingBasket,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

function getSafeCallbackURL(value: string | null): string {
  if (
    value &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }

  return "/";
}

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const submittingRef = useRef(false);

  const callbackURL = getSafeCallbackURL(searchParams.get("callbackURL"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password) {
      toast.error("সবগুলো তথ্য পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    submittingRef.current = true;
    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
        callbackURL,
      });

      if (result.error) {
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      // Confirm the session before redirecting.
      const sessionResult = await authClient.getSession();

      if (sessionResult.error || !sessionResult.data?.session) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");
        router.replace(
          `/signin?callbackURL=${encodeURIComponent(callbackURL)}`,
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      window.location.replace(callbackURL);
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }
  }

  async function handleSocialSignUp(provider: "google" | "github") {
    if (submittingRef.current) return;

    submittingRef.current = true;
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL,
      });

      if (result.error) {
        toast.error(result.error.message || "সোশ্যাল সাইন আপ করা যায়নি।");
      }
    } catch (error) {
      console.error(`${provider} sign up failed:`, error);
      toast.error("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      submittingRef.current = false;
      setSocialLoading("");
    }
  }

  const isBusy = isLoading || Boolean(socialLoading);

  return (
    <main className="flex min-h-[calc(100vh-150px)] items-center justify-center bg-[#f8faf5] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">
        {/* Branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-emerald-950 p-10 text-white lg:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-700/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-3"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-900">
              <ShoppingBasket size={28} />
            </span>
            <span className="text-2xl font-extrabold">বাজার দর</span>
          </Link>

          <div className="relative z-10 py-12">
            <p className="mb-4 text-sm font-semibold tracking-widest text-lime-300">
              WELCOME TO BAZAR DOR
            </p>

            <h1 className="text-4xl font-extrabold leading-tight">
              সচেতন কেনাকাটার
              <br />
              যাত্রা শুরু হোক
              <br />
              আজ থেকেই।
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-emerald-100">
              বিভিন্ন পণ্যের দাম জানুন, বাজারের তুলনা করুন এবং নিজের কেনাকাটার
              পরিকল্পনা আরও সহজ করুন।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                📊 দামের তুলনা
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                🛒 সহজ কেনাকাটা
              </span>
            </div>
          </div>

          <p className="relative z-10 text-sm text-emerald-200">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </section>

        {/* Sign-up form */}
        <section className="p-6 sm:p-10 lg:p-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যান
          </Link>

          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-800 text-white">
                <ShoppingBasket size={26} />
              </span>
              <div>
                <h1 className="text-2xl font-extrabold text-emerald-900">
                  বাজার দর
                </h1>
                <p className="text-sm text-gray-500">
                  প্রতিদিনের বাজারের হিসাব
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              আমাদের সঙ্গে যোগ দিন
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              অ্যাকাউন্ট তৈরি করুন
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              শুরু করতে আপনার তথ্যগুলো পূরণ করুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                আপনার নাম
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="আপনার পুরো নাম"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  disabled={isBusy}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল অ্যাড্রেস
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isBusy}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  disabled={isBusy}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-800"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
              </p>
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা সাইন আপ করুন</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignUp("google")}
              disabled={isBusy}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "google" ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <span className="text-lg font-bold">G</span>
              )}
              Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignUp("github")}
              disabled={isBusy}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "github" ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.76 1.99 3.09 1.52.1-.73.39-1.23.7-1.51-2.5-.29-5.14-1.25-5.14-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.75 1.03.75 2.08v3.09c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />
                </svg>
              )}
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href={`/signin?callbackURL=${encodeURIComponent(callbackURL)}`}
              className="font-bold text-emerald-800 hover:text-emerald-950"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center bg-[#f8faf5] px-4">
          <LoaderCircle className="animate-spin text-emerald-800" size={32} />
        </main>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
