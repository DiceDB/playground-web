import * as React from 'react';

export interface CommandHandler {
  command: string;
  setOutput: React.Dispatch<React.SetStateAction<string[]>>;
  setNewCommandsLeft: React.Dispatch<React.SetStateAction<number>>;
}
