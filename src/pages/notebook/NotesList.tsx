import { Trash2, Plus } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  updated: Date;
}

interface NotesListProps {
  notes: Note[];
  activeNote: Note | null;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
}

const NotesList = ({ 
  notes, 
  activeNote, 
  onSelectNote, 
  onCreateNote, 
  onDeleteNote 
}: NotesListProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notes</h2>
        <button
          onClick={onCreateNote}
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300"
          aria-label="Create new note"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center mt-8">
          No notes yet. Create your first note!
        </div>
      ) : (
        <div className="space-y-2 overflow-auto flex-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-md cursor-pointer relative group ${
                activeNote?.id === note.id
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-750'
              }`}
              onClick={() => onSelectNote(note)}
            >
              <h3 className="font-medium truncate pr-6">{note.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(note.updated)}
              </p>
              
              {/* Delete button (visible on hover/active) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Are you sure you want to delete this note?')) {
                    onDeleteNote(note.id);
                  }
                }}
                className={`absolute top-3 right-2 p-1 rounded text-gray-400 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  activeNote?.id === note.id ? 'block' : 'hidden group-hover:block'
                }`}
                aria-label="Delete note"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;