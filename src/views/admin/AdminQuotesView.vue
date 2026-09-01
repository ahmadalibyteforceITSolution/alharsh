<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div>
      <h1 class="text-2xl font-extrabold text-white tracking-tight">Contractor & Wholesale Quotes</h1>
      <p class="text-xs text-slate-400 mt-1">Review bulk RFPs, commercial tender inquiries, and BOQs from MongoDB</p>
    </div>

    <div class="bg-navy-950 rounded-3xl border border-navy-800 overflow-hidden shadow-card">
      <div v-if="adminStore.quotes.length === 0" class="py-16 text-center text-xs text-slate-400">
        No bulk quotation requests submitted yet.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead>
            <tr class="text-slate-400 uppercase tracking-wider text-2xs bg-navy-900 border-b border-navy-800">
              <th class="p-4">Ref # & Date</th>
              <th class="p-4">Contractor / Firm</th>
              <th class="p-4">Contact Details</th>
              <th class="p-4">Requested BOQ</th>
              <th class="p-4 text-center">Status</th>
              <th class="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy-800/60">
            <tr v-for="quote in adminStore.quotes" :key="quote._id" class="hover:bg-navy-900/50">
              <td class="p-4 font-mono font-bold text-white">
                <div>{{ quote.quoteNumber }}</div>
                <div class="text-2xs text-slate-400 font-normal">{{ new Date(quote.createdAt).toLocaleDateString('en-GB') }}</div>
              </td>
              <td class="p-4">
                <div class="font-bold text-white">{{ quote.name }}</div>
                <div class="text-2xs text-brand-400 font-semibold">{{ quote.companyName || 'Individual / Contractor' }}</div>
                <div class="text-2xs text-slate-400">{{ quote.projectType }}</div>
              </td>
              <td class="p-4">
                <div class="text-slate-200 font-bold">{{ quote.phone }}</div>
                <div class="text-2xs text-slate-400">{{ quote.email }}</div>
              </td>
              <td class="p-4">
                <div class="text-xs text-slate-300 line-clamp-2 font-mono whitespace-pre-line max-w-xs">
                  {{ quote.itemsRequested }}
                </div>
                <div class="text-2xs text-amber-400 mt-1 font-semibold">Urgency: {{ quote.urgency }}</div>
              </td>
              <td class="p-4 text-center">
                <span class="text-2xs font-extrabold px-2.5 py-1 rounded-full uppercase"
                  :class="quote.status === 'Quoted' || quote.status === 'Approved' ? 'bg-emerald-950 text-emerald-400' : 'bg-brand-950 text-brand-400'">
                  {{ quote.status }}
                </span>
              </td>
              <td class="p-4 text-right space-x-2">
                <a :href="`https://wa.me/${quote.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(quote.name)},%20regarding%20your%20AL-HRSH%20bulk%20quote%20request%20${quote.quoteNumber}:`" target="_blank" class="p-1.5 bg-emerald-950 text-emerald-400 rounded-lg inline-block hover:bg-emerald-900 font-bold text-2xs">
                  WhatsApp
                </a>
                <button @click="markQuoted(quote)" class="p-1.5 bg-brand-800 hover:bg-brand-700 text-white rounded-lg font-bold text-2xs">
                  Mark Quoted
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '../../stores/admin';

const adminStore = useAdminStore();

const markQuoted = async (quote) => {
  await adminStore.updateQuote(quote._id, { status: 'Quoted' });
};

onMounted(() => {
  adminStore.fetchQuotes();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
