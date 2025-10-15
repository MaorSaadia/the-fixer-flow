// app/disclosure/page.tsx (COMPLETE CODE)

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure - The Fixer Flow",
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="prose lg:prose-xl">
        <h1>Affiliate Disclosure</h1>
        <p>
          The Fixer Flow is a participant in various affiliate marketing
          programs, including the AliExpress Affiliate Program. These programs
          are designed to provide a means for sites to earn advertising fees by
          advertising and linking to their platform.
        </p>
        <p>
          This means that when you click on links to various merchants on this
          site and make a purchase, this can result in a commission that is
          credited to this site. This comes at no additional cost to you.
        </p>
        <p>
          Our editorial content is not influenced by advertisers or affiliate
          partnerships. We only recommend products and services we have
          researched and believe will add value to our readers. Our credibility
          is important to us, and we strive to be a trusted resource for all
          your home and gadget needs.
        </p>
        <p>Thank you for your support!</p>
      </div>
    </div>
  );
}
