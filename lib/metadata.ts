// lib/metadata.ts

import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thefixerflow.com";
const siteName = "The Fixer Flow";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Generate comprehensive SEO metadata
 */
export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
}: SEOProps): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | ${siteName}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title,
    description,

    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        tags,
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@thefixerflow",
    },

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogPostSEO({
  title,
  description,
  slug,
  image,
  publishedAt,
  updatedAt,
  author = "The Fixer Flow",
  category,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
}): Metadata {
  return generateSEO({
    title,
    description,
    path: `/blog/${slug}`,
    image: image || "/og-image.jpg",
    type: "article",
    publishedTime: publishedAt,
    modifiedTime: updatedAt || publishedAt,
    author,
    tags: category ? [category] : undefined,
  });
}

/**
 * Generate structured data (JSON-LD) for articles
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  image,
  publishedAt,
  updatedAt,
  author = "The Fixer Flow",
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };
}

/**
 * Generate structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Expert home improvement solutions, product reviews, and practical tips for a smoother home.",
    sameAs: [
      // Add your social media URLs here
      // "https://facebook.com/thefixerflow",
      // "https://twitter.com/thefixerflow",
      // "https://instagram.com/thefixerflow",
      // "https://pinterest.com/thefixerflow",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
  };
}

/**
 * Generate structured data for Website
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
    description: "Expert home improvement solutions and product reviews",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
