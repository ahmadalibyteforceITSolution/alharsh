<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Top Hero Header -->
      <div class="bg-gradient-to-br from-navy-950 via-brand-950 to-navy-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl text-center max-w-4xl mx-auto space-y-4 relative overflow-hidden border border-navy-800">
        <div class="bg-white p-3 rounded-2xl inline-block shadow-lg">
          <img src="/logo.png" alt="AL-HRSH Official Logo" class="h-16 w-auto object-contain" />
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Engineering Excellence in Sanitary, Electrical & Hardware</h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Founded with a relentless commitment to authentic, certified building supplies. AL-HRSH bridges top industrial manufacturing with commercial contractors, housing developers, and retail hardware merchants.
        </p>
      </div>

      <!-- Core Pillars -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center">
            <Building2 class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-base text-slate-900">Direct Distributorship</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Authorized channel partners for Popular Pipes Group, Fast Cables, Schneider Electric, and Sonex Sanitary Ware. Direct sourcing guarantees lowest trade rates.
          </p>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-accent-cyan/20 text-teal-800 flex items-center justify-center">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-base text-slate-900">Strict Quality Testing</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Every product adheres to ISO 9001, DIN 8077/8078, and PSQCA standards. We provide complete material test certs and batch verification for contractors.
          </p>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Truck class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-base text-slate-900">Heavy Freight Fleet</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            From 4-meter pipe bundles to heavy porcelain commodes and wire reels, our dedicated logistics partners ensure undamaged delivery across Pakistan.
          </p>
        </div>
      </div>

      <!-- Contact Helpline Banner -->
      <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center md:text-left">
          <h3 class="text-lg font-bold text-slate-900">Need Bulk Procurement for Your Project?</h3>
          <p class="text-xs text-slate-500">Contact our commercial technical team directly for project bidding & quotation.</p>
        </div>
        <div class="flex items-center space-x-3 flex-wrap justify-center">
          <a href="tel:03029355294" class="bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors">
            Call: 0302-9355294
          </a>
          <router-link to="/quote" class="border border-brand-800 text-brand-800 hover:bg-brand-50 font-bold text-xs px-6 py-3 rounded-xl transition-colors">
            Submit B2B RFP
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Building2, ShieldCheck, Truck } from 'lucide-vue-next';
</script>
