"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  UserRound,
  Mail,
  ShieldCheck,
  LogOut,
  LoaderCircle,
  Pencil,
  ShoppingBasket,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !redirectingRef.current) {
      redirectingRef.current = true;
      router.replace("/signin?callbackURL=%2Fprofile");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign out করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে Sign out হয়েছে!");
      window.location.assign("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8faf5] px-4">
        {" "}
        <div className="flex flex-col items-center gap-3 text-gray-500">
          {" "}
          <LoaderCircle
            size={34}
            className="animate-spin text-[#163b2b]"
          />{" "}
          <p className="text-sm">Profile লোড হচ্ছে...</p>{" "}
        </div>{" "}
      </main>
    );
  }

  const user = session.user;
  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#f8faf5] px-4 py-10 sm:py-14">
      {" "}
      <div className="mx-auto max-w-4xl">
        {" "}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#163b2b]"
        >
          {" "}
          <ArrowLeft size={17} />
          হোমে ফিরে যান{" "}
        </Link>
        ```
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="bg-[#163b2b] px-6 py-9 text-white sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-[#163b2b]">
                <ShoppingBasket size={32} />
              </div>

              <div>
                <p className="text-sm text-green-100">Bazar Dor Account</p>
                <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                  My Profile
                </h1>
                <p className="mt-1 text-sm text-green-100">
                  আপনার অ্যাকাউন্টের তথ্য দেখুন
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-8 sm:flex-row sm:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-50 text-3xl font-extrabold text-[#163b2b] ring-4 ring-green-50">
                {initial}
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <h2 className="break-words text-2xl font-bold text-gray-900">
                  {user.name || "Bazar Dor User"}
                </h2>
                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800">
                  <ShieldCheck size={15} />
                  {user.emailVerified
                    ? "Verified Account"
                    : "Registered Account"}
                </span>
              </div>

              <Link
                href="/profile/update"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-700 hover:text-green-800"
              >
                <Pencil size={16} />
                Edit Profile
              </Link>
            </div>

            <div className="py-7">
              <h3 className="mb-5 text-lg font-bold text-gray-900">
                Account Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#28734d] shadow-sm">
                    <UserRound size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="mt-1 break-words font-semibold text-gray-800">
                      {user.name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#28734d] shadow-sm">
                    <Mail size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="mt-1 break-all font-semibold text-gray-800">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#28734d] shadow-sm">
                    <ShieldCheck size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email Verification</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {user.emailVerified ? "Verified" : "Not verified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
              <Link
                href="/"
                className="flex flex-1 items-center justify-center rounded-xl bg-[#163b2b] px-5 py-3 font-semibold text-white transition hover:bg-[#22563d]"
              >
                বাজার দর দেখুন
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <LogOut size={18} />
                )}
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
