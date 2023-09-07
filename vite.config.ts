import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import jsconfigPaths from 'vite-jsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
   const env = loadEnv(mode, process.cwd(), '');
   return {
      plugins: [
         react(),
         legacy({
            targets: ['defaults', 'not IE 11'],
         }),
         jsconfigPaths(),
      ],
      test: {
         environment: 'jsdom', // or 'jsdom', 'node'
      },
      server: {
         port: 3000,
      },
   };
});
