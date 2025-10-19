"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link2,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShareButtons({
  url,
  title,
  description,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
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

  const handleShare = (platform: string) => {
    window.open(
      shareLinks[platform as keyof typeof shareLinks],
      "_blank",
      "width=600,height=400"
    );
  };

  const socialButtons = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
      action: () => handleShare("facebook"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "from-sky-500 to-sky-600",
      hoverColor: "hover:from-sky-600 hover:to-sky-700",
      action: () => handleShare("twitter"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "from-blue-700 to-blue-800",
      hoverColor: "hover:from-blue-800 hover:to-blue-900",
      action: () => handleShare("linkedin"),
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      action: () => handleShare("whatsapp"),
    },
    {
      name: "Email",
      icon: Mail,
      color: "from-slate-600 to-slate-700",
      hoverColor: "hover:from-slate-700 hover:to-slate-800",
      action: () => handleShare("email"),
    },
  ];

  return (
    <div className="flex flex-col gap-4 -mb-16">
      <div className="flex items-center gap-3 text-slate-700">
        <Share2 className="w-5 h-5" />
        <span className="font-semibold">Share this article</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {socialButtons.map((button, index) => (
          <motion.button
            key={button.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.action}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg
              bg-gradient-to-r ${button.color} ${button.hoverColor}
              text-white font-medium shadow-lg
              transition-all duration-300
              hover:shadow-xl
            `}
            title={`Share on ${button.name}`}
          >
            <button.icon className="w-4 h-4" />
            <span className="text-sm">{button.name}</span>
          </motion.button>
        ))}

        {/* Copy Link Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: socialButtons.length * 0.05 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg
            ${
              copied
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            }
            text-white font-medium shadow-lg
            transition-all duration-300
            hover:shadow-xl
          `}
          title="Copy link"
        >
          <Link2 className="w-4 h-4" />
          <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
        </motion.button>
      </div>
    </div>
  );
}

// Floating Share Bar (Sticky on scroll)
export function FloatingSocialShare({ url, title }: SocialShareProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: string) => {
    window.open(
      shareLinks[platform as keyof typeof shareLinks],
      "_blank",
      "width=600,height=400"
    );
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

  const socialIcons = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-600",
      action: () => handleShare("facebook"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-sky-500",
      action: () => handleShare("twitter"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-blue-700",
      action: () => handleShare("linkedin"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
    >
      {socialIcons.map((social, index) => (
        <motion.button
          key={social.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.15, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={social.action}
          className={`
            w-12 h-12 rounded-full bg-white border-2 border-slate-200
            flex items-center justify-center text-slate-600
            shadow-lg ${social.color} hover:text-white
            transition-all duration-300 hover:shadow-xl
          `}
          title={`Share on ${social.name}`}
        >
          <social.icon className="w-5 h-5" />
        </motion.button>
      ))}

      {/* Copy Link */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        whileHover={{ scale: 1.15, x: 4 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className={`
          w-12 h-12 rounded-full border-2
          flex items-center justify-center
          shadow-lg transition-all duration-300 hover:shadow-xl
          ${
            copied
              ? "bg-green-500 border-green-500 text-white"
              : "bg-white border-slate-200 text-slate-600 hover:bg-amber-500 hover:border-amber-500 hover:text-white"
          }
        `}
        title="Copy link"
      >
        <Link2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
