<template>
  <div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Your Shopping Cart</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Review your selected sanitary, electrical, and hardware supplies</p>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cartStore.items.length === 0" class="bg-white rounded-3xl p-16 text-center shadow-card border border-slate-200 space-y-4 max-w-lg mx-auto">
        <div class="w-16 h-16 bg-brand-50 text-brand-700 rounded-full flex items-center justify-center mx-auto">
          <ShoppingCart class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-slate-900">Your cart is currently empty</h3>
        <p class="text-xs text-slate-500">Discover our certified range of Popular PPRC pipes, Fast Cables, and heavy tools.</p>
        <router-link to="/shop" class="inline-block bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold px-8 py-3 rounded-xl shadow-md transition-colors">
          Browse Product Catalog
        </router-link>
      </div>

      <!-- Cart Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Cart Items Table -->
        <div class="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-card p-6 overflow-hidden space-y-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead>
                <tr class="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-extrabold pb-3">
                  <th class="pb-3 font-extrabold">Product</th>
                  <th class="pb-3 text-center">Unit Price</th>
                  <th class="pb-3 text-center">Quantity</th>
                  <th class="pb-3 text-right">Subtotal</th>
                  <th class="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="item in cartStore.items" :key="item._id" class="hover:bg-slate-50/50">
                  <!-- Product Image & Title -->
                  <td class="py-4 pr-4">
                    <div class="flex items-center space-x-3">
                      <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                      <div>
                        <span class="text-2xs font-bold text-brand-700 uppercase">{{ item.category }}</span>
                        <router-link :to="`/product/${item._id}`" class="block font-bold text-slate-900 hover:text-brand-800 line-clamp-2">
                          {{ item.name }}
                        </router-link>
                        <span class="text-2xs text-slate-400">SKU: {{ item.sku }}</span>
                      </div>
                    </div>
                  </td>

                  <!-- Price -->
                  <td class="py-4 px-2 text-center font-bold text-slate-800 whitespace-nowrap">
                    Rs. {{ item.price.toLocaleString() }}
                    <span class="text-2xs block font-normal text-slate-400">/ {{ item.unit }}</span>
                  </td>

                  <!-- Stepper -->
                  <td class="py-4 px-2 text-center">
                    <div class="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                      <button @click="cartStore.updateQuantity(item._id, item.quantity - 1)" class="px-2 py-1 text-slate-600 hover:bg-slate-200 font-bold">-</button>
                      <span class="px-3 py-1 font-bold text-slate-800 text-xs">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item._id, item.quantity + 1)" class="px-2 py-1 text-slate-600 hover:bg-slate-200 font-bold">+</button>
                    </div>
                  </td>

                  <!-- Subtotal -->
                  <td class="py-4 px-2 text-right font-extrabold text-brand-900 text-sm whitespace-nowrap">
                    Rs. {{ (item.price * item.quantity).toLocaleString() }}
                  </td>

                  <!-- Delete -->
                  <td class="py-4 pl-2 text-right">
                    <button @click="cartStore.removeItem(item._id)" class="text-slate-400 hover:text-rose-600 p-1.5 transition-colors" title="Remove">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
            <router-link to="/shop" class="text-xs font-bold text-brand-800 hover:underline flex items-center space-x-1">
              <span>&larr; Continue Shopping Catalog</span>
            </router-link>
            <button @click="cartStore.clearCart" class="text-xs text-rose-600 hover:underline font-semibold">
              Clear All Items
            </button>
          </div>
        </div>

        <!-- Order Summary & Checkout Card -->
        <div class="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-6">
          <h2 class="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h2>

          <!-- Promo Code Form -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700">Promo Discount Code</label>
            <div class="flex gap-2">
              <input 
                v-model="couponCode" 
                placeholder="e.g. WELCOME10" 
                class="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2.5 uppercase tracking-wide focus:ring-2 focus:ring-brand-500 focus:outline-none" 
              />
              <button 
                @click="applyCoupon" 
                :disabled="applying"
                class="bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50"
              >
                Apply
              </button>
            </div>
            <div v-if="couponMsg" :class="couponOk ? 'text-emerald-600' : 'text-rose-600'" class="text-2xs font-semibold">
              {{ couponMsg }}
            </div>
            <div class="text-2xs text-slate-400 flex gap-2">
              <span>Try: <strong>WELCOME10</strong></span>
              <span>&bull;</span>
              <span><strong>BULK500</strong></span>
            </div>
          </div>

          <!-- Cost Breakdown -->
          <div class="space-y-3 text-xs border-t border-slate-100 pt-4">
            <div class="flex justify-between text-slate-600">
              <span>Cart Subtotal</span>
              <span class="font-bold text-slate-900">Rs. {{ cartStore.subtotal.toLocaleString() }}</span>
            </div>

            <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-emerald-600 font-bold">
              <span>Promo Discount ({{ cartStore.appliedCoupon?.code }})</span>
              <span>- Rs. {{ cartStore.discountAmount.toLocaleString() }}</span>
            </div>

            <div class="flex justify-between text-slate-600">
              <span>Freight / Shipping</span>
              <span v-if="cartStore.shippingFee === 0" class="text-emerald-600 font-bold">Free Nationwide</span>
              <span v-else class="font-bold">Rs. {{ cartStore.shippingFee }}</span>
            </div>

            <div class="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-brand-900">
              <span>Grand Total</span>
              <span>Rs. {{ cartStore.total.toLocaleString() }}</span>
            </div>
          </div>

          <router-link 
            to="/checkout" 
            class="w-full text-center bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-4 rounded-2xl shadow-lg hover:shadow-glow transition-all block active:scale-95"
          >
            Proceed to Secure Checkout &rarr;
          </router-link>

          <div class="text-center text-2xs text-slate-400 space-y-1">
            <p>Cash on Delivery (COD), JazzCash, Easypaisa & Bank Transfer accepted</p>
            <p>Questions? Call helpline: <strong class="text-slate-700">0302-9355294</strong></p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { ShoppingCart, Trash2 } from 'lucide-vue-next';

const cartStore = useCartStore();
const couponCode = ref('');
const couponMsg = ref('');
const couponOk = ref(false);
const applying = ref(false);

const applyCoupon = async () => {
  if (!couponCode.value.trim()) return;
  applying.value = true;
  couponMsg.value = '';
  const result = await cartStore.applyCoupon(couponCode.value.trim());
  applying.value = false;
  couponOk.value = result.success;
  couponMsg.value = result.message;
  if (result.success) couponCode.value = '';
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
