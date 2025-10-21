// app/disclosure/page.tsx

import { Metadata } from "next";
import { Shield, Heart, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure - The Fixer Flow",
  description:
    "Learn about our affiliate partnerships and how we maintain editorial integrity while recommending products.",
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-amber-400 font-semibold">
              Legal Information
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Affiliate Disclosure
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">
            Transparency is important to us. Here&apos;s how we make money and
            maintain our editorial integrity.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Trust Badge */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Our Commitment to You
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We only recommend products we genuinely believe will help you.
                Your trust means everything to us, and we work hard to maintain
                it every single day.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <div className="space-y-8">
            {/* What This Means */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-amber-500 pl-4">
                What This Means
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                The Fixer Flow participates in various affiliate marketing
                programs, including the{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  AliExpress Affiliate Program
                </span>
                . These programs are designed to provide a means for websites to
                earn advertising fees by advertising and linking to products.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                In simple terms: when you click on certain links on our site and
                make a purchase, we may earn a small commission. This helps us
                keep the lights on and continue creating helpful content for
                you.
              </p>
            </section>

            {/* Important Points */}
            <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Important Points
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      No Extra Cost to You
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      When you purchase through our affiliate links, you pay the
                      exact same price as buying directly. The commission comes
                      from the merchant, not from you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Editorial Independence
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Our content and product recommendations are never
                      influenced by potential commissions. We recommend products
                      based solely on quality, value, and usefulness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Thorough Research
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      We only recommend products and services we have researched
                      and believe will genuinely add value to our readers&apos;
                      lives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Your Support Matters
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      When you purchase through our links, you&apos;re
                      supporting our work and helping us create more helpful
                      content. We&apos;re deeply grateful for that support!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Affiliate Programs */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-amber-500 pl-4">
                Our Affiliate Programs
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We currently participate in the following affiliate programs:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <ExternalLink className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>AliExpress Affiliate Program</strong> - For
                    affordable home and lifestyle products
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <ExternalLink className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>Amazon Associates</strong> - For a wide range of
                    home improvement products
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-4 italic">
                This list may be updated as we partner with additional reputable
                merchants.
              </p>
            </section>

            {/* Our Promise */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl p-8 border-2 border-amber-200 dark:border-amber-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Promise to You
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Your trust is our most valuable asset. We promise to:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 font-bold">
                    →
                  </span>
                  <span>
                    Always be transparent about our affiliate relationships
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 font-bold">
                    →
                  </span>
                  <span>
                    Never recommend products solely for commission potential
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 font-bold">
                    →
                  </span>
                  <span>
                    Provide honest, unbiased reviews and recommendations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 font-bold">
                    →
                  </span>
                  <span>Continue creating valuable, helpful content</span>
                </li>
              </ul>
            </section>

            {/* Thank You */}
            <section className="text-center py-8">
              <div className="inline-flex items-center justify-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-4">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <span>Thank You for Your Support!</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                By supporting us through affiliate purchases, you enable us to
                continue providing free, high-quality content to help you create
                a better home.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-amber-500 pl-4">
                Questions?
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                If you have any questions about our affiliate relationships or
                how we recommend products, please feel free to{" "}
                <Link
                  href="/contact"
                  className="text-amber-600 dark:text-amber-500 font-semibold hover:underline"
                >
                  contact us
                </Link>
                . We&apos;re always happy to hear from you!
              </p>
            </section>

            {/* Last Updated */}
            <section className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong>Last Updated:</strong> October 21, 2025
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                This disclosure may be updated from time to time. We encourage
                you to review it periodically.
              </p>
            </section>
          </div>
        </div>
      </article>

      {/* Related Links */}
      <section className="bg-slate-100 dark:bg-slate-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            More Legal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/privacy-policy"
              className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500">
                  Privacy Policy
                </span>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
              </div>
            </Link>
            <Link
              href="/terms"
              className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500">
                  Terms of Service
                </span>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
