import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto flex justify-between items-center p-4 text-sm text-gray-500">
        <p>© 2025 The Fixer Flow. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/disclosure" className="hover:underline">
            Affiliate Disclosure
          </Link>
        </div>
      </div>
    </footer>
  );
}
