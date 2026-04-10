import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-primary/10 py-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <p className="text-sm text-white/40">
          &copy; {new Date().getFullYear()} RapidFix. All rights reserved.
        </p>
        <Link
          href="/admin/login"
          className="text-sm text-white/40 hover:text-white/80 transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
}


