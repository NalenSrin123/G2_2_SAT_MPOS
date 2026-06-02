<template>
  <div class="bg-gray-200 p-6 rounded-lg h-full space-y-4">
    <ProductHeader @add-product="showAddModal = true" />
    <ProductStats />
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
    <!-- Add Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add Product</h2>
        <div class="space-y-3">
          <!-- IMAGE -->
          <label for="image">Image</label>
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="w-full border p-2 rounded-lg"
          />
          <img
            v-if="addForm.imagePreview"
            :src="addForm.imagePreview"
            class="w-20 h-20 object-cover rounded-lg border"
          />
          <label for="name">Name Product</label>
          <input
            v-model="addForm.name"
            type="text"
            placeholder="Product name"
            class="w-full border px-3 py-2 rounded-lg"
          />
          <!-- CATEGORY -->
          <label for="category">Category</label>
          <select
            v-model="addForm.category"
            class="w-full border px-3 py-2 rounded-lg"
          >
            <option>Electronics</option>
            <option>Home Office</option>
            <option>Accessories</option>
            <option>Peripherals</option>
          </select>
          <label for="price">Price</label>
          <input
            v-model.number="addForm.price"
            type="number"
            placeholder="Price"
            class="w-full border px-3 py-2 rounded-lg"
          />
          <!-- QUANTITY -->
          <label for="stock">Quantity</label>
          <input
            v-model.number="addForm.stock"
            type="number"
            placeholder="Quantity"
            class="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5">
          <button
            @click="showAddModal = false"
            class="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            @click="addProduct"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal-->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 class="text-xl font-bold mb-4">Edit Product</h2>

        <div class="space-y-3">

          <!-- CATEGORY -->
          <select
            v-model="editForm.category"
            class="w-full border px-3 py-2 rounded-lg"
          >
            <option>Electronics</option>
            <option>Home Office</option>
            <option>Accessories</option>
            <option>Peripherals</option>
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

        <h2 class="text-lg font-bold text-red-600">Delete Product</h2>

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

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import ProductHeader from '@/components/productsManagementDesign/ProductHeader.vue'
import ProductStats from '@/components/productsManagementDesign/ProductStats.vue'
import ProductFilters from '@/components/productsManagementDesign/ProductFilters.vue'
import ProductTable from '@/components/productsManagementDesign/ProductTable.vue'
import ProductPagination from '@/components/productsManagementDesign/ProductPagination.vue'


const selectedCategory = ref('All Products')
const searchTerm = ref('')
const sortOption = ref('')

const currentPage = ref(1)
const itemsPerPage = 5

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const selectedProduct = ref(null)


const addForm = ref({
  name: '',
  category: 'Electronics',
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

// data fake
const products = ref([
  { id: 1, name: 'Quantum Watch 64', sku: 'SKU-94021', category: 'Electronics', price: 299, stock: 128, status: 'Active', image: 'https://picsum.photos/60?1' },
  { id: 2, name: 'Sonic ANC Headphones', sku: 'SKU-11284', category: 'Electronics', price: 450, stock: 4, status: 'Low Stock', image: 'https://picsum.photos/60?2' },
  { id: 3, name: 'Pro Slate 11', sku: 'SKU-3821', category: 'Home Office', price: 899, stock: 42, status: 'Active', image: 'https://picsum.photos/60?3' }
])

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

const confirmDelete = () => {
  products.value = products.value.filter(
    p => p.id !== selectedProduct.value.id
  )

  closeModal()
}
</script>