// src/lib/api.ts
import { WebService } from '@/services/webServices';

import { MonoResponse } from './monoResponse';

export const executeShellCommandOnServer = async (
  cmd: string,
  cmdOptions: object,
): Promise<{ headers: { [key: string]: string }; body: MonoResponse }> => {
  const cmdExecURL = `/shell/exec/${cmd}`;

  try {
    const response = await WebService.post(cmdExecURL, cmdOptions);

    // Check if the response contains data or if it's an error response
    if (response?.body?.data) {
      return response;
    } else if (response?.body?.error) {
      return response;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    // Propagate the error from the backend exactly as it is
    console.error('Error executing command:', error);
    throw new Error(`${error}`);
  }
};
