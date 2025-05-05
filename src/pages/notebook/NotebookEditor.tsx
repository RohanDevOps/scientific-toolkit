interface NotebookEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const NotebookEditor = ({ content, onChange }: NotebookEditorProps) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Start writing your research notes here... (Markdown and LaTeX supported)"
      spellCheck="false"
    ></textarea>
  );
};

export default NotebookEditor;