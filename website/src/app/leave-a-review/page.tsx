import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewForm } from "@/components/forms/ReviewForm";

export const metadata: Metadata = {
  title: "Leave a Review",
  description: "Worked with us on a project? Tell us how it went.",
};

export default function LeaveAReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Leave a Review"
        title="Tell us how your project went."
        description="Whether it was a quick-service fit-out or a full home renovation, we'd like to hear about it — good or bad."
        imageSrc="/images/portfolio/residential-bidadari/3.jpg"
      />

      <section className="py-20 md:py-28">
        <Container size="narrow">
          <ReviewForm />
        </Container>
      </section>
    </>
  );
}
