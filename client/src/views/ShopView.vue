<template>
  <div class="bg-slate-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumbs & Header -->
      <div class="mb-6 space-y-1">
        <div class="flex items-center space-x-2 text-xs text-slate-500">
          <router-link to="/" class="hover:text-brand-800">Home</router-link>
          <span>/</span>
          <span class="text-slate-800 font-semibold">Catalog</span>
          <span v-if="selectedCategory !== 'All'">/</span>
          <span v-if="selectedCategory !== 'All'" class="text-brand-800 font-bold">{{ selectedCategory }}</span>
          <span v-if="selectedSubcategory">/</span>
          <span v-if="selectedSubcategory" class="text-slate-700 font-medium">{{ selectedSubcategory }}</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {{ selectedCategory === 'All' ? 'All Industrial Products' : `${selectedCategory} Range` }}
          </h1>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-900">{{ productStore.products.length }}</strong> products
          </div>
        </div>
      </div>

      <!-- Main Layout Grid (Sidebar + Product Catalog) -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar Filters -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Category Filter Box -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers class="w-4 h-4 text-brand-600" />
                <span>Categories</span>
              </h3>
              <button 
                v-if="selectedCategory !== 'All' || selectedSubcategory"
                @click="resetCategoryFilter" 
                class="text-2xs text-brand-700 font-bold hover:underline"
              >
                Clear
              </button>
            </div>

            <!-- Categories Accordion / List -->
            <div class="space-y-1 text-xs">
              <button 
                @click="selectCategory('All')"
                class="w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between transition-colors"
                :class="selectedCategory === 'All' ? 'bg-brand-800 text-white' : 'text-slate-700 hover:bg-slate-100'"
              >
                <span>All Products</span>
                <span class="text-2xs opacity-80">({{ productStore.totalCount }})</span>
              </button>

              <div v-for="cat in productStore.categories" :key="cat._id" class="space-y-1">
                <button 
                  @click="selectCategory(cat.name)"
                  class="w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between transition-colors"
                  :class="selectedCategory === cat.name ? 'bg-brand-800 text-white' : 'text-slate-700 hover:bg-slate-100'"
                >
                  <span class="flex items-center space-x-2">
                    <span>{{ cat.name }}</span>
                  </span>
                  <ChevronRight 
                    class="w-3.5 h-3.5 transition-transform" 
                    :class="{ 'rotate-90 text-white': selectedCategory === cat.name }" 
                  />
                </button>

                <!-- Subcategories dropdown if category active -->
                <div v-if="selectedCategory === cat.name && cat.subcategories && cat.subcategories.length > 0" class="pl-4 pr-1 py-1 space-y-1">
                  <button 
                    v-for="sub in cat.subcategories" 
                    :key="sub._id || sub.name"
                    @click="selectSubcategory(sub.name)"
                    class="w-full text-left px-2.5 py-1.5 rounded-lg text-2xs transition-colors flex items-center justify-between"
                    :class="selectedSubcategory === sub.name ? 'bg-brand-100 text-brand-900 font-bold' : 'text-slate-600 hover:bg-slate-100'"
                  >
                    <span>{{ sub.name }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Brand Filter Box -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center space-x-1.5">
              <Award class="w-4 h-4 text-brand-600" />
              <span>Brand</span>
            </h3>
            <div class="space-y-2 text-xs">
              <label 
                v-for="brand in availableBrands" 
                :key="brand" 
                class="flex items-center space-x-2 text-slate-700 hover:text-brand-800 cursor-pointer"
              >
                <input 
                  type="radio" 
                  name="brand_filter"
                  :value="brand" 
                  v-model="selectedBrand" 
                  @change="applyFilters"
                  class="rounded text-brand-600 focus:ring-brand-500" 
                />
                <span :class="{ 'font-bold text-brand-900': selectedBrand === brand }">{{ brand }}</span>
              </label>
              <label class="flex items-center space-x-2 text-slate-700 hover:text-brand-800 cursor-pointer pt-1 border-t border-slate-100">
                <input 
                  type="radio" 
                  name="brand_filter" 
                  value="" 
                  v-model="selectedBrand" 
                  @change="applyFilters" 
                  class="rounded text-brand-600 focus:ring-brand-500" 
                />
                <span>All Brands</span>
              </label>
            </div>
          </div>

          <!-- Availability & Reset -->
          <div class="bg-brand-50 p-5 rounded-2xl border border-brand-200 space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-brand-950">In Stock Only</span>
              <input 
                type="checkbox" 
                v-model="inStockOnly" 
                class="w-4 h-4 text-brand-600 rounded focus:ring-brand-500" 
              />
            </div>
            <button 
              @click="resetAllFilters"
              class="w-full text-center bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded-xl transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>

        </div>

        <!-- Product Listing Area -->
        <div class="lg:col-span-3 space-y-6">
          
          <!-- Top Control Bar (Search, Sort, View Toggle) -->
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <!-- Quick Filter Tag list -->
            <div class="flex items-center gap-2 flex-wrap text-xs">
              <span class="text-slate-400 font-medium">Active:</span>
              <span class="bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-bold text-2xs">
                {{ selectedCategory }}
              </span>
              <span v-if="selectedSubcategory" class="bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-bold text-2xs flex items-center space-x-1">
                <span>{{ selectedSubcategory }}</span>
                <button @click="selectSubcategory('')" class="hover:text-rose-600 ml-1">&times;</button>
              </span>
              <span v-if="selectedBrand" class="bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full font-bold text-2xs flex items-center space-x-1">
                <span>{{ selectedBrand }}</span>
                <button @click="selectedBrand = ''; applyFilters()" class="hover:text-rose-600 ml-1">&times;</button>
              </span>
            </div>

            <!-- Sort & View Modes -->
            <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <div class="flex items-center space-x-2 text-xs">
                <span class="text-slate-500 whitespace-nowrap">Sort:</span>
                <select 
                  v-model="sortBy" 
                  @change="applyFilters"
                  class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <!-- View Grid / List Toggle -->
              <div class="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                <button 
                  @click="viewMode = 'grid'" 
                  class="p-1.5 rounded-lg transition-colors"
                  :class="viewMode === 'grid' ? 'bg-white shadow-sm text-brand-800' : 'text-slate-400 hover:text-slate-600'"
                  title="Grid View"
                >
                  <Grid class="w-4 h-4" />
                </button>
                <button 
                  @click="viewMode = 'list'" 
                  class="p-1.5 rounded-lg transition-colors"
                  :class="viewMode === 'list' ? 'bg-white shadow-sm text-brand-800' : 'text-slate-400 hover:text-slate-600'"
                  title="List View"
                >
                  <List class="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <!-- Loading State -->
          <div v-if="productStore.loading" class="py-20 text-center space-y-3">
            <div class="w-10 h-10 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin mx-auto"></div>
            <p class="text-xs text-slate-500 font-medium">Fetching certified products from MongoDB...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredDisplayProducts.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <PackageSearch class="w-8 h-8" />
            </div>
            <h3 class="text-base font-bold text-slate-800">No matching products found</h3>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any items matching your selected filters. Try searching with different terms or resetting filters.
            </p>
            <button 
              @click="resetAllFilters"
              class="bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors"
            >
              Show All Products
            </button>
          </div>

          <!-- Grid View -->
          <div v-else-if="viewMode === 'grid'" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <ProductCard 
              v-for="product in filteredDisplayProducts" 
              :key="product._id" 
              :product="product" 
            />
          </div>

          <!-- List View -->
          <div v-else class="space-y-4">
            <div 
              v-for="product in filteredDisplayProducts" 
              :key="product._id"
              class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-card flex flex-col sm:flex-row gap-4 items-center transition-all"
            >
              <img :src="product.images?.[0] || '/logo.png'" :alt="product.name" class="w-28 h-28 object-cover rounded-xl border border-slate-200 shrink-0" />
              <div class="flex-1 space-y-1.5 text-center sm:text-left">
                <div class="flex items-center justify-center sm:justify-start space-x-2 text-2xs text-brand-700 font-bold">
                  <span>{{ product.category }}</span>
                  <span>&bull;</span>
                  <span>{{ product.subcategory }}</span>
                  <span>&bull;</span>
                  <span class="text-slate-500 font-medium">SKU: {{ product.sku }}</span>
                </div>
                <router-link :to="`/product/${product.slug || product._id}`" class="block text-sm font-bold text-slate-900 hover:text-brand-800">
                  {{ product.name }}
                </router-link>
                <p class="text-xs text-slate-500 line-clamp-2">{{ product.shortDescription || product.description }}</p>
                <div v-if="product.specifications?.length" class="text-2xs text-slate-500 flex flex-wrap gap-2 pt-1">
                  <span v-for="(spec, i) in product.specifications.slice(0, 2)" :key="i" class="bg-slate-100 px-2 py-0.5 rounded">
                    <strong>{{ spec.label }}:</strong> {{ spec.value }}
                  </span>
                </div>
              </div>
              <div class="text-right flex flex-col items-center sm:items-end justify-between self-stretch shrink-0 pt-2 sm:pt-0">
                <div>
                  <div class="text-base font-extrabold text-brand-900">
                    Rs. {{ (product.salePrice || product.price).toLocaleString() }}
                  </div>
                  <div v-if="product.salePrice" class="text-2xs text-slate-400 line-through">
                    Rs. {{ product.price.toLocaleString() }}
                  </div>
                </div>
                <button 
                  @click="cartStore.addItem(product, 1)"
                  class="bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1 shadow-sm mt-2 sm:mt-0"
                >
                  <ShoppingCart class="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import ProductCard from '../components/common/ProductCard.vue';
import { Layers, Award, ChevronRight, Grid, List, PackageSearch, ShoppingCart } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const selectedCategory = ref('All');
const selectedSubcategory = ref('');
const selectedBrand = ref('');
const sortBy = ref('newest');
const viewMode = ref('grid');
const inStockOnly = ref(false);

const availableBrands = ['Popular Pipes Group', 'Fast Cables', 'Schneider Electric', 'Sonex Luxury', 'Master Sanitary', 'Total Tools', 'Clipsal Elite', 'Royal Fans', 'Ingco Industrial', 'Yale Security'];

const applyFilters = () => {
  productStore.fetchProducts({
    category: selectedCategory.value,
    subcategory: selectedSubcategory.value,
    brand: selectedBrand.value,
    search: route.query.search || '',
    sort: sortBy.value
  });
};

const selectCategory = (cat) => {
  selectedCategory.value = cat;
  selectedSubcategory.value = '';
  applyFilters();
};

const selectSubcategory = (sub) => {
  selectedSubcategory.value = sub;
  applyFilters();
};

const resetCategoryFilter = () => {
  selectedCategory.value = 'All';
  selectedSubcategory.value = '';
  applyFilters();
};

const resetAllFilters = () => {
  selectedCategory.value = 'All';
  selectedSubcategory.value = '';
  selectedBrand.value = '';
  inStockOnly.value = false;
  sortBy.value = 'newest';
  router.push('/shop');
  applyFilters();
};

const filteredDisplayProducts = computed(() => {
  let list = productStore.products;
  if (inStockOnly.value) {
    list = list.filter(p => p.stock > 0);
  }
  return list;
});

onMounted(async () => {
  if (route.query.category) selectedCategory.value = route.query.category;
  if (route.query.subcategory) selectedSubcategory.value = route.query.subcategory;
  if (route.query.brand) selectedBrand.value = route.query.brand;

  await Promise.all([
    productStore.fetchCategories(),
    applyFilters()
  ]);
});

watch(() => route.query, (newQuery) => {
  if (newQuery.category) selectedCategory.value = newQuery.category;
  else if (!newQuery.search) selectedCategory.value = 'All';
  if (newQuery.subcategory) selectedSubcategory.value = newQuery.subcategory;
  applyFilters();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
