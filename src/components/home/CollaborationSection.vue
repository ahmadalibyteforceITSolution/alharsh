<template>
  <section class="py-16 bg-gradient-to-br from-navy-950 via-slate-900 to-brand-950 text-white relative overflow-hidden border-y border-navy-800">
    <!-- Decorative background glow -->
    <div class="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Top Pill Badge -->
      <div class="flex items-center justify-center mb-6">
        <div class="inline-flex items-center space-x-2 bg-brand-500/20 border border-brand-400/30 px-4 py-1.5 rounded-full text-2xs uppercase tracking-widest font-extrabold text-accent-cyan shadow-inner">
          <Sparkles class="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
          <span>Official Strategic Collaboration Partner</span>
        </div>
      </div>

      <!-- Main Headline & Description -->
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Real Estate Agency &amp; Architectural Partner: <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-teal-300 to-emerald-400">H&amp;Q Design Services</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Building your dream home or commercial development? Through our exclusive collaboration with 
          <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-accent-cyan hover:underline font-bold">H&amp;Q Design Services (HANDQ)</a>, 
          experience Pakistan's complete end-to-end building solution: world-class architectural designs, 3D front elevations, DHA Lahore bylaws compliance, paired seamlessly with AL-HRSH's genuine certified sanitary, electrical, and plumbing supplies.
        </p>
      </div>

      <!-- Collaboration Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        <!-- Card 1 -->
        <div class="bg-navy-900/80 border border-navy-700/70 hover:border-brand-500/60 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 text-accent-cyan flex items-center justify-center">
              <Compass class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-white">Architectural 3D Elevations</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Photorealistic 3D exterior &amp; interior rendering, modern Spanish villas, and bespoke facade design for residential &amp; commercial estates.
            </p>
          </div>
          <div class="pt-4 mt-4 border-t border-navy-800/80">
            <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs font-bold text-accent-cyan hover:underline inline-flex items-center space-x-1">
              <span>Explore 3D Elevations</span>
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-navy-900/80 border border-navy-700/70 hover:border-brand-500/60 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 text-accent-cyan flex items-center justify-center">
              <LayoutGrid class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-white">Floor Planning &amp; Approvals</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Custom 5 Marla, 10 Marla, 1 Kanal &amp; 2 Kanal floor layouts optimized for ventilation, structural longevity, and municipal authority approvals.
            </p>
          </div>
          <div class="pt-4 mt-4 border-t border-navy-800/80">
            <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs font-bold text-accent-cyan hover:underline inline-flex items-center space-x-1">
              <span>View House Floor Plans</span>
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-navy-900/80 border border-navy-700/70 hover:border-brand-500/60 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 text-accent-cyan flex items-center justify-center">
              <Building class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-white">Real Estate &amp; Construction</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Complete turnkey design and real estate agency advisory across DHA Lahore, Bahria Town, Gulberg, Islamabad, and nationwide developers.
            </p>
          </div>
          <div class="pt-4 mt-4 border-t border-navy-800/80">
            <a href="https://h-q-design-services.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-2xs font-bold text-accent-cyan hover:underline inline-flex items-center space-x-1">
              <span>Real Estate Services</span>
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-navy-900/80 border border-navy-700/70 hover:border-brand-500/60 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 text-accent-cyan flex items-center justify-center">
              <ShieldCheck class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-white">100% Genuine Supplies Integration</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Direct specification of genuine Popular PPRC pipes, Fast Cables copper wiring, Sonex luxury fittings, and Schneider electric components.
            </p>
          </div>
          <div class="pt-4 mt-4 border-t border-navy-800/80">
            <router-link to="/shop" class="text-2xs font-bold text-accent-cyan hover:underline inline-flex items-center space-x-1">
              <span>Browse Catalog Supplies</span>
              <ArrowRight class="w-3 h-3" />
            </router-link>
          </div>
        </div>

      </div>

      <!-- SEO Backlinks & Keywords Cloud -->
      <div class="bg-navy-900/50 border border-navy-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center lg:text-left">
            <div class="text-xs font-extrabold uppercase tracking-wider text-accent-cyan flex items-center justify-center lg:justify-start space-x-2">
              <Link2 class="w-4 h-4" />
              <span>Partner Backlinks &amp; Architectural Keywords</span>
            </div>
            <p class="text-2xs text-slate-400 max-w-xl">
              Connect with Lahore's leading architecture studio for 3D elevation designs, luxury villas, and turnkey house construction plans:
            </p>
          </div>

          <!-- Action Button -->
          <div class="flex flex-wrap items-center gap-3 justify-center">
            <a 
              href="https://h-q-design-services.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Visit H&amp;Q Design Services Website</span>
              <ExternalLink class="w-4 h-4" />
            </a>
            <a 
              href="tel:+923416887454" 
              class="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition-all inline-flex items-center space-x-2"
            >
              <Phone class="w-4 h-4 text-accent-cyan" />
              <span>Call Partner: 0341-6887454</span>
            </a>
          </div>
        </div>

        <!-- Keyword Tags / Backlinks Pills -->
        <div class="mt-6 pt-6 border-t border-navy-800/80 flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ Best Architects in Lahore
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ 3D House Design &amp; Elevation
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ Real Estate Agency Partner
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ 5 &amp; 10 Marla Spanish Villa Plans
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ 1 Kanal Luxury House Design
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ DHA Lahore Architecture Studio
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ House Construction Cost Pakistan
          </a>
          <a 
            href="https://h-q-design-services.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-navy-950 hover:bg-brand-900/60 border border-navy-700 hover:border-brand-500/50 text-slate-300 hover:text-accent-cyan px-3 py-1.5 rounded-xl text-2xs font-semibold transition-all"
          >
            ✦ Photorealistic 3D VR Renders
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { 
  Sparkles, 
  Compass, 
  LayoutGrid, 
  Building, 
  ShieldCheck, 
  ExternalLink, 
  Link2, 
  Phone, 
  ArrowRight 
} from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.72rem;
}
</style>
