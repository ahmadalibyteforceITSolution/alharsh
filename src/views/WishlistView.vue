<template>
  <div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Your Wishlist</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Saved products for your upcoming renovation or contracting orders</p>
      </div>

      <div v-if="wishlistStore.items.length === 0" class="bg-white rounded-3xl p-16 text-center shadow-card border border-slate-200 space-y-4 max-w-md mx-auto">
        <div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart class="w-7 h-7" />
        </div>
        <h3 class="text-base font-bold text-slate-800">Your wishlist is empty</h3>
        <p class="text-xs text-slate-500">Click the heart icon on any product in the catalog to save it for later.</p>
        <router-link to="/shop" class="inline-block bg-brand-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl">
          Explore Products
        </router-link>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="item in wishlistStore.items" :key="item._id" class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
          <div class="aspect-square bg-slate-50 relative overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            <button @click="wishlistStore.toggleWishlist(item)" class="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-500 hover:scale-110 transition-transform">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <div class="p-4 space-y-3">
            <div>
              <span class="text-2xs text-brand-700 font-bold uppercase">{{ item.category }}</span>
              <router-link :to="`/product/${item.slug || item._id}`" class="block text-xs font-bold text-slate-900 hover:text-brand-800 line-clamp-2 mt-0.5">
                {{ item.name }}
              </router-link>
              <div class="text-sm font-extrabold text-brand-900 mt-1">Rs. {{ (item.salePrice || item.price).toLocaleString() }}</div>
            </div>
            <button @click="addToCartFromWishlist(item)" class="w-full bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center space-x-1">
              <ShoppingCart class="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '../stores/wishlist';
import { useCartStore } from '../stores/cart';
import { Heart, Trash2, ShoppingCart } from 'lucide-vue-next';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const addToCartFromWishlist = (item) => {
  cartStore.addItem(item, 1);
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
