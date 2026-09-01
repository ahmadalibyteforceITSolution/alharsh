<template>
  <section class="py-12 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div class="text-xs font-bold text-brand-700 uppercase tracking-widest flex items-center space-x-1.5 mb-1">
            <span class="w-2 h-2 rounded-full bg-brand-600"></span>
            <span>Comprehensive Product Lines</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shop by Core Industrial Category
          </h2>
        </div>
        <router-link to="/shop" class="text-xs font-bold text-brand-700 hover:text-brand-900 flex items-center space-x-1">
          <span>View All Categories & Subcategories</span>
          <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>

      <!-- Categories 3 Main Cards Grid with Embedded High-Impact Visuals -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Sanitary Category Card -->
        <div class="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
          <div class="h-48 relative overflow-hidden bg-gradient-to-br from-navy-950 via-brand-950 to-brand-900 p-6 flex flex-col justify-between">
            <!-- Background Vector Art -->
            <div class="absolute -right-6 -bottom-6 w-40 h-40 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="#38bdf8" stroke-width="8" stroke-dasharray="12 8" />
                <path d="M100 40 V160 M40 100 H160" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
              </svg>
            </div>

            <!-- Top Tag & Icon -->
            <div class="flex items-center justify-between z-10">
              <span class="bg-brand-600 text-white text-2xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                Sanitary
              </span>
              <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-accent-cyan shadow">
                <Droplet class="w-5 h-5 text-accent-cyan" />
              </div>
            </div>

            <!-- Bottom Title & Badges -->
            <div class="z-10">
              <h3 class="text-lg font-extrabold text-white leading-tight">Sanitary & Piping Systems</h3>
              <p class="text-2xs text-brand-200 mt-0.5">Popular PPRC PN-20, Brass Taps & Commodes</p>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <p class="text-xs text-slate-600">PPRC pipes, brass bathroom taps, rainfall showers, one-piece commodes & water tanks.</p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <router-link to="/shop?category=Sanitary&subcategory=Pipes+%26+Fittings+(PPRC+%26+PVC)" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Popular PPRC Pipes
                </router-link>
                <router-link to="/shop?category=Sanitary&subcategory=Bathroom+Fittings+%26+Taps" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Brass Taps & Mixers
                </router-link>
                <router-link to="/shop?category=Sanitary&subcategory=Commodes+%2F+Toilets" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Commodes & Suites
                </router-link>
              </div>
            </div>
            <router-link to="/shop?category=Sanitary" class="text-xs font-bold text-brand-800 hover:text-brand-600 flex items-center space-x-1 pt-2 border-t border-slate-100">
              <span>Browse Sanitary Catalog</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

        <!-- Electrical Category Card -->
        <div class="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
          <div class="h-48 relative overflow-hidden bg-gradient-to-br from-navy-950 via-slate-900 to-amber-950 p-6 flex flex-col justify-between">
            <!-- Background Vector Art -->
            <div class="absolute -right-6 -bottom-6 w-40 h-40 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 20 L40 110 H90 L70 180 L160 90 H110 Z" fill="#fbbf24" />
              </svg>
            </div>

            <!-- Top Tag & Icon -->
            <div class="flex items-center justify-between z-10">
              <span class="bg-amber-600 text-white text-2xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                Electrical
              </span>
              <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 shadow">
                <Zap class="w-5 h-5 text-amber-400" />
              </div>
            </div>

            <!-- Bottom Title & Badges -->
            <div class="z-10">
              <h3 class="text-lg font-extrabold text-white leading-tight">Wires, Cables & Switchgear</h3>
              <p class="text-2xs text-amber-200 mt-0.5">Fast Cables 100% Copper, Schneider MCBs</p>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <p class="text-xs text-slate-600">Fast Cables 100% pure copper, Schneider circuit breakers, luxury glass switches & BLDC fans.</p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <router-link to="/shop?category=Electrical&subcategory=Wires+%26+Cables" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Fast Cables (Copper)
                </router-link>
                <router-link to="/shop?category=Electrical&subcategory=Circuit+Breakers+%26+DBs" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Schneider MCB Breakers
                </router-link>
                <router-link to="/shop?category=Electrical&subcategory=Switches+%26+Sockets" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Piano Glass Switches
                </router-link>
              </div>
            </div>
            <router-link to="/shop?category=Electrical" class="text-xs font-bold text-brand-800 hover:text-brand-600 flex items-center space-x-1 pt-2 border-t border-slate-100">
              <span>Browse Electrical Catalog</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

        <!-- Hardware Category Card -->
        <div class="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
          <div class="h-48 relative overflow-hidden bg-gradient-to-br from-navy-950 via-slate-900 to-slate-800 p-6 flex flex-col justify-between">
            <!-- Background Vector Art -->
            <div class="absolute -right-6 -bottom-6 w-40 h-40 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="100" height="100" rx="16" stroke="#94a3b8" stroke-width="10" />
                <circle cx="100" cy="100" r="25" fill="#94a3b8" />
              </svg>
            </div>

            <!-- Top Tag & Icon -->
            <div class="flex items-center justify-between z-10">
              <span class="bg-slate-700 text-white text-2xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                Hardware
              </span>
              <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-300 shadow">
                <Wrench class="w-5 h-5 text-accent-cyan" />
              </div>
            </div>

            <!-- Bottom Title & Badges -->
            <div class="z-10">
              <h3 class="text-lg font-extrabold text-white leading-tight">Tools, Locks & Fasteners</h3>
              <p class="text-2xs text-slate-300 mt-0.5">Rotary Hammers, Yale Locks & Anchor Bolts</p>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <p class="text-xs text-slate-600">Heavy-duty power drills, angle grinders, pipe wrenches, high-security door locks & anchor bolts.</p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <router-link to="/shop?category=Hardware&subcategory=Power+Tools" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Power Drills & Grinders
                </router-link>
                <router-link to="/shop?category=Hardware&subcategory=Locks%2C+Hinges+%26+Door+Fittings" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Yale Mortise Locks
                </router-link>
                <router-link to="/shop?category=Hardware&subcategory=Nails%2C+Screws%2C+Bolts+%26+Fasteners" class="text-2xs bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 px-2.5 py-1 rounded-md font-medium transition-colors">
                  Anchor Shield Bolts
                </router-link>
              </div>
            </div>
            <router-link to="/shop?category=Hardware" class="text-xs font-bold text-brand-800 hover:text-brand-600 flex items-center space-x-1 pt-2 border-t border-slate-100">
              <span>Browse Hardware Catalog</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { Droplet, Zap, Wrench, ArrowRight } from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
