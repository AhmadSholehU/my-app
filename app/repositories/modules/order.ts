// app/repositories/modules/order.ts
import FetchFactory from '../factory'

export interface OrderData {
  id: string
  hotelName: string
  hotelImage: string
  checkIn: string
  checkOut: string
  roomType: string
  guests: number
  totalPrice: number
  status: string
}

export default class OrderModule extends FetchFactory {
  // Mengambil daftar pesanan pengguna
  async getMyOrders(): Promise<{ message: string, data: OrderData[] }> {
    return this.call('GET', '/orders/me')
  }
  async createOrder(payload: any): Promise<{ message: string, data: OrderData }> {
  return this.call('POST', '/orders', payload)
}
}