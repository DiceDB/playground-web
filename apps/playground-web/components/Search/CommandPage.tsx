import { useState } from 'react';
import { Clipboard } from 'lucide-react';
import { DiceCmdMeta } from '@/data/command';

interface CommandPageProps extends DiceCmdMeta {
  onCopy?: () => void;
}

export default function CommandPage({
  title,
  syntax,
  body,
  url,
  onCopy,
}: CommandPageProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    navigator.clipboard.writeText(syntax).then(() => {
      if (onCopy) {
        onCopy();
      }
    });
  };

  return (
    <div
      data-testid="command-page"
      className="p-6 bg-gray-100 text-white rounded-lg shadow-lg border border-gray-700 mb-4"
    >
      <h2
        data-testid="command-title"
        className="text-gray-700 text-2xl font-semibold mb-4"
      >
        {title}
      </h2>

      <div className="flex items-center justify-between mb-4 pt-4">
        <h3 className="text-gray-700 text-2xl font-semibold">Syntax</h3>
        <div className="flex flex-row">
          {isCopied && (
            <div
              data-testid="copied-message"
              className="text-green-500 text-sm"
            >
              Copied!
            </div>
          )}
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-gray-700 flex items-center ml-4"
            title="Copy to clipboard"
            data-testid="copy-button"
          >
            <Clipboard className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-200 rounded-lg relative overflow-x-auto p-4">
        <code
          data-testid="command-syntax"
          className="font-mono text-sm whitespace-pre text-gray-700 inline-block min-w-full"
        >
          {syntax}
        </code>
      </div>

      <h2 className="text-gray-700 text-2xl font-semibold pt-4 mb-4">
        Description
      </h2>
      <div className="bg-gray-200 p-4 rounded-lg mb-4">
        <p data-testid="command-body" className="text-md text-gray-900">
          {body}
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors duration-200"
        data-testid="command-link"
      >
        View Documentation
      </a>
    </div>
  );
}
