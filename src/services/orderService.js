import api from './api'

/**
 * Service for Order related API calls
 */
export const orderService = {
  /**
   * Delete an order by ID
   * @param {string|number} id - The ID of the order to delete
   * @returns {Promise} - The response from the API
   */                                                                                                                                                                                                                                                                                                                                                                                                              
  async deleteOrder(id) {
    try {
      const response = await api.delete(`/orders/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting order with ID ${id}:`, error)
      throw error
    }
  }
}

export default orderService
