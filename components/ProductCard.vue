<script setup lang="ts">
import type { Product } from '~/types'
const { isAuthenticated, getFinalPrice } = usePricing()

interface Props {
  product: Product
}

defineProps<Props>()
</script>

<template>
  <NuxtLink 
    :to="`/products/${product.id}`" 
    class="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
  >
    <div class="aspect-square w-full overflow-hidden bg-gray-200 relative">
      <img 
        :src="product.images[0]" 
        :alt="product.title" 
        class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy" 
      />
    </div>
    
    <div class="p-4">
      <h3 class="text-sm text-gray-700 font-medium truncate">
        {{ product.title }}
      </h3>
      <p v-if="isAuthenticated" class="mt-1 text-lg">
        <span class="text-gray-400 line-through">${{ product.price }}</span>
        <span class="ml-3 font-extrabold text-indigo-600">${{ getFinalPrice(product) }}</span>
      </p>
      <p v-else class="mt-1 text-lg font-bold text-gray-900">
        ${{ product.price }}
      </p>
      <span class="mt-2 inline-block px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
        {{ product.category.name }}
      </span>
    </div>
  </NuxtLink>
</template>