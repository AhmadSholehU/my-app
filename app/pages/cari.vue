<template>
  <div class="p-5 flex flex-col h-full">
    <div class="sticky top-0 bg-gray-50 z-10 pb-4 pt-2">
      <h1 class="text-2xl font-bold mb-4">Eksplorasi</h1>
      
      <div class="flex items-center bg-white rounded-xl p-3 shadow-sm border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari hotel, kota, atau area..." 
          class="bg-transparent w-full outline-none text-sm" 
          autofocus
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
        </button>
      </div>

      <div class="flex gap-2 overflow-x-auto mt-4 hide-scrollbar pb-1">
        <button 
          v-for="filter in filters" 
          :key="filter"
          @click="activeFilter = filter"
          :class="[
            'px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition',
            activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
          ]"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <div class="mt-2 pb-20">
      <p class="text-sm text-gray-500 mb-3 font-medium">
        {{ filteredHotels.length }} properti ditemukan
      </p>

      <div v-if="filteredHotels.length === 0" class="text-center py-10">
        <div class="bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 class="font-bold text-gray-700">Tidak ada hasil</h3>
        <p class="text-sm text-gray-500 mt-1">Coba ubah kata kunci atau filter Anda.</p>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="hotel in filteredHotels" 
          :key="hotel.id" 
          class="bg-white rounded-xl shadow-sm border border-gray-100 flex overflow-hidden h-32"
        >
          <img :src="hotel.image" :alt="hotel.name" class="w-1/3 object-cover" />
          <div class="p-3 w-2/3 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start">
                <h3 class="font-bold text-sm text-gray-800 line-clamp-1">{{ hotel.name }}</h3>
                <span class="text-xs flex items-center bg-yellow-100 text-yellow-700 px-1 rounded font-bold">
                  ★ {{ hotel.rating }}
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-0.5">{{ hotel.location }}</p>
              <div class="flex gap-1 mt-1.5">
                <span v-if="hotel.hasPool" class="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">Kolam Renang</span>
                <span v-if="hotel.isPromo" class="bg-red-50 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold">Promo</span>
              </div>
            </div>
            
            <div class="text-right mt-1">
              <span class="text-xs text-gray-400 line-through mr-1" v-if="hotel.isPromo">Rp {{ formatPrice(hotel.price + 500000) }}</span>
              <span class="text-blue-600 font-bold text-sm">Rp {{ formatPrice(hotel.price) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 1. Panggil plugin API yang sudah kita inject
const { $api } = useNuxtApp()

// State untuk Input Pencarian dan Filter Aktif
const searchQuery = ref('')
const activeFilter = ref('Semua')
const filters = ['Semua', 'Bintang 5', 'Promo', 'Kolam Renang', 'Termurah']

// 2. Ambil data dari Golang menggunakan useAsyncData dan Repository Pattern
const { data: apiResponse, pending, error } = await useAsyncData(
  'hotels-list', 
  () => $api.hotel.getHotels()
)

// 3. Ekstrak array data dari response JSON Golang. 
// (Karena format Go kita: { message: "success", data: [...] })
const allHotels = computed(() => {
  return apiResponse.value?.data || []
})

// 4. Computed Property untuk filter (Sama persis seperti sebelumnya)
const filteredHotels = computed(() => {
  let result = allHotels.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(hotel => 
      hotel.name.toLowerCase().includes(q) || 
      hotel.location.toLowerCase().includes(q)
    )
  }

  if (activeFilter.value === 'Bintang 5') {
    result = result.filter(hotel => hotel.rating >= 4.8)
  } else if (activeFilter.value === 'Promo') {
    result = result.filter(hotel => hotel.isPromo)
  } else if (activeFilter.value === 'Kolam Renang') {
    result = result.filter(hotel => hotel.hasPool)
  } else if (activeFilter.value === 'Termurah') {
    result = [...result].sort((a, b) => a.price - b.price)
  }

  return result
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