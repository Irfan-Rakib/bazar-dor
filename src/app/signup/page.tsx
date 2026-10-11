import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-950/5 sm:p-9">
        <Link href="/" className="text-sm font-semibold text-green-800">
          ← বাজার দরে ফিরে যাও
        </Link>

        <div className="mb-8 mt-8">
          <div className="mb-4 text-4xl">🛒</div>
          <h1 className="text-3xl font-bold tracking-tight">
            অ্যাকাউন্ট তৈরি করো
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            বাজারের নিত্যপ্রয়োজনীয় পণ্যের দাম সহজেই দেখো।
          </p>
        </div>

        <SignUpForm />
      </div>
    </main>
  );
}
