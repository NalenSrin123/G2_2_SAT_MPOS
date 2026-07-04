<template>
  <div class="bg-gray-200 p-6 rounded-lg h-full space-y-4">
    <ProductHeader @add-product="showAddModal = true" />
    <ProductStats
      :total-products="totalProducts"
      :low-stock-products="lowStockProducts"
      :top-category="topCategory"
      :average-price="averagePrice"
    />
    <ProductFilters
      :selected-category="selectedCategory"
      :sort-option="sortOption"
      @change-category="selectedCategory = $event"
      @search="searchTerm = $event"
      @sort-option="sortOption = $event"
    />
    <ProductTable
      :products="paginatedProducts"
      @edit="openEditModal"
      @remove="openDeleteModal"
    />
    <ProductPagination
      :current-page="currentPage"
      :pages="pages"
      :total="filteredProducts.length"
      :start="startItem"
      :end="endItem"
      @change-page="goToPage"
      @previous="prevPage"
      @next="nextPage"
    />
   

    <!-- Edit Modal-->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">

        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-bold">Edit Product</h2>
          <button
            @click="showEditModal = false"
            class="px-4 py-2 border rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            X
          </button>
        </div>

        <div class="space-y-3">

          <!-- CATEGORY -->
          <select
            v-model="editForm.category"
            class="w-full border px-3 py-2 rounded-lg"
          >
            <option>Beverages</option>
            <option>Snacks</option>
            <option>Food</option>
            <option>Dairy</option>
            <option>Bakery</option>
          </select>

          <input
            v-model.number="editForm.price"
            type="number"
            placeholder="Price"
            class="w-full border px-3 py-2 rounded-lg"
          />

          <input
            v-model.number="editForm.stock"
            type="number"
            placeholder="Quantity"
            class="w-full border px-3 py-2 rounded-lg"
          />

        </div>

        <div class="flex justify-end gap-3 mt-5">

          <button
            @click="showEditModal = false"
            class="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            @click="updateProduct"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>

        </div>

      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">

        <div class="flex justify-between mb-4">
          <h2 class="text-lg font-bold text-red-600">Delete Product</h2>
          <button
            @click="closeModal"
            class="px-4 py-2 border rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            X
          </button>
        </div>

        <p class="text-gray-600 mt-2">
          Are you sure you want to delete
          <span class="font-semibold">{{ selectedProduct?.name }}</span>?
        </p>

        <div class="flex justify-end gap-3 mt-5">

          <button
            @click="closeModal"
            class="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-80 shadow-lg text-center">
        <h2
          class="text-lg font-bold"
          :class="successModalClass"
        >
          {{ successMessage }}
        </h2>

        <button
          @click="showSuccessModal = false"
          class="mt-5 px-4 py-2 text-white rounded-lg"
          :class="successButtonClass"
        >
          OK
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import ProductHeader from '@/components/productsManagementDesign/ProductHeader.vue'
import ProductStats from '@/components/productsManagementDesign/ProductStats.vue'
import ProductFilters from '@/components/productsManagementDesign/ProductFilters.vue'
import ProductTable from '@/components/productsManagementDesign/ProductTable.vue'
import ProductPagination from '@/components/productsManagementDesign/ProductPagination.vue'
import api from '@/services/api'


const selectedCategory = ref('All Products')
const searchTerm = ref('')
const sortOption = ref('')

const currentPage = ref(1)
const itemsPerPage = 5

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false)
const successMessage = ref('')
const successType = ref('update')

const selectedProduct = ref(null)


const addForm = ref({
  name: '',
  category: 'Snacks',
  price: 0,
  stock: 0,
  image: null,
  imagePreview: ''
})

const editForm = ref({
  id: null,
  category: '',
  price: 0,
  stock: 0
})

const products = ref([])
const isLoading = ref(true)

const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})


// filtered products
const filteredProducts = computed(() => {
  let result = [...products.value]

  if (selectedCategory.value !== 'All Products') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  if (searchTerm.value) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (sortOption.value === 'price_asc') result.sort((a,b) => a.price - b.price)
  if (sortOption.value === 'price_desc') result.sort((a,b) => b.price - a.price)
  if (sortOption.value === 'stock_asc') result.sort((a,b) => a.stock - b.stock)
  if (sortOption.value === 'stock_desc') result.sort((a,b) => b.stock - a.stock)

  return result
})

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

const pages = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1)
)

const startItem = computed(() =>
  (currentPage.value - 1) * itemsPerPage + 1
)

const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage, filteredProducts.value.length)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const goToPage = (p) => currentPage.value = p
const prevPage = () => currentPage.value > 1 && currentPage.value--
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++

// Add Modal
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  addForm.value.imagePreview = URL.createObjectURL(file)
}

const addProduct = () => {
  products.value.unshift({
    id: Date.now(),
    name: addForm.value.name,
    sku: `SKU-${Math.floor(Math.random()*99999)}`,
    category: addForm.value.category,
    price: Number(addForm.value.price),
    stock: Number(addForm.value.stock),
    status:
      addForm.value.stock === 0
        ? 'Draft'
        : addForm.value.stock <= 10
        ? 'Low Stock'
        : 'Active',
    image: addForm.value.imagePreview || 'https://picsum.photos/60'
  })
  showAddModal.value = false
}

// Edit Modal
const openEditModal = (product) => {
  editForm.value = {
    id: product.id,
    category: product.category,
    price: product.price,
    stock: product.stock
  }

  showEditModal.value = true
}

const updateProduct = () => {
  const p = products.value.find(x => x.id === editForm.value.id)
  if (!p) return

  p.category = editForm.value.category
  p.price = Number(editForm.value.price)
  p.stock = Number(editForm.value.stock)

  p.status =
    p.stock === 0
      ? 'Draft'
      : p.stock <= 10
      ? 'Low Stock'
      : 'Active'

  showEditModal.value = false
  showSuccess('Update success', 'update')
}

// Delete Modal
const openDeleteModal = (p) => {
  selectedProduct.value = p
  showDeleteModal.value = true
}

const closeModal = () => {
  showDeleteModal.value = false
  selectedProduct.value = null
}

const confirmDelete = async () => {
  if (!selectedProduct.value) return

  try {
    await api.delete(`/products/${selectedProduct.value.id}`)
    await fetchProducts()

    closeModal()
    showSuccess('Remove success', 'remove')
  } catch (error) {
    console.error('Error deleting product:', error)
    closeModal()
    showSuccess('Delete failed', 'update')
  }
}

const showSuccess = (message, type = 'update') => {
  successMessage.value = message
  successType.value = type
  showSuccessModal.value = true
}

const successModalClass = computed(() =>
  successType.value === 'remove'
    ? 'text-red-600'
    : 'text-[#002f87]'
)

const successButtonClass = computed(() =>
  successType.value === 'remove'
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-[#002f87] hover:bg-blue-900'
)

const totalProducts = computed(() => products.value.length)

const lowStockProducts = computed(() =>
  products.value.filter(product => product.stock <= 10).length
)

const averagePrice = computed(() => {
  if (!products.value.length) return 0

  const total = products.value.reduce(
    (sum, product) => sum + product.price,
    0
  )

  return (total / products.value.length).toFixed(2)
})

const topCategory = computed(() => {
  const categories = {}

  products.value.forEach(product => {
    categories[product.category] =
      (categories[product.category] || 0) + 1
  })

  let top = '-'
  let highest = 0

  for (const category in categories) {
    if (categories[category] > highest) {
      highest = categories[category]
      top = category
    }
  }

  return top
})
</script>
