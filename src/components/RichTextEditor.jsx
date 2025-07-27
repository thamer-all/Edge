import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Search, Plus, Save, Trash2, Edit, Eye, EyeOff, Bold, Italic, List, Code, Quote, Link } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const RichTextEditor = ({ lessonId, onSave }) => {
  const { user } = useAuth();
  const { addXP } = useGamification();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const editorRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${lessonId}_${user?.id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [lessonId, user?.id]);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes_${lessonId}_${user?.id}`, JSON.stringify(notes));
    }
  }, [notes, lessonId, user?.id]);

  const categories = [
    'general',
    'concepts',
    'examples',
    'exercises',
    'questions',
    'resources',
    'personal'
  ];

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const noteData = {
      id: currentNote?.id || Date.now().toString(),
      title: title.trim(),
      content: content,
      category: category,
      tags: tags,
      lessonId: lessonId,
      userId: user?.id,
      createdAt: currentNote?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (currentNote) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === currentNote.id ? noteData : note
      ));
    } else {
      // Create new note
      setNotes(prev => [...prev, noteData]);
      addXP(10, 'Created a note');
    }

    setCurrentNote(null);
    setIsEditing(false);
    setContent('');
    setTitle('');
    setCategory('general');
    setTags([]);
    onSave?.(noteData);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setTags(note.tags || []);
    setIsEditing(true);
  };

  const handleDelete = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
      setIsEditing(false);
      setContent('');
      setTitle('');
      setCategory('general');
      setTags([]);
    }
  };

  const handleNewNote = () => {
    setCurrentNote(null);
    setIsEditing(true);
    setContent('');
    setTitle('');
    setCategory('general');
    setTags([]);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const formatText = (command) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let replacement = '';
    switch (command) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        break;
      case 'code':
        replacement = `\`${selectedText}\``;
        break;
      case 'quote':
        replacement = `> ${selectedText}`;
        break;
      case 'list':
        replacement = `- ${selectedText}`;
        break;
      case 'link':
        replacement = `[${selectedText}](url)`;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    // Set cursor position after the formatted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="rich-text-editor">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Notes List */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Notes</span>
                <Button onClick={handleNewNote} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
              
              {/* Search and Filter */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredNotes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    {searchTerm || selectedCategory !== 'all' ? 'No notes found' : 'No notes yet'}
                  </p>
                ) : (
                  filteredNotes.map(note => (
                    <div
                      key={note.id}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                        currentNote?.id === note.id ? 'bg-accent border-primary' : ''
                      }`}
                      onClick={() => handleEdit(note)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{note.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {note.content.substring(0, 50)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {note.category}
                            </Badge>
                            {note.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {note.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{note.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(note.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{isEditing ? (currentNote ? 'Edit Note' : 'New Note') : 'Note Editor'}</span>
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  {/* Title */}
                  <Input
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  
                  {/* Category */}
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Tags */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button onClick={addTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 p-2 border rounded-lg bg-muted">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('bold')}
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('italic')}
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('code')}
                      title="Code"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('quote')}
                      title="Quote"
                    >
                      <Quote className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('list')}
                      title="List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('link')}
                      title="Link"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Content Editor */}
                  {showPreview ? (
                    <div className="border rounded-lg p-4 min-h-64 max-h-96 overflow-y-auto">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                      />
                    </div>
                  ) : (
                    <Textarea
                      ref={editorRef}
                      placeholder="Write your note here... (Supports Markdown)"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-64 resize-none"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Edit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a note to edit or create a new one</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor; 