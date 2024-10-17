import { MonoResponse } from '@/lib/monoResponse';

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

interface HandleResultProps {
  result: {
    headers: { [key: string]: string }; // Correctly defined headers type
    body: MonoResponse; // MonoResponse for body
  };
  newOutput: string;
  setOutput: (prevOutput: any) => any; // Adjust type as necessary
  onCommandExecuted: (commandsLeft: number) => void; // Allow undefined
}

export const handleResult = ({
  result,
  newOutput,
  setOutput,
  onCommandExecuted,
}: HandleResultProps) => {
  if (result?.body?.data) {
    setOutput((prevOutput: any) => [
      ...prevOutput,
      newOutput,
      result?.body?.data,
    ]);
  } else if (result?.body?.error) {
    setOutput((prevOutput: any) => [
      ...prevOutput,
      newOutput,
      result?.body?.error,
    ]);
  }

  const commandsLeft = Number(result.headers['x-ratelimit-remaining']);
  onCommandExecuted(commandsLeft);
};
