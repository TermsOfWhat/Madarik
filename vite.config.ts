import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

function getServerConfig(env: Record<string, string>) {
  if (env.NODE_ENV === 'development') {
    return {
      port: 3000,
      https: false,
      host: '0.0.0.0',
      proxy: {
        '/bff': {
          target: env.VITE_APP_BASE_URL,
          secure: false,
        },
        '/signin-oidc': {
          target: env.VITE_APP_BASE_URL,
          secure: false,
        },
        '/signout-callback-oidc': {
          target: env.VITE_APP_BASE_URL,
          secure: false,
        },
        '/api': {
          target: env.VITE_APP_BASE_URL,
          secure: false,
        },
      },
    }
  }
  return undefined
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), svgr(), basicSsl()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@src': path.resolve(__dirname, './src'),
      },
    },
    server: getServerConfig(env),
  }
})
