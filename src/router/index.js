/*
|--------------------------------------------------------------------------
| File: router/index.js
|--------------------------------------------------------------------------
|
| Description:
| Defines the application routes and navigation behavior using Vue Router.
|
| Responsibilities:
| - Map URL paths to page components
| - Configure default entry route
| - Organize public and feature routes
|
| Notes:
| - The root path ("/") currently redirects to "/preview" for demo purposes
| - Update the root route to Home when moving to production
|
*/

import { createRouter, createWebHistory } from 'vue-router'

// Page components
import Design_list_inventory from '@/pages/dashboard/Design_list _inventory.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword from '../pages/auth/ResetPassword.vue'
import Design_register_page from '@/pages/auth/Design_register_page.vue'
import Design_Form_Create_Product from '../pages/dashboard/Design_Form_Create_Product.vue'
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import productsManagement from '@/pages/dashboard/productsManagement/ProductManagement.vue'
import OrderList from '@/pages/dashboard/OrderList.vue'
import Customers from '@/pages/dashboard/Customers.vue'
import Reports from '@/pages/dashboard/Reports.vue'
import Settings from '@/pages/dashboard/Settings.vue'
import Design_confirm_otp_page from '@/pages/auth/Design_confirm_otp_page.vue'
import CategoryManagementView from '../pages/dashboard/productsManagement/CategoryManagementView.vue'
/**
 * Route definitions
 * Each route maps a URL path to a specific page component
 */
const routes = [
  /**
   * Default entry route
   * Redirects "/" to "/preview" to showcase the project structure
   */
  { path: '/', redirect: '/preview' },

  /**
   * Preview page (landing/demo screen)
   * Displays project structure and navigation examples
   */
  { path: '/preview', component: Preview },

  /**
   * Main application dashboard
   * Typically requires authentication (can add guards later)
   */
  { path: '/dashboard', component: Dashboard, meta: { layout: 'dashboard' } },
  { path: '/list_inventory', name: 'Design_list_inventory', component: Design_list_inventory, meta: { layout: 'dashboard' } },
  { path: '/order', name: 'OrderList', component: OrderList, meta: { layout: 'dashboard' } },
  { path: '/products', component: productsManagement, meta: { layout: 'dashboard' } },
  { path: '/create_product', name: 'Design_Form_Create_Product', component: Design_Form_Create_Product, meta: { layout: 'dashboard' } },
  { path: '/customers', component: Customers, meta: { layout: 'dashboard' } },
  { path: '/reports', component: Reports, meta: { layout: 'dashboard' } },
  { path: '/settings', component: Settings, meta: { layout: 'dashboard' } },
  { path: '/categories', component: CategoryManagementView, meta: { layout: 'dashboard' } },
  
  
  /**
   * Authentication routes
   */
  { path: '/login', component: Login },
  { path: '/register', component: Design_register_page },
  { path: '/confirm-otp', component: Design_confirm_otp_page },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },

  /**
   * Optional home route (disabled for now)
   * Uncomment when switching from preview to real landing page
   */
  // { path: '/', component: Home },
  { path: '/home', component: Home },

  /**
   * Catch-all route
   * Displays a styled 404 page for unknown paths
   */
  { path: '/:pathMatch(.*)*', component: NotFound },
]

/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
