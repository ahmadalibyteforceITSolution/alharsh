<template>
  <div v-if="product" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <div @click="cartStore.closeQuickView()" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>

    <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-slate-200">
        
        <!-- Close Button -->
        <button 
          @click="cartStore.closeQuickView()" 
          class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- Image Section -->
          <div class="bg-slate-50 p-6 flex flex-col items-center justify-center border-r border-slate-100">
            <img 
              :src="selectedImage || product.images?.[0] || '/logo.png'" 
              :alt="product.name" 
              class="w-full max-h-80 object-contain rounded-xl"
            />
            <!-- Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="flex gap-2 mt-4 overflow-x-auto">
              <button 
                v-for="(img, idx) in product.images" 
                :key="idx" 
                @click="selectedImage = img"
                class="w-12 h-12 rounded-lg border-2 overflow-hidden"
                :class="selectedImage === img ? 'border-brand-600' : 'border-slate-200'"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Details Section -->
          <div class="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center space-x-2 text-xs text-brand-700 font-semibold mb-1">
                <span>{{ product.category }}</span>
                <span>&bull;</span>
                <span>{{ product.subcategory }}</span>
              </div>
              <h2 class="text-lg font-bold text-slate-900 leading-snug">{{ product.name }}</h2>
              <div class="text-xs text-slate-500 mt-1">SKU: <strong class="text-slate-700">{{ product.sku }}</strong> | Brand: <strong class="text-slate-700">{{ product.brand }}</strong></div>

              <!-- Price -->
              <div class="mt-3 flex items-baseline space-x-3">
                <span class="text-2xl font-extrabold text-brand-900">
                  Rs. {{ currentPrice.toLocaleString() }}
                </span>
                <span v-if="currentSalePrice && currentSalePrice < currentOriginalPrice" class="text-sm text-slate-400 line-through">
                  Rs. {{ currentOriginalPrice.toLocaleString() }}
                </span>
                <span class="text-xs text-slate-500 font-medium">/ {{ currentVariant?.unit || product.unit || 'Piece' }}</span>
              </div>

              <!-- Sizes Selector in Quick View -->
              <div v-if="availableSizes.length > 0" class="mt-3 space-y-1.5">
                <div class="text-2xs font-bold text-slate-700 flex justify-between">
                  <span>Size:</span>
                  <span class="text-brand-800">{{ selectedSize }}</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button 
                    v-for="size in availableSizes" 
                    :key="size"
                    @click="selectedSize = size"
                    type="button"
                    class="px-2.5 py-1 rounded-lg text-2xs font-bold border transition-colors"
                    :class="selectedSize === size ? 'bg-brand-800 text-white border-brand-800' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Colors Selector in Quick View -->
              <div v-if="availableColors.length > 0" class="mt-3 space-y-1.5">
                <div class="text-2xs font-bold text-slate-700 flex justify-between">
                  <span>Color:</span>
                  <span class="text-brand-800">{{ selectedColor }}</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button 
                    v-for="col in availableColors" 
                    :key="col"
                    @click="selectedColor = col"
                    type="button"
                    class="px-2 py-1 rounded-lg text-2xs font-medium border flex items-center space-x-1.5 transition-colors"
                    :class="selectedColor === col ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'"
                  >
                    <span :class="getColorDotClass(col)" class="w-2.5 h-2.5 rounded-full border shadow-inner"></span>
                    <span>{{ col }}</span>
                  </button>
                </div>
              </div>

              <!-- Stock & Warranty -->
              <div class="mt-3 flex items-center space-x-4 text-xs">
                <span class="flex items-center space-x-1 text-emerald-600 font-semibold">
                  <CheckCircle class="w-4 h-4" />
                  <span>{{ currentStock > 0 ? `In Stock (${currentStock} Ready)` : 'Out of Stock' }}</span>
                </span>
                <span class="flex items-center space-x-1 text-slate-500">
                  <ShieldCheck class="w-4 h-4 text-brand-600" />
                  <span>100% Genuine Tested</span>
                </span>
              </div>

              <!-- Short Description -->
              <p class="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
                {{ product.shortDescription || product.description }}
              </p>

              <!-- Technical Specs Mini Table -->
              <div v-if="product.specifications && product.specifications.length > 0" class="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-2xs space-y-1">
                <div v-for="(spec, i) in product.specifications.slice(0, 3)" :key="i" class="flex justify-between">
                  <span class="text-slate-500">{{ spec.label }}</span>
                  <span class="font-bold text-slate-800">{{ spec.value }}</span>
                </div>
              </div>
            </div>

            <!-- Actions (Quantity & Add) -->
            <div class="space-y-3 pt-3 border-t border-slate-100">
              <div class="flex items-center space-x-3">
                <div class="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                  <button @click="quantity = Math.max(1, quantity - 1)" class="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold">-</button>
                  <span class="px-4 py-2 text-xs font-bold text-slate-900">{{ quantity }}</span>
                  <button @click="quantity = Math.min(currentStock, quantity + 1)" class="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold">+</button>
                </div>
                <button 
                  @click="addToCartAndClose"
                  :disabled="currentStock <= 0"
                  class="flex-1 bg-brand-800 hover:bg-brand-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                >
                  <ShoppingCart class="w-4 h-4" />
                  <span>Add To Cart - Rs. {{ (currentPrice * quantity).toLocaleString() }}</span>
                </button>
              </div>

              <div class="flex items-center justify-between text-xs pt-1">
                <router-link 
                  :to="`/product/${product.slug || product._id}`" 
                  @click="cartStore.closeQuickView()" 
                  class="text-brand-700 hover:text-brand-900 font-bold flex items-center space-x-1"
                >
                  <span>View Complete Technical Specs</span>
                  <ArrowRight class="w-3.5 h-3.5" />
                </router-link>
                <button 
                  @click="openQuoteForThisProduct"
                  class="text-slate-600 hover:text-brand-800 font-medium underline text-xs"
                >
                  Request Bulk Rate
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
import { ref, computed, watch } from 'vue';
import { useCartStore } from '../../stores/cart';
import { X, CheckCircle, ShieldCheck, ShoppingCart, ArrowRight } from 'lucide-vue-next';

const cartStore = useCartStore();
const product = computed(() => cartStore.quickViewProduct);
const selectedImage = ref('');
const quantity = ref(1);
const selectedSize = ref('');
const selectedColor = ref('');

const availableSizes = computed(() => {
  if (!product.value) return [];
  if (product.value.sizes && product.value.sizes.length > 0) return product.value.sizes;
  if (product.value.variants && product.value.variants.length > 0) {
    return [...new Set(product.value.variants.map(v => v.size).filter(Boolean))];
  }
  return [];
});

const availableColors = computed(() => {
  if (!product.value) return [];
  if (product.value.colors && product.value.colors.length > 0) return product.value.colors;
  if (product.value.variants && product.value.variants.length > 0) {
    return [...new Set(product.value.variants.map(v => v.color).filter(Boolean))];
  }
  return [];
});

const currentVariant = computed(() => {
  if (!product.value || !product.value.variants || product.value.variants.length === 0) return null;
  return product.value.variants.find(v => {
    const sMatch = !selectedSize.value || v.size === selectedSize.value;
    const cMatch = !selectedColor.value || v.color === selectedColor.value;
    return sMatch && cMatch;
  }) || product.value.variants[0];
});

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

const currentOriginalPrice = computed(() => {
  if (currentVariant.value) return currentVariant.value.price;
  return product.value?.price || 0;
});

const currentSalePrice = computed(() => {
  if (currentVariant.value) return currentVariant.value.salePrice;
  return product.value?.salePrice;
});

const currentStock = computed(() => {
  if (currentVariant.value && currentVariant.value.stock !== undefined) {
    return currentVariant.value.stock;
  }
  return product.value?.stock || 0;
});

const getColorDotClass = (col) => {
  const c = (col || '').toLowerCase();
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

watch(() => product.value, (newVal) => {
  if (newVal) {
    selectedImage.value = newVal.images?.[0] || '';
    quantity.value = 1;
    selectedSize.value = availableSizes.value[0] || '';
    selectedColor.value = availableColors.value[0] || '';
  }
}, { immediate: true });

const addToCartAndClose = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value, currentVariant.value, selectedSize.value, selectedColor.value);
    cartStore.closeQuickView();
  }
};

const openQuoteForThisProduct = () => {
  const p = product.value;
  cartStore.closeQuickView();
  cartStore.openQuoteModal(p);
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.7rem;
}
</style>
