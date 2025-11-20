<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const { isAuthenticated, getFinalPrice } = usePricing()

const route = useRoute()
const productId = route.params.id as string

const { getProductById } = useProductApi()
const { data: product, pending, error } = await getProductById(productId)

const cartStore = useCartStore()

const mainImage = ref<string>('')

watch(product, (newProduct) => {
  if (newProduct && newProduct.images.length > 0) {
    mainImage.value = String(newProduct.images[0])
  }
}, { immediate: true })

const setMainImage = (url: string) => {
  mainImage.value = url
}

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
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
        <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
          <img 
            :src="mainImage" 
            :alt="product.title" 
            class="w-full h-full object-cover"
          />
        </div>
        <div class="grid grid-cols-4 gap-2">
          <img 
            v-for="(img, index) in product.images" 
            :key="index"
            :src="img" 
            @click="setMainImage(img)" 
            class="aspect-square rounded object-cover cursor-pointer border-2 transition-all"
            :class="{'border-indigo-500 ring-2 ring-indigo-500': img === mainImage, 'border-gray-200': img !== mainImage}"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <span class="text-sm text-indigo-600 font-semibold uppercase tracking-wide">
          {{ product.category.name }}
          <span 
            v-if="isAuthenticated" 
            class="ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
          >
            Member Price
          </span>
        </span>

        <h1 class="mt-2 text-3xl font-bold text-gray-900">
          {{ product.title }}
        </h1>

        <p class="mt-4 text-gray-500 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="mt-auto pt-8">
          <div class="flex flex-col items-start justify-center mb-6">

            <template v-if="isAuthenticated">
              <span class="text-xl text-gray-400 line-through">${{ product.price }}</span>
              <span class="text-4xl font-extrabold text-indigo-600">${{ getFinalPrice(product) }}</span>

              <p class="text-sm text-green-600 mt-2 font-semibold bg-green-50 p-1 px-2 rounded">
                As a member, you save 15%!
              </p>
            </template>
            <template v-else>
              <span class="text-3xl font-bold text-gray-900">${{ product.price }}</span>
              <p class="text-sm text-red-500 mt-1">Sign in to save 15%!</p>
            </template>
            
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