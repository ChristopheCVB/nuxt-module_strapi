
export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools'
  ],
  // example of separate client/server URLs
  // runtimeConfig: {
  //   strapi: { url: 'http://localhost:1337' },
  //   public: {
  //     strapi: { url: 'http://localhost:1337' }
  //   }
  // },
  strapi: {
    version: 'v3',
    url: 'http://localhost:1337'
    // To enable the devtools, read https://strapi.nuxtjs.org/devtools
    // devtools: true
  },
  typescript: {
    includeWorkspace: true
  }
})
