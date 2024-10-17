import { executeShellCommandOnServer } from '../api';
import { WebService } from '@/services/webServices';
import { handleCommand } from '@/shared/utils/cliUtils';

// Mock WebService
jest.mock('@/services/webServices', () => ({
  WebService: {
    post: jest.fn(),
  },
}));

describe('executeShellCommandOnServer', () => {
  const mockCmd = 'testCommand';
  const mockCmdOptions = { option1: 'value1' };
  const mockCmdExecURL = `/shell/exec/${mockCmd}`;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('should return data when WebService.post is successful', async () => {
    const mockResponse = { data: 'Success Response' };
    (WebService.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await executeShellCommandOnServer(mockCmd, mockCmdOptions);

    expect(WebService.post).toHaveBeenCalledWith(
      mockCmdExecURL,
      mockCmdOptions,
    );
    expect(result).toEqual('Success Response');
  });

  it('should return error message when response structure is unexpected', async () => {
    const mockResponse = {}; // Simulate unexpected response structure
    (WebService.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await executeShellCommandOnServer(mockCmd, mockCmdOptions);

    expect(result).toBe('Error: Unexpected response structure');
    expect(WebService.post).toHaveBeenCalledWith(
      mockCmdExecURL,
      mockCmdOptions,
    );
  });

  it('should return error message when WebService.post throws an error', async () => {
    const mockError = new Error('Network Error');

    (WebService.post as jest.Mock).mockRejectedValueOnce(mockError);
    const result = await executeShellCommandOnServer(mockCmd, mockCmdOptions);
    expect(WebService.post).toHaveBeenCalledWith(
      mockCmdExecURL,
      mockCmdOptions,
    );
    expect(result).toBe(`${mockError}`);
    consoleErrorSpy.mockRestore();
  });

  it('should log error to the console when WebService.post throws an error', async () => {
    const mockError = new Error('Request Failed');
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (WebService.post as jest.Mock).mockRejectedValueOnce(mockError);

    await executeShellCommandOnServer(mockCmd, mockCmdOptions);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error executing command:',
      mockError,
    );
    consoleSpy.mockRestore();
  });

  it('should always include the cmd parameter in the URL', async () => {
    const mockResponse = { data: 'Some Response' };
    (WebService.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await executeShellCommandOnServer(mockCmd, mockCmdOptions);

    expect(WebService.post).toHaveBeenCalledWith(
      expect.stringContaining(`/shell/exec/${mockCmd}`),
      mockCmdOptions,
    );
    expect(result).toEqual('Some Response');
  });

  it('should call onCommandExecuted with (1000) for GET command', async () => {
    const command = 'GET testKey';
    const mockResult = {
      body: { data: 'mockData' },
      headers: { 'x-ratelimit-remaining': 1000 },
    }; // Updated mock result
    (executeShellCommandOnServer as jest.Mock).mockResolvedValueOnce(
      mockResult,
    ); // Mock the API response

    const setOutputMock = jest.fn();
    const onCommandExecutedMock = jest.fn();

    await handleCommand({
      command,
      setOutput: setOutputMock,
      onCommandExecuted: onCommandExecutedMock,
    });

    expect(onCommandExecutedMock).toHaveBeenCalledWith(1000);
  });
});
