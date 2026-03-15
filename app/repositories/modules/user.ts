// app/repositories/modules/user.ts
import FetchFactory from '../factory'

export interface UserProfile {
  name: string
  email: string
  avatar: string
  memberStatus: string
  points: number
}

export default class UserModule extends FetchFactory {
  // Mengambil data profil
  async getProfile(): Promise<{ message: string, data: UserProfile }> {
    return this.call('GET', '/users/profile')
  }
}   