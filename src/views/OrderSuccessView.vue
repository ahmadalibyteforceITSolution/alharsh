<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      
      <div v-if="loading" class="py-20 text-center space-y-3">
        <div class="w-10 h-10 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin mx-auto"></div>
        <p class="text-xs text-slate-500">Retrieving official invoice from MongoDB...</p>
      </div>

      <div v-else-if="!order" class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-card space-y-4">
        <h2 class="text-lg font-bold text-slate-800">Order Record Not Found</h2>
        <router-link to="/" class="inline-block bg-brand-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl">
          Return to Home
        </router-link>
      </div>

      <!-- Printable Order Confirmation Invoice -->
      <div v-else class="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        
        <!-- Top Status Banner -->
        <div class="bg-gradient-to-r from-brand-900 via-brand-800 to-navy-950 text-white p-8 text-center space-y-2">
          <div class="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
            <Check class="w-8 h-8 stroke-[3]" />
          </div>
          <h1 class="text-2xl font-extrabold tracking-tight">Order Confirmed Successfully!</h1>
          <p class="text-xs text-slate-200">Thank you for your business. Your order has been registered in the AL-HRSH database.</p>
          <div class="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold mt-2">
            Order Reference: {{ order.orderNumber }}
          </div>
        </div>

        <!-- Invoice Details Content -->
        <div class="p-6 sm:p-8 space-y-6">
          
          <!-- Summary Header Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span class="text-slate-400 block text-2xs uppercase font-bold">Order Date</span>
              <strong class="text-slate-800">{{ new Date(order.createdAt).toLocaleDateString('en-GB') }}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-2xs uppercase font-bold">Payment Method</span>
              <strong class="text-slate-800">{{ order.paymentMethod }}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-2xs uppercase font-bold">Order Status</span>
              <span class="inline-block bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-2xs">
                {{ order.orderStatus }}
              </span>
            </div>
            <div>
              <span class="text-slate-400 block text-2xs uppercase font-bold">Tracking Code</span>
              <strong class="text-brand-800 font-mono">{{ order.trackingNumber || 'Pending' }}</strong>
            </div>
          </div>

          <!-- Customer & Delivery Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-slate-100 pb-6">
            <div class="space-y-1">
              <h3 class="font-extrabold text-slate-900 uppercase tracking-wider text-2xs text-brand-700">Customer Details</h3>
              <div class="font-bold text-slate-800 text-sm">{{ order.customer?.fullName }}</div>
              <div class="text-slate-600">Phone: <strong>{{ order.customer?.phone }}</strong></div>
              <div class="text-slate-600">Email: {{ order.customer?.email }}</div>
            </div>
            <div class="space-y-1">
              <h3 class="font-extrabold text-slate-900 uppercase tracking-wider text-2xs text-brand-700">Delivery Address</h3>
              <div class="text-slate-800 font-medium">{{ order.customer?.address }}</div>
              <div class="text-slate-600">{{ order.customer?.city }}, {{ order.customer?.province }}</div>
              <div v-if="order.customer?.orderNotes" class="text-2xs text-amber-700 italic pt-1">
                Note: {{ order.customer?.orderNotes }}
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="space-y-3">
            <h3 class="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Ordered Items</h3>
            <div class="divide-y divide-slate-100 text-xs">
              <div v-for="(item, idx) in order.items" :key="idx" class="py-3 flex items-center justify-between gap-4">
                <div class="flex items-center space-x-3">
                  <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-xl border border-slate-200" />
                  <div>
                    <div class="font-bold text-slate-900">{{ item.name }}</div>
                    <div class="text-2xs text-slate-500">Qty: {{ item.quantity }} &times; Rs. {{ item.price.toLocaleString() }} / {{ item.unit }}</div>
                  </div>
                </div>
                <div class="font-extrabold text-slate-900">
                  Rs. {{ (item.price * item.quantity).toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          <!-- Total Calculation Summary -->
          <div class="border-t border-slate-200 pt-4 space-y-2 text-xs max-w-xs ml-auto">
            <div class="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span class="font-bold text-slate-900">Rs. {{ order.subtotal.toLocaleString() }}</span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between text-emerald-600 font-bold">
              <span>Promo Discount ({{ order.couponCode }})</span>
              <span>- Rs. {{ order.discount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Shipping Freight</span>
              <span v-if="order.shippingFee === 0" class="text-emerald-600 font-bold">Free</span>
              <span v-else class="font-bold">Rs. {{ order.shippingFee }}</span>
            </div>
            <div class="border-t border-slate-200 pt-2 flex justify-between text-base font-extrabold text-brand-900">
              <span>Grand Total</span>
              <span>Rs. {{ order.totalAmount.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button 
              @click="printInvoice" 
              class="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Printer class="w-4 h-4" />
              <span>Print Official Invoice</span>
            </button>

            <div class="flex items-center space-x-3 w-full sm:w-auto">
              <router-link 
                :to="`/track?orderNumber=${order.orderNumber}`" 
                class="w-full sm:w-auto text-center border border-brand-800 text-brand-800 font-bold text-xs px-5 py-3 rounded-xl hover:bg-brand-50 transition-colors"
              >
                Track Live Status
              </router-link>
              <router-link 
                to="/shop" 
                class="w-full sm:w-auto text-center bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors"
              >
                Continue Shopping
              </router-link>
            </div>
          </div>

          <!-- Urgent Assistance -->
          <div class="bg-brand-50 p-4 rounded-2xl border border-brand-100 text-center text-xs text-slate-600">
            Need changes to this order or urgent delivery? Call helpline directly: <strong class="text-brand-900 font-bold">0302-9355294</strong>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { Check, Printer } from 'lucide-vue-next';

const route = useRoute();
const order = ref(null);
const loading = ref(true);

const loadOrder = async () => {
  const orderNumber = route.params.orderNumber;
  try {
    const res = await api.get(`/orders/${orderNumber}`);
    if (res.data.success) {
      order.value = res.data.order;
    }
  } catch (err) {
    console.error('Invoice error:', err);
  } finally {
    loading.value = false;
  }
};

const printInvoice = () => {
  window.print();
};

onMounted(() => {
  loadOrder();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
@media print {
  body {
    background: white;
  }
  header, footer, .fixed, button {
    display: none !important;
  }
}
</style>
