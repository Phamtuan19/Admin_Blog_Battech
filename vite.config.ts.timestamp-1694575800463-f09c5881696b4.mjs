// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Admin_Blog_Battech/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Admin_Blog_Battech/node_modules/@vitejs/plugin-react/dist/index.mjs";
import legacy from "file:///D:/Admin_Blog_Battech/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import jsconfigPaths from "file:///D:/Admin_Blog_Battech/node_modules/vite-jsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11"]
      }),
      jsconfigPaths()
    ],
    test: {
      environment: "jsdom"
      // or 'jsdom', 'node'
    },
    server: {
      port: 3e3
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBZG1pbl9CbG9nX0JhdHRlY2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFkbWluX0Jsb2dfQmF0dGVjaFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQWRtaW5fQmxvZ19CYXR0ZWNoL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knO1xuaW1wb3J0IGpzY29uZmlnUGF0aHMgZnJvbSAndml0ZS1qc2NvbmZpZy1wYXRocyc7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4gICByZXR1cm4ge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgIGxlZ2FjeSh7XG4gICAgICAgICAgICB0YXJnZXRzOiBbJ2RlZmF1bHRzJywgJ25vdCBJRSAxMSddLFxuICAgICAgICAgfSksXG4gICAgICAgICBqc2NvbmZpZ1BhdGhzKCksXG4gICAgICBdLFxuICAgICAgdGVzdDoge1xuICAgICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsIC8vIG9yICdqc2RvbScsICdub2RlJ1xuICAgICAgfSxcbiAgICAgIHNlcnZlcjoge1xuICAgICAgICAgcG9ydDogMzAwMCxcbiAgICAgIH0sXG4gICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFQLFNBQVMsY0FBYyxlQUFlO0FBQzNSLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNoRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsU0FBTztBQUFBLElBQ0osU0FBUztBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0osU0FBUyxDQUFDLFlBQVksV0FBVztBQUFBLE1BQ3BDLENBQUM7QUFBQSxNQUNELGNBQWM7QUFBQSxJQUNqQjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0gsYUFBYTtBQUFBO0FBQUEsSUFDaEI7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNMLE1BQU07QUFBQSxJQUNUO0FBQUEsRUFDSDtBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
