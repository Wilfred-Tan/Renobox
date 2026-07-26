"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { mainNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Belt-and-braces: also close on navigation, so the panel can never be left
  // open over a new page if an onClick handler doesn't fire. Adjusted during
  // render (React's documented pattern) rather than in an effect.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          // Deliberately opaque with no backdrop-filter: iOS Safari has a
          // long-standing bug where `fixed` + `backdrop-filter` can stop
          // responding to touch after a scroll repaint.
          scrolled || open
            ? "border-b border-paper/10 bg-ink"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container size="wide">
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium tracking-tight text-paper/80 transition-colors hover:text-gold-bright",
                        pathname === item.href && "text-gold-bright",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-6 lg:flex">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 text-sm font-medium text-paper/80 hover:text-gold-bright"
              >
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
              <Button href="/contact" size="md">
                Get a Quote
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full text-paper lg:hidden"
            >
              {open ? (
                <XMarkIcon className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mounted only while open — a plain panel rather than a max-height
          transition, which is far harder for a mobile browser to get wrong.
          Sits outside <header> so the header's stacking context can't trap it. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-ink lg:hidden"
        >
          <Container size="wide" className="flex flex-col gap-6 py-8">
            <ul className="flex flex-col gap-5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1 font-heading text-2xl font-medium text-paper",
                      pathname === item.href && "text-gold-bright",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={site.phoneHref} className="flex items-center gap-2 py-1 text-paper/80">
              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <Button href="/contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Get a Quote
            </Button>
          </Container>
        </div>
      )}
    </>
  );
}
