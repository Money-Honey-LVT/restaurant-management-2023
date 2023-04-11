import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [svgr(), react()],
    define: {
      'process.env': process.env,
    },
    // resolve: {
    //   alias: {
    //     "@": fileURLToPath(new URL("./src", import.meta.url)),
    //   },
    // },
    server: {
      host: 'localhost',
      port: +env.VITE_PORT,
      open: true,
      proxy: {
        '/dbcl': {
          target: env.VITE_APP_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
});
