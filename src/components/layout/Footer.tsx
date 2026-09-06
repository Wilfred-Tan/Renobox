import Link from "next/link";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { footerServiceLinks } from "@/lib/data/nav";
import { site } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
              {site.shortDescription}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.certifications.map((cert) => (
                <li
                  key={cert.label}
                  className="rounded-full border border-paper/15 px-3 py-1 text-[11px] tracking-wide text-paper/50 uppercase"
                >
                  {cert.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-paper/40 uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-paper/70 hover:text-gold-bright">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-paper/40 uppercase">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-paper/70">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <a href={site.phoneHref} className="hover:text-gold-bright">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="h-4 w-4 shrink-0 text-gold-bright" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-gold-bright">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>UEN {site.uen}</p>
        </div>
      </Container>
    </footer>
  );
}
