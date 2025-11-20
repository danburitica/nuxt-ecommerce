<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const { isAuthenticated, getFinalPrice } = usePricing()

const cartStore = useCartStore()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart ({{ cartStore.totalQuantity }} items)</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-20 bg-white rounded-lg shadow-sm">
      <Icon name="heroicons:shopping-bag" class="w-12 h-12 mx-auto text-gray-400" />
      <p class="mt-4 text-lg text-gray-600">Your cart is empty.</p>
      <NuxtLink to="/" class="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-medium underline">
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 gap-8">
      
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center bg-white p-4 rounded-lg shadow-sm">
          
          <img :src="item.product.images[0]" :alt="item.product.title" class="h-16 w-16 object-cover rounded mr-4" />
          
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">{{ item.product.title }}</h2>
            <template v-if="isAuthenticated">
              <span class="text-sm text-gray-400 line-through">${{ item.product.price }}</span>
              <span class="text-sm ml-3 font-extrabold text-indigo-600">${{ getFinalPrice(item.product) }}</span>
            </template>
            <p v-else class="text-sm text-gray-600">${{ item.product.price }}</p>
          </div>

          <div class="flex items-center border border-gray-300 rounded mx-4">
            <button 
              @click="cartStore.decrementQuantity(item.product.id)" 
              class="px-2 py-1 text-gray-700 hover:bg-gray-100 transition"
            >
              -
            </button>
            <span class="px-3 text-sm font-medium">{{ item.quantity }}</span>
            <button 
              @click="cartStore.incrementQuantity(item.product.id)" 
              class="px-2 py-1 text-gray-700 hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          <button 
            @click="cartStore.removeFromCart(item.product.id)" 
            class="text-red-500 hover:text-red-700 transition ml-4"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>