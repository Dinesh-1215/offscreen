import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Edit, Trash2, Eye } from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    metaDescription: "",
    keywords: "",
    readTime: 5
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "dev654321" && credentials.password === "Demo123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const handleCreatePost = () => {
    // In a real app, this would save to a database
    const post: BlogPost = {
      id: Date.now().toString(),
      ...newPost,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      author: "Admin",
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      keywords: newPost.keywords.split(',').map(keyword => keyword.trim()),
      slug: newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    };

    toast({
      title: "Post Created",
      description: `"${post.title}" has been created successfully!`
    });

    setNewPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: "",
      metaDescription: "",
      keywords: "",
      readTime: 5
    });
    setShowCreateForm(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags.join(', '),
      metaDescription: post.metaDescription,
      keywords: post.keywords.join(', '),
      readTime: post.readTime
    });
    setShowCreateForm(true);
  };

  const handleDeletePost = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      toast({
        title: "Post Deleted",
        description: `"${post.title}" has been deleted.`,
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-slate-900">Admin Login</CardTitle>
            <CardDescription className="text-slate-600">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-900 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  placeholder="dev654321"
                  required
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Demo123"
                  required
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full shadow-md hover:shadow-lg transition-all duration-200">
                Login
              </Button>
            </form>
            <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm text-slate-600">
              <p><strong>Demo Credentials:</strong></p>
              <p>Username: dev654321</p>
              <p>Password: Demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-slate-600">
              Manage blog posts and website content
            </p>
          </div>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-200"
          >
            Logout
          </Button>
        </div>

        {/* Create/Edit Post Form */}
        {showCreateForm && (
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-slate-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Title</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="Enter post title"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Slug</label>
                    <Input
                      value={newPost.slug}
                      onChange={(e) => setNewPost({...newPost, slug: e.target.value})}
                      placeholder="url-friendly-slug"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Meta Description</label>
                    <Textarea
                      value={newPost.metaDescription}
                      onChange={(e) => setNewPost({...newPost, metaDescription: e.target.value})}
                      placeholder="SEO meta description"
                      rows={3}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Tags (comma separated)</label>
                    <Input
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                      placeholder="productivity, focus, tips"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Keywords (comma separated)</label>
                    <Input
                      value={newPost.keywords}
                      onChange={(e) => setNewPost({...newPost, keywords: e.target.value})}
                      placeholder="SEO keywords for better ranking"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Read Time (minutes)</label>
                    <Input
                      type="number"
                      value={newPost.readTime}
                      onChange={(e) => setNewPost({...newPost, readTime: parseInt(e.target.value)})}
                      min="1"
                      max="60"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Excerpt</label>
                    <Textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      placeholder="Brief description of the post"
                      rows={4}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Content (Markdown)</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="# Post Title&#10;&#10;Your content here..."
                      rows={12}
                      className="font-mono text-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  {editingPost ? 'Update Post' : 'Create Post'}
                </Button>
                <Button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingPost(null);
                    setNewPost({
                      title: "",
                      slug: "",
                      excerpt: "",
                      content: "",
                      tags: "",
                      metaDescription: "",
                      keywords: "",
                      readTime: 5
                    });
                  }}
                  variant="outline"
                  className="bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Blog Posts ({blogPosts.length})
          </h2>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            New Post
          </Button>
        </div>

        {/* Posts List */}
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                      <span>•</span>
                      <div className="flex gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleEditPost(post)}
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeletePost(post.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
