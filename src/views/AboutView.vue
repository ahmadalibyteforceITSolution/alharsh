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

      <!-- Strategic Real Estate & Architectural Partnership Section -->
      <div class="bg-gradient-to-br from-navy-950 via-slate-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white border border-navy-800 shadow-2xl relative overflow-hidden space-y-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-navy-800 pb-6">
          <div class="space-y-2">
            <div class="inline-flex items-center space-x-2 bg-brand-500/20 text-accent-cyan border border-brand-400/30 px-3 py-1 rounded-full text-2xs uppercase tracking-wider font-extrabold">
              <Sparkles class="w-3.5 h-3.5 text-accent-cyan" />
              <span>Strategic Collaboration Partner</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real Estate Agency &amp; Architectural Partner: <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-teal-300">H&amp;Q Design Services</span>
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              To deliver a comprehensive construction experience, AL-HRSH Store collaborates with <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-accent-cyan font-bold hover:underline">H&amp;Q Design Services (HANDQ)</a> — Lahore's leading architecture studio and real estate design consultancy.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <a 
              href="https://h-q-design-services.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Visit H&amp;Q Design Services</span>
              <ExternalLink class="w-4 h-4" />
            </a>
            <a 
              href="tel:+923416887454" 
              class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-all inline-flex items-center space-x-2"
            >
              <Phone class="w-4 h-4 text-accent-cyan" />
              <span>0341-6887454</span>
            </a>
          </div>
        </div>

        <!-- Partnership Synergy Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-navy-900/60 border border-navy-700/60 p-6 rounded-2xl space-y-2">
            <div class="text-accent-cyan font-extrabold text-sm flex items-center space-x-2">
              <Compass class="w-4 h-4" />
              <span>3D Elevation &amp; Floor Plans</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Photorealistic 3D front elevations, luxury interior renders, and floor layouts for 5 Marla, 10 Marla, and 1 Kanal modern &amp; Spanish villas in Lahore and DHA housing societies.
            </p>
          </div>

          <div class="bg-navy-900/60 border border-navy-700/60 p-6 rounded-2xl space-y-2">
            <div class="text-accent-cyan font-extrabold text-sm flex items-center space-x-2">
              <Building class="w-4 h-4" />
              <span>Real Estate Development</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Turnkey architectural consulting, municipal submission drawings, structural engineering, and construction cost estimates tailored for Pakistani residential and commercial developers.
            </p>
          </div>

          <div class="bg-navy-900/60 border border-navy-700/60 p-6 rounded-2xl space-y-2">
            <div class="text-accent-cyan font-extrabold text-sm flex items-center space-x-2">
              <ShieldCheck class="w-4 h-4" />
              <span>Direct Material Fulfillment</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Every architectural blueprint is backed by AL-HRSH's direct distribution of certified Popular PPRC pipes, Fast Cables copper reels, Sonex sanitary fixtures, and Schneider switchgear.
            </p>
          </div>
        </div>

        <!-- Keyword Backlinks -->
        <div class="pt-4 border-t border-navy-800 flex flex-wrap gap-2.5 items-center">
          <span class="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center space-x-1">
            <Link2 class="w-3.5 h-3.5 text-accent-cyan" />
            <span>Collaboration Backlinks:</span>
          </span>
          <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs bg-navy-950 hover:bg-brand-900/60 border border-navy-700 text-slate-300 hover:text-accent-cyan px-3 py-1 rounded-lg transition-colors">
            Best Architects in Lahore
          </a>
          <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs bg-navy-950 hover:bg-brand-900/60 border border-navy-700 text-slate-300 hover:text-accent-cyan px-3 py-1 rounded-lg transition-colors">
            3D Elevation &amp; House Design
          </a>
          <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs bg-navy-950 hover:bg-brand-900/60 border border-navy-700 text-slate-300 hover:text-accent-cyan px-3 py-1 rounded-lg transition-colors">
            Real Estate Agency Partner
          </a>
          <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs bg-navy-950 hover:bg-brand-900/60 border border-navy-700 text-slate-300 hover:text-accent-cyan px-3 py-1 rounded-lg transition-colors">
            DHA Lahore Architecture Studio
          </a>
          <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs bg-navy-950 hover:bg-brand-900/60 border border-navy-700 text-slate-300 hover:text-accent-cyan px-3 py-1 rounded-lg transition-colors">
            Pakistan House Construction Cost
          </a>
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
import { Building2, ShieldCheck, Truck, Sparkles, Compass, Building, ExternalLink, Phone, Link2 } from 'lucide-vue-next';
</script>
