import { Dice1, Dice3, Dice5, Info } from 'lucide-react';
import Shell from '../Shell/Shell';
import { formatTime } from '@/shared/utils/commonUtils';
import { useTimer } from '@/shared/hooks/useTimer';
import { useState } from 'react';
import Tooltip from '../Overlays/Tooltip';
export function TerminalUI({ initialCommandsLeft = 1000 }) {
  const [commandsLeft, setCommandsLeft] = useState(initialCommandsLeft);
  const handleCommandExecuted = (commands: number) => {
    setCommandsLeft(commands);
  };

  return (
    <>
      <div className="bg-gray-900 rounded-lg" data-testid="terminal-container">
        <div className="bg-gray-900 px-4 py-4 flex items-center rounded-lg">
          <div className="flex space-x-2" data-testid="dice-icons">
            <Dice5 className="w-4 h-4 bg-red-500" />
            <Dice1 className="w-4 h-4 bg-yellow-500" />
            <Dice3 className="w-4 h-4 bg-green-500" />
          </div>
        </div>
        <div
          className="h-64 md:h-[30rem] bg-gray-100 rounded-lg overflow-hidden shadow-md"
          data-testid="shell-container"
        >
          <Shell onCommandExecuted={handleCommandExecuted} />
        </div>
      </div>
      <TerminalCounter commandsLeft={commandsLeft} />
    </>
  );
}

function TerminalCounter({ commandsLeft }: { commandsLeft: number }) {
  const { timeLeft } = useTimer(15 * 60);
  return (
    <div className="flex flex-col" data-testid="terminal-counter">
      <div className="flex flex-row justify-between text-gray-900 mt-4">
        <div className="flex flex-row items-center space-x-2">
          <div
            className="flex items-center justify-between border border-gray-400 text-sm bg-transparent p-3 rounded-lg"
            data-testid="cleanup-timer"
          >
            <span>Cleanup in: {formatTime(timeLeft)} mins</span>
          </div>
          <Tooltip message="The time remaining until cleanup is initiated." />
        </div>

        <div className="flex flex-row items-center space-x-2">
          <div
            className="flex items-center justify-between border border-gray-400 text-sm bg-transparent p-3 rounded-lg"
            data-testid="commands-left"
          >
            <span>Commands left: {commandsLeft}</span>
          </div>
          <Tooltip message="The number of commands you can execute before cleanup." />{' '}
          {/* Tooltip next to text */}
        </div>
      </div>
      <div className="flex flex-row items-start mt-5">
        <Info className="w-4 h-4 text-gray-500 mr-1" />
        <p className="text-sm text-gray-500">
          DiceDB instance is shared across all users.
        </p>
      </div>
    </div>
  );
}
