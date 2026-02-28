<template>
  <div class="bg-gray-50 min-h-screen flex flex-col pb-28">
    
    <div class="bg-blue-600 px-5 pt-10 pb-12 text-white relative">
      <div class="flex items-center gap-4">
        <div class="h-16 w-16 bg-white p-0.5 rounded-full shadow-sm">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=yagami" alt="Avatar" class="h-full w-full rounded-full bg-blue-50 object-cover" />
        </div>
        
        <div>
          <h1 class="text-xl font-bold tracking-wide">Yagami</h1>
          <p class="text-blue-200 text-sm">yagami@mail.com</p>
        </div>
      </div>

      <div class="absolute -bottom-6 left-5 right-5 bg-white rounded-xl p-4 shadow-md border border-gray-100 flex justify-between items-center z-10">
        <div>
          <p class="text-xs text-gray-500 font-medium mb-0.5">Status Member</p>
          <p class="text-sm font-bold text-blue-700">Elite Global</p>
        </div>
        <div class="text-right border-l border-gray-100 pl-4">
          <p class="text-xs text-gray-500 font-medium mb-0.5">Poin Aktif</p>
          <p class="text-sm font-bold text-yellow-500 flex items-center justify-end gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            2.450
          </p>
        </div>
      </div>
    </div>

    <div class="h-10"></div>

    <div class="px-5 mt-2 flex flex-col gap-5">
      
      <div>
        <h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Akun & Preferensi</h2>
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          
          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              <span class="text-sm font-medium">Metode Pembayaran</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>

          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
              <span class="text-sm font-medium">Voucher & Promo</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>

          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              <span class="text-sm font-medium">Bahasa</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <span class="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">Basa Jawa (Krama)</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>

        </div>
      </div>

      <div>
        <h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Lainnya</h2>
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          
          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span class="text-sm font-medium">Pusat Bantuan</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>

          <button class="w-full flex items-center p-4 hover:bg-red-50 transition-colors text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span class="text-sm font-bold">Keluar Akun</span>
          </button>

        </div>
      </div>

    </div>
  </div>
</template>