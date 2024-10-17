// src/shared/utils/shellUtils.ts

import { executeShellCommandOnServer } from '@/lib/api';
import { CommandHandler } from '@/types';
import { handleResult } from '@/shared/utils/commonUtils';

export const handleCommand = async ({
  command,
  setOutput,
  onCommandExecuted,
}: CommandHandler) => {
  const newOutput = `dice > ${command}`;
  let result: any;

  const { cmd, args } = parseCommand(command);

  if (!cmd) {
    return;
  }
  try {
    result = await executeShellCommandOnServer(cmd, args);
    handleResult({ result, newOutput, setOutput, onCommandExecuted });
  } catch (error: unknown) {
    console.error('Error executing command:', error);
    result = 'Error executing command';
    return `Error: ${String(error)}`;
  }
};

function parseCommand(command: string) {
  const [cmd, ...args] = command.split(' ');

  // Check if the command is a JSON.* command
  if (cmd && cmd.startsWith('JSON.')) {
    const jsonArgIndex = args.findIndex(
      (arg) => arg.startsWith('{') || arg.startsWith("'"),
    );

    if (jsonArgIndex !== -1) {
      // Extract the JSON part and remove wrapping single quotes if present
      let jsonArg = args.slice(jsonArgIndex).join(' '); // Combine JSON parts into a single string
      const nonJsonArgs = args.slice(0, jsonArgIndex); // Non-JSON arguments before the JSON object

      // Remove the wrapping single quotes if they exist
      if (jsonArg.startsWith("'") && jsonArg.endsWith("'")) {
        jsonArg = jsonArg.slice(1, -1); // Remove single quotes
      }

      return {
        cmd,
        args: [...nonJsonArgs, jsonArg], // Ensure JSON argument is a single element in the args array
      };
    }
  }

  // Default return for non-JSON commands
  return { cmd, args };
}
