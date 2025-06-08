
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft, ArrowRight, Share2, Bookmark, Eye, EyeOff, Plus, Minus, Copy, CheckCircle, Calendar, User, Tag, MessageCircle, ThumbsUp, Coffee, Settings } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReadingTools, setShowReadingTools] = useState(false);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    // Simulate reading progress
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Post Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-lg">
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tableOfContents = [
    "Introduction",
    "Main Concepts", 
    "Practical Applications",
    "Advanced Techniques",
    "Conclusion"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Floating Reading Tools - Right Side */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div 
          className={`transition-all duration-300 ${showReadingTools ? 'w-64' : 'w-12'}`}
          onMouseEnter={() => setShowReadingTools(true)}
          onMouseLeave={() => setShowReadingTools(false)}
        >
          <Card className={`shadow-xl border-0 overflow-hidden ${
            isDarkMode ? 'bg-slate-800/95' : 'bg-white/95'
          } backdrop-blur-sm`}>
            <div className="p-3">
              {!showReadingTools ? (
                // Collapsed state - just the settings icon
                <div className="flex items-center justify-center">
                  <Settings className={`h-6 w-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                </div>
              ) : (
                // Expanded state - full tools
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <Settings className={`h-5 w-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Reading Tools
                    </span>
                  </div>
                  
                  {/* Font Size Controls */}
                  <div className="space-y-2">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Font Size
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
                        size="sm"
                        variant="outline"
                        className={`h-8 w-8 p-0 ${
                          isDarkMode 
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className={`text-sm min-w-[40px] text-center ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {fontSize}px
                      </span>
                      
                      <Button
                        onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
                        size="sm"
                        variant="outline"
                        className={`h-8 w-8 p-0 ${
                          isDarkMode 
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Dark Mode Toggle */}
                  <div className="space-y-2">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Theme
                    </span>
                    <Button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      size="sm"
                      variant="outline"
                      className={`w-full justify-start gap-2 ${
                        isDarkMode 
                          ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isDarkMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                  </div>
                  
                  {/* Table of Contents Toggle */}
                  <div className="space-y-2">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Navigation
                    </span>
                    <Button
                      onClick={() => setShowTableOfContents(!showTableOfContents)}
                      size="sm"
                      variant="outline"
                      className={`w-full justify-start gap-2 ${
                        showTableOfContents
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : isDarkMode 
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      📋 Table of Contents
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Table of Contents Sidebar */}
      {showTableOfContents && (
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-64">
          <Card className={`shadow-xl border-0 ${isDarkMode ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-sm`}>
            <div className="p-4">
              <h3 className={`font-medium mb-3 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index}`}
                    className={`block text-sm transition-colors duration-200 hover:text-blue-600 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </Card>
        </div>
      )}

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="outline" className={`px-4 py-2 rounded-lg font-normal transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow-md border hover:border-blue-300 hover:text-blue-600 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' 
                : 'bg-white hover:bg-blue-50 border-slate-300 text-slate-700'
            }`}>
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <div className={`flex flex-wrap items-center gap-4 text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Coffee className="h-4 w-4" />
              <span>Reading time: {Math.floor(readingTime / 60)}:{(readingTime % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          
          <h1 className={`text-4xl lg:text-5xl font-bold mb-6 text-balance ${
            isDarkMode ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {post.title}
          </h1>
          
          <p className={`text-xl font-normal mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-sm font-normal rounded-md ${
                    isDarkMode 
                      ? 'bg-blue-900 text-blue-300' 
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <Tag className="h-3 w-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsBookmarked(!isBookmarked)}
                size="sm"
                variant="outline"
                className={`transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                }`}
              >
                <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              
              <Button 
                onClick={handleShare} 
                size="sm" 
                variant="outline"
                className={`transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${Math.min((readingTime / (post.readTime * 60)) * 100, 100)}%` }}
          />
        </div>

        {/* AdSense Placeholder - In-article */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-600' 
              : 'bg-slate-100 border-slate-300'
          }`}>
            <p className={`font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>AdSense Ad Placement</p>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>In-article ad will appear here after approval</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className={`leading-relaxed transition-all duration-300 font-normal ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
          >
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/\n/g, '<br />')
                  .replace(/#{1,6}\s/g, `<h2 id="section-0" class="text-2xl font-semibold mt-8 mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}">`)
                  .replace(/<h2[^>]*>/g, `<h2 class="text-2xl font-semibold mt-8 mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}">`) 
              }} 
            />
          </div>
        </div>

        {/* Engagement Section */}
        <div className="max-w-4xl mx-auto mt-12 mb-12">
          <Card className={`shadow-lg border-0 ${isDarkMode ? 'bg-slate-800' : 'bg-white/90 backdrop-blur-sm'}`}>
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Was this article helpful?
              </h3>
              <div className="flex items-center gap-4">
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful (23)
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Discuss
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  }`}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Author Bio */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className={`shadow-lg border-0 ${isDarkMode ? 'bg-slate-800' : 'bg-white/90 backdrop-blur-sm'}`}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {post.author}
                  </h3>
                  <p className={`mb-3 font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Productivity expert and digital wellness advocate with over 5 years of experience helping people optimize their focus and achieve their goals.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                  >
                    Follow Author
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto mt-20">
            <h2 className={`text-3xl font-bold mb-8 text-center ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
                  <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg ${
                    isDarkMode 
                      ? 'bg-slate-800 hover:bg-slate-750' 
                      : 'bg-white/90 backdrop-blur-sm hover:bg-white'
                  }`}>
                    <CardHeader>
                      <div className={`flex items-center gap-2 text-sm mb-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <Clock className="h-4 w-4" />
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                      <CardTitle className={`text-lg line-clamp-2 group-hover:text-blue-600 transition-colors ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className={`line-clamp-3 mb-4 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {relatedPost.excerpt}
                      </CardDescription>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-200 p-0 h-auto font-normal"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
