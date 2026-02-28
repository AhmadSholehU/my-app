<template>
  <div class="max-w-md mx-auto min-h-screen bg-gray-50 relative shadow-xl overflow-hidden">
    
    <main class="pb-20 overflow-y-auto h-screen">
      <slot />
    </main>

    <nav class="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-between px-6 py-3 pb-safe z-50">
      <NuxtLink to="/" class="flex flex-col items-center" active-class="text-blue-600" exact-active-class="text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="$route.path === '/' ? 'text-blue-600' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span class="text-xs mt-1 font-medium" :class="$route.path === '/' ? 'text-blue-600' : 'text-gray-400'">Beranda</span>
      </NuxtLink>
      
      <NuxtLink to="/cari" class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="$route.path === '/cari' ? 'text-blue-600' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span class="text-xs mt-1 font-medium" :class="$route.path === '/cari' ? 'text-blue-600' : 'text-gray-400'">Cari</span>
      </NuxtLink>

      <NuxtLink to="/pesanan" class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="$route.path === '/pesanan' ? 'text-blue-600' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        <span class="text-xs mt-1 font-medium" :class="$route.path === '/pesanan' ? 'text-blue-600' : 'text-gray-400'">Pesanan</span>
      </NuxtLink>

      <NuxtLink to="/profil" class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="$route.path === '/profil' ? 'text-blue-600' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        <span class="text-xs mt-1 font-medium" :class="$route.path === '/profil' ? 'text-blue-600' : 'text-gray-400'">Profil</span>
      </NuxtLink>
    </nav>
  </div>
</template>