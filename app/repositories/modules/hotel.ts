// app/repositories/modules/hotel.ts
import FetchFactory from '../factory'

// Mendefinisikan tipe data sesuai dengan response dari Golang
export interface HotelData {
  id: number
  name: string
  location: string
  price: number
  rating: number
  hasPool: boolean
  isPromo: boolean
  image: string
}

export interface HotelResponse {
  message: string
  data: HotelData[]
}

export default class HotelModule extends FetchFactory {
  // Semua endpoint terkait hotel akan diletakkan di sini
  async getHotels(): Promise<HotelResponse> {
    // Memanggil endpoint dari backend Golang kita
    return this.call<HotelResponse>('GET', '/hotels')
  }

  // Contoh jika nanti ada fitur detail hotel:
  // async getHotelById(id: number) { ... }
}