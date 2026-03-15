<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center bg-gray-50">
    <p>Memuat detail hotel...</p>
  </div>
  
  <div v-else-if="hotel" class="bg-gray-50 min-h-screen pb-28">
    <button @click="$router.back()" class="absolute top-5 left-5 bg-white/80 p-2 rounded-full backdrop-blur z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
    </button>

    <img :src="hotel.image" class="w-full h-72 object-cover" />

    <div class="bg-white rounded-t-3xl -mt-6 relative px-6 py-6 shadow-sm">
      <div class="flex justify-between items-start mb-2">
        <h1 class="text-2xl font-bold text-gray-800">{{ hotel.name }}</h1>
        <span class="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-sm">★ {{ hotel.rating }}</span>
      </div>
      <p class="text-gray-500 flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        {{ hotel.location }}
      </p>

      <h3 class="font-bold text-gray-800 mb-3">Fasilitas Utama</h3>
      <div class="flex gap-4 mb-6">
        <div v-if="hotel.hasPool" class="flex flex-col items-center bg-gray-50 p-3 rounded-xl w-20">
          <span class="text-xl mb-1">🏊</span>
          <span class="text-[10px] font-medium">Kolam</span>
        </div>
        <div class="flex flex-col items-center bg-gray-50 p-3 rounded-xl w-20">
          <span class="text-xl mb-1">📶</span>
          <span class="text-[10px] font-medium">Wi-Fi</span>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-5 flex justify-between items-center z-50">
      <div>
        <p class="text-xs text-gray-500">Mulai dari</p>
        <p class="text-lg font-bold text-blue-600">Rp {{ formatPrice(hotel.price) }} <span class="text-xs text-gray-400 font-normal">/malam</span></p>
      </div>
      
      <button 
        @click="handleBooking" 
        :disabled="isBooking"
        class="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {{ isBooking ? 'Memproses...' : 'Pesan Sekarang' }}
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'detail' // Memerintahkan Nuxt untuk menggunakan layouts/detail.vue
})
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const hotelId = route.params.id

const isBooking = ref(false)

// Ambil data detail hotel berdasarkan ID di URL
const { data: apiResponse, pending } = await useAsyncData(
  `hotel-${hotelId}`,
  () => $api.hotel.getHotelById(hotelId)
)

const hotel = computed(() => apiResponse.value?.data)

// Fungsi untuk mengeksekusi POST order ke Golang
const handleBooking = async () => {
  if (!hotel.value) return
  isBooking.value = true

  try {
    // Siapkan Payload data (Dalam app sungguhan, tanggal & tamu diambil dari input form pengguna)
    const payload = {
      hotelName: hotel.value.name,
      hotelImage: hotel.value.image,
      checkIn: "2024-11-01", // Hardcode sementara
      checkOut: "2024-11-03", // Hardcode sementara
      roomType: "Deluxe Room",
      guests: 2,
      totalPrice: hotel.value.price * 2 // Harga dikali 2 malam
    }

    // Panggil API Golang
    await $api.order.createOrder(payload)
    
    // Arahkan ke halaman pesanan setelah berhasil
    router.push('/pesanan')

  } catch (error) {
    console.error("Gagal memesan:", error)
    alert("Terjadi kesalahan saat memproses pesanan.")
  } finally {
    isBooking.value = false
  }
}

const formatPrice = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
</script>