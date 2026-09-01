<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Header -->
      <div class="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div class="inline-flex items-center space-x-2 bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <Compass class="w-3.5 h-3.5" />
          <span>Real-Time Logistics Status</span>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Track Your Consignment Live</h1>
        <p class="text-xs sm:text-sm text-slate-500">Enter your Order ID (e.g. ALH-2026-1049) or customer Phone Number to check dispatch progress.</p>
      </div>

      <!-- Search Box Card -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card max-w-2xl mx-auto mb-10">
        <form @submit.prevent="trackOrder" class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
            <input 
              v-model="searchTerm" 
              required 
              placeholder="Enter Order ID or Phone (03xx-xxxxxxx)" 
              class="w-full text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none uppercase font-mono tracking-wide"
            />
            <Search class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          <button 
            type="submit" 
            :disabled="searching"
            class="bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{{ searching ? 'Searching...' : 'Track Status' }}</span>
          </button>
        </form>

        <div v-if="errorMsg" class="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center space-x-2">
          <AlertCircle class="w-4 h-4 shrink-0" />
          <span>{{ errorMsg }}</span>
        </div>
      </div>

      <!-- Live Order Tracking Results -->
      <div v-if="order" class="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 space-y-8 animate-fadeIn">
        
        <!-- Header Info -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div class="text-xs text-slate-500 font-bold uppercase">Order Reference</div>
            <h2 class="text-xl font-extrabold text-brand-900 font-mono">{{ order.orderNumber }}</h2>
            <div class="text-xs text-slate-500 mt-0.5">Placed on: {{ new Date(order.createdAt).toLocaleDateString('en-GB') }}</div>
          </div>
          <div class="text-left sm:text-right">
            <div class="text-xs text-slate-500 font-bold uppercase">Current Logistics Status</div>
            <span class="inline-block mt-1 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider"
              :class="getStatusBadgeClass(order.orderStatus)">
              {{ order.orderStatus }}
            </span>
            <div class="text-xs text-slate-500 mt-1">Courier Tracking: <strong class="text-slate-800 font-mono">{{ order.trackingNumber || 'Pending Courier Pickup' }}</strong></div>
          </div>
        </div>

        <!-- 5-Step Visual Pipeline Timeline -->
        <div class="py-4">
          <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-6">Dispatch Milestone Pipeline</h3>
          
          <div class="grid grid-cols-5 gap-2 text-center text-xs relative">
            <div 
              v-for="(step, idx) in steps" 
              :key="idx" 
              class="space-y-2 relative z-10 flex flex-col items-center"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm"
                :class="isStepComplete(step.status) 
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' 
                  : isStepActive(step.status) 
                    ? 'bg-brand-800 text-white ring-4 ring-brand-100 animate-pulse' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200'"
              >
                <Check v-if="isStepComplete(step.status)" class="w-5 h-5 stroke-[3]" />
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <div class="font-bold text-2xs sm:text-xs" :class="isStepComplete(step.status) || isStepActive(step.status) ? 'text-slate-900' : 'text-slate-400'">
                {{ step.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Event Logs -->
        <div class="space-y-4 pt-4 border-t border-slate-100">
          <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Logistics Activity Log</h3>
          <div class="space-y-4 pl-2 border-l-2 border-brand-200 ml-2 text-xs">
            <div v-for="(log, i) in order.timeline || []" :key="i" class="relative pl-6 space-y-0.5">
              <span class="w-3 h-3 bg-brand-600 rounded-full absolute -left-[1.6rem] top-1 ring-4 ring-brand-100"></span>
              <div class="font-bold text-slate-900">{{ log.title || log.status }}</div>
              <div class="text-slate-600">{{ log.description }}</div>
              <div class="text-2xs text-slate-400 font-mono">{{ new Date(log.timestamp).toLocaleString('en-GB') }}</div>
            </div>
          </div>
        </div>

        <!-- Customer Support Box -->
        <div class="p-4 bg-brand-50 rounded-2xl border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div class="flex items-center space-x-3">
            <Headphones class="w-6 h-6 text-brand-700 shrink-0" />
            <div>
              <div class="font-bold text-brand-950">Have questions regarding your shipment?</div>
              <div class="text-slate-600">Our operations team is available 24/7 at <strong>0302-9355294</strong>.</div>
            </div>
          </div>
          <a 
            :href="`https://wa.me/923029355294?text=Hello%20AL-HRSH,%20I%20want%20to%20check%20the%20status%20of%20my%20order%20${order.orderNumber}`" 
            target="_blank"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl shrink-0 transition-colors shadow-sm"
          >
            WhatsApp Support
          </a>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { Compass, Search, AlertCircle, Check, Headphones } from 'lucide-vue-next';

const route = useRoute();
const searchTerm = ref('');
const order = ref(null);
const searching = ref(false);
const errorMsg = ref('');

const steps = [
  { status: 'Pending', label: 'Order Received' },
  { status: 'Confirmed', label: 'Verified' },
  { status: 'Processing', label: 'Packed in Hub' },
  { status: 'Dispatched', label: 'Dispatched / In Transit' },
  { status: 'Delivered', label: 'Delivered' }
];

const statusOrder = ['Pending', 'Confirmed', 'Processing', 'Dispatched', 'Delivered'];

const isStepComplete = (status) => {
  if (!order.value) return false;
  const currentIdx = statusOrder.indexOf(order.value.orderStatus);
  const stepIdx = statusOrder.indexOf(status);
  return currentIdx > stepIdx;
};

const isStepActive = (status) => {
  if (!order.value) return false;
  return order.value.orderStatus === status;
};

const getStatusBadgeClass = (status) => {
  if (status === 'Delivered') return 'bg-emerald-100 text-emerald-800';
  if (status === 'Dispatched' || status === 'Processing') return 'bg-blue-100 text-blue-800';
  if (status === 'Confirmed') return 'bg-purple-100 text-purple-800';
  if (status === 'Cancelled') return 'bg-rose-100 text-rose-800';
  return 'bg-amber-100 text-amber-800';
};

const trackOrder = async () => {
  if (!searchTerm.value.trim()) return;
  searching.value = true;
  errorMsg.value = '';
  order.value = null;

  try {
    const res = await api.get(`/orders/track/${encodeURIComponent(searchTerm.value.trim())}`);
    if (res.data.success) {
      order.value = res.data.order;
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'No matching order found. Please verify the Order Number or Phone.';
  } finally {
    searching.value = false;
  }
};

onMounted(() => {
  if (route.query.orderNumber) {
    searchTerm.value = route.query.orderNumber;
    trackOrder();
  }
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
