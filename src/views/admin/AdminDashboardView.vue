<template>
  <div class="p-6 sm:p-10 space-y-8">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Admin Overview Dashboard</h1>
        <p class="text-xs text-slate-400 mt-1">Live operational data synchronized with MongoDB Atlas Database</p>
      </div>
      <div class="flex items-center space-x-3">
        <router-link to="/admin/products" class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center space-x-1.5">
          <Plus class="w-4 h-4" />
          <span>Upload New Product</span>
        </router-link>
      </div>
    </div>

    <!-- 4 Core KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Total Sales -->
      <div class="bg-navy-950 p-6 rounded-3xl border border-navy-800 space-y-2 shadow-sm">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="font-bold uppercase tracking-wider">Total Sales Revenue</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
            <DollarSign class="w-4 h-4" />
          </div>
        </div>
        <div class="text-2xl font-extrabold text-white">
          Rs. {{ adminStore.stats.totalRevenue.toLocaleString() }}
        </div>
        <div class="text-2xs text-emerald-400 font-semibold flex items-center space-x-1">
          <TrendingUp class="w-3.5 h-3.5" />
          <span>From verified customer orders</span>
        </div>
      </div>

      <!-- Total Orders -->
      <div class="bg-navy-950 p-6 rounded-3xl border border-navy-800 space-y-2 shadow-sm">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="font-bold uppercase tracking-wider">Total Orders</span>
          <div class="w-8 h-8 rounded-xl bg-brand-950 text-brand-400 flex items-center justify-center">
            <ShoppingCart class="w-4 h-4" />
          </div>
        </div>
        <div class="text-2xl font-extrabold text-white">
          {{ adminStore.stats.totalOrders }} Orders
        </div>
        <div class="text-2xs text-amber-400 font-semibold">
          {{ adminStore.stats.pendingOrdersCount }} pending action
        </div>
      </div>

      <!-- Total Products -->
      <div class="bg-navy-950 p-6 rounded-3xl border border-navy-800 space-y-2 shadow-sm">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="font-bold uppercase tracking-wider">Products in Catalog</span>
          <div class="w-8 h-8 rounded-xl bg-cyan-950 text-accent-cyan flex items-center justify-center">
            <Package class="w-4 h-4" />
          </div>
        </div>
        <div class="text-2xl font-extrabold text-white">
          {{ adminStore.stats.totalProducts }} Active Items
        </div>
        <div class="text-2xs text-slate-400">
          Sanitary: {{ adminStore.stats.categoryBreakdown?.Sanitary || 0 }} &bull; Elec: {{ adminStore.stats.categoryBreakdown?.Electrical || 0 }}
        </div>
      </div>

      <!-- Low Stock Alert -->
      <div class="bg-navy-950 p-6 rounded-3xl border border-navy-800 space-y-2 shadow-sm">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="font-bold uppercase tracking-wider">Low Stock Warnings</span>
          <div class="w-8 h-8 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center">
            <AlertTriangle class="w-4 h-4" />
          </div>
        </div>
        <div class="text-2xl font-extrabold text-white">
          {{ adminStore.stats.lowStockCount }} Items
        </div>
        <div class="text-2xs text-rose-400 font-semibold">
          Items below 15 units threshold
        </div>
      </div>

    </div>

    <!-- 2 Column Layout (Recent Orders + Low Stock Alerts) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Recent Orders Table -->
      <div class="lg:col-span-8 bg-navy-950 rounded-3xl p-6 border border-navy-800 space-y-4">
        <div class="flex items-center justify-between border-b border-navy-800 pb-3">
          <h2 class="text-sm font-extrabold text-white uppercase tracking-wider">Recent Customer Orders</h2>
          <router-link to="/admin/orders" class="text-2xs text-brand-400 font-bold hover:underline">
            Manage All Orders &rarr;
          </router-link>
        </div>

        <div v-if="adminStore.stats.recentOrders?.length === 0" class="py-12 text-center text-xs text-slate-400">
          No orders placed yet.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead>
              <tr class="text-slate-400 uppercase tracking-wider text-2xs border-b border-navy-800">
                <th class="pb-2.5">Order ID</th>
                <th class="pb-2.5">Customer</th>
                <th class="pb-2.5">City</th>
                <th class="pb-2.5">Amount</th>
                <th class="pb-2.5">Status</th>
                <th class="pb-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-navy-800/60">
              <tr v-for="order in adminStore.stats.recentOrders" :key="order._id" class="hover:bg-navy-900/60">
                <td class="py-3 font-mono font-bold text-white">{{ order.orderNumber }}</td>
                <td class="py-3 text-slate-300 font-semibold">{{ order.customer?.fullName }}</td>
                <td class="py-3 text-slate-400">{{ order.customer?.city }}</td>
                <td class="py-3 font-bold text-white">Rs. {{ order.totalAmount?.toLocaleString() }}</td>
                <td class="py-3">
                  <span class="text-2xs px-2 py-0.5 rounded font-bold uppercase"
                    :class="getStatusBadgeClass(order.orderStatus)">
                    {{ order.orderStatus }}
                  </span>
                </td>
                <td class="py-3 text-right">
                  <router-link :to="`/admin/orders`" class="text-brand-400 hover:text-brand-300 font-bold text-2xs">
                    View
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Column: Low Stock Items & Quick Links -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Low Stock Alert Box -->
        <div class="bg-navy-950 rounded-3xl p-6 border border-navy-800 space-y-4">
          <div class="flex items-center justify-between border-b border-navy-800 pb-3">
            <h2 class="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <AlertTriangle class="w-4 h-4 text-amber-400" />
              <span>Low Inventory Alerts</span>
            </h2>
          </div>

          <div v-if="adminStore.stats.lowStockAlerts?.length === 0" class="text-xs text-slate-400 italic">
            All catalog items have healthy stock levels.
          </div>

          <div v-else class="space-y-3">
            <div v-for="item in adminStore.stats.lowStockAlerts" :key="item._id" class="p-3 bg-navy-900 rounded-2xl border border-navy-800 flex items-center justify-between text-xs">
              <div class="truncate pr-2">
                <div class="font-bold text-white truncate">{{ item.name }}</div>
                <div class="text-2xs text-slate-400">{{ item.category }} &bull; SKU: {{ item.sku }}</div>
              </div>
              <span class="bg-rose-950 text-rose-400 font-bold text-2xs px-2.5 py-1 rounded-full shrink-0">
                {{ item.stock }} left
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Admin Actions -->
        <div class="bg-navy-950 rounded-3xl p-6 border border-navy-800 space-y-3">
          <h3 class="text-xs font-bold text-slate-400 uppercase">Quick Shortcuts</h3>
          <div class="grid grid-cols-2 gap-2 text-xs font-bold">
            <router-link to="/admin/products" class="p-3 bg-navy-900 hover:bg-navy-850 rounded-xl text-center text-slate-300 hover:text-white border border-navy-800 transition-colors">
              Manage Products
            </router-link>
            <router-link to="/admin/orders" class="p-3 bg-navy-900 hover:bg-navy-850 rounded-xl text-center text-slate-300 hover:text-white border border-navy-800 transition-colors">
              Order Invoices
            </router-link>
            <router-link to="/admin/quotes" class="p-3 bg-navy-900 hover:bg-navy-850 rounded-xl text-center text-slate-300 hover:text-white border border-navy-800 transition-colors">
              Contractor Quotes
            </router-link>
            <router-link to="/admin/banners" class="p-3 bg-navy-900 hover:bg-navy-850 rounded-xl text-center text-slate-300 hover:text-white border border-navy-800 transition-colors">
              Hero Banners
            </router-link>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { Plus, DollarSign, TrendingUp, ShoppingCart, Package, AlertTriangle } from 'lucide-vue-next';

const adminStore = useAdminStore();

const getStatusBadgeClass = (status) => {
  if (status === 'Delivered') return 'bg-emerald-950 text-emerald-400';
  if (status === 'Dispatched' || status === 'Processing') return 'bg-blue-950 text-blue-400';
  if (status === 'Confirmed') return 'bg-purple-950 text-purple-400';
  if (status === 'Cancelled') return 'bg-rose-950 text-rose-400';
  return 'bg-amber-950 text-amber-400';
};

onMounted(() => {
  adminStore.fetchStats();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
