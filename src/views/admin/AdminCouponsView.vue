<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Promo Discount Coupons</h1>
        <p class="text-xs text-slate-400 mt-1">Create and manage coupon codes active in checkout</p>
      </div>
      <button @click="openAddCoupon" class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5">
        <Plus class="w-4 h-4" />
        <span>Create Coupon</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="coupon in adminStore.coupons" :key="coupon._id" class="bg-navy-950 rounded-3xl border border-navy-800 p-6 space-y-4 shadow-card flex flex-col justify-between">
        <div class="flex items-center justify-between border-b border-navy-800 pb-3">
          <span class="font-mono font-extrabold text-base text-accent-cyan tracking-wider">{{ coupon.code }}</span>
          <span class="text-2xs bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase">Active</span>
        </div>
        <div class="space-y-1 text-xs">
          <div class="text-white font-bold">
            {{ coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `Rs. ${coupon.discountValue} OFF` }}
          </div>
          <div class="text-slate-400">Min Order: Rs. {{ coupon.minOrderAmount?.toLocaleString() || 0 }}</div>
          <div v-if="coupon.maxDiscount" class="text-slate-400">Max Discount: Rs. {{ coupon.maxDiscount.toLocaleString() }}</div>
        </div>
        <div class="pt-2 border-t border-navy-800 text-right">
          <button @click="deleteCoupon(coupon._id)" class="text-rose-400 hover:text-rose-300 font-bold text-2xs">
            Delete Coupon
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div @click="isModalOpen = false" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-white">
          <h3 class="font-bold text-sm text-white">Create Promo Coupon</h3>
          <input v-model="form.code" placeholder="Code (e.g. SPECIAL15)" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs uppercase font-mono" />
          <div class="grid grid-cols-2 gap-3">
            <select v-model="form.discountType" class="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs">
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed PKR (Rs.)</option>
            </select>
            <input v-model.number="form.discountValue" type="number" placeholder="Value (e.g. 15)" class="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs" />
          </div>
          <input v-model.number="form.minOrderAmount" type="number" placeholder="Min Order Amount (PKR)" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs" />
          <div class="flex justify-end space-x-2 pt-2">
            <button @click="isModalOpen = false" class="px-4 py-2 text-xs text-slate-400">Cancel</button>
            <button @click="saveCoupon" class="bg-brand-600 text-white font-bold px-5 py-2 rounded-xl text-xs">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { Plus } from 'lucide-vue-next';

const adminStore = useAdminStore();
const isModalOpen = ref(false);
const form = ref({
  code: '',
  discountType: 'percentage',
  discountValue: 10,
  minOrderAmount: 2000,
  maxDiscount: 1500
});

const openAddCoupon = () => {
  form.value = { code: '', discountType: 'percentage', discountValue: 10, minOrderAmount: 2000, maxDiscount: 1500 };
  isModalOpen.value = true;
};

const saveCoupon = async () => {
  await adminStore.createCoupon(form.value);
  isModalOpen.value = false;
};

const deleteCoupon = async (id) => {
  if (confirm('Delete this coupon?')) {
    await adminStore.deleteCoupon(id);
  }
};

onMounted(() => {
  adminStore.fetchCoupons();
});
</script>
