import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TerminalUI } from '../TerminalUI';
import { formatTime } from '@/shared/utils/commonUtils';

// Shared variable to store initialCommandsLeft
let sharedInitialCommandsLeft = 1000;

jest.mock('@/shared/hooks/useTimer', () => ({
  useTimer: jest.fn(() => ({ timeLeft: 15 * 60 })), // Mock 15 minutes
}));

const setupTest = (initialCommandsLeft = 1000) => {
  sharedInitialCommandsLeft = initialCommandsLeft;

  const user = userEvent.setup();
  const utils = render(
    <TerminalUI initialCommandsLeft={initialCommandsLeft} />,
  );

  const terminalContainer = screen.getByTestId('terminal-container');
  const cliInputElement = screen.getByTestId('shell-input');
  const diceIcons = screen.getByTestId('dice-icons');
  const shellContainer = screen.getByTestId('shell-container');
  const cleanupTimer = screen.getByTestId('cleanup-timer');
  const commandsLeft = screen.getByTestId('commands-left');

  return {
    terminalContainer,
    cliInputElement,
    diceIcons,
    shellContainer,
    cleanupTimer,
    commandsLeft,
    user,
    ...utils,
  };
};

jest.mock('@/shared/utils/commonUtils', () => ({
  formatTime: jest.fn(
    (seconds) => `${Math.floor(seconds / 60)}:${seconds % 60}`,
  ),
  handleResult: jest.fn(
    ({ result, newOutput, setOutput, onCommandExecuted }) => {
      const mockData = result?.body?.data ? result.body.data : 'mock error';
      setOutput([newOutput, mockData]);

      const commandsLeft = Math.max(0, sharedInitialCommandsLeft - 1);
      onCommandExecuted(commandsLeft);
    },
  ),
}));

describe('TerminalUI Component', () => {
  it('renders TerminalUI', () => {
    const { terminalContainer, diceIcons, shellContainer, cliInputElement } =
      setupTest();

    expect(terminalContainer).toBeInTheDocument();
    expect(diceIcons).toBeInTheDocument();
    expect(shellContainer).toBeInTheDocument();
    expect(cliInputElement).toBeInTheDocument();
  });

  it('displays the correct cleanup time and commands left', () => {
    const { cleanupTimer, commandsLeft } = setupTest();

    expect(formatTime).toHaveBeenCalledWith(15 * 60);
    expect(cleanupTimer).toHaveTextContent('Cleanup in: 15:0 mins');
    expect(commandsLeft).toHaveTextContent('Commands left: 1000');
  });

  it('decreases commands left when a command is executed in the Shell', async () => {
    const { user, commandsLeft, cliInputElement } = setupTest();

    await user.type(cliInputElement, 'set abc 100{enter}');
    expect(commandsLeft).toHaveTextContent('Commands left: 999');
  });

  it('should not allow commands left to go below zero', async () => {
    const { user, commandsLeft, cliInputElement } = setupTest(1);

    await user.type(cliInputElement, 'set abc{enter}');
    await user.type(cliInputElement, 'set abc{enter}');
    await user.type(cliInputElement, 'set abc{enter}');
    expect(commandsLeft).toHaveTextContent('Commands left: 0');
  });
});
