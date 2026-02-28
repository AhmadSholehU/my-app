<template>
  <div class="p-5 flex flex-col h-full bg-gray-50">
    <div class="sticky top-0 bg-gray-50 z-10 pt-2 pb-2">
      <h1 class="text-2xl font-bold">Pesanan Saya</h1>
    </div>

    <div class="flex border-b border-gray-200 mb-4 sticky top-12 bg-gray-50 z-10">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex-1 py-3 text-sm font-semibold text-center transition-colors',
          activeTab === tab.id 
            ? 'text-blue-600 border-b-2 border-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="pb-28">
      
      <div v-if="filteredOrders.length === 0" class="text-center py-16">
        <div class="bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h3 class="font-bold text-gray-700">Belum ada pesanan</h3>
        <p class="text-sm text-gray-500 mt-1">Anda belum memiliki transaksi di kategori ini.</p>
        <NuxtLink to="/cari" class="inline-block mt-4 bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm">
          Cari Hotel
        </NuxtLink>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id" 
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div class="flex justify-between items-center px-4 py-3 border-b border-gray-50 bg-gray-50/50">
            <span class="text-xs text-gray-500 font-medium">Order ID: {{ order.id }}</span>
            <span 
              :class="[
                'text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider',
                statusColor(order.status)
              ]"
            >
              {{ order.status }}
            </span>
          </div>

          <div class="p-4 flex gap-3">
            <img :src="order.hotelImage" :alt="order.hotelName" class="w-16 h-16 rounded-lg object-cover border border-gray-100" />
            <div class="flex-1">
              <h3 class="font-bold text-sm text-gray-800">{{ order.hotelName }}</h3>
              <p class="text-xs text-gray-500 mt-1">{{ formatDate(order.checkIn) }} - {{ formatDate(order.checkOut) }}</p>
              <p class="text-xs text-gray-500">{{ order.roomType }} • {{ order.guests }} Tamu</p>
            </div>
          </div>

          <div class="px-4 py-3 border-t border-gray-50 flex justify-between items-center">
            <div>
              <p class="text-[10px] text-gray-500">Total Pembayaran</p>
              <p class="text-sm font-bold text-gray-800">Rp {{ formatPrice(order.totalPrice) }}</p>
            </div>
            <button 
              v-if="order.status === 'Aktif'"
              class="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700"
            >
              E-Voucher
            </button>
            <button 
              v-else-if="order.status === 'Selesai'"
              class="text-xs border border-blue-600 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-50"
            >
              Beri Ulasan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Definisi Tab
const tabs = [
  { id: 'aktif', label: 'Aktif' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'batal', label: 'Dibatalkan' }
]

// State Tab Aktif (Default: 'aktif')
const activeTab = ref('aktif')

// Data Dummy Pesanan (Nantinya didapat dari Golang/Database)
const allOrders = ref([
  {
    id: 'TRX-99281A',
    hotelName: 'Grand Hyatt Jakarta',
    hotelImage: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    checkIn: '2024-10-12',
    checkOut: '2024-10-14',
    roomType: 'Deluxe Room',
    guests: 2,
    totalPrice: 5000000,
    status: 'Aktif' // Aktif, Selesai, Batal
  },
  {
    id: 'TRX-77342B',
    hotelName: 'Ibis Styles Tanah Abang',
    hotelImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=200&q=80',
    checkIn: '2024-08-01',
    checkOut: '2024-08-03',
    roomType: 'Standard Room',
    guests: 1,
    totalPrice: 1100000,
    status: 'Selesai'
  },
  {
    id: 'TRX-11923C',
    hotelName: 'The Langham',
    hotelImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    checkIn: '2024-09-15',
    checkOut: '2024-09-16',
    roomType: 'Executive Suite',
    guests: 2,
    totalPrice: 3200000,
    status: 'Batal'
  }
])

// Filter data pesanan berdasarkan tab yang sedang diklik
const filteredOrders = computed(() => {
  if (activeTab.value === 'aktif') {
    return allOrders.value.filter(order => order.status === 'Aktif')
  } else if (activeTab.value === 'selesai') {
    return allOrders.value.filter(order => order.status === 'Selesai')
  } else if (activeTab.value === 'batal') {
    return allOrders.value.filter(order => order.status === 'Batal')
  }
  return []
})

// Fungsi Helper untuk warna label status
const statusColor = (status) => {
  switch(status) {
    case 'Aktif': return 'bg-green-100 text-green-700'
    case 'Selesai': return 'bg-gray-200 text-gray-700'
    case 'Batal': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-500'
  }
}

// Fungsi Helper untuk format mata uang
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Fungsi Helper untuk format tanggal (Contoh: "12 Okt 24")
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: '2-digit' }).format(date)
}
</script>