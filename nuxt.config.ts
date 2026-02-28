// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir:'app/',
  modules:[
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app:{
    head:{
      title:'Aplikasi Hotel',
      meta:[
        {name:'viewport',content:'width=device-width, initial-scale=1,maximum-scale=1,user-scalable=0'}
      ]
    }
  }
})
