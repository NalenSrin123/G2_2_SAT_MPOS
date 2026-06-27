<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPaymentMethod = () => {
  router.push('/payment-method');
};

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
      <button 
        class="place-order-btn"
        @click="goToPaymentMethod"
      >
        <span>Place Order</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.cart-container {
  font-family: "Inter", sans-serif;
  background-color: #f8faf8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #1f2937;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background-color: #f8faf8;
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
  transition: 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
  color: #0d5b41;
}

.content {
  flex: 1;
  padding: 0 24px 120px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.cart-item::before {
  content: "";
  width: 4px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #0d5b41;
  border-radius: 12px 0 0 12px;
}

.item-image {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
}

.item-name {
  font-size: 17px;
  font-weight: 600;
}

.item-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}

.item-bottom {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #107353;
}

.quantity-selector {
  display: flex;
  align-items: center;
  background: #eaeaea;
  border-radius: 20px;
  padding: 4px 8px;
  gap: 10px;
}

.qty-btn,
.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.delete-btn {
  color: #9ca3af;
}

.delete-btn:hover {
  color: red;
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.order-summary {
  margin-top: 24px;
  background: #edf3ee;
  border-radius: 16px;
  padding: 24px;
}

.summary-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.divider {
  height: 1px;
  background: #d1d5db;
  margin: 16px 0;
}

.total-row {
  font-size: 20px;
  font-weight: bold;
}

.total-val {
  color: #107353;
}

.bottom-bar {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 900px;
  padding: 16px;
  background: linear-gradient(
    180deg,
    rgba(248, 250, 248, 0) 0%,
    #f8faf8 20%
  );
  box-sizing: border-box;
}

.place-order-btn {
  width: 100%;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.place-order-btn:hover {
  background: #059669;
}

.place-order-btn:active {
  transform: scale(0.98);
}

/* ---------- Tablet ---------- */

@media (max-width: 768px) {
  .content {
    padding: 0 16px 110px;
  }

  .item-image {
    width: 75px;
    height: 75px;
  }

  .section-title {
    font-size: 22px;
  }

  .item-name {
    font-size: 15px;
  }

  .item-price {
    font-size: 16px;
  }
}

/* ---------- Mobile ---------- */

@media (max-width: 480px) {
  .header {
    padding: 16px;
  }

  .content {
    padding: 0 12px 100px;
  }

  .cart-item {
    gap: 10px;
    padding: 12px;
  }

  .item-image {
    width: 65px;
    height: 65px;
  }

  .item-name {
    font-size: 14px;
  }

  .item-subtitle {
    font-size: 11px;
  }

  .item-price {
    font-size: 15px;
  }

  .quantity-selector {
    gap: 6px;
    padding: 4px 6px;
  }

  .order-summary {
    padding: 18px;
  }

  .summary-row {
    font-size: 13px;
  }

  .total-row {
    font-size: 18px;
  }

  .place-order-btn {
    padding: 14px;
    font-size: 15px;
  }
}
</style>
