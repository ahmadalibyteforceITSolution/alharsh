<template>
  <div>
    <!-- Backdrop -->
    <div 
      v-if="cartStore.isDrawerOpen" 
      @click="cartStore.isDrawerOpen = false"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
    ></div>

    <!-- Slide-over Drawer -->
    <div 
      class="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="cartStore.isDrawerOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Header -->
      <div class="p-4 border-b border-slate-200 flex items-center justify-between bg-brand-900 text-white">
        <div class="flex items-center space-x-2">
          <ShoppingCart class="w-5 h-5 text-brand-300" />
          <h3 class="font-bold text-base">Your Cart ({{ cartStore.totalItems }})</h3>
        </div>
        <button @click="cartStore.isDrawerOpen = false" class="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <X class="w-5 h-5 text-white" />
        </button>
      </div>

      <!-- Free Shipping Progress Tracker -->
      <div class="bg-brand-50 p-3 border-b border-brand-100 text-xs">
        <div v-if="cartStore.subtotal >= 15000" class="text-emerald-700 font-semibold flex items-center space-x-1.5">
          <CheckCircle class="w-4 h-4 text-emerald-600 shrink-0" />
          <span>🎉 Congratulations! You have unlocked Free Shipping across Pakistan!</span>
        </div>
        <div v-else class="text-slate-600 space-y-1">
          <div class="flex justify-between">
            <span>Add <strong class="text-brand-800">Rs. {{ (15000 - cartStore.subtotal).toLocaleString() }}</strong> more for Free Shipping</span>
            <span class="font-bold text-brand-800">{{ Math.min(100, Math.round((cartStore.subtotal / 15000) * 100)) }}%</span>
          </div>
          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div class="bg-brand-600 h-full rounded-full transition-all duration-300" :style="{ width: `${Math.min(100, (cartStore.subtotal / 15000) * 100)}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
        <div v-if="cartStore.items.length === 0" class="py-16 text-center text-slate-500 space-y-3">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <ShoppingCart class="w-8 h-8" />
          </div>
          <p class="text-sm font-medium">Your shopping cart is empty</p>
          <router-link 
            to="/shop" 
            @click="cartStore.isDrawerOpen = false" 
            class="inline-block bg-brand-800 hover:bg-brand-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Start Shopping Catalog
          </router-link>
        </div>

        <div v-for="item in cartStore.items" :key="item.cartItemId || item._id" class="py-4 flex gap-3">
          <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-800 line-clamp-2">{{ item.name }}</h4>
            
            <!-- Variant Attributes (Size & Color) -->
            <div v-if="item.size || item.color || item.variantTitle" class="flex flex-wrap gap-1.5 mt-1">
              <span v-if="item.size" class="inline-flex items-center bg-brand-50 text-brand-800 border border-brand-200/60 px-1.5 py-0.5 rounded text-2xs font-bold">
                Size: {{ item.size }}
              </span>
              <span v-if="item.color" class="inline-flex items-center bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded text-2xs font-semibold">
                Color: {{ item.color }}
              </span>
            </div>

            <div class="text-2xs text-slate-500 mt-0.5">{{ item.category }} &bull; Per {{ item.unit }}</div>
            <div class="flex items-center justify-between mt-2">
              <div class="text-xs font-extrabold text-brand-900">
                Rs. {{ (item.price * item.quantity).toLocaleString() }}
                <span class="text-2xs font-normal text-slate-500">(@ Rs. {{ item.price.toLocaleString() }})</span>
              </div>
              
              <!-- Quantity Stepper -->
              <div class="flex items-center border border-slate-300 rounded-md overflow-hidden">
                <button @click="cartStore.updateQuantity(item.cartItemId || item._id, item.quantity - 1)" class="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs">-</button>
                <span class="px-2 py-0.5 text-xs font-semibold text-slate-800 bg-slate-50 min-w-6 text-center">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.cartItemId || item._id, item.quantity + 1)" class="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs">+</button>
              </div>
            </div>
          </div>
          <button @click="cartStore.removeItem(item.cartItemId || item._id)" class="text-slate-400 hover:text-rose-500 p-1 self-start transition-colors" title="Remove">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Footer Checkout Summary -->
      <div v-if="cartStore.items.length > 0" class="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
        <!-- Promo Coupon Row -->
        <div class="flex gap-2">
          <input 
            v-model="couponCode" 
            placeholder="Promo code (e.g. WELCOME10)" 
            class="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button 
            @click="applyCoupon"
            :disabled="applyingCoupon"
            class="bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Apply
          </button>
        </div>
        <div v-if="couponMessage" :class="couponSuccess ? 'text-emerald-600' : 'text-rose-600'" class="text-2xs font-medium">
          {{ couponMessage }}
        </div>

        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span class="font-semibold text-slate-900">Rs. {{ cartStore.subtotal.toLocaleString() }}</span>
          </div>
          <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-emerald-600 font-semibold">
            <span>Discount ({{ cartStore.appliedCoupon?.code }})</span>
            <span>- Rs. {{ cartStore.discountAmount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span v-if="cartStore.shippingFee === 0" class="text-emerald-600 font-semibold">Free</span>
            <span v-else class="font-semibold">Rs. {{ cartStore.shippingFee }}</span>
          </div>
          <div class="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-brand-900">
            <span>Total Payable</span>
            <span>Rs. {{ cartStore.total.toLocaleString() }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-1">
          <router-link 
            to="/cart" 
            @click="cartStore.isDrawerOpen = false"
            class="w-full text-center border border-brand-800 text-brand-800 hover:bg-brand-50 py-2.5 rounded-xl font-bold text-xs transition-colors"
          >
            View Cart
          </router-link>
          <router-link 
            to="/checkout" 
            @click="cartStore.isDrawerOpen = false"
            class="w-full text-center bg-brand-800 hover:bg-brand-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors"
          >
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../../stores/cart';
import { ShoppingCart, X, Trash2, CheckCircle } from 'lucide-vue-next';

const cartStore = useCartStore();
const couponCode = ref('');
const couponMessage = ref('');
const couponSuccess = ref(false);
const applyingCoupon = ref(false);

const applyCoupon = async () => {
  if (!couponCode.value.trim()) return;
  applyingCoupon.value = true;
  couponMessage.value = '';
  const result = await cartStore.applyCoupon(couponCode.value.trim());
  applyingCoupon.value = false;
  couponSuccess.value = result.success;
  couponMessage.value = result.message;
  if (result.success) {
    couponCode.value = '';
  }
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
