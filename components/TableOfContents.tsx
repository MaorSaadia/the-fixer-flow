"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Extract all h2 and h3 headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const headingData: Heading[] = [];

    headingElements.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      headingData.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      });
    });

    setHeadings(headingData);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hidden xl:block fixed right-8 top-32 w-72 z-30"
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 dark:bg-slate-800 dark:from-slate-800 dark:to-slate-800 dark:hover:from-slate-800 dark:hover:to-slate-800 transition-colors duration-300 border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <List className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Table of Contents
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          )}
        </button>

        {/* Headings List */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                  {headings.map((heading, index) => (
                    <motion.li
                      key={heading.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300
                          ${heading.level === 3 ? "pl-6" : "pl-3"}
                          ${
                            activeId === heading.id
                              ? "bg-amber-50 text-amber-700 font-semibold border-l-4 border-amber-600 dark:bg-amber-950 dark:text-amber-500 dark:border-amber-500"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:border-transparent dark:hover:border-amber-500"
                          }
                        `}
                      >
                        <span className="line-clamp-2 leading-snug">
                          {heading.text}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Toggle Button */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fb923c;
        }
      `}</style>
    </motion.div>
  );
}

// Mobile-friendly Table of Contents (shows at top of article on mobile)
export function MobileTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const headingData: Heading[] = [];

    headingElements.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      headingData.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      });
    });

    setHeadings(headingData);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="xl:hidden mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl border-2 border-amber-200 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <List className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900">Table of Contents</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-700" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-700" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <ul className="space-y-1">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300
                        ${heading.level === 3 ? "pl-6" : "pl-3"}
                        text-slate-600 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950 border-l-4 border-transparent hover:border-amber-600
                      `}
                    >
                      <span className="line-clamp-2 leading-snug">
                        {heading.text}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
