import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, X, Bookmark, BookmarkPlus, Filter, 
  Clock, Star, FileText, Code, Brain, Database,
  TrendingUp, History, Trash2, Settings, SortAsc, SortDesc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const GlobalSearch = ({ onNavigate, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    types: [],
    difficulty: [],
    bookmarked: false,
    completed: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder] = useState('desc');
  const [searchHistory, setSearchHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const searchRef = useRef(null);
  // const resultsRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedBookmarks = localStorage.getItem('bookmarks');
    const savedRecent = localStorage.getItem('recentSearches');
    
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedRecent) setRecentSearches(JSON.parse(savedRecent));
  }, []);

  // Search functionality
  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setResults([]);
      setFilteredResults([]);
    }
  }, [query]);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [results, filters, sortBy, sortOrder]);

  const performSearch = async (searchQuery) => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Search through all content
    const allContent = getAllContent();
    const searchResults = searchContent(allContent, searchQuery);
    
    setResults(searchResults);
    setIsSearching(false);
    
    // Save to search history
    addToSearchHistory(searchQuery);
  };

  const getAllContent = () => {
    // This would typically come from your content management system
    // For now, we'll use sample data
    return [
      {
        id: 'ai-engineer-neural-networks',
        title: 'Neural Networks Fundamentals',
        category: 'AI Engineer',
        type: 'lesson',
        difficulty: 'intermediate',
        description: 'Learn the basics of neural networks and deep learning',
        tags: ['neural networks', 'deep learning', 'AI', 'machine learning'],
        path: '/ai-engineer/neural-networks',
        bookmarked: false,
        completed: false,
        lastAccessed: '2024-01-15'
      },
      {
        id: 'data-analyst-visualization',
        title: 'Data Visualization with Python',
        category: 'Data Analyst',
        type: 'lesson',
        difficulty: 'beginner',
        description: 'Create compelling visualizations using matplotlib and seaborn',
        tags: ['data visualization', 'python', 'matplotlib', 'seaborn'],
        path: '/data-analyst/visualization',
        bookmarked: true,
        completed: true,
        lastAccessed: '2024-01-10'
      },
      {
        id: 'ai-scientist-statistics',
        title: 'Statistical Analysis for AI',
        category: 'AI Data Scientist',
        type: 'lesson',
        difficulty: 'advanced',
        description: 'Advanced statistical methods for AI applications',
        tags: ['statistics', 'AI', 'data science', 'probability'],
        path: '/ai-scientist/statistics',
        bookmarked: false,
        completed: false,
        lastAccessed: '2024-01-12'
      },
      {
        id: 'red-teaming-adversarial',
        title: 'Adversarial Machine Learning',
        category: 'AI Red Teaming',
        type: 'lesson',
        difficulty: 'advanced',
        description: 'Understanding and defending against adversarial attacks',
        tags: ['adversarial', 'security', 'machine learning', 'defense'],
        path: '/red-teaming/adversarial',
        bookmarked: true,
        completed: false,
        lastAccessed: '2024-01-14'
      },
      {
        id: 'agents-multi-agent',
        title: 'Multi-Agent Systems',
        category: 'AI Agents',
        type: 'lesson',
        difficulty: 'intermediate',
        description: 'Building intelligent multi-agent systems',
        tags: ['agents', 'multi-agent', 'AI', 'coordination'],
        path: '/agents/multi-agent',
        bookmarked: false,
        completed: true,
        lastAccessed: '2024-01-08'
      }
    ];
  };

  const searchContent = (content, query) => {
    const searchTerms = query.toLowerCase().split(' ');
    
    return content.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        ...item.tags,
        item.category
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  const applyFilters = () => {
    let filtered = [...results];
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(item => filters.categories.includes(item.category));
    }
    
    // Apply type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(item => filters.types.includes(item.type));
    }
    
    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(item => filters.difficulty.includes(item.difficulty));
    }
    
    // Apply bookmarked filter
    if (filters.bookmarked) {
      filtered = filtered.filter(item => item.bookmarked);
    }
    
    // Apply completed filter
    if (filters.completed) {
      filtered = filtered.filter(item => item.completed);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'relevance':
          comparison = b.lastAccessed.localeCompare(a.lastAccessed);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'difficulty': {
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        }
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
    
    setFilteredResults(filtered);
  };

  const addToSearchHistory = (searchQuery) => {
    const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const toggleBookmark = (itemId) => {
    const updatedBookmarks = bookmarks.includes(itemId)
      ? bookmarks.filter(id => id !== itemId)
      : [...bookmarks, itemId];
    
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    
    // Update results
    setResults(prev => prev.map(item => 
      item.id === itemId ? { ...item, bookmarked: !item.bookmarked } : item
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(filteredResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result) => {
    onNavigate(result.path);
    onClose();
    
    // Add to recent searches
    const newRecent = [result, ...recentSearches.filter(r => r.id !== result.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setFilteredResults([]);
    setSelectedIndex(-1);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lesson': return FileText;
      case 'quiz': return Brain;
      case 'practice': return Code;
      case 'project': return Database;
      default: return FileText;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-4xl mx-4">
        <Card className="shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  ref={searchRef}
                  placeholder="Search lessons, topics, or concepts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-10 h-12 text-lg"
                  autoFocus
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel>Search Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    {['AI Engineer', 'Data Analyst', 'AI Data Scientist', 'AI Red Teaming', 'AI Agents'].map(category => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            categories: checked 
                              ? [...prev.categories, category]
                              : prev.categories.filter(c => c !== category)
                          }));
                        }}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Types</DropdownMenuLabel>
                    {['lesson', 'quiz', 'practice', 'project'].map(type => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={filters.types.includes(type)}
                        onCheckedChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            types: checked 
                              ? [...prev.types, type]
                              : prev.types.filter(t => t !== type)
                          }));
                        }}
                      >
                        {type}
                      </DropdownMenuCheckboxItem>
                    ))}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
                    {['beginner', 'intermediate', 'advanced'].map(difficulty => (
                      <DropdownMenuCheckboxItem
                        key={difficulty}
                        checked={filters.difficulty.includes(difficulty)}
                        onCheckedChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            difficulty: checked 
                              ? [...prev.difficulty, difficulty]
                              : prev.difficulty.filter(d => d !== difficulty)
                          }));
                        }}
                      >
                        {difficulty}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {[
                      { value: 'relevance', label: 'Relevance' },
                      { value: 'title', label: 'Title' },
                      { value: 'category', label: 'Category' },
                      { value: 'difficulty', label: 'Difficulty' }
                    ].map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={sortBy === option.value ? 'bg-accent' : ''}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="results">
                  Results ({filteredResults.length})
                </TabsTrigger>
                <TabsTrigger value="bookmarks">
                  Bookmarks ({bookmarks.length})
                </TabsTrigger>
                <TabsTrigger value="history">
                  History ({searchHistory.length})
                </TabsTrigger>
                <TabsTrigger value="recent">
                  Recent ({recentSearches.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="results" className="mt-4">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2">Searching...</span>
                  </div>
                ) : query ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredResults.map((result, index) => {
                      const TypeIcon = getTypeIcon(result.type);
                      return (
                        <div
                          key={result.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            index === selectedIndex ? 'bg-accent border-primary' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleResultClick(result)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <TypeIcon className="w-4 h-4 text-muted-foreground" />
                                <h3 className="font-semibold">{result.title}</h3>
                                <Badge variant="outline">{result.category}</Badge>
                                <Badge className={getDifficultyColor(result.difficulty)}>
                                  {result.difficulty}
                                </Badge>
                                {result.completed && (
                                  <Badge className="bg-green-100 text-green-800">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {result.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {result.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(result.id);
                                }}
                              >
                                {result.bookmarked ? (
                                  <Bookmark className="w-4 h-4 text-yellow-500 fill-current" />
                                ) : (
                                  <BookmarkPlus className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {filteredResults.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No results found for "{query}"
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Start typing to search...
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="bookmarks" className="mt-4">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bookmarks.length > 0 ? (
                    bookmarks.map(bookmarkId => {
                      const result = getAllContent().find(item => item.id === bookmarkId);
                      if (!result) return null;
                      
                      const TypeIcon = getTypeIcon(result.type);
                      return (
                        <div
                          key={result.id}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleResultClick(result)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <TypeIcon className="w-4 h-4 text-muted-foreground" />
                                <h3 className="font-semibold">{result.title}</h3>
                                <Badge variant="outline">{result.category}</Badge>
                                <Bookmark className="w-4 h-4 text-yellow-500 fill-current" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No bookmarks yet
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchHistory.map((searchTerm, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between"
                      onClick={() => setQuery(searchTerm)}
                    >
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-muted-foreground" />
                        <span>{searchTerm}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchHistory(prev => prev.filter((_, i) => i !== index));
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-4">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {recentSearches.map((result) => {
                    const TypeIcon = getTypeIcon(result.type);
                    return (
                      <div
                        key={result.id}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <TypeIcon className="w-4 h-4 text-muted-foreground" />
                              <h3 className="font-semibold">{result.title}</h3>
                              <Badge variant="outline">{result.category}</Badge>
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalSearch; 