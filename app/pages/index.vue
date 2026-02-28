<template>
  <div class="p-5">
    <header class="flex justify-between items-center mb-6">
      <div>
        <p class="text-gray-500 text-sm">Lokasi Anda</p>
        <h1 class="text-xl font-bold flex items-center">
          Jakarta, Indonesia
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </h1>
      </div>
      <div class="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
        <img src="https://i.pravatar.cc/100" alt="Profile" />
      </div>
    </header>

    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
      <div class="flex items-center bg-gray-50 rounded-lg p-3 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Cari hotel atau destinasi..." class="bg-transparent w-full outline-none text-sm" />
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="border border-gray-200 rounded-lg p-3">
          <p class="text-xs text-gray-500 mb-1">Check-in</p>
          <p class="text-sm font-semibold">12 Okt 2024</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-3">
          <p class="text-xs text-gray-500 mb-1">Check-out</p>
          <p class="text-sm font-semibold">14 Okt 2024</p>
        </div>
      </div>
      
      <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
        Cari Kamar
      </button>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-4">Rekomendasi Populer</h2>
      
      <div v-if="pending" class="text-center text-gray-500 py-4">Memuat data hotel...</div>
      
      <div v-else class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        <div 
          v-for="hotel in hotels" 
          :key="hotel.id" 
          class="min-w-[200px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0"
        >
          <img :src="hotel.image" :alt="hotel.name" class="h-32 w-full object-cover" />
          <div class="p-3">
            <h3 class="font-semibold text-sm truncate">{{ hotel.name }}</h3>
            <p class="text-xs text-gray-500 mb-2 flex items-center mt-1">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
              {{ hotel.location }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-blue-600 font-bold text-sm">Rp {{ formatPrice(hotel.price) }}</span>
              <span class="text-xs flex items-center bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                ★ {{ hotel.rating }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { data: hotels, pending } = await useAsyncData('hotels', () => {
  return Promise.resolve([
    {
      id: 1,
      name: 'Grand Hyatt Jakarta',
      location: 'Thamrin, Jakarta',
      price: 2500000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1771926927841-1a81a1094b81?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'The Langham',
      location: 'SCBD, Jakarta',
      price: 3200000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1769745402932-4c93d9e76d98?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ])
})

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>