import type { Product, ApiResponse } from '~/types'

/**
 * Composable module to handle Product API interactions.
 * Follows the Repository pattern adapted for Nuxt Composition API.
 * * @returns {Object} Methods to interact with the products API
 */
export const useProductApi = () => {
  const API_BASE = 'https://api.escuelajs.co/api/v1'

  /**
   * Fetches the complete list of products.
   * Uses useFetch to ensure SSR compatibility.
   * * @returns {Promise<any>} The fetch result containing data, pending, and error states.
   */
  const getAllProducts = async () => {
    return useFetch<Product[]>(`${API_BASE}/products`, {
      key: 'get-all-products',
      server: true,
      lazy: false
    })
  }

  /**
   * Fetches a single product by its ID.
   * * @param {string | number} id - The unique identifier of the product.
   * @returns {Promise<any>} The fetch result for a specific product.
   */
  const getProductById = async (id: string | number) => {
    return useFetch<Product>(`${API_BASE}/products/${id}`, {
      key: `get-product-${id}`,
      server: true
    })
  }

  return {
    getAllProducts,
    getProductById
  }
}