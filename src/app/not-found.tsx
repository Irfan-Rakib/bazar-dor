import Link from "next/link";
import { ArrowLeft, ShoppingBasket } from "lucide-react";

export default function ProfileNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f8faf5] px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-800 text-white">
          <ShoppingBasket size={36} />
        </div>

        <p className="mt-6 text-7xl font-black text-emerald-800">404</p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          প্রোফাইল পেজ পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-600">
          আপনি যে প্রোফাইল পেজটি খুঁজছেন, সেটি পাওয়া যায়নি। লিংকটি পরীক্ষা করে
          আবার চেষ্টা করুন।
        </p>

        <Link
          href="/profile"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
        >
          <ArrowLeft size={18} />
          প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
