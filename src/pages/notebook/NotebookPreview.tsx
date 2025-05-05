import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface NotebookPreviewProps {
  content: string;
}

const NotebookPreview = ({ content }: NotebookPreviewProps) => {
  return (
    <div className="prose prose-blue dark:prose-invert max-w-none p-4 overflow-auto">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default NotebookPreview;