"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Link
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
        href="/mahendra-devkar"
      >
        <h3 className="text-2xl font-bold">View My Resume →</h3>
        <div className="text-lg text-black">
          See My resume, download, or share it.
        </div>
      </Link>
    </main>
  );
}
