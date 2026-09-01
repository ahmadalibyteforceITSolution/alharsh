<template>
  <section class="py-14 bg-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-navy-950 via-brand-950 to-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-navy-800">
        
        <!-- Decorative background shapes -->
        <div class="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute left-0 bottom-0 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div class="lg:col-span-7 space-y-4">
            <span class="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-300 text-2xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-400/30">
              <Building2 class="w-3.5 h-3.5" />
              <span>CONTRACTORS & WHOLESALE TRADE</span>
            </span>

            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Executing a High-Rise, Villa or Commercial Project?
            </h2>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Get tiered trade rates, direct manufacturer batch certificates, and dedicated technical account managers for high-volume orders in Sanitary, Electrical Cables, and Hardware.
            </p>

            <div class="flex items-center space-x-6 text-xs text-slate-300 pt-2 flex-wrap gap-y-2">
              <div class="flex items-center space-x-2">
                <CheckCircle class="w-4 h-4 text-emerald-400" />
                <span>Specialized B2B Invoicing</span>
              </div>
              <div class="flex items-center space-x-2">
                <CheckCircle class="w-4 h-4 text-emerald-400" />
                <span>Express Freight Logistics</span>
              </div>
              <div class="flex items-center space-x-2">
                <CheckCircle class="w-4 h-4 text-emerald-400" />
                <span>Material Test Certificates</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button 
              @click="cartStore.openQuoteModal()"
              class="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-2xl shadow-xl hover:shadow-glow transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <FileSpreadsheet class="w-5 h-5" />
              <span>Request Formal Bulk Quotation</span>
            </button>

            <a 
              href="tel:03029355294"
              class="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
            >
              <PhoneCall class="w-5 h-5 text-accent-cyan" />
              <span>Call Trade Desk: 0302-9355294</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../../stores/cart';
import { Building2, CheckCircle, FileSpreadsheet, PhoneCall } from 'lucide-vue-next';

const cartStore = useCartStore();
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
