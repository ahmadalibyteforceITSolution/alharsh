<template>
  <section class="py-14 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div class="text-xs font-bold text-brand-700 uppercase tracking-widest">Why Contractors & Builders Rely on Us</div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">The AL-HRSH Quality Commitment</h2>
        <p class="text-xs sm:text-sm text-slate-500">We stand behind every single pipe, fitting, breaker, cable coil, and tool we supply.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-500 hover:bg-white hover:shadow-card transition-all duration-300 space-y-3">
          <div class="w-12 h-12 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-sm text-slate-900">100% Genuine Certified</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Zero sub-standard replicas. Direct authorized supply chains from Popular Pipes, Fast Cables, and Schneider Electric.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-500 hover:bg-white hover:shadow-card transition-all duration-300 space-y-3">
          <div class="w-12 h-12 rounded-xl bg-accent-cyan/20 text-teal-800 flex items-center justify-center">
            <Truck class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-sm text-slate-900">Heavy Freight Delivery</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Safe nationwide logistics fleet capable of shipping 4-meter pipe bundles, porcelain commodes, and bulk cable reels intact.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-500 hover:bg-white hover:shadow-card transition-all duration-300 space-y-3">
          <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <BadgePercent class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-sm text-slate-900">Direct Wholesale Margins</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Transparent pricing without intermediary markup. Big savings for homeowners renovating and builders procuring in bulk.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-500 hover:bg-white hover:shadow-card transition-all duration-300 space-y-3">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Headphones class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-sm text-slate-900">Technical Advisory Support</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Dedicated team ready at <strong>0302-9355294</strong> to calculate pipe head loss, cable load amp ratings, and tool specs.
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ShieldCheck, Truck, BadgePercent, Headphones } from 'lucide-vue-next';
</script>
