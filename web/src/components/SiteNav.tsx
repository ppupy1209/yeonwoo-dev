import Link from "next/link";
import { profile } from "@/lib/profile";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-medium">
          {profile.name}
          <span className="text-muted">.dev</span>
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          <Link href="/#work" className="transition-colors hover:text-text">
            Work
          </Link>
          <Link href="/#about" className="transition-colors hover:text-text">
            About
          </Link>
          <a href={profile.github} className="transition-colors hover:text-text">
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
