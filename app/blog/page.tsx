import { client } from "@/lib/sanity";
import { PostCard, Post } from "@/components/PostCard";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

// This function fetches our data from Sanity
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{
        url
      }
    },
    "category": categories[0]->title,
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }`;

  const posts = await client.fetch<Post[]>(query);
  return posts;
}

// The main page component
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm mb-6">
              <span>{posts.length} Expert Guides</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Home Improvement{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed">
              Discover practical tips, expert reviews, and product
              recommendations to transform your home.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-slate-300 hover:border-amber-500 hover:text-amber-600 transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-300 hover:border-amber-500 hover:text-amber-600 transition-all duration-300"
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-300 hover:border-amber-500 hover:text-amber-600 transition-all duration-300"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No posts found
            </h3>
            <p className="text-slate-600">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                All Articles{" "}
                <span className="text-slate-500 font-normal">
                  ({posts.length})
                </span>
              </h2>

              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium text-slate-700">
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Get the latest home improvement tips delivered straight to your
              inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
