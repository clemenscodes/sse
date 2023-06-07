import { join } from 'path';
import type { Config } from 'tailwindcss';
import baseConfig from '../../../tailwind.config';

export default {
    presets: [baseConfig],
    corePlugins: {
        preflight: false, // disable Tailwind's reset
    },
    darkMode: ['class', '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
    content: [
        join(__dirname, './src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
        join(__dirname, '../../../libs/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ],
} satisfies Config;
