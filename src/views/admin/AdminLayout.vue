<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
    
    <!-- Sidebar Navigation -->
    <aside class="w-full md:w-64 bg-navy-950 border-r border-navy-800 flex flex-col justify-between shrink-0">
      
      <!-- Top Brand -->
      <div>
        <div class="p-5 border-b border-navy-800 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="bg-white p-1.5 rounded-xl">
              <img src="/logo.png" alt="AL-HRSH" class="h-8 w-auto object-contain" />
            </div>
            <div>
              <div class="font-extrabold text-sm text-white tracking-wide">AL-HRSH</div>
              <div class="text-2xs text-accent-cyan font-bold uppercase">Staff & Admin Hub</div>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1.5 text-xs font-semibold">
          <router-link 
            to="/admin/dashboard" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path === '/admin/dashboard' ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <LayoutDashboard class="w-4 h-4" />
            <span>Dashboard Overview</span>
          </router-link>

          <router-link 
            to="/admin/products" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/products') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <Package class="w-4 h-4" />
            <div class="flex-1 flex justify-between items-center">
              <span>Products Catalog</span>
              <span v-if="adminStore.stats.lowStockCount > 0" class="bg-rose-600 text-white text-2xs px-1.5 py-0.5 rounded-full">
                {{ adminStore.stats.lowStockCount }} low
              </span>
            </div>
          </router-link>

          <router-link 
            to="/admin/categories" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/categories') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <Layers class="w-4 h-4" />
            <span>Categories & Subs</span>
          </router-link>

          <router-link 
            to="/admin/orders" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/orders') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <ShoppingCart class="w-4 h-4" />
            <div class="flex-1 flex justify-between items-center">
              <span>Orders Management</span>
              <span v-if="adminStore.stats.pendingOrdersCount > 0" class="bg-amber-500 text-slate-950 font-extrabold text-2xs px-1.5 py-0.5 rounded-full">
                {{ adminStore.stats.pendingOrdersCount }} new
              </span>
            </div>
          </router-link>

          <router-link 
            to="/admin/quotes" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/quotes') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <FileSpreadsheet class="w-4 h-4" />
            <div class="flex-1 flex justify-between items-center">
              <span>Contractor Quotes</span>
              <span v-if="adminStore.stats.newQuotesCount > 0" class="bg-accent-cyan text-slate-950 font-extrabold text-2xs px-1.5 py-0.5 rounded-full">
                {{ adminStore.stats.newQuotesCount }}
              </span>
            </div>
          </router-link>

          <router-link 
            to="/admin/banners" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/banners') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <Sliders class="w-4 h-4" />
            <span>Home Hero Banners</span>
          </router-link>

          <router-link 
            to="/admin/coupons" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/coupons') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <Percent class="w-4 h-4" />
            <span>Promo Coupons</span>
          </router-link>

          <router-link 
            to="/admin/inquiries" 
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors"
            :class="$route.path.startsWith('/admin/inquiries') ? 'bg-brand-700 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-navy-900'"
          >
            <Mail class="w-4 h-4" />
            <span>Contact Messages</span>
          </router-link>
        </nav>
      </div>

      <!-- Bottom Profile & Store Link -->
      <div class="p-4 border-t border-navy-800 space-y-3">
        <router-link to="/" target="_blank" class="flex items-center justify-center space-x-2 w-full py-2 bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-navy-800 transition-colors">
          <ExternalLink class="w-3.5 h-3.5 text-brand-400" />
          <span>View Live Storefront</span>
        </router-link>

        <div class="flex items-center justify-between text-xs pt-1">
          <div class="flex items-center space-x-2 truncate">
            <div class="w-7 h-7 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-2xs">
              AD
            </div>
            <div class="truncate">
              <div class="font-bold text-white truncate">Administrator</div>
              <div class="text-2xs text-emerald-400">MongoDB Atlas Live</div>
            </div>
          </div>
          <button @click="logout" class="text-slate-400 hover:text-rose-400 p-1 transition-colors" title="Logout">
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 bg-slate-900 overflow-y-auto min-h-screen">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '../../stores/admin';
import { LayoutDashboard, Package, Layers, ShoppingCart, FileSpreadsheet, Sliders, Percent, Mail, ExternalLink, LogOut } from 'lucide-vue-next';

const router = useRouter();
const adminStore = useAdminStore();

const logout = () => {
  adminStore.logout();
  router.push('/admin/login');
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
