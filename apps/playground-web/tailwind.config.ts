import type { Config } from 'tailwindcss';
import baseConfig from '@dicedb/tailwind-config/base';

const config: Config = {
  ...baseConfig,
  theme: {
    extend: {
      fontFamily: {
        Assistant: ['Assistant'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
