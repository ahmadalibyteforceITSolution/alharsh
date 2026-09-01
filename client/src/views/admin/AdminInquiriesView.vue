<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div>
      <h1 class="text-2xl font-extrabold text-white tracking-tight">Customer Inquiries & Messages</h1>
      <p class="text-xs text-slate-400 mt-1">Messages submitted from the Contact Us page in MongoDB</p>
    </div>

    <div class="bg-navy-950 rounded-3xl border border-navy-800 overflow-hidden shadow-card">
      <div v-if="adminStore.inquiries.length === 0" class="py-16 text-center text-xs text-slate-400">
        No customer messages received yet.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead>
            <tr class="text-slate-400 uppercase tracking-wider text-2xs bg-navy-900 border-b border-navy-800">
              <th class="p-4">Sender & Phone</th>
              <th class="p-4">Subject</th>
              <th class="p-4">Message</th>
              <th class="p-4">Date</th>
              <th class="p-4 text-right">Quick Contact</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy-800/60">
            <tr v-for="inq in adminStore.inquiries" :key="inq._id" class="hover:bg-navy-900/50">
              <td class="p-4">
                <div class="font-bold text-white">{{ inq.name }}</div>
                <div class="text-2xs text-brand-400">{{ inq.phone }}</div>
                <div class="text-2xs text-slate-400">{{ inq.email }}</div>
              </td>
              <td class="p-4 font-bold text-slate-200">{{ inq.subject }}</td>
              <td class="p-4 text-slate-300 max-w-sm whitespace-pre-line">{{ inq.message }}</td>
              <td class="p-4 text-2xs text-slate-400 font-mono">{{ new Date(inq.createdAt).toLocaleDateString('en-GB') }}</td>
              <td class="p-4 text-right">
                <a :href="`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20regarding%20your%20inquiry%20to%20AL-HRSH:`" target="_blank" class="p-1.5 bg-emerald-950 text-emerald-400 rounded-lg inline-block hover:bg-emerald-900 font-bold text-2xs">
                  WhatsApp
                </a>
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

onMounted(() => {
  adminStore.fetchInquiries();
});
</script>
