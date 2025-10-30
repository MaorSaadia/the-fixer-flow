import { sanityFetch } from "./live";
import { baseClient } from "./baseClient";

export const client = baseClient;

// Posts
export const getAllPosts = async () => {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "author": author->{name, "imageUrl": image.asset->url},
      "categories": categories[]->title
    }`;
    const posts = await sanityFetch({ query });
    return posts.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      "mainImageUrl": mainImage.asset->url,
      body,
      "author": author->{name, "imageUrl": image.asset->url, bio},
      "categories": categories[]->title
    }`;
    const post = await sanityFetch({ query, params: { slug } });
    return post.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

// Categories
export const getAllCategories = async () => {
  try {
    const query = `*[_type == "category"]{
      _id,
      title,
      slug,
      description
    }`;
    const categories = await sanityFetch({ query });
    return categories.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description
    }`;
    const category = await sanityFetch({ query, params: { slug } });
    return category.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

// Products
export const getAllProducts = async () => {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc){
      _id,
      title,
      slug,
      description,
      price,
      "imageUrl": image.asset->url,
      affiliateLink,
      rating,
      reviewCount
    }`;
    const products = await sanityFetch({ query });
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      price,
      "imageUrl": image.asset->url,
      affiliateLink,
      rating,
      reviewCount,
      features,
      pros,
      cons
    }`;
    const product = await sanityFetch({ query, params: { slug } });
    return product.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Search
export const searchContent = async (searchQuery: string) => {
  try {
    const query = `*[_type in ["post", "product"] && (
      title match "*" + $searchQuery + "*" ||
      description match "*" + $searchQuery + "*" ||
      excerpt match "*" + $searchQuery + "*"
    )]{
      _type,
      _id,
      title,
      slug,
      "imageUrl": coalesce(mainImage.asset->url, image.asset->url),
      excerpt,
      description
    }`;
    const results = await sanityFetch({ query, params: { searchQuery } });
    return results.data;
  } catch (error) {
    console.error("Error searching content:", error);
    return [];
  }
};
