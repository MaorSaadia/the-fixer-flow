"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface BlogShareButtonProps {
  url: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
}

const BlogShareButton: React.FC<BlogShareButtonProps> = ({
  url,
  title,
  excerpt,
  image,
  category,
}) => {
  const categoryTag = category ? `#${category.replace(/\s+/g, "")}` : "";

  const shareMessage = `📖 ${title}\n\n${excerpt}\n\n${categoryTag ? `${categoryTag} ` : ""}Read more: ${url}`;

  const shareUrls = {
    native: "",
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(shareMessage)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(`📖 ${title}\n\n${categoryTag}`)}${
      image ? `&image=${encodeURIComponent(image)}` : ""
    }`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      excerpt
    )}`,
    pinterest: image
      ? `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          url
        )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
          shareMessage
        )}`
      : undefined,
  };

  const handleShare = async (platform: keyof typeof shareUrls) => {
    if (platform === "native" && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add a toast notification here
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-300 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900 mb-3">
            Share this article
          </p>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries(shareUrls).map(
              ([platform, url]) =>
                url && (
                  <Button
                    key={platform}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    onClick={() =>
                      handleShare(platform as keyof typeof shareUrls)
                    }
                    title={`Share on ${platform === "x" ? "X (Twitter)" : platform}`}
                  >
                    <ShareIcon platform={platform} />
                    <span className="sr-only">
                      Share on {platform === "x" ? "X (Twitter)" : platform}
                    </span>
                  </Button>
                )
            )}
          </div>

          {/* Copy Link Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-xs hover:bg-amber-50 hover:text-amber-600 hover:border-amber-500 transition-all"
            onClick={handleCopyLink}
          >
            📋 Copy Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Floating Share Bar (Sticky on left side)
export const FloatingSocialShare: React.FC<BlogShareButtonProps> = ({
  url,
  title,
  excerpt,
  image,
  category,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const categoryTag = category ? `#${category.replace(/\s+/g, "")}` : "";

  const shareMessage = `📖 ${title}\n\n${excerpt}\n\n${categoryTag ? `${categoryTag} ` : ""}Read more: ${url}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(`📖 ${title}\n\n${categoryTag}`)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      excerpt
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(shareMessage)}`,
    pinterest: image
      ? `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          url
        )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
          shareMessage
        )}`
      : undefined,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Show/hide based on scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsVisible(window.scrollY > 600);
    });
  }

  const socialIcons: {
    name: string;
    platform:
      | "facebook"
      | "x"
      | "linkedin"
      | "whatsapp"
      | "telegram"
      | "pinterest";
  }[] = [
    { name: "facebook", platform: "facebook" },
    { name: "x", platform: "x" },
    { name: "linkedin", platform: "linkedin" },
    { name: "whatsapp", platform: "whatsapp" },
    { name: "telegram", platform: "telegram" },
  ];

  if (image) {
    socialIcons.push({ name: "pinterest", platform: "pinterest" as const });
  }

  if (!isVisible) return null;

  return (
    <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
      {socialIcons.map((social, index) => (
        <button
          key={social.platform}
          onClick={() => handleShare(social.platform)}
          className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 shadow-lg hover:bg-amber-50 hover:border-amber-500 hover:text-amber-600 transition-all duration-300 hover:shadow-xl hover:scale-110"
          title={`Share on ${social.name === "x" ? "X (Twitter)" : social.name}`}
          style={{
            animation: `fadeInLeft 0.3s ease-out ${index * 0.1}s both`,
          }}
        >
          <ShareIcon platform={social.platform} />
        </button>
      ))}

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 ${
          copied
            ? "bg-green-500 border-green-500 text-white"
            : "bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-500 hover:text-amber-600"
        }`}
        title={copied ? "Copied!" : "Copy link"}
        style={{
          animation: `fadeInLeft 0.3s ease-out ${socialIcons.length * 0.1}s both`,
        }}
      >
        {copied ? "✓" : "🔗"}
      </button>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

const ShareIcon: React.FC<{ platform: string }> = ({ platform }) => {
  const icons = {
    facebook:
      "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 2.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
    x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L2.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    linkedin:
      "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    whatsapp:
      "M20.048 3.952A11.943 11.943 0 0012.026 0C5.48 0 0.16 5.32 0.16 11.866c0 2.09.546 4.134 1.587 5.934L0 24l6.362-1.667a11.9 11.9 0 005.664 1.44h.005c6.545 0 11.864-5.32 11.864-11.866 0-3.168-1.236-6.149-3.47-8.392zm-8.022 18.24a9.887 9.887 0 01-5.038-1.38l-.36-.213-3.742.98.997-3.64-.234-.374a9.865 9.865 0 01-1.515-5.268c0-5.44 4.426-9.867 9.869-9.867a9.807 9.807 0 016.969 2.888 9.807 9.807 0 012.898 6.976c-.003 5.441-4.426 9.866-9.867 9.866zm5.433-7.389c-.296-.148-1.758-.867-2.03-.967-.273-.098-.473-.148-.672.148-.2.296-.772.967-.947 1.165-.175.197-.351.223-.647.074-.297-.148-1.253-.462-2.387-1.47-.883-.787-1.479-1.754-1.654-2.051-.175-.296-.019-.457.13-.604.136-.133.301-.347.451-.52.15-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.074-.148-.672-1.617-.921-2.215-.242-.577-.489-.498-.672-.507-.174-.008-.374-.01-.573-.01-.2 0-.522.074-.796.371-.273.297-1.043 1.017-1.043 2.48 0 1.46 1.068 2.873 1.218 3.071.149.199 2.096 3.2 5.076 4.487.71.306 1.265.489 1.697.625.712.227 1.36.195 1.872.118.568-.085 1.758-.717 2.006-1.413.247-.694.247-1.289.173-1.412-.074-.123-.274-.197-.57-.346z",
    telegram:
      "M22.05 1.577c-.393-.016-.784.08-1.117.235-.484.186-4.92 1.902-9.41 3.64-2.26.873-4.518 1.746-6.256 2.415-1.737.67-3.045 1.168-3.114 1.192-.46.16-1.082.362-1.61.984-.133.155-.267.354-.335.628s-.038.622.095.895c.265.547.714.773 1.244.976 1.76.564 3.58 1.102 5.087 1.608.556 1.96 1.09 3.927 1.618 5.89.174.394.553.54.944.544l-.002.02s.307.03.606-.042c.3-.07.677-.244 1.02-.565.377-.354 1.4-1.36 1.98-1.928l4.37 3.226.035.02s.484.34 1.192.388c.354.024.82-.044 1.22-.337.403-.294.67-.767.795-1.307.374-1.63 2.853-13.427 3.276-15.38l-.012.046c.296-1.1.187-2.108-.496-2.705-.342-.297-.736-.427-1.13-.444zm-.118 1.874c.027.025.025.025.002.027-.007-.002.03-.037-.002-.027m-10.27 14.842l-.133 1.34 1.287-1.23-1.13-.126-.025.015zm-1.278 2.063l.18-1.466.802.653-1.007.79.025.023z",
    pinterest:
      "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z",
  };

  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={icons[platform as keyof typeof icons]} />
    </svg>
  );
};

export default BlogShareButton;
