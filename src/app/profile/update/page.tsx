"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, LoaderCircle, Save, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const initializedRef = useRef(false);
  const submittingRef = useRef(false);
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (session?.user && !initializedRef.current) {
      setName(session.user.name || "");
      initializedRef.current = true;
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session && !redirectingRef.current) {
      redirectingRef.current = true;
      router.replace("/signin?callbackURL=%2Fprofile%2Fupdate");
    }
  }, [isPending, session, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const cleanName = name.trim();

    if (!cleanName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (cleanName.length > 80) {
      toast.error("নাম ৮০ অক্ষরের মধ্যে রাখুন।");
      return;
    }

    if (cleanName === session?.user.name) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    submittingRef.current = true;
    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: cleanName,
      });

      if (result.error) {
        toast.error(result.error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      submittingRef.current = false;
      setIsSaving(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8faf5]">
        {" "}
        <LoaderCircle className="animate-spin text-[#163b2b]" size={32} />{" "}
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#f8faf5] px-4 py-10 sm:py-14">
      {" "}
      <div className="mx-auto max-w-2xl">
        {" "}
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#163b2b]"
        >
          {" "}
          <ArrowLeft size={17} />
          Profile-এ ফিরে যান{" "}
        </Link>
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="bg-[#163b2b] px-6 py-8 text-white sm:px-9">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-[#163b2b]">
                <UserRound size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">Edit Profile</h1>
                <p className="mt-1 text-sm text-green-100">
                  আপনার প্রোফাইলের তথ্য পরিবর্তন করুন
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <div className="mb-7 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="mt-1 break-all font-medium text-gray-800">
                {session.user.email}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                এই ফর্মে শুধু নাম পরিবর্তন করা যাবে।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
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
                    required
                    maxLength={80}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="আপনার পুরো নাম"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-[#28734d] focus:bg-white focus:ring-4 focus:ring-green-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#163b2b] px-5 py-3.5 font-bold text-white transition hover:bg-[#22563d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <LoaderCircle size={19} className="animate-spin" />
                  ) : (
                    <Save size={19} />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>

                <Link
                  href="/profile"
                  className="flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
