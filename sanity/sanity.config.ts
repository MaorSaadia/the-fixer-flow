import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { structure } from "./structure";

// Import schemas
import post from "./schemaTypes/post";
import blockContent from "./schemaTypes/blockContent";
import author from "./schemaTypes/author";
import category from "./schemaTypes/category";
import product from "./schemaTypes/product";

export default defineConfig({
  name: "default",
  title: "The Fixer Flow",
  projectId: "azv8uhjd",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-12-06" }),
  ],
  schema: {
    types: [post, author, category, product, blockContent],
  },
});
