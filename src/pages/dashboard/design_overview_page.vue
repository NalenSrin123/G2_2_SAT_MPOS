<template>
  <div class="ml-71 mt-25 mr-10 mb-8">

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      
      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase tracking-wider text-gray-500">
            Total Sales
          </span>

          <Wallet
            class="w-10 h-10 p-2 rounded-xl bg-blue-100 text-blue-600"
          />
        </div>

        <h2 class="text-3xl font-bold text-gray-800 mt-5">
          $12,450
        </h2>

        <p class="text-green-600 text-sm mt-2">
          ↗️ 12.5% from last month
        </p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase tracking-wider text-gray-500">
            Total Orders
          </span>

          <ShoppingBag
            class="w-10 h-10 p-2 rounded-xl bg-gray-100 text-gray-600"
          />
        </div>

        <h2 class="text-3xl font-bold text-gray-800 mt-5">
          154
        </h2>

        <p class="text-green-600 text-sm mt-2">
          ↗️ 8.2% from last month
        </p>
      </div>

      
      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase tracking-wider text-gray-500">
            Revenue
          </span>

          <CreditCard
            class="w-10 h-10 p-2 rounded-xl bg-emerald-100 text-emerald-600"
          />
        </div>

        <h2 class="text-3xl font-bold text-gray-800 mt-5">
          $8,200
        </h2>

        <p class="text-green-600 text-sm mt-2">
          ↗️ 5.4% from last month
        </p>
      </div>

      
      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase tracking-wider text-gray-500">
            Customers
          </span>

          <User
            class="w-10 h-10 p-2 rounded-xl bg-blue-100 text-blue-600"
          />
        </div>

        <h2 class="text-3xl font-bold text-gray-800 mt-5">
          1,200
        </h2>

        <p class="text-red-500 text-sm mt-2">
          ↘️ 1.2% from last month
        </p>
      </div>

    </div>

    <!-- Overview -->
    <div
      class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8"
    >
      <div class="flex items-center justify-between mb-8">

        <div>
          <h2 class="text-2xl font-bold text-gray-800">
            Sales Overview
          </h2>

          <p class="text-gray-500 text-sm mt-1">
            Monthly sales performance
          </p>
        </div>

        <div class="flex gap-2">
          <button
            class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Daily
          </button>

          <button
            class="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Monthly
          </button>
        </div>

      </div>

      <div class="h-[400px]">
        <Bar
          :data="chartData"
          :options="chartOptions"
        />
      </div>

    </div>

  </div>
</template>

<script setup>
import {
  Wallet,
  ShoppingBag,
  CreditCard,
  User
} from "lucide-vue-next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const chartData = {
  labels: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ],

  datasets: [
    {
      data: [20, 28, 35, 42, 32, 48, 55, 39, 45, 51, 62, 42],


      backgroundColor: [
        "#DCE8FF",
        "#DCE8FF",
        "#DCE8FF",
        "#9DB7E4",
        "#DCE8FF",
        "#DCE8FF",
        "#6F90C4",
        "#DCE8FF",
        "#DCE8FF",
        "#DCE8FF",
        "#1557D6",
        "#DCE8FF"
      ],

      borderRadius: 8,
      borderSkipped: false
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    }
  },

  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#f1f5f9"
      }
    },

    x: {
      grid: {
        display: false
      }
    }
  }
};
</script>
