<template>
  <div class="group bg-white rounded-2xl border border-slate-200/90 hover:border-brand-500 hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative">
    
    <!-- Badges (Sale, New, Best Seller) -->
    <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
      <span v-if="product.salePrice && product.salePrice < product.price" class="bg-rose-600 text-white text-2xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
        Save {{ Math.round(((product.price - product.salePrice) / product.price) * 100) }}%
      </span>
      <span v-if="product.bestSeller" class="bg-amber-500 text-slate-950 text-2xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
        Best Seller
      </span>
      <span v-else-if="product.isNewArrival" class="bg-emerald-600 text-white text-2xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
        New Arrival
      </span>
    </div>

    <!-- Wishlist Button -->
    <button 
      @click.stop="wishlistStore.toggleWishlist(product)"
      class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 transition-all shadow-sm"
      :class="{ '!text-rose-500 !border-rose-200 bg-rose-50': wishlistStore.isInWishlist(product._id) }"
      title="Add to Wishlist"
    >
      <Heart class="w-4 h-4" :fill="wishlistStore.isInWishlist(product._id) ? 'currentColor' : 'none'" />
    </button>

    <!-- Product Image with Hover Zoom -->
    <router-link :to="`/product/${product.slug || product._id}`" class="block aspect-square w-full bg-slate-50 overflow-hidden relative group/img">
      <img 
        :src="product.images?.[0] || '/images/placeholder.svg'" 
        :alt="product.name" 
        @error="onImgError"
        class="w-full h-full object-cover object-center group-hover/img:scale-108 transition-transform duration-500" 
      />
      <!-- Quick View Hover Overlay Button -->
      <button 
        @click.prevent="cartStore.openQuickView(product)"
        class="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-navy-950/80 hover:bg-navy-950 text-white text-2xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center space-x-1 whitespace-nowrap shadow-md"
      >
        <Eye class="w-3.5 h-3.5" />
        <span>Quick View</span>
      </button>
    </router-link>

    <!-- Product Details -->
    <div class="p-4 flex flex-col flex-1 justify-between">
      <div>
        <!-- Category & Brand Header -->
        <div class="flex items-center justify-between text-2xs text-slate-500 mb-1">
          <span class="font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">{{ product.category }}</span>
          <span class="truncate max-w-[120px] font-semibold text-slate-600">{{ product.brand }}</span>
        </div>

        <!-- Title -->
        <router-link :to="`/product/${product.slug || product._id}`" class="block">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-800 transition-colors line-clamp-2 min-h-[38px]">
            {{ product.name }}
          </h3>
        </router-link>

        <!-- Technical Specification Snippet -->
        <div v-if="product.specifications && product.specifications.length > 0" class="mt-2 text-2xs text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-100 flex items-center space-x-1 truncate">
          <Sliders class="w-3 h-3 text-brand-600 shrink-0" />
          <span class="truncate"><strong>{{ product.specifications[0].label }}:</strong> {{ product.specifications[0].value }}</span>
        </div>

        <!-- Rating & Reviews -->
        <div class="flex items-center space-x-1.5 mt-2 text-2xs text-slate-500">
          <div class="flex items-center text-amber-400">
            <Star class="w-3.5 h-3.5 fill-current" />
          </div>
          <span class="font-bold text-slate-800">{{ product.rating || '4.9' }}</span>
          <span>({{ product.reviewsCount || '12' }})</span>
          <span class="text-slate-300">&bull;</span>
          <span :class="product.stock > 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'">
            {{ product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock' }}
          </span>
        </div>
      </div>

      <!-- Pricing & Add to Cart -->
      <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div class="text-sm sm:text-base font-extrabold text-brand-900 leading-none">
            Rs. {{ (product.salePrice || product.price).toLocaleString() }}
          </div>
          <div v-if="product.salePrice && product.salePrice < product.price" class="text-2xs text-slate-400 line-through mt-0.5">
            Rs. {{ product.price.toLocaleString() }}
          </div>
          <div v-else class="text-2xs text-slate-400 mt-0.5">
            Per {{ product.unit || 'Piece' }}
          </div>
        </div>

        <!-- Add to Cart Action Button -->
        <button 
          @click="cartStore.addItem(product, 1)"
          class="bg-brand-800 hover:bg-brand-700 active:scale-95 text-white p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-sm shrink-0"
          :disabled="product.stock <= 0"
          :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
        >
          <ShoppingCart class="w-4 h-4" />
          <span class="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart';
import { useWishlistStore } from '../../stores/wishlist';
import { Heart, Eye, ShoppingCart, Star, Sliders } from 'lucide-vue-next';

defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const onImgError = (e) => {
  e.target.src = '/images/placeholder.svg';
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
.scale-108 {
  transform: scale(1.06);
}
</style>
