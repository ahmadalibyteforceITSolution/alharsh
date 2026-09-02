<template>
  <div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Loading State -->
      <div v-if="loading" class="py-24 text-center space-y-3">
        <div class="w-12 h-12 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin mx-auto"></div>
        <p class="text-xs text-slate-500 font-medium">Loading technical product specifications from MongoDB...</p>
      </div>

      <!-- Product Not Found -->
      <div v-else-if="!product" class="bg-white rounded-3xl p-16 text-center shadow-card border border-slate-200 space-y-4">
        <h2 class="text-xl font-bold text-slate-800">Product Not Found</h2>
        <p class="text-xs text-slate-500">The product you are looking for does not exist or may have been updated.</p>
        <router-link to="/shop" class="inline-block bg-brand-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl">
          Return to Catalog
        </router-link>
      </div>

      <div v-else class="space-y-12">
        
        <!-- Breadcrumbs -->
        <div class="flex items-center space-x-2 text-xs text-slate-500">
          <router-link to="/" class="hover:text-brand-800">Home</router-link>
          <span>/</span>
          <router-link :to="`/shop?category=${product.category}`" class="hover:text-brand-800">{{ product.category }}</router-link>
          <span>/</span>
          <span class="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">{{ product.name }}</span>
        </div>

        <!-- Main Product Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Left: Multi-Image Gallery -->
          <div class="lg:col-span-6 space-y-4">
            <div class="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center relative overflow-hidden aspect-square">
              <img 
                :src="activeImage || product.images?.[0] || '/logo.png'" 
                :alt="product.name" 
                class="w-full h-full object-contain hover:scale-105 transition-transform duration-500" 
              />
              <span v-if="product.salePrice" class="absolute top-4 left-4 bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Save {{ Math.round(((product.price - product.salePrice) / product.price) * 100) }}%
              </span>
            </div>

            <!-- Thumbnail Carousel -->
            <div v-if="product.images && product.images.length > 1" class="flex items-center gap-3 overflow-x-auto pb-2">
              <button 
                v-for="(img, idx) in product.images" 
                :key="idx"
                @click="activeImage = img"
                class="w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all p-1 bg-slate-50"
                :class="activeImage === img ? 'border-brand-600 shadow-md ring-2 ring-brand-100' : 'border-slate-200 opacity-70 hover:opacity-100'"
              >
                <img :src="img" class="w-full h-full object-cover rounded-lg" />
              </button>
            </div>

            <!-- Certified Guarantee Box -->
            <div class="grid grid-cols-3 gap-3 pt-2 text-center text-2xs text-slate-600">
              <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <ShieldCheck class="w-4 h-4 text-brand-600 mx-auto" />
                <span class="font-bold block text-slate-800">100% Genuine</span>
              </div>
              <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <Truck class="w-4 h-4 text-accent-cyan mx-auto" />
                <span class="font-bold block text-slate-800">Safe Freight</span>
              </div>
              <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <RefreshCw class="w-4 h-4 text-amber-500 mx-auto" />
                <span class="font-bold block text-slate-800">7 Days Return</span>
              </div>
            </div>
          </div>

          <!-- Right: Product Information & Purchase Panel -->
          <div class="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div class="space-y-4">
              
              <!-- Badges & Category Header -->
              <div class="flex items-center space-x-2 text-xs">
                <span class="bg-brand-100 text-brand-800 font-bold px-2.5 py-0.5 rounded-md">
                  {{ product.category }}
                </span>
                <span class="text-slate-400">&bull;</span>
                <span class="text-slate-600 font-semibold">{{ product.subcategory }}</span>
              </div>

              <!-- Title -->
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {{ product.name }}
              </h1>

              <!-- SKU, Brand & Rating -->
              <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
                <div>SKU: <strong class="text-slate-800">{{ product.sku }}</strong></div>
                <div>Brand: <strong class="text-brand-800">{{ product.brand }}</strong></div>
                <div class="flex items-center space-x-1 text-amber-400">
                  <Star class="w-4 h-4 fill-current" />
                  <span class="font-bold text-slate-800">{{ product.rating || '4.9' }}</span>
                  <span class="text-slate-500">({{ product.reviewsCount || 12 }} reviews)</span>
                </div>
              </div>

              <!-- Price Box -->
              <div class="bg-brand-50/70 p-4 rounded-2xl border border-brand-100/80 flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <div class="text-2xs text-slate-500 uppercase tracking-wider font-bold">
                    {{ currentVariant ? 'Variant Price' : 'Trade Price' }}
                  </div>
                  <div class="flex items-baseline space-x-3">
                    <span class="text-2xl sm:text-3xl font-extrabold text-brand-900">
                      Rs. {{ currentPrice.toLocaleString() }}
                    </span>
                    <span v-if="currentSalePrice && currentSalePrice < currentOriginalPrice" class="text-sm text-slate-400 line-through">
                      Rs. {{ currentOriginalPrice.toLocaleString() }}
                    </span>
                    <span class="text-xs font-semibold text-slate-600">/ {{ currentVariant?.unit || product.unit || 'Piece' }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xs text-slate-500 font-medium">Availability</div>
                  <div :class="currentStock > 0 ? 'text-emerald-600 font-bold text-xs' : 'text-rose-600 font-bold text-xs'">
                    {{ currentStock > 0 ? `In Stock (${currentStock} units ready)` : 'Currently Out of Stock' }}
                  </div>
                </div>
              </div>

              <!-- Available Sizes Selector -->
              <div v-if="availableSizes.length > 0" class="space-y-2 pt-1">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-slate-800">Select Size / Gauge:</span>
                  <span class="text-brand-800 font-extrabold">{{ selectedSize || 'Choose Size' }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="size in availableSizes" 
                    :key="size"
                    @click="selectSize(size)"
                    type="button"
                    class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border"
                    :class="selectedSize === size 
                      ? 'bg-brand-800 text-white border-brand-800 shadow-md ring-2 ring-brand-200' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-brand-500'"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Available Colors Selector -->
              <div v-if="availableColors.length > 0" class="space-y-2 pt-1">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-slate-800">Select Color / Finish:</span>
                  <span class="text-brand-800 font-extrabold">{{ selectedColor || 'Choose Color' }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="col in availableColors" 
                    :key="col"
                    @click="selectColor(col)"
                    type="button"
                    class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center space-x-2"
                    :class="selectedColor === col 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-brand-200' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-500'"
                  >
                    <span :class="getColorDotClass(col)" class="w-3.5 h-3.5 rounded-full border shadow-inner shrink-0"></span>
                    <span>{{ col }}</span>
                  </button>
                </div>
              </div>

              <!-- Short Description -->
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ product.shortDescription || product.description }}
              </p>

              <!-- Key Features List -->
              <div v-if="product.features && product.features.length > 0" class="space-y-1.5 pt-1">
                <div class="text-xs font-bold text-slate-800">Key Features:</div>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  <li v-for="(feat, idx) in product.features" :key="idx" class="flex items-center space-x-2">
                    <Check class="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

            </div>

            <!-- Purchase Box & Actions -->
            <div class="space-y-4 pt-4 border-t border-slate-100">
              
              <!-- Quantity Stepper & Add to Cart -->
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div class="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 shrink-0 justify-between sm:justify-start">
                  <button @click="quantity = Math.max(1, quantity - 1)" class="px-4 py-3 text-slate-700 hover:bg-slate-200 font-bold text-sm">-</button>
                  <span class="px-4 py-3 text-xs font-bold text-slate-900 min-w-10 text-center">{{ quantity }}</span>
                  <button @click="quantity = Math.min(currentStock, quantity + 1)" class="px-4 py-3 text-slate-700 hover:bg-slate-200 font-bold text-sm">+</button>
                </div>

                <button 
                  @click="addToCart"
                  :disabled="currentStock <= 0"
                  class="flex-1 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg hover:shadow-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <ShoppingCart class="w-5 h-5" />
                  <span>
                    Add To Cart &bull; Rs. {{ (currentPrice * quantity).toLocaleString() }}
                    <span v-if="selectedSize || selectedColor" class="text-2xs font-normal opacity-90 block sm:inline sm:ml-1">
                      ({{ [selectedSize, selectedColor].filter(Boolean).join(' - ') }})
                    </span>
                  </span>
                </button>
              </div>

              <!-- Secondary Actions: Contractor Quote & WhatsApp Order -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  @click="cartStore.openQuoteModal(product)"
                  class="bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold py-3 px-4 rounded-xl border border-navy-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <FileSpreadsheet class="w-4 h-4 text-accent-cyan" />
                  <span>Request Bulk Contractor Rate</span>
                </button>

                <a 
                  :href="`https://wa.me/923029355294?text=Hello%20AL-HRSH,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name)}%20${selectedSize ? `(Size: ${encodeURIComponent(selectedSize)})` : ''}%20${selectedColor ? `(Color: ${encodeURIComponent(selectedColor)})` : ''}%20(SKU:%20${currentVariant?.sku || product.sku}).`" 
                  target="_blank"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle class="w-4 h-4" />
                  <span>Order via WhatsApp (0302-9355294)</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        <!-- Technical Specifications Table Section -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <div class="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <Sliders class="w-5 h-5 text-brand-600" />
            <h2 class="text-lg font-extrabold text-slate-900">Technical Specifications & Engineering Standards</h2>
          </div>

          <div v-if="product.specifications && product.specifications.length > 0" class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-extrabold uppercase tracking-wider">
                  <th class="p-3.5 rounded-l-xl border-y border-slate-200">Specification Attribute</th>
                  <th class="p-3.5 rounded-r-xl border-y border-slate-200">Engineering Value / Standard</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="(spec, i) in product.specifications" :key="i" class="hover:bg-slate-50/80">
                  <td class="p-3.5 font-bold text-slate-700 w-1/3">{{ spec.label }}</td>
                  <td class="p-3.5 text-slate-900 font-semibold">{{ spec.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="text-xs text-slate-500 italic">
            Standard industrial compliance specifications apply. Contact helpline 0302-9355294 for material test reports.
          </div>

          <!-- Comprehensive Description -->
          <div class="pt-6 border-t border-slate-100 space-y-3">
            <h3 class="text-sm font-bold text-slate-900">Full Product Overview</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {{ product.description || product.shortDescription }}
            </p>
          </div>
        </div>

        <!-- Related Products Section -->
        <div v-if="relatedProducts.length > 0" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">Frequently Purchased Together</h2>
            <router-link :to="`/shop?category=${product.category}`" class="text-xs font-bold text-brand-700 hover:text-brand-900">
              View All {{ product.category }} &rarr;
            </router-link>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <ProductCard v-for="rel in relatedProducts" :key="rel._id" :product="rel" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import ProductCard from '../components/common/ProductCard.vue';
import { ShieldCheck, Truck, RefreshCw, Star, Check, ShoppingCart, FileSpreadsheet, MessageCircle, Sliders } from 'lucide-vue-next';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref(null);
const relatedProducts = ref([]);
const activeImage = ref('');
const quantity = ref(1);
const loading = ref(true);

const selectedSize = ref('');
const selectedColor = ref('');

// Computed Available Sizes
const availableSizes = computed(() => {
  if (!product.value) return [];
  if (product.value.sizes && product.value.sizes.length > 0) return product.value.sizes;
  if (product.value.variants && product.value.variants.length > 0) {
    return [...new Set(product.value.variants.map(v => v.size).filter(s => s))];
  }
  return [];
});

// Computed Available Colors
const availableColors = computed(() => {
  if (!product.value) return [];
  if (product.value.colors && product.value.colors.length > 0) return product.value.colors;
  if (product.value.variants && product.value.variants.length > 0) {
    return [...new Set(product.value.variants.map(v => v.color).filter(c => c))];
  }
  return [];
});

// Find Active Variant based on selected size & color
const currentVariant = computed(() => {
  if (!product.value || !product.value.variants || product.value.variants.length === 0) return null;
  
  return product.value.variants.find(v => {
    const sizeMatch = !selectedSize.value || v.size === selectedSize.value;
    const colorMatch = !selectedColor.value || v.color === selectedColor.value;
    return sizeMatch && colorMatch;
  }) || product.value.variants[0];
});

// Computed Live Price
const currentPrice = computed(() => {
  if (currentVariant.value) {
    const sale = currentVariant.value.salePrice;
    const base = currentVariant.value.price;
    return (sale && sale < base) ? sale : base;
  }
  return (product.value?.salePrice && product.value?.salePrice < product.value?.price) 
    ? product.value.salePrice 
    : (product.value?.price || 0);
});

// Computed Live Original Price
const currentOriginalPrice = computed(() => {
  if (currentVariant.value) {
    return currentVariant.value.price;
  }
  return product.value?.price || 0;
});

// Computed Live Sale Price
const currentSalePrice = computed(() => {
  if (currentVariant.value) {
    return currentVariant.value.salePrice;
  }
  return product.value?.salePrice;
});

// Computed Live Stock
const currentStock = computed(() => {
  if (currentVariant.value && currentVariant.value.stock !== undefined) {
    return currentVariant.value.stock;
  }
  return product.value?.stock || 0;
});

const getColorDotClass = (colorName) => {
  const c = (colorName || '').toLowerCase();
  if (c.includes('green')) return 'bg-emerald-500';
  if (c.includes('red')) return 'bg-rose-500';
  if (c.includes('black')) return 'bg-slate-900 border-slate-700';
  if (c.includes('white')) return 'bg-white border-slate-300';
  if (c.includes('ivory')) return 'bg-amber-100 border-amber-300';
  if (c.includes('chrome') || c.includes('silver')) return 'bg-slate-300';
  if (c.includes('gold') || c.includes('brass')) return 'bg-amber-400';
  if (c.includes('blue')) return 'bg-blue-500';
  if (c.includes('yellow')) return 'bg-yellow-400';
  if (c.includes('grey') || c.includes('gray')) return 'bg-slate-500';
  return 'bg-brand-500';
};

const selectSize = (size) => {
  selectedSize.value = size;
  if (currentVariant.value?.image) {
    activeImage.value = currentVariant.value.image;
  }
};

const selectColor = (col) => {
  selectedColor.value = col;
  if (currentVariant.value?.image) {
    activeImage.value = currentVariant.value.image;
  }
};

const loadProductData = async () => {
  loading.value = true;
  const idOrSlug = route.params.id;
  const data = await productStore.getProductDetails(idOrSlug);
  if (data) {
    product.value = data.product;
    relatedProducts.value = data.related;
    activeImage.value = data.product.images?.[0] || '';
    quantity.value = 1;

    // Initialize default selected size & color
    if (availableSizes.value.length > 0) {
      selectedSize.value = availableSizes.value[0];
    } else {
      selectedSize.value = '';
    }

    if (availableColors.value.length > 0) {
      selectedColor.value = availableColors.value[0];
    } else {
      selectedColor.value = '';
    }
  }
  loading.value = false;
};

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value, currentVariant.value, selectedSize.value, selectedColor.value);
  }
};

onMounted(() => {
  loadProductData();
});

watch(() => route.params.id, () => {
  loadProductData();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
