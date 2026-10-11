import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ShoppingBasket,
} from "lucide-react";
import { getCategories, getProducts } from "@/lib/api";
import { toBanglaNumber } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
export const instant = false;
export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f8faf5]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-[#123d2b] px-6 py-10 text-white sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-emerald-100">
              <ShoppingBasket size={16} />
              প্রতিদিনের বাজারের নির্ভরযোগ্য সঙ্গী
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              বাজারের দাম জানুন,
              <span className="block text-lime-300">সিদ্ধান্ত নিন বুঝে।</span>
            </h1>

            <p className="mt-5 max-w-xl leading-8 text-emerald-50/80">
              চাল, ডাল, তেল, মাছ, মাংসসহ প্রয়োজনীয় পণ্যের দাম এক জায়গায় দেখুন।
              বাজারে যাওয়ার আগে জেনে নিন আজকের দর।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-6 py-3 font-bold text-green-950 transition hover:bg-lime-200"
              >
                পণ্যের দাম দেখুন
                <ArrowRight size={18} />
              </Link>

              <Link
                href="#ক্যাটাগরি"
                className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                ক্যাটাগরি দেখুন
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-64 items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
              {[
                ["🍚", "চাল"],
                ["🥬", "সবজি"],
                ["🐟", "মাছ"],
                ["🛢️", "তেল"],
              ].map(([emoji, name]) => (
                <div
                  key={name}
                  className="flex h-28 w-32 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur sm:h-32 sm:w-36"
                >
                  <span className="text-4xl">{emoji}</span>
                  <span className="mt-2 font-semibold">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="ক্যাটাগরি"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-700">
            কেনাকাটা সহজ করুন
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            পণ্যের ক্যাটাগরি
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <span className="text-3xl">{category.icon}</span>
              <p className="mt-2 font-bold text-gray-800">{category.nameBn}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Price ticker */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-gray-900">
              আজকের বাজারদর
            </h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {toBanglaNumber(products.length)}টি পণ্য
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="min-w-48 rounded-xl bg-gray-50 p-3 transition hover:bg-emerald-50"
              >
                <p className="truncate text-sm font-bold text-gray-800">
                  {product.image} {product.nameBn}
                </p>
                <p className="mt-2 text-lg font-extrabold text-gray-900">
                  ৳{toBanglaNumber(product.today)}
                  <span className="ml-1 text-xs font-normal text-gray-500">
                    /{product.unit}
                  </span>
                </p>
                <span
                  className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${
                    product.change.dir === "up"
                      ? "text-red-600"
                      : product.change.dir === "down"
                        ? "text-emerald-700"
                        : "text-gray-500"
                  }`}
                >
                  {product.change.dir === "up" ? (
                    <ArrowUpRight size={14} />
                  ) : product.change.dir === "down" ? (
                    <ArrowDownRight size={14} />
                  ) : null}
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rising products */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-red-600">দাম ঊর্ধ্বমুখী</p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              দাম বেড়েছে
            </h2>
          </div>
          <span className="text-sm text-gray-500">শীর্ষ ৬টি পণ্য</span>
        </div>

        {risingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            এই মুহূর্তে দাম বাড়ার তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Falling products */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-emerald-700">দাম নিম্নমুখী</p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              দাম কমেছে
            </h2>
          </div>
          <span className="text-sm text-gray-500">শীর্ষ ৬টি পণ্য</span>
        </div>

        {fallingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* All products */}
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-700">সবকিছু এক জায়গায়</p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            সব পণ্যের দাম
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            আজকের দাম ও গতকালের দামের তুলনা দেখুন।
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-bold text-gray-800">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p>
            বাজারভেদে দাম পরিবর্তিত হতে পারে। কেনার আগে স্থানীয় বাজারে যাচাই
            করুন ।
          </p>
        </div>
      </footer>
    </main>
  );
}
