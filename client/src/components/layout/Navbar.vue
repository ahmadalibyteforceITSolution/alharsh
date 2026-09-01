<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 gap-4">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 shrink-0 group">
          <img 
            src="/logo.png" 
            alt="AL-HRSH Official Logo" 
            class="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </router-link>

        <!-- Search Bar with Live Auto-Suggestions -->
        <div class="hidden md:flex flex-1 max-w-xl relative">
          <div class="relative w-full">
            <input 
              v-model="searchQuery"
              @input="handleSearchInput"
              @keydown.enter="submitSearch"
              type="text" 
              placeholder="Search pipes, fittings, copper cables, MCBs, power tools, commodes..." 
              class="w-full bg-slate-100/90 text-slate-900 pl-11 pr-24 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-sm transition-all"
            />
            <Search class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button 
              @click="submitSearch"
              class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-800 hover:bg-brand-700 text-white text-xs px-4 py-1.5 rounded-full font-medium transition-colors shadow-sm"
            >
              Search
            </button>
          </div>

          <!-- Auto-Suggest Dropdown Results -->
          <div 
            v-if="showSuggestions && suggestions.length > 0"
            class="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn"
          >
            <div class="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Matching Products ({{ suggestions.length }})</span>
              <button @click="showSuggestions = false" class="hover:text-slate-800">Close</button>
            </div>
            <div class="max-h-80 overflow-y-auto divide-y divide-slate-100">
              <router-link 
                v-for="item in suggestions" 
                :key="item._id"
                :to="`/product/${item.slug || item._id}`"
                @click="showSuggestions = false"
                class="flex items-center gap-3 p-3 hover:bg-brand-50 transition-colors"
              >
                <img :src="item.images?.[0] || '/logo.png'" :alt="item.name" class="w-10 h-10 object-cover rounded border border-slate-200" />
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-semibold text-slate-800 truncate">{{ item.name }}</div>
                  <div class="text-2xs text-brand-600 font-medium">{{ item.category }} &bull; {{ item.subcategory }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-bold text-slate-900">Rs. {{ (item.salePrice || item.price).toLocaleString() }}</div>
                  <div v-if="item.salePrice" class="text-2xs text-slate-400 line-through">Rs. {{ item.price.toLocaleString() }}</div>
                </div>
              </router-link>
            </div>
            <div class="p-2.5 bg-slate-50 text-center border-t border-slate-100">
              <button @click="submitSearch" class="text-xs text-brand-700 hover:text-brand-900 font-semibold">
                View All Results for "{{ searchQuery }}" &rarr;
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Mega Links -->
        <nav class="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-700">
          <router-link to="/" class="hover:text-brand-800 transition-colors" active-class="text-brand-800 font-bold">
            Home
          </router-link>

          <!-- Sanitary Dropdown -->
          <div class="relative group py-2">
            <router-link to="/shop?category=Sanitary" class="flex items-center space-x-1 hover:text-brand-800 transition-colors">
              <span>Sanitary</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </router-link>
            <div class="absolute top-full -left-4 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <router-link to="/shop?category=Sanitary&subcategory=Pipes+%26+Fittings+(PPRC+%26+PVC)" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                PPRC & PVC Pipes & Fittings
              </router-link>
              <router-link to="/shop?category=Sanitary&subcategory=Bathroom+Fittings+%26+Taps" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Bathroom Fittings & Taps
              </router-link>
              <router-link to="/shop?category=Sanitary&subcategory=Commodes+%2F+Toilets" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Commodes & Toilets
              </router-link>
              <router-link to="/shop?category=Sanitary&subcategory=Showers+%26+Shower+Sets" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Showers & Rainfall Panels
              </router-link>
              <router-link to="/shop?category=Sanitary&subcategory=Water+Tanks+%26+Accessories" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Water Tanks & Floats
              </router-link>
              <div class="border-t border-slate-100 mt-1 pt-1">
                <router-link to="/shop?category=Sanitary" class="block px-3 py-1.5 text-xs text-brand-700 font-bold hover:underline">
                  All Sanitary Products &rarr;
                </router-link>
              </div>
            </div>
          </div>

          <!-- Electrical Dropdown -->
          <div class="relative group py-2">
            <router-link to="/shop?category=Electrical" class="flex items-center space-x-1 hover:text-brand-800 transition-colors">
              <span>Electrical</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </router-link>
            <div class="absolute top-full -left-4 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <router-link to="/shop?category=Electrical&subcategory=Wires+%26+Cables" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Fast Cables & Pure Copper Wires
              </router-link>
              <router-link to="/shop?category=Electrical&subcategory=Circuit+Breakers+%26+DBs" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                MCBs & Distribution Boards
              </router-link>
              <router-link to="/shop?category=Electrical&subcategory=Switches+%26+Sockets" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Designer Glass Switches & Sockets
              </router-link>
              <router-link to="/shop?category=Electrical&subcategory=Fans+%26+Ventilation" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Inverter BLDC Fans
              </router-link>
              <div class="border-t border-slate-100 mt-1 pt-1">
                <router-link to="/shop?category=Electrical" class="block px-3 py-1.5 text-xs text-brand-700 font-bold hover:underline">
                  All Electrical Products &rarr;
                </router-link>
              </div>
            </div>
          </div>

          <!-- Hardware Dropdown -->
          <div class="relative group py-2">
            <router-link to="/shop?category=Hardware" class="flex items-center space-x-1 hover:text-brand-800 transition-colors">
              <span>Hardware</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </router-link>
            <div class="absolute top-full -left-4 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <router-link to="/shop?category=Hardware&subcategory=Power+Tools" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Power Tools & Drills
              </router-link>
              <router-link to="/shop?category=Hardware&subcategory=Hand+Tools" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Hand Tools & Wrenches
              </router-link>
              <router-link to="/shop?category=Hardware&subcategory=Locks%2C+Hinges+%26+Door+Fittings" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Door Locks & Brass Hinges
              </router-link>
              <router-link to="/shop?category=Hardware&subcategory=Paints%2C+Adhesives+%26+Chemicals" class="block px-3 py-2 text-xs hover:bg-brand-50 hover:text-brand-800 rounded-lg font-medium text-slate-700">
                Silicone Sealants & Adhesives
              </router-link>
              <div class="border-t border-slate-100 mt-1 pt-1">
                <router-link to="/shop?category=Hardware" class="block px-3 py-1.5 text-xs text-brand-700 font-bold hover:underline">
                  All Hardware Products &rarr;
                </router-link>
              </div>
            </div>
          </div>

          <router-link to="/shop" class="hover:text-brand-800 transition-colors" active-class="text-brand-800 font-bold">
            All Products
          </router-link>

          <router-link to="/about" class="hover:text-brand-800 transition-colors" active-class="text-brand-800 font-bold">
            About
          </router-link>

          <router-link to="/contact" class="hover:text-brand-800 transition-colors" active-class="text-brand-800 font-bold">
            Contact
          </router-link>
        </nav>

        <!-- Right: Actions (Wishlist, Cart Trigger, Mobile Toggle) -->
        <div class="flex items-center space-x-3 sm:space-x-4">
          <!-- Wishlist Link -->
          <router-link to="/wishlist" class="relative p-2 text-slate-600 hover:text-brand-800 transition-colors" title="Wishlist">
            <Heart class="w-6 h-6" />
            <span 
              v-if="wishlistStore.totalWishlist > 0" 
              class="absolute top-0 right-0 bg-rose-500 text-white text-2xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ wishlistStore.totalWishlist }}
            </span>
          </router-link>

          <!-- Cart Trigger -->
          <button 
            @click="cartStore.isDrawerOpen = true" 
            class="relative flex items-center space-x-2 bg-brand-800 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <ShoppingCart class="w-5 h-5" />
            <span class="hidden sm:inline">Cart</span>
            <span class="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 text-slate-700 hover:text-brand-800"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Field -->
      <div class="md:hidden pb-3">
        <div class="relative">
          <input 
            v-model="searchQuery"
            @keydown.enter="submitSearch"
            type="text" 
            placeholder="Search products..." 
            class="w-full bg-slate-100 text-slate-900 pl-10 pr-20 py-2 rounded-lg border border-slate-200 text-sm"
          />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <button 
            @click="submitSearch"
            class="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-800 text-white text-xs px-3 py-1 rounded"
          >
            Go
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-slate-100 py-3 space-y-2 animate-fadeIn">
        <router-link @click="isMobileMenuOpen = false" to="/" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">Home</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/shop?category=Sanitary" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">Sanitary Products</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/shop?category=Electrical" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">Electrical Products</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/shop?category=Hardware" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">Hardware & Tools</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/shop" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">All Catalog</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/quote" class="block px-3 py-2 rounded-lg text-brand-700 hover:bg-brand-50 font-bold">Request Bulk Quote</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/track" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">Track Order</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/about" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">About Us</router-link>
        <router-link @click="isMobileMenuOpen = false" to="/contact" class="block px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50 font-medium">Contact Us</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useWishlistStore } from '../../stores/wishlist';
import api from '../../services/api';
import { Search, ChevronDown, ShoppingCart, Heart, Menu, X } from 'lucide-vue-next';

const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const searchQuery = ref('');
const suggestions = ref([]);
const showSuggestions = ref(false);
const isMobileMenuOpen = ref(false);
let searchTimeout = null;

const handleSearchInput = () => {
  clearTimeout(searchTimeout);
  if (!searchQuery.value || searchQuery.value.trim().length < 2) {
    suggestions.value = [];
    showSuggestions.value = false;
    return;
  }

  searchTimeout = setTimeout(async () => {
    try {
      const res = await api.get(`/products?search=${encodeURIComponent(searchQuery.value.trim())}&limit=5`);
      if (res.data.success) {
        suggestions.value = res.data.products;
        showSuggestions.value = true;
      }
    } catch (e) {
      console.error(e);
    }
  }, 250);
};

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    showSuggestions.value = false;
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value.trim())}`);
  }
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.65rem;
}
</style>
