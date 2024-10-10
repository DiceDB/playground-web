// src/lib/api.ts
import { WebService } from '@/services/webServices';

export const executeShellCommandOnServer = async (
  cmd: string,
  cmdOptions: object,
) => {
  const cmdExecURL = `/shell/exec/${cmd}`;

  try {
    const response = await WebService.post(cmdExecURL, cmdOptions);

    // Check if the response contains data or if it's an error response
    if (response?.data) {
      return response;
    } else if (response?.error) {
      return response;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    // Propagate the error from the backend exactly as it is
    console.error('Error executing command:', error);
    return `${error}`; // Just return the error message directly
  }
};
