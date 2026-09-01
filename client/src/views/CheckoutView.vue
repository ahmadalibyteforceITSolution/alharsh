<template>
  <div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Checkout & Order Placement</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Enter your delivery address and select your preferred payment method</p>
      </div>

      <div v-if="cartStore.items.length === 0" class="bg-white rounded-3xl p-16 text-center shadow-card border border-slate-200 space-y-4 max-w-md mx-auto">
        <h3 class="text-base font-bold text-slate-800">Your cart is empty</h3>
        <p class="text-xs text-slate-500">Please add items from the catalog before checking out.</p>
        <router-link to="/shop" class="inline-block bg-brand-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl">
          Go To Catalog
        </router-link>
      </div>

      <form v-else @submit.prevent="placeOrder" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Customer Information & Delivery Address -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Contact & Personal Details Card -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
              <User class="w-4 h-4 text-brand-600" />
              <span>Customer Information</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input 
                  v-model="customer.fullName" 
                  required 
                  placeholder="e.g. Muhammad Aslam" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Mobile / Phone Number (03xx-xxxxxxx) *</label>
                <input 
                  v-model="customer.phone" 
                  required 
                  placeholder="0300-1234567" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Email Address (For Invoice Confirmation) *</label>
              <input 
                v-model="customer.email" 
                type="email" 
                required 
                placeholder="aslam.contractor@gmail.com" 
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
              />
            </div>
          </div>

          <!-- Shipping / Site Delivery Address Card -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
              <MapPin class="w-4 h-4 text-brand-600" />
              <span>Delivery & Project Location</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Province *</label>
                <select v-model="customer.province" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option>Punjab</option>
                  <option>Sindh</option>
                  <option>Khyber Pakhtunkhwa (KPK)</option>
                  <option>Balochistan</option>
                  <option>Islamabad Capital Territory</option>
                  <option>Azad Jammu & Kashmir (AJK)</option>
                  <option>Gilgit-Baltistan</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">City / Region *</label>
                <input 
                  v-model="customer.city" 
                  required 
                  placeholder="e.g. Lahore, Karachi, Rawalpindi, Faisalabad" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Complete Street Address / Plot / Site Name *</label>
              <textarea 
                v-model="customer.address" 
                rows="2" 
                required 
                placeholder="House/Plot #, Street name, Sector, Near Landmark..." 
                class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Special Order / Unloading Notes (Optional)</label>
              <input 
                v-model="customer.orderNotes" 
                placeholder="e.g. Call before dispatch, unload at commercial site gate 2..." 
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
              />
            </div>
          </div>

          <!-- Payment Method Card -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
              <CreditCard class="w-4 h-4 text-brand-600" />
              <span>Select Payment Method</span>
            </h2>

            <div class="space-y-3">
              <!-- Cash on Delivery (COD) -->
              <label class="flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer"
                :class="paymentMethod === 'COD' ? 'border-brand-600 bg-brand-50/50' : 'border-slate-200 hover:border-slate-300'">
                <input type="radio" name="payment_method" value="COD" v-model="paymentMethod" class="mt-1 text-brand-600 focus:ring-brand-500" />
                <div class="flex-1">
                  <div class="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                    <span>Cash on Delivery (COD)</span>
                    <span class="text-2xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Popular</span>
                  </div>
                  <p class="text-2xs text-slate-500 mt-0.5">Pay in cash when your goods arrive at your site or doorstep.</p>
                </div>
              </label>

              <!-- Online Mobile Wallet (JazzCash / Easypaisa) -->
              <label class="flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer"
                :class="paymentMethod === 'JazzCash' ? 'border-brand-600 bg-brand-50/50' : 'border-slate-200 hover:border-slate-300'">
                <input type="radio" name="payment_method" value="JazzCash" v-model="paymentMethod" class="mt-1 text-brand-600 focus:ring-brand-500" />
                <div class="flex-1">
                  <div class="text-xs font-extrabold text-slate-900">JazzCash / Easypaisa Wallet Transfer</div>
                  <p class="text-2xs text-slate-500 mt-0.5">Send instant payment to <strong>0302-9355294</strong> (Account: AL-HRSH Official).</p>
                </div>
              </label>

              <!-- Bank Transfer -->
              <label class="flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer"
                :class="paymentMethod === 'BankTransfer' ? 'border-brand-600 bg-brand-50/50' : 'border-slate-200 hover:border-slate-300'">
                <input type="radio" name="payment_method" value="BankTransfer" v-model="paymentMethod" class="mt-1 text-brand-600 focus:ring-brand-500" />
                <div class="flex-1">
                  <div class="text-xs font-extrabold text-slate-900">Direct Bank Transfer / IBFT</div>
                  <p class="text-2xs text-slate-500 mt-0.5">Ideal for high-ticket commercial orders. Bank details provided upon placement.</p>
                </div>
              </label>
            </div>

            <!-- Bank / JazzCash details accordion if selected -->
            <div v-if="paymentMethod === 'JazzCash' || paymentMethod === 'BankTransfer'" class="p-4 bg-brand-900 text-white rounded-2xl text-xs space-y-2">
              <div class="font-bold flex items-center space-x-1.5 text-accent-cyan">
                <Building class="w-4 h-4" />
                <span>Account Transfer Details</span>
              </div>
              <div class="space-y-1 text-2xs text-slate-300">
                <div><strong>Bank Name:</strong> Meezan Bank Ltd / Faysal Bank</div>
                <div><strong>Account Title:</strong> AL-HRSH TRADING & SUPPLIES</div>
                <div><strong>Account / IBAN:</strong> PK89MEZN0001092837461928</div>
                <div><strong>JazzCash / Easypaisa:</strong> 0302-9355294</div>
                <div class="pt-1 text-accent-cyan italic">* Please share screenshot of payment receipt on WhatsApp 0302-9355294 after placing order.</div>
              </div>
            </div>

          </div>

        </div>

        <!-- Right: Order Review & Confirmation Box -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-6 sticky top-24">
          <h2 class="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Your Order ({{ cartStore.totalItems }} Items)</h2>

          <!-- Mini Items List -->
          <div class="max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1 space-y-2">
            <div v-for="item in cartStore.items" :key="item._id" class="pt-2 flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center space-x-2.5 min-w-0">
                <img :src="item.image" :alt="item.name" class="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
                <div class="truncate">
                  <div class="font-bold text-slate-900 truncate">{{ item.name }}</div>
                  <div class="text-2xs text-slate-500">Qty: {{ item.quantity }} &times; Rs. {{ item.price.toLocaleString() }}</div>
                </div>
              </div>
              <div class="font-extrabold text-slate-900 whitespace-nowrap text-right">
                Rs. {{ (item.price * item.quantity).toLocaleString() }}
              </div>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="space-y-2.5 text-xs border-t border-slate-100 pt-4">
            <div class="flex justify-between text-slate-600">
              <span>Subtotal</span>
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

            <div class="border-t border-slate-200 pt-3 flex justify-between text-lg font-extrabold text-brand-900">
              <span>Grand Total</span>
              <span>Rs. {{ cartStore.total.toLocaleString() }}</span>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="submitting"
            class="w-full bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm py-4 rounded-2xl shadow-xl hover:shadow-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-95"
          >
            <CheckCircle class="w-5 h-5" />
            <span>{{ submitting ? 'Confirming Order in Database...' : 'Confirm & Place Order Now' }}</span>
          </button>

          <div class="text-center text-2xs text-slate-400 space-y-1">
            <p>100% Guaranteed Official Dispatch from AL-HRSH Central Hub</p>
            <p>Need urgent dispatch? Contact Helpline: <strong>0302-9355294</strong></p>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import api from '../services/api';
import confetti from 'canvas-confetti';
import { User, MapPin, CreditCard, Building, CheckCircle } from 'lucide-vue-next';

const router = useRouter();
const cartStore = useCartStore();

const customer = ref({
  fullName: '',
  phone: '',
  email: '',
  province: 'Punjab',
  city: '',
  address: '',
  orderNotes: ''
});

const paymentMethod = ref('COD');
const submitting = ref(false);

const placeOrder = async () => {
  if (cartStore.items.length === 0) return;
  submitting.value = true;

  try {
    const payload = {
      customer: customer.value,
      items: cartStore.items.map(item => ({
        product: item._id,
        name: item.name,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        image: item.image,
        subtotal: item.price * item.quantity
      })),
      subtotal: cartStore.subtotal,
      discount: cartStore.discountAmount,
      couponCode: cartStore.appliedCoupon?.code || '',
      shippingFee: cartStore.shippingFee,
      totalAmount: cartStore.total,
      paymentMethod: paymentMethod.value
    };

    // Post directly to MongoDB API
    const res = await api.post('/orders', payload);

    if (res.data.success) {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Clear cart
      const placedOrder = res.data.order;
      cartStore.clearCart();

      // Navigate to order success page
      router.push({
        name: 'order-success',
        params: { orderNumber: placedOrder.orderNumber }
      });
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to place order. Please check all required fields.');
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
