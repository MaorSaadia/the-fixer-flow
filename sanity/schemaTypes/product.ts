export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "productName",
      title: "Product Name",
      type: "string",
    },
    {
      name: "productImage",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "affiliateLink",
      title: "Affiliate Link",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "productName",
      media: "productImage",
    },
  },
};
