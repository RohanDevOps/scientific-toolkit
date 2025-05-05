import { useState, useEffect } from 'react';
import NotebookEditor from './NotebookEditor';
import NotebookPreview from './NotebookPreview';
import NotesList from './NotesList';

interface Note {
  id: string;
  title: string;
  content: string;
  updated: Date;
}

const sampleNote = `# Example Research Note

Welcome to your research notebook. This editor supports **Markdown** and $\\LaTeX$ math expressions.

## Math Examples

Inline math: $E = mc^2$

Block math:

$$
\\frac{d}{dx}\\left( \\int_{a}^{x} f(u)\\,du\\right) = f(x)
$$

## Chemical Equations

H₂O + CO₂ ⟶ H₂CO₃

## Tables

| Element | Symbol | Atomic Number |
|---------|--------|---------------|
| Hydrogen | H | 1 |
| Helium | He | 2 |
| Lithium | Li | 3 |

## Code Blocks

\`\`\`python
def calculate_force(mass, acceleration):
    return mass * acceleration
\`\`\`

## Images

Include images in your notes (like experimental setups, graphs, or diagrams).

---

You can create, edit, and organize your research notes here. The notes are saved locally in your application.`;

const Notebook = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  // Initialize with a sample note
  useEffect(() => {
    const storedNotes = localStorage.getItem('scientificNotes');
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes).map((note: any) => ({
          ...note,
          updated: new Date(note.updated)
        }));
        setNotes(parsedNotes);
        setActiveNote(parsedNotes[0] || null);
      } catch (e) {
        console.error('Error parsing stored notes:', e);
        createSampleNote();
      }
    } else {
      createSampleNote();
    }
  }, []);

  const createSampleNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Example Research Note',
      content: sampleNote,
      updated: new Date()
    };
    setNotes([newNote]);
    setActiveNote(newNote);
    saveNotesToLocalStorage([newNote]);
  };

  const saveNotesToLocalStorage = (updatedNotes: Note[]) => {
    localStorage.setItem('scientificNotes', JSON.stringify(updatedNotes));
  };

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '# New Note\n\nStart typing your research notes here...',
      updated: new Date()
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setActiveNote(newNote);
    setIsEditing(true);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleUpdateNote = (updatedContent: string) => {
    if (!activeNote) return;
    
    const title = updatedContent.split('\n')[0].replace(/^#\s+/, '').trim() || 'Untitled';
    
    const updatedNote = {
      ...activeNote,
      title,
      content: updatedContent,
      updated: new Date()
    };
    
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id ? updatedNote : note
    );
    
    setNotes(updatedNotes);
    setActiveNote(updatedNote);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    if (activeNote && activeNote.id === noteId) {
      setActiveNote(updatedNotes[0] || null);
    }
    
    saveNotesToLocalStorage(updatedNotes);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      {/* Notes list sidebar */}
      <div className="md:w-1/4 card overflow-y-auto">
        <NotesList 
          notes={notes} 
          activeNote={activeNote} 
          onSelectNote={setActiveNote} 
          onCreateNote={handleCreateNote} 
          onDeleteNote={handleDeleteNote}
        />
      </div>
      
      {/* Editor and preview area */}
      <div className="md:w-3/4 flex flex-col h-full card">
        {activeNote ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{activeNote.title}</h2>
              <div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
                >
                  {isEditing ? 'Preview' : 'Edit'}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              {isEditing ? (
                <NotebookEditor content={activeNote.content} onChange={handleUpdateNote} />
              ) : (
                <NotebookPreview content={activeNote.content} />
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No note selected</p>
              <button onClick={handleCreateNote} className="btn btn-primary">
                Create a New Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notebook;