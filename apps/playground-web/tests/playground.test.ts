import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const runCommand = async (page: Page, cmd: string) => {
  const cmdInput = page.getByTestId('shell-input');
  await cmdInput.fill(cmd);
  await page.keyboard.press('Enter');
};

test.describe('[Playground Component]', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    const cmdInput = page.getByTestId('shell-input');
    await expect(cmdInput).toBeVisible();
  });

  test('should execute SET command properly', async ({ page }) => {
    let outputIdx = 0;

    // Happy case
    await runCommand(page, 'SET foo bar');
    // Adding 2 to outputIndex after each command execution
    // Reason: 2 items are added to output after each execution, 1st is command itself and 2nd is its result
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      'OK',
    );

    // Error case: SET with wrong number of arguments
    await runCommand(page, 'SET foo');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      "(error) ERR wrong number of arguments for 'set' command",
    );
  });

  test('should execute GET command properly', async ({ page }) => {
    let outputIdx = 0;

    // Happy case
    await runCommand(page, 'SET foo bar');
    outputIdx += 2;
    await runCommand(page, 'GET foo');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();

    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      'bar',
    );

    // Error case for wrong key get
    await runCommand(page, 'GET foo1');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      '(nil)',
    );

    // Error case: GET with wrong number of arguments
    await runCommand(page, 'GET foo bar');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      "(error) ERR wrong number of arguments for 'get' command",
    );
  });

  test('should execute DEL command properly', async ({ page }) => {
    let outputIdx = 0;

    // Happy case
    await runCommand(page, 'SET foo bar');
    outputIdx += 2;
    await runCommand(page, 'GET foo');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      'bar',
    );
    await runCommand(page, 'DEL foo');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      '1',
    );
    await runCommand(page, 'GET foo');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    // Getting back the deleted key should return (nil) output
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      '(nil)',
    );

    // Error case: DEL key which is not present
    await runCommand(page, 'DEL bar');
    outputIdx += 2;
    await page.getByTestId(`terminal-output-${outputIdx}`).waitFor();
    await expect(page.getByTestId(`terminal-output-${outputIdx}`)).toHaveText(
      '0',
    );
  });
});
