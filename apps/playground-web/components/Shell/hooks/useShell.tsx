// react
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';

// utils
import { handleCommand } from '@/shared/utils/shellUtils';
import blocklistedCommands from '@/shared/utils/blocklist';

export const useShell = (onCommandExecuted: (commandsLeft: number) => void) => {
  // states
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [tempCommand, setTempCommand] = useState('');
  // Initialise the command history with sessionStorage
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // useRefs
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommandWrapper = () => {
    const commandName = command.trim().split(' ')[0]?.toUpperCase(); // Extract the command

    if (!commandName) {
      setOutput((prevOutput) => [...prevOutput, '']); // Add empty line
      return;
    }

    if (blocklistedCommands.includes(commandName)) {
      setOutput((prevOutput) => [
        ...prevOutput,
        `(error) ERR unknown command '${commandName}'`,
      ]);
    } else {
      handleCommand({ command, setOutput, onCommandExecuted }); // Execute if not blocklisted
    }

    setCommand(''); // Clear input
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Load initial command history if present
  useEffect(() => {
    const savedHistory = sessionStorage.getItem('terminalHistory');
    const commandHistory = savedHistory ? JSON.parse(savedHistory) : [];
    setCommandHistory(commandHistory);
  }, []);

  // Save to session storage whenever commandHistory changes
  useEffect(() => {
    sessionStorage.setItem('terminalHistory', JSON.stringify(commandHistory));
  }, [commandHistory]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
    // Save current input when starting to navigate history
    setTempCommand(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandWrapper();
      if (command.trim().length !== 0) {
        setCommandHistory((prev) => [...prev, command]);
        setHistoryIndex(-1);
      }
      return;
    }

    const filteredCommandHistory = commandHistory.filter((cmd) => {
      return cmd.startsWith(tempCommand);
    });

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < filteredCommandHistory.length - 1) {
        if (historyIndex === -1) {
          // Save current input when starting to navigate history
          setTempCommand(command);
        }
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(
          filteredCommandHistory[filteredCommandHistory.length - 1 - newIndex]!,
        );
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        if (newIndex === -1) {
          // Restore the saved input when reaching the bottom
          setCommand(tempCommand);
        } else {
          setCommand(
            filteredCommandHistory[
              filteredCommandHistory.length - 1 - newIndex
            ]!,
          );
        }
      }
    }
  };

  return {
    handleInputChange,
    handleKeyDown,
    terminalRef,
    inputRef,
    output,
    setOutput,
    command,
    tempCommand,
    setTempCommand,
  };
};
