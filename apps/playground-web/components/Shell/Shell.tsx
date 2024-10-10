// src/components/Shell/Shell.tsx
'use client';

// hooks
import { useShell } from './hooks/useShell';

interface ShellProps {
  decreaseCommandsLeft: () => void;
}

export default function Shell({ decreaseCommandsLeft }: ShellProps) {
  const {
    handleInputChange,
    handleKeyDown,
    terminalRef,
    inputRef,
    output,
    command,
  } = useShell(decreaseCommandsLeft);
  return (
    <div
      ref={terminalRef}
      className="flex flex-col h-full bg-gray-900 text-white font-mono text-sm overflow-auto top-0 pl-4 pb-2"
      data-testid="terminal"
      onClick={() => inputRef.current?.focus()}
    >
      {output.map((line, index) => (
        <div
          key={index}
          data-testid={`terminal-output-${index + 1}`}
          className="text-white p-1"
        >
          {line.split('\n').map((subLine, subIndex, arr) => (
            <span key={subIndex}>
              {subLine}
              {subIndex < arr.length - 1 && <br />}
            </span>
          ))}
        </div>
      ))}
      <div className="flex items-center">
        <p className="text-green-500 mr-2 p-1">dice ~$</p>
        <div className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            data-testid="shell-input"
            className="w-full bg-transparent outline-none text-white"
          />
        </div>
      </div>
    </div>
  );
}
