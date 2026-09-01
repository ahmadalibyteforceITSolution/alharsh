<template>
  <div class="p-6 sm:p-10 space-y-6">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Customer Orders & Logistics</h1>
        <p class="text-xs text-slate-400 mt-1">Review customer orders, update dispatch milestones, and assign tracking numbers</p>
      </div>
      <div class="flex items-center space-x-2 text-xs">
        <button 
          v-for="st in ['All', 'Pending', 'Confirmed', 'Processing', 'Dispatched', 'Delivered']" 
          :key="st"
          @click="filterStatus = st; fetchOrders()"
          class="px-3 py-1.5 rounded-xl font-bold transition-colors"
          :class="filterStatus === st ? 'bg-brand-600 text-white' : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'"
        >
          {{ st }}
        </button>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-navy-950 rounded-3xl border border-navy-800 overflow-hidden shadow-card">
      <div v-if="adminStore.loading" class="py-20 text-center space-y-3">
        <div class="w-10 h-10 border-4 border-brand-400 border-t-brand-700 rounded-full animate-spin mx-auto"></div>
        <p class="text-xs text-slate-400 font-medium">Fetching orders from MongoDB...</p>
      </div>

      <div v-else-if="adminStore.orders.length === 0" class="py-16 text-center text-xs text-slate-400">
        No orders found in MongoDB.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead>
            <tr class="text-slate-400 uppercase tracking-wider text-2xs bg-navy-900 border-b border-navy-800">
              <th class="p-4">Order ID & Date</th>
              <th class="p-4">Customer & City</th>
              <th class="p-4">Items Summary</th>
              <th class="p-4 text-right">Total Amount</th>
              <th class="p-4 text-center">Status</th>
              <th class="p-4 text-right">Manage</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy-800/60">
            <tr v-for="order in adminStore.orders" :key="order._id" class="hover:bg-navy-900/50">
              <td class="p-4">
                <div class="font-mono font-bold text-white text-sm">{{ order.orderNumber }}</div>
                <div class="text-2xs text-slate-400">{{ new Date(order.createdAt).toLocaleString('en-GB') }}</div>
                <div class="text-2xs text-brand-400 font-mono">Trk: {{ order.trackingNumber || 'N/A' }}</div>
              </td>

              <td class="p-4">
                <div class="font-bold text-white">{{ order.customer?.fullName }}</div>
                <div class="text-2xs text-slate-400">{{ order.customer?.phone }}</div>
                <div class="text-2xs text-slate-300 font-semibold">{{ order.customer?.city }}, {{ order.customer?.province }}</div>
              </td>

              <td class="p-4">
                <div class="text-white font-medium">{{ order.items?.length }} Items</div>
                <div class="text-2xs text-slate-400 truncate max-w-xs">
                  {{ order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') }}
                </div>
              </td>

              <td class="p-4 text-right">
                <div class="font-bold text-white text-sm">Rs. {{ order.totalAmount?.toLocaleString() }}</div>
                <div class="text-2xs text-emerald-400 font-bold uppercase">{{ order.paymentMethod }} &bull; {{ order.paymentStatus }}</div>
              </td>

              <td class="p-4 text-center">
                <span class="text-2xs font-extrabold px-3 py-1 rounded-full uppercase"
                  :class="getStatusBadgeClass(order.orderStatus)">
                  {{ order.orderStatus }}
                </span>
              </td>

              <td class="p-4 text-right">
                <button @click="openOrderModal(order)" class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow transition-colors">
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Update Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div @click="selectedOrder = null" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
          
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="text-base font-extrabold text-white">Order {{ selectedOrder.orderNumber }} Details</h2>
              <p class="text-xs text-slate-400">{{ selectedOrder.customer?.fullName }} &bull; {{ selectedOrder.customer?.phone }}</p>
            </div>
            <button @click="selectedOrder = null" class="p-1 text-slate-400 hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-300 mb-1">Update Order Status</label>
                <select v-model="updateForm.orderStatus" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing / Packed</option>
                  <option value="Dispatched">Dispatched / In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-300 mb-1">Payment Status</label>
                <select v-model="updateForm.paymentStatus" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-300 mb-1">Courier Tracking Code (TCS / Leopard / Daewoo)</label>
              <input v-model="updateForm.trackingNumber" placeholder="e.g. TCS-99881122" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl uppercase font-mono focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-300 mb-1">Operational Activity Note</label>
              <input v-model="updateForm.note" placeholder="e.g. Consignment loaded onto heavy freight truck" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>

            <!-- Items summary -->
            <div class="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div class="font-bold text-slate-300">Items in this consignment:</div>
              <div class="space-y-1 max-h-36 overflow-y-auto">
                <div v-for="(it, i) in selectedOrder.items" :key="i" class="flex justify-between text-2xs text-slate-300">
                  <span>{{ it.quantity }}x {{ it.name }}</span>
                  <span class="font-bold">Rs. {{ (it.price * it.quantity).toLocaleString() }}</span>
                </div>
              </div>
              <div class="border-t border-slate-700 pt-2 flex justify-between font-bold text-xs text-white">
                <span>Total Amount:</span>
                <span>Rs. {{ selectedOrder.totalAmount?.toLocaleString() }}</span>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-2">
              <button type="button" @click="selectedOrder = null" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold">Close</button>
              <button type="button" @click="saveOrderStatus" :disabled="updating" class="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg disabled:opacity-50">
                {{ updating ? 'Updating MongoDB...' : 'Save Order Changes' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { X } from 'lucide-vue-next';

const adminStore = useAdminStore();
const filterStatus = ref('All');
const selectedOrder = ref(null);
const updating = ref(false);

const updateForm = ref({
  orderStatus: 'Pending',
  paymentStatus: 'Pending',
  trackingNumber: '',
  note: ''
});

const getStatusBadgeClass = (status) => {
  if (status === 'Delivered') return 'bg-emerald-950 text-emerald-400';
  if (status === 'Dispatched' || status === 'Processing') return 'bg-blue-950 text-blue-400';
  if (status === 'Confirmed') return 'bg-purple-950 text-purple-400';
  if (status === 'Cancelled') return 'bg-rose-950 text-rose-400';
  return 'bg-amber-950 text-amber-400';
};

const fetchOrders = () => {
  adminStore.fetchOrders(filterStatus.value === 'All' ? '' : filterStatus.value);
};

const openOrderModal = (order) => {
  selectedOrder.value = order;
  updateForm.value = {
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
    trackingNumber: order.trackingNumber || '',
    note: ''
  };
};

const saveOrderStatus = async () => {
  if (!selectedOrder.value) return;
  updating.value = true;
  await adminStore.updateOrderStatus(selectedOrder.value._id, updateForm.value);
  updating.value = false;
  selectedOrder.value = null;
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
