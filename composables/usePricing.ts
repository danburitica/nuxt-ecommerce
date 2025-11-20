import { useAuth } from '#imports'
import type { Product } from '~/types'

/**
 * Composable to handle pricing logic based on user authentication status.
 * Applies a 15% discount for authenticated users.
 * * @returns {Object} Methods and computed properties related to pricing and status.
 */
export const usePricing = () => {
  const { status } = useAuth()
  
  /**
   * Computed property to check if the user is authenticated (logged in).
   * @returns {boolean} True if the user is logged in.
   */
  const isAuthenticated = computed(() => status.value === 'authenticated')

  /**
   * Calculates the final price of a product based on authentication status.
   * If authenticated, applies a 15% discount (0.85 multiplier).
   * * @param {Product} product - The product entity.
   * @returns {number} The final price to display.
   */
  const getFinalPrice = (product: Product): number => {
    const regularPrice = product.price
    const discountFactor = 0.85

    if (isAuthenticated.value) {
      return Math.round(regularPrice * discountFactor * 100) / 100
    }
    return regularPrice
  }

  return {
    isAuthenticated,
    getFinalPrice
  }
}