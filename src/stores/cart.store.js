import { ref, computed } from 'vue';

const items = ref([]);

export function useCartStore() {
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const orderCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0);
  });

  const addToCart = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        ...product,
        quantity: quantity,
        subtitle: product.description,
      });
    }
  };

  const increment = (item) => {
    const existingItem = items.value.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    }
  };

  const decrement = (item) => {
    const existingItem = items.value.find(i => i.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    }
  };

  const removeItem = (id) => {
    items.value = items.value.filter(item => item.id !== id);
  };

  return {
    items,
    subtotal,
    orderCount,
    addToCart,
    increment,
    decrement,
    removeItem
  };
}