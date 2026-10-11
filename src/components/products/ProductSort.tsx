"use client";

import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, PackageSearch } from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product";
import { formatPrice, toBanglaNumber } from "@/lib/utils";

type ProductSortProps = {
  products: Product[];
};

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function ProductSort({ products }: ProductSortProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sort) {
      case "low-to-high":
        result.sort((a, b) => a.today - b.today);
        break;

      case "high-to-low":
        result.sort((a, b) => b.today - a.today);
        break;

      default:
        break;
    }

    return result;
  }, [products, sort]);

  return (
    <section>
      {/* Results toolbar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">এই ক্যাটাগরিতে পাওয়া গেছে</p>

          <p className="mt-1 text-lg font-extrabold text-gray-900">
            {toBanglaNumber(products.length)}টি পণ্য
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <ArrowDownWideNarrow
            size={18}
            className="shrink-0 text-emerald-800"
          />

          <span>দাম অনুযায়ী সাজান</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম থেকে বেশি</option>
            <option value="high-to-low">বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {/* Product grid */}
      {sortedProducts.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              দেখানো হচ্ছে{" "}
              <span className="font-semibold text-gray-800">
                {toBanglaNumber(sortedProducts.length)}
              </span>{" "}
              টি পণ্য
            </p>

            {sort !== "default" && (
              <p className="text-xs font-medium text-emerald-800">
                {sort === "low-to-high"
                  ? "সর্বনিম্ন দাম আগে"
                  : "সর্বোচ্চ দাম আগে"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <PackageSearch size={30} className="text-emerald-800" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            অন্য ক্যাটাগরি দেখুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      )}
    </section>
  );
}
