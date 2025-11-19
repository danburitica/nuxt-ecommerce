<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">
          NuxtStore
        </NuxtLink>

        <div class="flex items-center gap-6">
          <button class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            Log in
          </button>

          <div class="relative group cursor-pointer">
            <Icon name="heroicons:shopping-cart" class="w-7 h-7 text-gray-700 group-hover:text-indigo-600 transition-colors" />
            
            <span 
              v-if="cartStore.totalQuantity > 0" 
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartStore.totalQuantity }}
            </span>
          </div>
        </div>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
        &copy; {{ new Date().getFullYear() }} NuxtStore. Technical Test.
      </div>
    </footer>
  </div>
</template>