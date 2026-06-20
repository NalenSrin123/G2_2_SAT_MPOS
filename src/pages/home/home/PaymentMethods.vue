<template>
  <div class="min-h-screen bg-gray-50 px-4 py-4 sm:px-6 lg:px-8">
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
    >
      <!-- Payment Methods -->
      <div class="lg:col-span-2">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Select Payment Method
        </h1>

        <div class="space-y-4">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            @click="selectedMethod = method.id"
            :class="[
              'bg-white rounded-xl border p-4 cursor-pointer transition-all duration-200',
              selectedMethod === method.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            ]"
          >
            <div
              class="flex items-start sm:items-center justify-between gap-3"
            >
              <div class="flex flex-row gap-3 sm:gap-4 flex-1">
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border bg-gray-50 flex items-center justify-center shrink-0"
                >
                  <img
                    :src="method.logo"
                    :alt="method.name"
                    class="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                </div>

                <div class="min-w-0">
                  <h3
                    class="font-semibold text-sm sm:text-base text-gray-900"
                  >
                    {{ method.name }}
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    {{ method.description }}
                  </p>
                </div>
              </div>

              <div
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                :class="
                  selectedMethod === method.id
                    ? 'border-blue-600'
                    : 'border-gray-300'
                "
              >
                <div
                  v-if="selectedMethod === method.id"
                  class="w-3 h-3 rounded-full bg-blue-600"
                ></div>
              </div>
            </div>

            <!-- Credit Card Form -->
            <div
              v-if="selectedMethod === method.id && method.id === 3"
              class="mt-6 border-t pt-6"
            >
              <h4 class="font-semibold text-gray-800 mb-4">
                Card Information
              </h4>

              <div class="grid grid-cols-1 gap-4">
                <!-- Card Number -->
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <input
                    v-model="card.number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <!-- Cardholder -->
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Cardholder Name
                  </label>
                  <input
                    v-model="card.name"
                    type="text"
                    placeholder="John Doe"
                    class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <!-- Expiry + CVV -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <input
                      v-model="card.expiry"
                      type="text"
                      placeholder="MM/YY"
                      class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <input
                      v-model="card.cvv"
                      type="password"
                      placeholder="123"
                      class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-2">
                  <input
                    id="saveCard"
                    type="checkbox"
                    v-model="card.save"
                    class="w-4 h-4"
                  />
                  <label
                    for="saveCard"
                    class="text-sm text-gray-600 cursor-pointer"
                  >
                    Save card for future payments
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div>
        <div
          class="bg-white rounded-xl border p-4 sm:p-6 lg:sticky lg:top-6 shadow-sm"
        >
          <h2 class="font-bold text-gray-800 mb-4">
            ORDER SUMMARY
          </h2>

          <div class="space-y-3">
            <div class="flex justify-between text-sm sm:text-base">
              <span>Subtotal</span>
              <span class="font-medium">$45.00</span>
            </div>

            <div class="flex justify-between text-sm sm:text-base">
              <span>Delivery</span>
              <span class="font-medium">$2.50</span>
            </div>

            <hr />

            <div
              class="flex justify-between text-lg sm:text-xl font-bold text-blue-700"
            >
              <span>Total</span>
              <span>$47.50</span>
            </div>
          </div>

          <div
            class="bg-green-100 text-green-700 text-sm rounded-lg p-3 mt-5 text-center"
          >
            🔒 Secure Payment Guaranteed
          </div>

          <button
            @click="placeOrder"
            class="w-full mt-5 bg-blue-700 hover:bg-blue-800 text-white py-3 sm:py-4 rounded-lg font-semibold transition"
          >
            Place Order
          </button>

          <button
            class="w-full mt-3 text-blue-600 font-medium py-2"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedMethod = ref(1);

const card = ref({
  number: "",
  name: "",
  expiry: "",
  cvv: "",
  save: false,
});

const paymentMethods = [
  {
    id: 1,
    name: "ABA Bank (KHQR / ABA Pay)",
    description: "Scan KHQR or pay via ABA Mobile",
    logo:
      "https://i.pinimg.com/1200x/e2/33/f5/e233f5b0c5a358449398f202b03f063a.jpg",
  },
  {
    id: 2,
    name: "ACLEDA Bank (KHQR)",
    description: "Secure payment via ACLEDA Mobile",
    logo:
      "https://tse4.mm.bing.net/th/id/OIP.GA9uOl1djDZOftrR7ObA4QHaHI?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 3,
    name: "Credit / Debit Card",
    description: "Pay securely using Visa or MasterCard",
    logo:
      "https://i.pinimg.com/1200x/23/5a/0c/235a0cb971fba4dba78eab9e7870c4be.jpg",
  },
  {
    id: 4,
    name: "PayPal",
    description: "Fast and secure international payment",
    logo:
      "https://i.pinimg.com/1200x/c0/84/00/c0840056609a8b70f065c569fbb28d30.jpg",
  },
  {
    id: 5,
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    logo:
      "https://i.pinimg.com/1200x/19/5c/7d/195c7d525d9061e8144140eb958fd54a.jpg",
  },
];

const placeOrder = () => {
  console.log("Payment Method:", selectedMethod.value);

  if (selectedMethod.value === 3) {
    console.log("Card Info:", card.value);
  }

  alert("Order placed successfully!");
};
</script>