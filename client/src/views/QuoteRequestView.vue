<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div class="inline-flex items-center space-x-2 bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <FileSpreadsheet class="w-3.5 h-3.5" />
          <span>Wholesale & Project Bidding</span>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Contractor Bulk Quotation Portal</h1>
        <p class="text-xs sm:text-sm text-slate-500">Submit your Bill of Quantities (BOQ) or material list for direct factory trade rates.</p>
      </div>

      <div class="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 space-y-6">
        <div v-if="successMsg" class="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl space-y-2 text-center">
          <div class="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle class="w-6 h-6" />
          </div>
          <h2 class="text-base font-bold">Quotation Request Successfully Registered!</h2>
          <p class="text-xs">{{ successMsg }}</p>
          <div class="pt-2 text-2xs text-slate-600">Our Commercial Sales Engineer will review your requirements and reach out via phone/WhatsApp.</div>
        </div>

        <form v-else @submit.prevent="submitQuote" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Contractor / Buyer Full Name *</label>
              <input v-model="form.name" required placeholder="e.g. Engr. Salman Tariq" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Company / Firm Name</label>
              <input v-model="form.companyName" placeholder="e.g. Prime Builders Ltd." class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Phone Number (Call / WhatsApp) *</label>
              <input v-model="form.phone" required placeholder="0300-1234567" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input v-model="form.email" type="email" required placeholder="contact@primebuilders.com" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Project City / Site</label>
              <input v-model="form.city" placeholder="e.g. Islamabad, Lahore" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Trade Category</label>
              <select v-model="form.category" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none">
                <option>Sanitary & Pipes</option>
                <option>Electrical & Cables</option>
                <option>Hardware & Power Tools</option>
                <option>Complete Multi-Category BOQ</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Required Within</label>
              <select v-model="form.urgency" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none">
                <option>Immediate (Within 48 hrs)</option>
                <option>1 to 2 Weeks</option>
                <option>Within 1 Month</option>
                <option>Tender / Planning Phase</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Bill of Quantities (BOQ) / Items Description *</label>
            <textarea v-model="form.itemsRequested" rows="5" required placeholder="Paste your required material list with pipe diameters, cable gauges, tool types, and estimated quantities..." class="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono"></textarea>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div class="text-xs text-slate-500">
              Need immediate discussion? Call direct helpline: <strong>0302-9355294</strong>
            </div>
            <button type="submit" :disabled="submitting" class="bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-50">
              {{ submitting ? 'Submitting...' : 'Submit BOQ for Trade Rate' }}
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { FileSpreadsheet, CheckCircle } from 'lucide-vue-next';

const form = ref({
  name: '',
  companyName: '',
  phone: '',
  email: '',
  city: '',
  category: 'Sanitary & Pipes',
  urgency: 'Immediate (Within 48 hrs)',
  itemsRequested: ''
});

const submitting = ref(false);
const successMsg = ref('');

const submitQuote = async () => {
  submitting.value = true;
  try {
    const res = await api.post('/quotes', form.value);
    if (res.data.success) {
      successMsg.value = `Your Request Reference Number is: ${res.data.quoteNumber}`;
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to submit quote');
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
