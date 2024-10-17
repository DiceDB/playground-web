import * as React from 'react';

export interface CommandHandler {
  command: string;
  setOutput: React.Dispatch<React.SetStateAction<string[]>>;
  onCommandExecuted: (commandsLeft: number) => void;
}
