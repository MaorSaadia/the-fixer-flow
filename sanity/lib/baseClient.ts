import { createClient } from "next-sanity";

export const baseClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "azv8uhjd",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-12-06",
  useCdn: true, // Set to false if you want fresh data
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
