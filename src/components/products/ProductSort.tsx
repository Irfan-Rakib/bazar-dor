"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

type ProductSortProps = {
  products: Product[];
};

export default function ProductSort({ products }: ProductSortProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section>
      {" "}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        {" "}
        <p className="text-sm text-gray-500">
          মোট <span className="font-bold text-gray-900">{products.length}</span>
          টি পণ্য{" "}
        </p>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          সাজান:
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-gray-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}
