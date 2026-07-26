import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center bg-paper">
      <Container size="narrow" className="py-24 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold-deep uppercase">404</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-ink md:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-lg text-muted">
          The page you&apos;re looking for may have moved. Try the homepage or explore our
          portfolio instead.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/portfolio" size="lg" variant="secondary">
            View Portfolio
          </Button>
        </div>
      </Container>
    </section>
  );
}
