<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuth } from '#imports'

const { isAuthenticated } = usePricing()
const { data, signIn, signOut } = useAuth()

const cartStore = useCartStore()

const user = computed(() => data.value?.user)

const handleAuthAction = async () => {
  if (isAuthenticated.value) {
    await signOut({ callbackUrl: '/' })
  } else {
    const currentPath = useRoute().fullPath
    await signIn('google', { callbackUrl: currentPath }) 
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">
          NuxtStore
        </NuxtLink>

        <div class="flex items-center gap-6">
          <template v-if="isAuthenticated">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-700 hidden sm:inline">{{ user?.name || user?.email }}</span>
            </div>
          </template>
          <button
            @click="handleAuthAction"
            class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {{ isAuthenticated ? 'Sign Out' : 'Sign In' }}
          </button>
          <NuxtLink to="/cart" class="relative">
            <Icon 
              name="heroicons:shopping-cart" 
              class="h-6 w-6 text-gray-700 hover:text-indigo-600 transition-colors" 
            />
            
            <span 
              v-if="cartStore.totalQuantity > 0" 
              class="absolute -top-2 -right-2 inline-flex items-center justify-center 
                    h-5 w-5 rounded-full bg-red-600 text-xs font-bold text-white 
                    ring-2 ring-white"
            >
              {{ cartStore.totalQuantity }}
            </span>
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
        &copy; 2025 Nuxt Ecommerce.
      </div>
    </footer>
  </div>
</template>