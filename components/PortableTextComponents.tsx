/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { baseClient } from "@/lib/sanity";

const builder = imageUrlBuilder(baseClient);

// Custom components for PortableText rendering
export const PortableTextComponents = {
  block: {
    // Headings
    h1: ({ children }: any) => (
      <h1 className="text-5xl font-bold text-slate-900 dark:text-white mt-10 mb-4 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-l-4 border-amber-500 pl-6 leading-tight tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-6 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-5 mb-3">
        {children}
      </h4>
    ),

    // Normal paragraph
    normal: ({ children }: any) => (
      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4 tracking-normal">
        {children}
      </p>
    ),

    // Blockquote
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-700 py-4 px-6 rounded-r-lg my-6 text-lg leading-relaxed italic text-slate-700 dark:text-slate-100">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Bullet list
    bullet: ({ children }: any) => (
      <ul className="my-4 space-y-2 list-disc list-outside ml-6">{children}</ul>
    ),
    // Numbered list
    number: ({ children }: any) => (
      <ol className="my-4 space-y-2 list-decimal list-outside ml-6">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed pl-2 marker:text-amber-600 marker:font-bold">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed pl-2 marker:text-amber-600 marker:font-bold">
        {children}
      </li>
    ),
  },

  marks: {
    // Strong/bold
    strong: ({ children }: any) => (
      <strong className="text-slate-900 dark:text-white font-bold">
        {children}
      </strong>
    ),
    // Emphasis/italic
    em: ({ children }: any) => (
      <em className="text-slate-800 dark:text-slate-300 italic">{children}</em>
    ),
    // Link
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-amber-600 font-medium no-underline hover:text-amber-700 hover:underline transition-colors"
        >
          {children}
        </a>
      );
    },
    // Code
    code: ({ children }: any) => (
      <code className="bg-slate-100 px-2 py-1 rounded text-amber-600 font-mono text-base font-medium">
        {children}
      </code>
    ),
  },

  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6 max-w-2xl mx-auto">
          <Image
            src={builder.image(value).url()}
            alt={value.alt || "Article image"}
            width={600}
            height={400}
            className="rounded-xl w-full h-auto max-h-136"
          />
          {value.caption && (
            <p className="text-center text-sm text-slate-500 mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};
