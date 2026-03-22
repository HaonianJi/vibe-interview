"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function NavAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/check").then((r) => {
      if (r.ok) setIsAdmin(true);
    }).catch(() => {});
  }, []);

  if (!isAdmin) return null;

  return (
    <>
      <Link
        href="/admin"
        className="px-3 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] no-underline text-[13px] font-medium transition-colors"
      >
        Admin
      </Link>
      <Link
        href="/new"
        className="btn-primary no-underline text-[13px] ml-1"
      >
        + New
      </Link>
    </>
  );
}
