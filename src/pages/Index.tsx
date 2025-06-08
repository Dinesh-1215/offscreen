import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Volume2, Monitor, ArrowRight, BookOpen, Calculator, FileText, DollarSign } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  const tools = [
    {
      icon: Monitor,
      title: "Keep Screen Awake",
      description: "Prevent your screen from going to sleep during important tasks",
      href: "/tools#keep-awake"
    },
    {
      icon: Clock,
      title: "Pomodoro Timer",
      description: "25-minute focused work sessions with 5-minute breaks",
      href: "/tools#pomodoro"
    },
    {
      icon: Volume2,
      title: "White Noise Player",
      description: "Ambient sounds to help you focus and block distractions",
      href: "/tools#white-noise"
    },
    {
      icon: Calculator,
      title: "Calculator",
      description: "Quick calculations for daily tasks and work",
      href: "/tools#calculator"
    },
    {
      icon: FileText,
      title: "Word Counter",
      description: "Count words, characters, and paragraphs instantly",
      href: "/tools#word-counter"
    },
    {
      icon: DollarSign,
      title: "Financial Tools",
      description: "Budget calculator, loan calculator, and more",
      href: "/tools#financial-tools"
    }
  ];

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="gradient-bg min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 text-balance">
              Stay Focused, Work Smarter
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 text-balance">
              Free tools and tips to beat distractions and thrive online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools">
                <Button className="btn-primary text-lg">
                  Explore Tools
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button className="btn-secondary text-lg">
                  <BookOpen className="h-5 w-5" />
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <p className="text-slate-700 font-medium">AdSense Ad Placement</p>
            <p className="text-slate-500 text-sm mt-1">Horizontal banner ad will appear here after approval</p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-border">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Focus-Enhancing Tools
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Simple, effective tools to help you stay productive and focused throughout your day
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <Link key={tool.title} to={tool.href}>
                  <Card className="card-hover h-full tool-card">
                    <CardHeader className="text-center pb-4">
                      <div className="tool-icon">
                        <tool.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-base text-slate-600 mb-4">
                        {tool.description}
                      </CardDescription>
                      <Button className="btn-primary w-full">
                        Use Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-border">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Insights and tips to help you master focus and digital wellness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                  <Card className="card-hover h-full tool-card">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <CardTitle className="text-xl line-clamp-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base line-clamp-3 text-slate-600">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-slate-500">{post.date}</span>
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

            <div className="text-center mt-12">
              <Link to="/blog">
                <Button className="btn-primary">
                  View All Articles
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
