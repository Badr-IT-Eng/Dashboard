import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Folder, 
  Search, 
  Edit3, 
  Trash2, 
  Save,
  Eye,
  Code,
  Image,
  Link,
  Hash,
  Bold,
  Italic,
  List,
  CheckSquare,
  Calendar,
  Tag
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  type: 'note' | 'task' | 'project';
}

const NeuralWorkspace = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'NEURAL_ARCHITECTURE_PATTERNS',
      content: `# Neural Architecture Patterns

## Core Concepts
- **Quantum State Management**: Advanced state synchronization
- **Neural Network Routing**: Dynamic component loading
- **Cyber Security Protocols**: Advanced authentication

## Implementation Notes
\`\`\`typescript
const neuralPattern = {
  quantum: true,
  sync: 'real-time',
  security: 'maximum'
};
\`\`\`

## Next Steps
- [ ] Implement quantum state
- [ ] Add neural routing
- [ ] Enhance security protocols`,
      category: 'DEVELOPMENT',
      tags: ['architecture', 'patterns', 'neural'],
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-15'),
      type: 'note'
    },
    {
      id: '2',
      title: 'CYBERPUNK_DESIGN_SYSTEM',
      content: `# Cyberpunk Design System

## Color Palette
- **Primary**: #00ffff (Cyan)
- **Secondary**: #ff0080 (Magenta)
- **Accent**: #00ff41 (Green)

## Typography
- **Headers**: Orbitron
- **Body**: Rajdhani

## Effects
- Glow effects with box-shadow
- Scan line animations
- Matrix background patterns`,
      category: 'DESIGN',
      tags: ['design', 'cyberpunk', 'ui'],
      createdAt: new Date('2025-01-12'),
      updatedAt: new Date('2025-01-15'),
      type: 'project'
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<string | null>(notes[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'DEVELOPMENT', 'DESIGN', 'LEARNING', 'PROJECTS', 'IDEAS'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedNoteData = notes.find(note => note.id === selectedNote);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'NEW_NEURAL_ENTRY',
      content: '# New Neural Entry\n\nStart documenting your thoughts...',
      category: 'DEVELOPMENT',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'note'
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote.id);
    setIsEditing(true);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNote === id) {
      setSelectedNote(notes[0]?.id || null);
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 cyber-terminal border-r border-cyan-400/30 p-6 cyber-scrollbar overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="cyber-font text-lg font-bold text-white cyber-text-glow">
            NEURAL_WORKSPACE
          </h2>
          <button
            onClick={createNewNote}
            className="cyber-button p-2 rounded-lg text-cyan-400 hover:text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4" />
          <input
            type="text"
            placeholder="NEURAL_SEARCH..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full cyber-terminal border border-cyan-400/30 rounded-lg pl-10 pr-4 py-2 cyber-font text-sm text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Filter */}
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-3 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400 mb-6"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Notes List */}
        <div className="space-y-2">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 cyber-border group ${
                selectedNote === note.id 
                  ? 'border-cyan-400 bg-cyan-400/10 cyber-glow' 
                  : 'border-gray-700 hover:border-cyan-400/50 hover:bg-cyan-400/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="cyber-font font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors truncate">
                  {note.title}
                </h3>
                <div className="flex items-center space-x-1">
                  {note.type === 'note' && <FileText className="w-3 h-3 text-cyan-400" />}
                  {note.type === 'task' && <CheckSquare className="w-3 h-3 text-green-400" />}
                  {note.type === 'project' && <Folder className="w-3 h-3 text-purple-400" />}
                </div>
              </div>
              
              <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                {note.content.replace(/[#*`]/g, '').substring(0, 100)}...
              </p>
              
              <div className="flex items-center justify-between">
                <span className="cyber-font text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">
                  {note.category}
                </span>
                <span className="cyber-font text-xs text-gray-500">
                  {note.updatedAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNoteData ? (
          <>
            {/* Editor Header */}
            <div className="cyber-terminal border-b border-cyan-400/30 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={selectedNoteData.title}
                      onChange={(e) => updateNote(selectedNoteData.id, { title: e.target.value })}
                      className="cyber-font text-xl font-bold bg-transparent text-white border-none outline-none w-full"
                    />
                  ) : (
                    <h1 className="cyber-font text-xl font-bold text-white cyber-text-glow">
                      {selectedNoteData.title}
                    </h1>
                  )}
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="cyber-font text-xs text-cyan-400/70">
                      Created: {selectedNoteData.createdAt.toLocaleDateString()}
                    </span>
                    <span className="cyber-font text-xs text-cyan-400/70">
                      Updated: {selectedNoteData.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`cyber-button p-2 rounded-lg transition-colors ${
                      isEditing ? 'text-green-400 hover:text-white' : 'text-cyan-400 hover:text-white'
                    }`}
                  >
                    {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => deleteNote(selectedNoteData.id)}
                    className="cyber-button p-2 rounded-lg text-red-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Editor Toolbar */}
            {isEditing && (
              <div className="cyber-terminal border-b border-cyan-400/30 p-4">
                <div className="flex items-center space-x-2">
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <CheckSquare className="w-4 h-4" />
                  </button>
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <Code className="w-4 h-4" />
                  </button>
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <Link className="w-4 h-4" />
                  </button>
                  <button className="cyber-button p-2 rounded text-cyan-400 hover:text-white">
                    <Hash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Editor Content */}
            <div className="flex-1 p-6 cyber-scrollbar overflow-y-auto">
              {isEditing ? (
                <textarea
                  value={selectedNoteData.content}
                  onChange={(e) => updateNote(selectedNoteData.id, { content: e.target.value })}
                  className="w-full h-full bg-transparent text-white border-none outline-none resize-none cyber-font leading-relaxed"
                  placeholder="Start writing your neural thoughts..."
                />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="text-white leading-relaxed whitespace-pre-wrap cyber-font">
                    {selectedNoteData.content}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-cyan-400/50 mx-auto mb-4" />
              <h3 className="cyber-font text-xl font-bold text-white mb-2">
                SELECT_NEURAL_ENTRY
              </h3>
              <p className="text-gray-400 cyber-font">
                Choose a note from the sidebar or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuralWorkspace;