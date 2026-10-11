import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";

export const instant = false;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories.find(
    (item) => item.slug === slug || item.id === slug,
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug || product.category === category.id,
  );

  return (
    <main className="min-h-screen bg-[#f8faf5]">
      {" "}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {" "}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          {" "}
          <ArrowLeft size={17} />
          সব পণ্যে ফিরে যান{" "}
        </Link>
        <div className="rounded-3xl bg-emerald-900 p-6 text-white sm:p-10">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
              {category.icon}
            </span>

            <div>
              <p className="text-sm text-emerald-100">
                বাজার দর · পণ্য ক্যাটাগরি
              </p>
              <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
                {category.nameBn}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-100 sm:text-base">
            এই ক্যাটাগরির পণ্যের বর্তমান দাম ও বাজারের তথ্য এক জায়গায় দেখুন।
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {category.nameBn} এর পণ্য
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              মোট {categoryProducts.length}টি পণ্য
            </p>
          </div>
        </div>
        {categoryProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
            <ShoppingBasket size={42} className="mx-auto text-emerald-800" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">
              এই ক্যাটাগরিতে এখনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              অন্য ক্যাটাগরির পণ্য দেখে নিতে পারো।
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
