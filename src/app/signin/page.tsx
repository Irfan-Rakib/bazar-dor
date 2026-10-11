import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-950/5 sm:p-9">
        <Link href="/" className="text-sm font-semibold text-green-800">
          ← বাজার দরে ফিরে যাও
        </Link>

        <div className="mb-8 mt-8">
          <div className="mb-4 text-4xl">🛒</div>
          <h1 className="text-3xl font-bold tracking-tight">স্বাগতম!</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            তোমার অ্যাকাউন্টে সাইন ইন করো।
          </p>
        </div>

        <SignInForm />
      </div>
    </main>
  );
}
