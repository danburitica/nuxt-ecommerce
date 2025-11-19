// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',           
    '@nuxtjs/tailwindcss',   
    '@sidebase/nuxt-auth',   
    '@nuxt/icon'             
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config',
    viewer: false,
  }
})
