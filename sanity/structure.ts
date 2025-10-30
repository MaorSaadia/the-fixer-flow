import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Add your document types here
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("product").title("Products"),

      // This adds all other document types
      ...S.documentTypeListItems().filter(
        (item) =>
          !["post", "author", "category", "product"].includes(
            item.getId() || ""
          )
      ),
    ]);
