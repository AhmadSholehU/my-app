// app/repositories/factory.ts
import type { $Fetch } from 'ofetch'

export default class FetchFactory {
  protected $fetch: $Fetch

  // Menerima instance $fetch yang sudah dikonfigurasi dengan Base URL
  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  // Fungsi pembantu (helper) untuk method GET, POST, dll
  async call<T>(method: string, url: string, data?: object, fetchOptions?: any): Promise<T> {
    return this.$fetch(url, {
      method,
      body: data,
      ...fetchOptions
    })
  }
}