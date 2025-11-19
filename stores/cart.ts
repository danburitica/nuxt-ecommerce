import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  /**
   * Adds a product to the cart.
   * If the product already exists, it increments the quantity.
   * @param {Product} product - The product to add.
   */
  const addToCart = (product: Product) => {
    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        product,
        quantity: 1
      })
    }
  }

  /**
   * Removes a product from the cart by its ID.
   * @param {number} productId - The ID of the product to remove.
   */
  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  /**
   * Returns the number of unique items in the cart.
   */
  const totalItems = computed(() => items.value.length)

  /**
   * Returns the total quantity of products in the cart.
   */
  const totalQuantity = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  return {
    items,
    addToCart,
    removeFromCart,
    totalItems,
    totalQuantity
  }
})