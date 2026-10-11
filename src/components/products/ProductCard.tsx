import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice, getUnitLabel, toBanglaNumber } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
          {product.image || product.categoryIcon}
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? (
            <ArrowUpRight size={14} />
          ) : isDown ? (
            <ArrowDownRight size={14} />
          ) : (
            <Minus size={14} />
          )}
          {toBanglaNumber(Math.abs(product.change.pct))}%
        </span>
      </div>

      <p className="mt-4 text-xs font-medium text-gray-500">
        {product.categoryIcon} {product.categoryNameBn}
      </p>

      <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-emerald-800">
        {product.nameBn}
      </h3>

      <p className="mt-3 text-sm text-gray-500">
        প্রতি {getUnitLabel(product.unit)}
      </p>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-gray-900">
          {formatPrice(product.today)}
        </span>

        <span className="text-sm text-gray-400 line-through">
          {formatPrice(product.yesterday)}
        </span>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
        গতকাল: {formatPrice(product.yesterday)}
      </div>
    </Link>
  );
}
