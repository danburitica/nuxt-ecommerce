<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const productId = route.params.id as string

const { getProductById } = useProductApi()
const { data: product, pending, error } = await getProductById(productId)

const cartStore = useCartStore()

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    alert('Producto agregado al carrito')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error || !product" class="text-center py-20 text-red-600">
      <p>Error loading product.</p>
      <NuxtLink to="/" class="text-indigo-600 underline mt-4 inline-block">Go back home</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
      
      <div class="space-y-4">
        <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img 
            :src="product.images[0]" 
            :alt="product.title" 
            class="w-full h-full object-cover"
          />
        </div>
        <div class="grid grid-cols-4 gap-2" v-if="product.images.length > 1">
          <img 
            v-for="(img, index) in product.images.slice(1)" 
            :key="index"
            :src="img" 
            class="aspect-square rounded cursor-pointer hover:opacity-75 transition"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <span class="text-sm text-indigo-600 font-semibold uppercase tracking-wide">
          {{ product.category.name }}
        </span>
        
        <h1 class="mt-2 text-3xl font-bold text-gray-900">
          {{ product.title }}
        </h1>

        <p class="mt-4 text-gray-500 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="mt-auto pt-8">
          <div class="flex items-center justify-between mb-6">
            <span class="text-3xl font-bold text-gray-900">${{ product.price }}</span>
          </div>

          <button 
            @click="handleAddToCart"
            class="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>