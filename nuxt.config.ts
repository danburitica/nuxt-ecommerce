// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',           
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',   
    '@sidebase/nuxt-auth',   
    '@nuxt/icon'             
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      origin: process.env.AUTH_ORIGIN
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
    },
    public: {
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config',
    viewer: false,
  }
})
