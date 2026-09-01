<template>
  <section class="py-12 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Top -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div class="text-xs font-bold text-brand-700 uppercase tracking-widest flex items-center space-x-1.5 mb-1">
            <Sparkles class="w-3.5 h-3.5 text-brand-500" />
            <span>Featured Product Showcase</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Certified Products Ready for Dispatch
          </h2>
        </div>

        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="text-xs font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
            :class="activeTab === tab.id 
              ? 'bg-brand-800 text-white shadow-md' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard 
          v-for="product in filteredProducts.slice(0, 8)" 
          :key="product._id" 
          :product="product" 
        />
      </div>

      <div v-else class="py-12 text-center text-slate-500 text-xs">
        No products available in this selection right now.
      </div>

      <!-- Bottom View All Button -->
      <div class="text-center mt-10">
        <router-link 
          to="/shop" 
          class="inline-flex items-center space-x-2 bg-slate-900 hover:bg-brand-800 text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 active:scale-95"
        >
          <span>Explore Entire AL-HRSH Catalog</span>
          <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from '../common/ProductCard.vue';
import { Sparkles, ArrowRight } from 'lucide-vue-next';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});

const tabs = [
  { id: 'all', name: 'All Featured' },
  { id: 'bestseller', name: 'Best Sellers' },
  { id: 'sanitary', name: 'Sanitary & Pipes' },
  { id: 'electrical', name: 'Electrical & Cables' },
  { id: 'hardware', name: 'Power Tools & Hardware' }
];

const activeTab = ref('all');

const filteredProducts = computed(() => {
  if (activeTab.value === 'bestseller') {
    return props.products.filter(p => p.bestSeller);
  }
  if (activeTab.value === 'sanitary') {
    return props.products.filter(p => p.category === 'Sanitary');
  }
  if (activeTab.value === 'electrical') {
    return props.products.filter(p => p.category === 'Electrical');
  }
  if (activeTab.value === 'hardware') {
    return props.products.filter(p => p.category === 'Hardware');
  }
  return props.products;
});
</script>
