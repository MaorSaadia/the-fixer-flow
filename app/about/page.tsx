import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - The Fixer Flow",
  description:
    "Learn more about The Fixer Flow and our mission to find the best products for your home.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="prose lg:prose-xl">
        <h1>About The Fixer Flow</h1>
        <p>
          Welcome to The Fixer Flow! My name is [Your Name], and I&apos;m
          passionate about finding smart solutions to everyday problems.
        </p>
        <p>
          This blog was born from a love of discovering products that genuinely
          make life easier, more organized, and more beautiful. From clever
          kitchen gadgets that save you time to smart home tech that brings a
          little bit of the future into your home, my goal is to test, review,
          and recommend only the best.
        </p>
        <p>
          I believe that the right tool or gadget can completely change your
          flow, turning a frustrating task into a satisfying one. Thank you for
          joining me on this journey to a smoother, better home.
        </p>
      </div>
    </div>
  );
}
