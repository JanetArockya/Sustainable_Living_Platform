import React, { useState } from 'react';
import { BookOpen, Clock, Star, Play, ChevronRight, Search, Filter } from 'lucide-react';
import { mockArticles } from '../../data/mockData';
import { Article } from '../../types';

export const EducationalContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'energy', name: 'Energy' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'climate', name: 'Climate' },
    { id: 'technology', name: 'Technology' }
  ];

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const handleReadArticle = (articleId: string) => {
    setReadArticles(prev => new Set([...prev, articleId]));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      energy: 'bg-yellow-100 text-yellow-700',
      lifestyle: 'bg-green-100 text-green-700',
      agriculture: 'bg-emerald-100 text-emerald-700',
      climate: 'bg-blue-100 text-blue-700',
      technology: 'bg-purple-100 text-purple-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Learn About Sustainability</h2>
        </div>
        <p className="text-gray-600">
          Explore articles, guides, and educational content about sustainability, climate change, and green living.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Featured Articles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <div 
                key={article.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleReadArticle(article.id)}
              >
                {article.image && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span className="mr-1">Read more</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div className="space-y-4">
        {featuredArticles.length > 0 && <h3 className="text-xl font-semibold text-gray-900">More Articles</h3>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleReadArticle(article.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category.toUpperCase()}
                </span>
                {readArticles.has(article.id) && (
                  <span className="text-green-600 text-xs">✓ Read</span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{article.readTime} min</span>
                </div>
                <span>{new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{readArticles.size}</div>
            <div className="text-sm text-blue-700">Articles Read</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {readArticles.size * 6}
            </div>
            <div className="text-sm text-green-700">Minutes Learned</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-sm text-purple-700">Categories Explored</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {readArticles.size * 10}
            </div>
            <div className="text-sm text-yellow-700">Knowledge Points</div>
          </div>
        </div>
      </div>

      {/* Video Content Preview */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center mb-4">
          <Play className="h-6 w-6 mr-3" />
          <h3 className="text-xl font-semibold">Video Learning</h3>
        </div>
        <p className="text-blue-100 mb-4">
          Watch educational videos about renewable energy, sustainable practices, and environmental science.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Browse Videos
        </button>
      </div>
    </div>
  );
};