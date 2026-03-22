"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function NavAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin cookie exists (non-httpOnly check via API)
    fetch("/api/auth/check").then((r) => {
      if (r.ok) setIsAdmin(true);
    }).catch(() => {});
  }, []);

  if (!isAdmin) return null;

  return (
    <>
      <Link href="/admin" className="text-gray-600 hover:text-gray-900 no-underline">Admin</Link>
      <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium no-underline">+ New</Link>
    </>
  );
}
