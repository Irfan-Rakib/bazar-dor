"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedProductDetails({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      const query = searchParams.toString();
      const callbackURL = query ? `${pathname}?${query}` : pathname;

      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।");

      router.replace(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
    }
  }, [isPending, session, pathname, searchParams, router]);

  if (isPending || !session) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-1/3 rounded-xl bg-gray-200" />
          <div className="h-48 rounded-2xl bg-gray-200" />
          <div className="h-32 rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
