import Link from "next/link";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  let products = [];
  let hasError = false;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-green-100 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <Link href="/" className="text-2xl font-extrabold text-green-900">
            🛒 বাজার দর
          </Link>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link
              href="/signin"
              className="rounded-lg px-3 py-2 text-green-900 hover:bg-green-50"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-green-800 px-4 py-2 text-white hover:bg-green-900"
            >
              সাইন আপ
            </Link>
          </div>
        </nav>
      </header>

      <section className="bg-[#edf5e9]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 font-semibold text-green-800">
              প্রতিদিনের বাজার, এক নজরে
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              বাজারের দাম জানুন,
              <span className="text-green-800"> সচেতন থাকুন।</span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-gray-600">
              চাল, ডাল, সবজি, মাছসহ নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায়
              দেখুন।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-7 inline-flex rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-900"
            >
              সব পণ্য দেখুন ↓
            </a>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 text-5xl sm:gap-5 sm:text-6xl">
              <span className="rounded-2xl bg-white p-5 shadow-sm">🍚</span>
              <span className="rounded-2xl bg-white p-5 shadow-sm">🥔</span>
              <span className="rounded-2xl bg-white p-5 shadow-sm">🧅</span>
              <span className="rounded-2xl bg-white p-5 shadow-sm">🐟</span>
              <span className="rounded-2xl bg-white p-5 shadow-sm">🥚</span>
              <span className="rounded-2xl bg-white p-5 shadow-sm">🌶️</span>
            </div>
          </div>
        </div>
      </section>

      <section id="সব-পণ্য" className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8">
          <p className="text-sm font-bold text-green-800">PRODUCT DIRECTORY</p>
          <h2 className="mt-2 text-3xl font-extrabold">সব পণ্য</h2>
          <p className="mt-2 text-gray-500">
            নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও দাম দেখুন।
          </p>
        </div>

        {hasError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-800">
            <p className="font-semibold">পণ্যের তথ্য লোড করা যায়নি।</p>
            <p className="mt-2 text-sm">
              API connection পরীক্ষা করে আবার চেষ্টা করো।
            </p>
          </div>
        ) : products.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-gray-500">
            বর্তমানে কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug || product.id}`}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-green-50 text-5xl">
                  {product.emoji || "🛍️"}
                </div>

                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.unit}</p>

                <p className="mt-4 text-lg font-extrabold text-green-900">
                  {Number(product.price).toLocaleString("bn-BD")} টাকা
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {Number(product.changePercentage) > 0
                    ? "▲"
                    : Number(product.changePercentage) < 0
                      ? "▼"
                      : "—"}{" "}
                  {Math.abs(
                    Number(product.changePercentage) || 0,
                  ).toLocaleString("bn-BD")}
                  %
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-green-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </main>
  );
}
