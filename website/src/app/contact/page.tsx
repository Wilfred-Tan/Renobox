import type { Metadata } from "next";
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { site, whatsappHref, googleMapsEmbedSrc } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for a fixed renovation or fit-out quote — WhatsApp, call, or send an enquiry.",
};

const channels: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}[] = [
  {
    icon: ChatBubbleLeftRightIcon,
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappHref,
    external: true,
  },
  {
    icon: PhoneIcon,
    label: "Call (Mobile)",
    value: site.phoneDisplay,
    href: site.phoneHref,
  },
  {
    icon: PhoneIcon,
    label: "Call (Office)",
    value: site.landlinePhoneDisplay,
    href: site.landlinePhoneHref,
  },
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPinIcon,
    label: "Showroom",
    value: `${site.address.line1}, ${site.address.line2}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        description="Reach out on WhatsApp for the fastest response, or send an enquiry with your project details and we'll come back with a fixed quote."
        imageSrc="/images/portfolio/kfc-amk/1.jpg"
      />

      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {channels.map((channel) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-gold-deep">
                    <channel.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-4 block text-xs font-semibold tracking-wide text-muted uppercase">
                    {channel.label}
                  </span>
                  <span className="mt-1 block font-heading text-lg font-medium break-words text-ink">
                    {channel.value}
                  </span>
                </>
              );

              return channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="border border-ink/10 p-6 transition-colors hover:border-gold/40"
                >
                  {content}
                </a>
              ) : (
                <div key={channel.label} className="border border-ink/10 p-6">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-20 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-ink">Request a Quote</h2>
              <p className="mt-3 text-muted">
                All fields are required so we can prepare an accurate quote — this takes about two
                minutes.
              </p>
              <div className="mt-10">
                <QuoteForm />
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="relative aspect-square overflow-hidden border border-ink/10">
                <iframe
                  src={googleMapsEmbedSrc}
                  title={`Map — ${site.address.line1}, ${site.address.line2}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <p className="font-medium text-ink">Office Hours</p>
                  <p className="mt-1 text-sm text-muted">
                    Monday – Friday, 9:00am – 6:00pm
                    <br />
                    Saturday, 9:00am – 1:00pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
