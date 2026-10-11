import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus, MapPin } from "lucide-react";

import type { Product } from "@/types/product";
import {
  formatPrice,
  getUnitLabel,
  getPriceChangeLabel,
  toBanglaNumber,
} from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "bg-red-50 text-red-700"
    : isDown
      ? "bg-emerald-50 text-emerald-700"
      : "bg-gray-100 text-gray-600";

  const ChangeIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, বর্তমান দাম ${formatPrice(
        product.today,
      )} প্রতি ${getUnitLabel(product.unit)}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
    >
      {/* Product heading */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${changeColor}`}
          title={getPriceChangeLabel(product.change.dir)}
        >
          <ChangeIcon size={14} aria-hidden="true" />
          {toBanglaNumber(Math.abs(product.change.pct))}%
        </span>
      </div>

      {/* Category */}
      <p className="mt-4 text-xs font-medium text-gray-500">
        {product.categoryIcon} {product.categoryNameBn}
      </p>

      {/* Name */}
      <h3 className="mt-1 line-clamp-2 min-h-14 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-800">
        {product.nameBn}
      </h3>

      {/* Unit */}
      <p className="mt-2 text-sm text-gray-500">
        প্রতি {getUnitLabel(product.unit)}
      </p>

      {/* Current price */}
      <div className="mt-1 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-extrabold text-gray-900">
          {formatPrice(product.today)}
        </span>

        {product.today !== product.yesterday && (
          <span
            className="text-sm text-gray-400 line-through"
            title="গতকালের দাম"
          >
            {formatPrice(product.yesterday)}
          </span>
        )}
      </div>

      {/* Price comparison */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-sm">
          <span className="text-gray-500">গতকালের দাম</span>
          <span className="font-semibold text-gray-700">
            {formatPrice(product.yesterday)}
          </span>
        </div>

        {/* Market information */}
        {product.markets?.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={14} className="shrink-0 text-emerald-700" />
            <span className="truncate">{product.markets[0].market}</span>
          </div>
        )}

        <div className="mt-3 text-sm font-bold text-emerald-800 transition group-hover:text-emerald-950">
          বিস্তারিত দেখুন →
        </div>
      </div>
    </Link>
  );
}
