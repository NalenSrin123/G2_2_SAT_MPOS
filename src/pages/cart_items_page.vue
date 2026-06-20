<script setup>
import { ref, computed } from 'vue';

const items = ref([
  {
    id: 1,
    name: 'Wagyu Ribeye Steak',
    subtitle: 'Medium Rare • Truffle Butter',
    price: 128.00,
    quantity: 1,
    image: '/images/wagyu_steak.png'
  },
  {
    id: 2,
    name: 'Truffle Fettuccine',
    subtitle: 'Fresh Pasta • Parmesan',
    price: 42.00,
    quantity: 1,
    image: '/images/truffle_pasta.png'
  }
]);

const subtotal = computed(() => {
  return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const serviceFee = computed(() => {
  return subtotal.value * 0.10;
});

const tax = computed(() => {
  return subtotal.value * 0.08;
});

const total = computed(() => {
  return subtotal.value + serviceFee.value + tax.value;
});

const increment = (item) => {
  item.quantity++;
};

const decrement = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (id) => {
  items.value = items.value.filter(item => item.id !== id);
};
</script>

<template>
  <div class="cart-container">
    <!-- Header -->
    <header class="header">
      <button class="icon-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D5B41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
      <h1 class="brand-title">LuxeDine</h1>
      <button class="icon-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D5B41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </button>
    </header>

    <!-- Content -->
    <main class="content">
      <h2 class="section-title">Your Selection</h2>

      <!-- Items -->
      <div class="cart-items">
        <div class="cart-item" v-for="item in items" :key="item.id">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <div class="item-header">
              <h3 class="item-name">{{ item.name }}</h3>
              <button class="delete-btn" @click="removeItem(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
            <p class="item-subtitle">{{ item.subtitle }}</p>
            <div class="item-bottom">
              <span class="item-price">${{ item.price.toFixed(2) }}</span>
              <div class="quantity-selector">
                <button @click="decrement(item)" class="qty-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D5B41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button @click="increment(item)" class="qty-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D5B41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3 class="summary-title">Order Summary</h3>
        <div class="summary-row">
          <span class="summary-label">Subtotal</span>
          <span class="summary-val">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Service Fee (10%)</span>
          <span class="summary-val">${{ serviceFee.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Tax (8%)</span>
          <span class="summary-val">${{ tax.toFixed(2) }}</span>
        </div>
        <div class="divider"></div>
        <div class="summary-row total-row">
          <span>Total</span>
          <span class="total-val">${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </main>

    <!-- Bottom Bar -->
    <div class="bottom-bar">
      <button class="place-order-btn">
        <span>Place Order</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.cart-container {
  font-family: 'Inter', sans-serif;
  background-color: #F8FAF8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #1F2937;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background-color: #F8FAF8;
  position: sticky;
  top: 0;
  z-index: 10;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
  color: #0D5B41;
  margin: 0;
}

.content {
  padding: 0 24px;
  flex: 1;
  padding-bottom: 100px; /* Space for bottom bar */
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0 20px;
  color: #1F2937;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.cart-item {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.cart-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #0D5B41;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-name {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #374151;
  line-height: 1.2;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #9CA3AF;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #EF4444;
}

.item-subtitle {
  font-size: 12px;
  color: #6B7280;
  margin: 0 0 8px 0;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #107353;
}

.quantity-selector {
  display: flex;
  align-items: center;
  background-color: #EAEFEA;
  border-radius: 20px;
  padding: 4px 8px;
  gap: 12px;
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s;
}

.qty-btn:active {
  transform: scale(0.9);
}

.qty-value {
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  min-width: 12px;
  text-align: center;
}

.order-summary {
  background-color: #EDF3EE;
  border-radius: 16px;
  padding: 24px;
  margin-top: 10px;
}

.summary-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px 0;
  color: #374151;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 12px;
  color: #4B5563;
}

.summary-label {
  color: #4B5563;
}

.summary-val {
  font-weight: 600;
  color: #1F2937;
}

.divider {
  height: 1px;
  background-color: #D1D5DB;
  margin: 16px 0;
}

.total-row {
  font-size: 18px;
  font-weight: 600;
  color: #107353;
  margin-bottom: 0;
}

.total-val {
  color: #107353;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  background-color: transparent;
  padding: 16px 24px 24px;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(248, 250, 248, 0) 0%, #F8FAF8 20%);
}

.place-order-btn {
  width: 100%;
  background-color: #10B981;
  color: white;
  border: none;
  border-radius: 100px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.place-order-btn:hover {
  background-color: #059669;
}

.place-order-btn:active {
  transform: scale(0.98);
}
</style>
