<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <div @click="closeModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>

    <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-slate-200">
        
        <!-- Header -->
        <div class="bg-navy-950 text-white p-5 flex items-center justify-between border-b border-navy-800">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-brand-800 flex items-center justify-center text-brand-300">
              <FileSpreadsheet class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-bold text-base">Contractor & Wholesale Bulk Quote</h3>
              <p class="text-xs text-slate-400">Direct distributor discounts for projects & trade supplies</p>
            </div>
          </div>
          <button @click="closeModal" class="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitQuote" class="p-6 space-y-4">
          <div v-if="successMessage" class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs space-y-1">
            <div class="font-bold flex items-center space-x-1.5 text-sm">
              <CheckCircle class="w-4 h-4 text-emerald-600" />
              <span>Quotation Request Submitted Successfully!</span>
            </div>
            <p>{{ successMessage }}</p>
            <p class="text-slate-600 pt-1">Our sales engineering team will call you at <strong>{{ form.phone }}</strong> with official commercial pricing.</p>
          </div>

          <div v-if="!successMessage" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input 
                  v-model="form.name" 
                  required 
                  placeholder="e.g. Engr. Asim Raza" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Company / Project Name</label>
                <input 
                  v-model="form.companyName" 
                  placeholder="e.g. Al-Madina Construction" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Phone Number (Call & WhatsApp) *</label>
                <input 
                  v-model="form.phone" 
                  required 
                  placeholder="0300-1234567" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  required 
                  placeholder="contractor@domain.com" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Your Business Type</label>
                <select v-model="form.projectType" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white">
                  <option>Plumbing & Sanitary Contractor</option>
                  <option>Electrical Contractor</option>
                  <option>Construction Company</option>
                  <option>Wholesale/Retail Reseller</option>
                  <option>Home Renovation / Individual</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Urgency / Timeline</label>
                <select v-model="form.urgency" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white">
                  <option>Immediate (Within 48 hrs)</option>
                  <option>1 to 2 Weeks</option>
                  <option>Within 1 Month</option>
                  <option>Tender / Planning Phase</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Products & Quantities Required *</label>
              <textarea 
                v-model="form.itemsRequested" 
                rows="4" 
                required 
                placeholder="List required items (e.g. 50 lengths Popular PPRC 32mm PN20 pipes, 10 coils Fast Cables 7/0.029, 20 Schneider 32A DP MCB breakers...)" 
                class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              ></textarea>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span class="flex items-center space-x-1.5">
                <PhoneCall class="w-4 h-4 text-brand-600" />
                <span>Need urgent assistance? Call directly: <strong>0302-9355294</strong></span>
              </span>
            </div>

            <div class="flex justify-end space-x-3 pt-2">
              <button 
                type="button" 
                @click="closeModal" 
                class="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                :disabled="submitting" 
                class="bg-brand-800 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Send class="w-4 h-4" />
                <span>{{ submitting ? 'Submitting...' : 'Submit Quotation Request' }}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCartStore } from '../../stores/cart';
import api from '../../services/api';
import { FileSpreadsheet, X, CheckCircle, PhoneCall, Send } from 'lucide-vue-next';

const cartStore = useCartStore();
const isOpen = computed(() => !!cartStore.quoteModalProduct || isCustomOpen.value);
const isCustomOpen = ref(false);

const form = ref({
  name: '',
  companyName: '',
  phone: '',
  email: '',
  projectType: 'Plumbing & Sanitary Contractor',
  urgency: 'Immediate (Within 48 hrs)',
  itemsRequested: ''
});

const submitting = ref(false);
const successMessage = ref('');

watch(() => cartStore.quoteModalProduct, (newVal) => {
  if (newVal) {
    form.value.itemsRequested = `Product: ${newVal.name} (SKU: ${newVal.sku})\nCategory: ${newVal.category}\nEstimated Quantity: 50+ units\nNotes: Please provide contractor rate for this product.`;
  }
});

const closeModal = () => {
  cartStore.closeQuoteModal();
  isCustomOpen.value = false;
  successMessage.value = '';
};

const submitQuote = async () => {
  submitting.value = true;
  try {
    const res = await api.post('/quotes', form.value);
    if (res.data.success) {
      successMessage.value = `Reference Quote ID: ${res.data.quoteNumber}`;
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to submit quotation');
  } finally {
    submitting.value = false;
  }
};
</script>
