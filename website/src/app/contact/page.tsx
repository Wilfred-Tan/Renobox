import type { Metadata } from "next";
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { site, whatsappHref, googleMapsEmbedSrc } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for a competitively priced renovation or fit-out quote — WhatsApp, call, or send an enquiry.",
};

const channels: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  note?: string;
  actions?: {
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    label: string;
    external?: boolean;
  }[];
}[] = [
  {
    icon: PhoneIcon,
    label: "Mobile",
    value: site.phoneDisplay,
    actions: [
      { icon: ChatBubbleLeftRightIcon, href: whatsappHref, label: "Chat on WhatsApp", external: true },
      { icon: PhoneIcon, href: site.phoneHref, label: "Call this number" },
    ],
  },
  {
    icon: PhoneIcon,
    label: "Call (Office)",
    value: site.landlinePhoneDisplay,
    href: site.landlinePhoneHref,
    note: "Mon–Fri, 9am–6pm · Sat, 9am–1pm",
  },
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPinIcon,
    label: "Office & Factory Location",
    value: `${site.address.line1}, ${site.address.line2}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        description="Reach out on WhatsApp for the fastest response, or send an enquiry with your project details. We're happy to evaluate any project, and every consultation is complimentary and obligation-free."
        imageSrc="/images/portfolio/kfc-amk/1.jpg"
      />

      <section className="bg-ink py-20 text-paper md:py-28">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading eyebrow="Get In Touch" title="Reach us your way." tone="light" />
          </RevealOnScroll>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {channels.map((channel, i) => {
              // The Mobile channel has two possible actions (WhatsApp / call), so
              // the number itself links to the first (WhatsApp — our fastest
              // channel) in addition to the two icon buttons below.
              const valueLink = channel.actions ? channel.actions[0] : null;
              const content = (
                <>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 text-gold-bright sm:h-11 sm:w-11">
                    <channel.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-3 block text-xs font-semibold tracking-wide text-paper/50 uppercase sm:mt-4">
                    {channel.label}
                  </span>
                  {valueLink ? (
                    <a
                      href={valueLink.href}
                      target={valueLink.external ? "_blank" : undefined}
                      rel={valueLink.external ? "noopener noreferrer" : undefined}
                      className="mt-1 block font-heading text-lg font-medium break-words text-paper transition-colors hover:text-gold-bright"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <span className="mt-1 block font-heading text-lg font-medium break-words text-paper">
                      {channel.value}
                    </span>
                  )}
                  {channel.note && (
                    <span className="mt-1 block text-xs text-paper/40">{channel.note}</span>
                  )}
                </>
              );

              if (channel.actions) {
                return (
                  <RevealOnScroll key={channel.label} delay={(i % 4) * 100} className="h-full">
                    <div className="flex h-full flex-col border border-paper/15 p-4 transition-colors hover:border-gold/50 sm:p-6">
                      {content}
                      <div className="mt-3 flex gap-2 sm:mt-4">
                        {channel.actions.map((action) => (
                          <a
                            key={action.label}
                            href={action.href}
                            target={action.external ? "_blank" : undefined}
                            rel={action.external ? "noopener noreferrer" : undefined}
                            aria-label={action.label}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/10 text-gold-bright transition-colors hover:bg-gold hover:text-ink sm:h-9 sm:w-9"
                          >
                            <action.icon className="h-4 w-4" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              }

              return (
                <RevealOnScroll key={channel.label} delay={(i % 4) * 100} className="h-full">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="block h-full border border-paper/15 p-4 transition-colors hover:border-gold/50 sm:p-6"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="h-full border border-paper/15 p-4 sm:p-6">{content}</div>
                  )}
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
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
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
