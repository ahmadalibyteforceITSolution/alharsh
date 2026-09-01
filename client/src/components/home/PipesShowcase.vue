<template>
  <section class="py-16 popular-gradient text-white relative overflow-hidden">
    <!-- Diagonal background pattern -->
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Left: Engineering Highlights -->
        <div class="lg:col-span-6 space-y-6">
          <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-accent-cyan">
            <Award class="w-4 h-4 text-accent-cyan" />
            <span>AUTHORISED INDUSTRIAL DISTRIBUTOR</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Popular Pipes Group & High-Pressure Plumbing Systems
          </h2>

          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Manufactured from 100% pure European virgin PPRC Type-3 and virgin UPVC resins. Engineered to resist scaling, high operating pressure (PN-20 / PN-25), and extreme thermal variations up to 95°C for domestic towers, hospitals, and industrial plants.
          </p>

          <!-- Engineering Specs Grid -->
          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15">
              <div class="text-lg font-extrabold text-accent-cyan">PN-20 / PN-25</div>
              <div class="text-2xs text-slate-300 font-medium">Pressure Rating Certified</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15">
              <div class="text-lg font-extrabold text-brand-300">50+ Years</div>
              <div class="text-2xs text-slate-300 font-medium">Design Operational Lifespan</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15">
              <div class="text-lg font-extrabold text-emerald-300">DIN 8077 / 8078</div>
              <div class="text-2xs text-slate-300 font-medium">German Quality Standard</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15">
              <div class="text-lg font-extrabold text-amber-300">100% Non-Toxic</div>
              <div class="text-2xs text-slate-300 font-medium">Safe For Drinking Potable Water</div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="pt-4 flex items-center space-x-4 flex-wrap gap-y-3">
            <router-link 
              to="/shop?category=Sanitary&subcategory=Pipes+%26+Fittings+(PPRC+%26+PVC)" 
              class="bg-white text-brand-900 hover:bg-slate-100 font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Explore Piping Systems</span>
              <ArrowRight class="w-4 h-4" />
            </router-link>
            
            <button 
              @click="cartStore.openQuoteModal()"
              class="bg-accent-cyan/20 hover:bg-accent-cyan/30 text-white font-semibold text-xs px-6 py-3.5 rounded-xl border border-accent-cyan/40 transition-all flex items-center space-x-2"
            >
              <FileSpreadsheet class="w-4 h-4 text-accent-cyan" />
              <span>Get Contractor Project Rates</span>
            </button>
          </div>
        </div>

        <!-- Right: Showcase Image Card -->
        <div class="lg:col-span-6 relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <div class="absolute -inset-4 bg-gradient-to-r from-accent-cyan to-brand-400 rounded-3xl opacity-20 blur-xl"></div>
            <div class="relative bg-navy-900 rounded-2xl border border-white/20 p-4 shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1000&q=80" 
                alt="Piping Showcase" 
                class="w-full h-80 object-cover rounded-xl" 
              />
              <div class="p-4 bg-navy-950/90 backdrop-blur-md rounded-xl mt-3 border border-white/10 flex items-center justify-between">
                <div>
                  <div class="text-xs font-bold text-white">Popular PPRC PN-20 High-Pressure Pipes</div>
                  <div class="text-2xs text-slate-400">Available from 20mm (1/2") up to 110mm (4") with complete fittings</div>
                </div>
                <router-link 
                  to="/shop?category=Sanitary&subcategory=Pipes+%26+Fittings+(PPRC+%26+PVC)" 
                  class="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-2xs font-bold shrink-0 hover:bg-brand-500 transition-colors"
                >
                  View Sizes
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../../stores/cart';
import { Award, ArrowRight, FileSpreadsheet } from 'lucide-vue-next';

const cartStore = useCartStore();
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
