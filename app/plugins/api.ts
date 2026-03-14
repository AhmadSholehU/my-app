// app/plugins/api.ts
import { $fetch } from 'ofetch'
import HotelModule from '~/repositories/modules/hotel'

export default defineNuxtPlugin((nuxtApp) => {
  // 1. Konfigurasi Base URL yang mengarah ke server Golang Anda
  const apiFetcher = $fetch.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
      'Accept': 'application/json'
    },
    // Bisa tambahkan interceptor di sini (misal: untuk menyisipkan token JWT)
    onRequest({ request, options }) {
      console.log(`[API Request] ${options.method} ${request}`)
    }
  })

  // 2. Inisialisasi modul-modul repositori Anda
  const modules = {
    hotel: new HotelModule(apiFetcher)
    // auth: new AuthModule(apiFetcher), <- contoh jika ada modul lain
    // payment: new PaymentModule(apiFetcher)
  }

  // 3. Suntikkan (provide) ke seluruh aplikasi Nuxt
  return {
    provide: {
      api: modules
    }
  }
})