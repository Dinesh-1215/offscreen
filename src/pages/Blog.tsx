import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Search, Filter, Tag, Calendar, User, Eye, TrendingUp } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "latest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "popular") return b.readTime - a.readTime; // Mock popularity by read time
      if (sortBy === "shortest") return a.readTime - b.readTime;
      return 0;
    });

  const featuredPost = blogPosts[0];
  const popularTags = allTags.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Focus & Productivity Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Insights, tips, and strategies to help you master focus and digital wellness in our connected world
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="shortest">Quick Reads</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-600" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                >
                  <option value="">All Topics</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {!searchTerm && !selectedTag && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Featured Article
            </h2>
            <Link to={`/blog/${featuredPost.slug}`} className="group">
              <Card className="bg-white/90 backdrop-blur-sm border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-lg text-slate-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button className="btn-primary">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-8">
                    <div className="text-center">
                      <Eye className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-blue-800 font-semibold">Featured Read</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Popular Tags */}
        {!searchTerm && !selectedTag && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Popular Topics</h3>
            <div className="flex flex-wrap gap-3">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-16">
          {filteredPosts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {searchTerm || selectedTag ? 'Search Results' : 'All Articles'}
                  <span className="text-lg font-normal text-slate-600 ml-2">
                    ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
                  </span>
                </h2>
                {(searchTerm || selectedTag) && (
                  <Button 
                    onClick={() => { setSearchTerm(""); setSelectedTag(""); }}
                    variant="outline"
                    className="text-slate-600 hover:text-slate-800"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                        <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base line-clamp-3 mb-4 text-slate-600">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search terms or browse by topic
              </p>
              <Button 
                onClick={() => { setSearchTerm(""); setSelectedTag(""); }}
                className="btn-primary"
              >
                View All Articles
              </Button>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900">Stay Updated</CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Get the latest productivity tips and focus strategies delivered to your inbox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-slate-500 text-center mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
