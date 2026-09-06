import Link from "next/link";
import { site } from "@/lib/data/site";
import { LogoMark } from "@/components/layout/LogoMark";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 text-paper">
      <LogoMark className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className="font-logo text-xl font-bold tracking-tight">
          {site.name.toUpperCase()}
        </span>
        <span className="mt-1 text-[10px] font-medium tracking-[0.25em] text-paper/50 uppercase">
          Singapore
        </span>
      </span>
    </Link>
  );
}
