import { profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-sm text-muted">
        <a href={`mailto:${profile.email}`} className="transition-colors hover:text-text">
          {profile.email}
        </a>
        <a href={profile.github} className="transition-colors hover:text-text">
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
