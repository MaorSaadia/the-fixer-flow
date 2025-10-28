// app/terms/page.tsx

import { Metadata } from "next";
import { FileText, AlertTriangle, Scale, UserCheck, Ban } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - The Fixer Flow",
  description:
    "Read our Terms of Service to understand the rules and guidelines for using The Fixer Flow.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-amber-400 font-semibold">
              Legal Agreement
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Terms of Service
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">
            Please read these terms carefully before using our website. By
            accessing The Fixer Flow, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Important Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-800 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Important Notice
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                By using this website, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service. If
                you do not agree, please discontinue use of our site
                immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-12">
          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-amber-500" />
              1. Acceptance of Terms
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Welcome to The Fixer Flow (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;). By accessing or using our website at{" "}
              <span className="font-semibold">https://thefixerflow.com</span>{" "}
              (the &quot;Site&quot;), you agree to comply with and be bound by
              these Terms of Service (&quot;Terms&quot;).
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms apply to all visitors, users, and others who access or
              use the Site. If you disagree with any part of these Terms, you
              may not access the Site.
            </p>
          </section>

          {/* Use of Site */}
          <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              2. Use of the Site
            </h2>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Permitted Uses
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              You may use our Site for lawful purposes only. You agree to use
              the Site in a manner consistent with all applicable laws and
              regulations.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 mt-6">
              Prohibited Uses
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              You agree NOT to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>
                  Use the Site in any way that violates any applicable law or
                  regulation
                </span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>
                  Transmit any viruses, malware, or other malicious code
                </span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>
                  Scrape, copy, or reproduce content without permission
                </span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>
                  Use automated systems to access the Site excessively
                </span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span>Impersonate any person or entity</span>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              3. Intellectual Property Rights
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              The Site and its entire contents, features, and functionality
              (including but not limited to all information, software, text,
              displays, images, video, and audio) are owned by The Fixer Flow,
              its licensors, or other content providers.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                Copyright Protection
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                All content is protected by copyright, trademark, and other
                intellectual property laws. You may not reproduce, distribute,
                modify, create derivative works of, publicly display, or exploit
                any of our content without express written permission.
              </p>
            </div>
          </section>

          {/* Affiliate Links */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              4. Affiliate Links & Disclaimers
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Our Site contains affiliate links to third-party websites and
              products. When you click these links and make a purchase, we may
              earn a commission at no additional cost to you. See our{" "}
              <Link
                href="/disclosure"
                className="text-amber-600 dark:text-amber-500 font-semibold hover:underline"
              >
                Affiliate Disclosure
              </Link>{" "}
              for more details.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                Product Recommendations
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                While we strive to provide accurate product information and
                recommendations, we are not responsible for the quality, safety,
                or performance of products purchased through affiliate links.
                Always conduct your own research before making purchases.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-8 border-2 border-red-200 dark:border-red-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              5. Disclaimers & Limitation of Liability
            </h2>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              &quot;AS IS&quot; Disclaimer
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT
              WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE
              OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              No Professional Advice
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              The content on our Site is for informational purposes only and
              should not be considered professional advice. Always consult with
              qualified professionals for specific situations.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Limitation of Liability
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES ARISING FROM YOUR USE OF THE SITE.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              6. User-Generated Content
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              If you submit comments, reviews, or other content to the Site, you
              grant us a non-exclusive, royalty-free, perpetual, and worldwide
              license to use, reproduce, modify, and display such content.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              You represent that you own or have the necessary rights to any
              content you submit and that it does not violate any third-party
              rights or applicable laws.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              7. Third-Party Links
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Our Site may contain links to third-party websites that are not
              owned or controlled by us. We have no control over and assume no
              responsibility for the content, privacy policies, or practices of
              any third-party sites.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We strongly advise you to review the terms and privacy policies of
              any third-party sites you visit.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              8. Changes to Terms
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time.
              Changes will be effective immediately upon posting on the Site.
              Your continued use of the Site after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              9. Termination
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We may terminate or suspend your access to the Site immediately,
              without prior notice or liability, for any reason, including if
              you breach these Terms. All provisions that by their nature should
              survive termination shall survive, including ownership provisions,
              warranty disclaimers, and limitations of liability.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              10. Governing Law
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law provisions. Any disputes arising from these Terms shall be
              resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          {/* Contact */}
          {/* <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              11. Contact Information
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              Contact Us
            </Link>
          </section> */}

          {/* Acknowledgment */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl p-8 border-2 border-amber-200 dark:border-amber-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your Acknowledgment
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              BY USING THE SITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS
              OF SERVICE AND AGREE TO BE BOUND BY THEM.
            </p>
          </section>

          {/* Last Updated */}
          <section className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <strong>Last Updated:</strong> October 21, 2025
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              <strong>Effective Date:</strong> October 21, 2025
            </p>
          </section>
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
                <FileText className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
              </div>
            </Link>
            <Link
              href="/disclosure"
              className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500">
                  Affiliate Disclosure
                </span>
                <FileText className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
