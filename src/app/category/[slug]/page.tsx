import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, getProducts } from "@/lib/api";
import ProductSort from "@/components/products/ProductSort";

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
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            {category.nameBn} এর পণ্য
          </h2>

          <ProductSort products={categoryProducts} />
        </div>
      </section>
    </main>
  );
}
