<script setup lang="ts">
const { getAllProducts } = useProductApi()

const { data: products, pending, error } = await getAllProducts()
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Featured Products</h1>
      <p class="text-gray-600 mt-2">Discover our collection of premium items.</p>
    </div>

    <div v-if="pending" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-gray-600">Loading catalog...</span>
    </div>

    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex">
        <div class="flex-shrink-0">
          <Icon name="heroicons:exclamation-circle" class="h-5 w-5 text-red-400" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            Unable to load products. Please try again later.
            <span class="block text-xs mt-1">{{ error.message }}</span>
          </p>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <template v-if="products && products.length > 0">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 py-10">
        No products found.
      </div>
    </div>
  </div>
</template>