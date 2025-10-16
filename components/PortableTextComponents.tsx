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
      <h1 className="text-5xl font-bold text-slate-900 mt-16 mb-8 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl font-bold text-slate-900 mt-16 mb-8 border-l-4 border-amber-500 pl-6 leading-tight tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl font-bold text-slate-900 mt-12 mb-6 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
        {children}
      </h4>
    ),

    // Normal paragraph
    normal: ({ children }: any) => (
      <p className="text-slate-700 text-lg leading-[1.9] mb-8 tracking-normal">
        {children}
      </p>
    ),

    // Blockquote
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-500 bg-amber-50 py-6 px-8 rounded-r-lg my-10 text-lg leading-relaxed italic text-slate-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Bullet list
    bullet: ({ children }: any) => (
      <ul className="my-8 space-y-4 list-disc list-outside ml-6">{children}</ul>
    ),
    // Numbered list
    number: ({ children }: any) => (
      <ol className="my-8 space-y-4 list-decimal list-outside ml-6">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-slate-700 text-lg leading-[1.9] pl-2 marker:text-amber-600 marker:font-bold">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-slate-700 text-lg leading-[1.9] pl-2 marker:text-amber-600 marker:font-bold">
        {children}
      </li>
    ),
  },

  marks: {
    // Strong/bold
    strong: ({ children }: any) => (
      <strong className="text-slate-900 font-bold">{children}</strong>
    ),
    // Emphasis/italic
    em: ({ children }: any) => (
      <em className="text-slate-800 italic">{children}</em>
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
    // Image
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-10">
          <Image
            src={builder.image(value).url()}
            alt={value.alt || "Article image"}
            width={1200}
            height={800}
            className="rounded-xl shadow-lg w-full"
          />
          {value.caption && (
            <p className="text-center text-sm text-slate-500 mt-3 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};
