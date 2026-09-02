<template>
  <section class="py-12 bg-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Official Collaboration Real Estate & Architectural Partner Feature -->
      <div class="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white border border-navy-700/80 shadow-xl relative overflow-hidden">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center lg:text-left">
            <div class="inline-flex items-center space-x-2 bg-brand-500/20 text-accent-cyan border border-brand-400/30 px-3 py-1 rounded-full text-2xs uppercase tracking-wider font-extrabold">
              <Sparkles class="w-3.5 h-3.5 text-accent-cyan" />
              <span>Official Collaboration Partner</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              H&amp;Q Design Services <span class="text-accent-cyan text-sm font-semibold block sm:inline sm:ml-2">| Real Estate Agency &amp; Architecture Partner</span>
            </h3>
            <p class="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Premier architecture studio in Lahore for 5 Marla, 10 Marla &amp; 1 Kanal luxury villas, 3D front elevation renders, architectural floor plans &amp; construction cost estimates.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a 
              href="https://h-q-design-services.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Visit Partner Website</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
            <a 
              href="tel:+923416887454" 
              class="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-4 py-3 rounded-xl transition-all inline-flex items-center justify-center space-x-2"
            >
              <Phone class="w-3.5 h-3.5 text-accent-cyan" />
              <span>0341-6887454</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Authorized Distributorships & Quality Brands -->
      <div class="space-y-4">
        <div class="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Authorized Distributorships &amp; Quality Brands
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 text-center font-extrabold text-brand-900 text-sm tracking-tight shadow-sm hover:border-brand-500 hover:shadow-md transition-all">
            POPULAR PIPES
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 text-center font-extrabold text-red-600 text-sm tracking-tight shadow-sm hover:border-brand-500 hover:shadow-md transition-all">
            FAST CABLES
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 text-center font-extrabold text-emerald-700 text-sm tracking-tight shadow-sm hover:border-brand-500 hover:shadow-md transition-all">
            SCHNEIDER
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 text-center font-extrabold text-cyan-800 text-sm tracking-tight shadow-sm hover:border-brand-500 hover:shadow-md transition-all">
            MASTER SANITARY
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 text-center font-extrabold text-amber-700 text-sm tracking-tight shadow-sm hover:border-brand-500 hover:shadow-md transition-all">
            SONEX LUXURY
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 text-center font-extrabold text-blue-800 text-sm tracking-tight shadow-sm hover:border-brand-500 hover:shadow-md transition-all">
            TOTAL TOOLS
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Sparkles, ExternalLink, Phone } from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.72rem;
}
</style>
