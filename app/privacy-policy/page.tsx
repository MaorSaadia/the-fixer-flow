// app/privacy-policy/page.tsx (COMPLETE CODE)

import { Metadata } from "next";
import {
  Lock,
  Eye,
  Cookie,
  Mail,
  Shield,
  Database,
  Activity,
  FileText,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - The Fixer Flow",
  description:
    "Learn how we collect, use, and protect your personal information at The Fixer Flow.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <span className="text-amber-400 font-semibold">
              Your Privacy Matters
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Privacy Policy
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">
            We respect your privacy and are committed to protecting your
            personal data. This policy explains how we handle your information.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Quick Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>We don&apos;t sell your personal information. Ever.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>
                We use analytics (like Vercel Analytics) to understand how
                visitors use our site in an anonymous way.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>
                Your email is only used for newsletters if you subscribe, and
                you can unsubscribe at any time.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>
                We use affiliate links, which means we may earn a commission on
                products you purchase. See our{" "}
                <Link
                  href="/disclosure"
                  className="text-blue-600 hover:underline"
                >
                  Affiliate Disclosure
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-12">
          {/* Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
              <Database className="w-8 h-8 text-amber-500" />
              Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Information You Provide Voluntarily
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  When you interact with our site, you may provide us with:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Email Address:</strong> If you subscribe to our
                      newsletter.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Contact Information:</strong> Your name and
                      message if you contact us directly.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Information Automatically Collected
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  When you visit our site, we automatically collect anonymous
                  data via Vercel Analytics:
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Usage Data:</strong> Pages visited, referral
                      source, and general user-agent information (browser, OS).
                      This data is anonymized and cannot be tied to a specific
                      individual.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              How We Use Your Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    To Improve Our Site
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Analyze anonymous traffic data to understand what content is
                    popular and how we can improve the user experience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    To Communicate With You
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Send newsletters and updates (only if you opt-in) and
                    respond to your direct inquiries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
              <Cookie className="w-8 h-8 text-amber-500" />
              Cookies & Tracking
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              We use minimal cookies. Vercel Analytics is a privacy-first
              analytics tool that does not use cookies for tracking. We may use
              essential cookies for site functionality, such as remembering your
              dark mode preference. You can control cookies through your browser
              settings.
            </p>
          </section>

          {/* ✅ START OF NEW SECTIONS */}

          {/* Data Security */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-500" />
              Data Security
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We take the security of your information seriously. We use
              standard security measures like SSL encryption (HTTPS) to protect
              our site and any data transmitted. However, no method of
              transmission over the Internet is 100% secure, so we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Our website is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected such information, we
              will take steps to delete it.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl p-8 border-2 border-amber-200 dark:border-amber-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              You have the right to unsubscribe from our email communications at
              any time by clicking the &quot;unsubscribe&quot; link in our
              emails. For any other data-related requests, please contact us.
            </p>
          </section>

          {/* Changes to this Policy */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-500" />
              Changes to This Policy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date. We
              encourage you to review this policy periodically.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              <em>Last Updated: October 21, 2025</em>
            </p>
          </section>
          {/* Related Links */}
          <section className="bg-slate-100 dark:bg-slate-800 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                More Legal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Link
                  href="/terms"
                  className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500">
                      Terms of Service
                    </span>
                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
          {/* Contact Us */}
          {/* <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
              <Mail className="w-8 h-8 text-amber-500" />
              Contact Us
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              <a
                href="mailto:privacy@https://thefixerflow.com"
                className="text-amber-600 dark:text-amber-500 font-bold hover:underline"
              >
                privacy@https://thefixerflow.com
              </a>
            </p>
          </section> */}
        </div>
      </article>
    </div>
  );
}
