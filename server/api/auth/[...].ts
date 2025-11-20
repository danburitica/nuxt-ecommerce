import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import { useRuntimeConfig } from '#imports'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,

  providers: [
    // @ts-ignore
    GoogleProvider.default({
      clientId: useRuntimeConfig().google.clientId,
      clientSecret: useRuntimeConfig().google.clientSecret,
    }),
  ],
})