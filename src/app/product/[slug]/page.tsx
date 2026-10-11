import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  ShoppingBasket,
} from "lucide-react";

import { getProducts } from "@/lib/api";
import { formatPrice, getUnitLabel, toBanglaNumber } from "@/lib/utils";
import ProtectedProductDetails from "@/components/products/ProtectedProductDetails";

export const instant = false;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const prices = product.markets.map((market) => ({
    ...market,
    average: (market.min + market.max) / 2,
  }));

  const lowestPrice =
    prices.length > 0
      ? Math.min(...prices.map((market) => market.min))
      : product.today;

  const highestPrice =
    prices.length > 0
      ? Math.max(...prices.map((market) => market.max))
      : product.today;

  const averagePrice =
    prices.length > 0
      ? prices.reduce((sum, market) => sum + market.average, 0) / prices.length
      : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <ProtectedProductDetails>
      <main className="min-h-screen bg-[#f8faf5]">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
          >
            <ArrowLeft size={17} />
            সব পণ্যে ফিরে যান
          </Link>

          {/* Product overview */}
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-50 text-6xl">
                {product.image || product.categoryIcon}
              </div>

              <p className="mt-6 text-sm font-semibold text-emerald-800">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                প্রতি {getUnitLabel(product.unit)}-এর বর্তমান বাজারদর
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-4xl font-extrabold text-emerald-900">
                  {formatPrice(product.today)}
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold ${
                    isUp
                      ? "bg-red-50 text-red-600"
                      : isDown
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? (
                    <ArrowUpRight size={17} />
                  ) : isDown ? (
                    <ArrowDownRight size={17} />
                  ) : null}
                  {isUp ? "+" : isDown ? "-" : ""}
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                গতকালের দাম:{" "}
                <span className="font-semibold text-gray-700">
                  {formatPrice(product.yesterday)}
                </span>
              </p>
            </div>

            {/* Price summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">সর্বনিম্ন বাজারদর</p>
                <p className="mt-2 text-2xl font-extrabold text-emerald-700">
                  {formatPrice(lowestPrice)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  প্রতি {getUnitLabel(product.unit)}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">সর্বোচ্চ বাজারদর</p>
                <p className="mt-2 text-2xl font-extrabold text-red-600">
                  {formatPrice(highestPrice)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  প্রতি {getUnitLabel(product.unit)}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">গড় বাজারদর</p>
                <p className="mt-2 text-2xl font-extrabold text-gray-900">
                  {formatPrice(averagePrice)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  প্রতি {getUnitLabel(product.unit)}
                </p>
              </div>
            </div>
          </div>

          {/* Price history */}
          <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-gray-900">
              দামের তুলনা
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন সময়ের পণ্যের দাম দেখুন।
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "আজকের দাম", price: product.today },
                { label: "গতকালের দাম", price: product.yesterday },
                { label: "গত সপ্তাহের দাম", price: product.lastWeek },
                { label: "গত মাসের দাম", price: product.lastMonth },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Market-wise prices */}
          <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <MapPin size={22} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">
                  বাজারভিত্তিক দাম
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
                </p>
              </div>
            </div>

            {prices.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                      <th className="px-4 py-4 font-semibold">বাজার</th>
                      <th className="px-4 py-4 font-semibold">বিভাগ</th>
                      <th className="px-4 py-4 font-semibold">সর্বনিম্ন</th>
                      <th className="px-4 py-4 font-semibold">সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className="border-b border-gray-100 last:border-0 hover:bg-emerald-50/50"
                      >
                        <td className="px-4 py-4 font-semibold text-gray-900">
                          {market.market}
                        </td>
                        <td className="px-4 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="px-4 py-4 font-semibold text-emerald-700">
                          {formatPrice(market.min)}
                        </td>
                        <td className="px-4 py-4 font-semibold text-red-600">
                          {formatPrice(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-6 rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।
              </p>
            )}
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <ShoppingBasket size={28} />
              <div>
                <h2 className="font-bold">আরও পণ্যের দাম দেখুন</h2>
                <p className="mt-1 text-sm text-emerald-100">
                  প্রয়োজনীয় পণ্যের বাজারদর এক জায়গায়।
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </section>
      </main>
    </ProtectedProductDetails>
  );
}
