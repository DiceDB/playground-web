import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shell from '../Shell';

const onCommandExecutedMock = jest.fn();

const dummyCommands = [
  'set abc 100',
  'get abc',
  'set xyz 200',
  'get xyz',
  'set pqr 300',
  'get pqr',
];

const setupTest = () => {
  const user = userEvent.setup();
  const utils = render(<Shell onCommandExecuted={onCommandExecutedMock} />);

  const terminalElement = screen.getByTestId('terminal');
  const cliInputElement = screen.getByTestId<HTMLInputElement>('shell-input');

  const typeMultipleCommands = async () => {
    for (const command of dummyCommands) {
      await user.type(cliInputElement, `${command}{enter}`);
    }
  };

  return {
    terminalElement,
    cliInputElement,
    user,
    typeMultipleCommands,
    ...utils,
  };
};

describe('Shell Component', () => {
  it('should focus on terminal element click', async () => {
    const { terminalElement, cliInputElement, user } = setupTest();
    await user.click(terminalElement);
    expect(cliInputElement).toHaveFocus();
  });

  it('should update values when new value is typed', async () => {
    const { cliInputElement, user } = setupTest();

    // type a command and check if the value is updated
    await user.type(cliInputElement, 'set abc');
    expect(cliInputElement.value).toBe('set abc');

    await user.type(cliInputElement, '{enter}');
    expect(cliInputElement.value).toBe('');
  });

  it('should throw error when user types blocklisted command', async () => {
    const { cliInputElement, user, getByTestId } = setupTest();

    await user.type(cliInputElement, 'EXEC{enter}');
    const terminalOutputElement = getByTestId('terminal-output');
    expect(terminalOutputElement).toHaveTextContent(
      "(error) ERR unknown command 'EXEC'",
    );
  });

  it('should navigate through command history', async () => {
    const { cliInputElement, user, typeMultipleCommands } = setupTest();

    await typeMultipleCommands();
    expect(cliInputElement.value).toBe('');

    await user.keyboard('[ArrowUp]');
    expect(cliInputElement.value).toBe(dummyCommands[dummyCommands.length - 1]);

    await user.keyboard('[ArrowUp]');
    expect(cliInputElement.value).toBe(dummyCommands[dummyCommands.length - 2]);

    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    expect(cliInputElement.value).toBe('');
  });

  it('should navigate through command history based on current user input', async () => {
    const { cliInputElement, user, typeMultipleCommands } = setupTest();
    await typeMultipleCommands();
    expect(cliInputElement.value).toBe('');

    const newCommand = 'set';
    await user.type(cliInputElement, newCommand);
    const filteredCommands = dummyCommands.filter((cmd) =>
      cmd.startsWith(newCommand),
    );

    await user.keyboard('[ArrowUp]');
    expect(cliInputElement.value).toBe(
      filteredCommands[filteredCommands.length - 1],
    );

    await user.keyboard('[ArrowUp]');
    expect(cliInputElement.value).toBe(
      filteredCommands[filteredCommands.length - 2],
    );

    // check whether typed command is accessible
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    expect(cliInputElement.value).toBe(newCommand);
  });
});
