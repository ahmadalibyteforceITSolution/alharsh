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

      <!-- Categories 3 Main Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Sanitary Category Card -->
        <div class="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
          <div class="h-48 overflow-hidden relative bg-slate-900">
            <img 
              src="/images/sanitary.svg" 
              alt="Sanitary Category" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span class="bg-brand-600 text-2xs font-extrabold px-2.5 py-0.5 rounded uppercase">Sanitary</span>
                <h3 class="text-lg font-extrabold text-white mt-1">Sanitary & Piping Systems</h3>
              </div>
              <div class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <Droplet class="w-5 h-5 text-accent-cyan" />
              </div>
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
          <div class="h-48 overflow-hidden relative bg-slate-900">
            <img 
              src="/images/electrical.svg" 
              alt="Electrical Category" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span class="bg-amber-600 text-2xs font-extrabold px-2.5 py-0.5 rounded uppercase">Electrical</span>
                <h3 class="text-lg font-extrabold text-white mt-1">Wires, Cables & Switchgear</h3>
              </div>
              <div class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <Zap class="w-5 h-5 text-amber-400" />
              </div>
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
          <div class="h-48 overflow-hidden relative bg-slate-900">
            <img 
              src="/images/hardware.svg" 
              alt="Hardware Category" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span class="bg-slate-700 text-2xs font-extrabold px-2.5 py-0.5 rounded uppercase">Hardware</span>
                <h3 class="text-lg font-extrabold text-white mt-1">Tools, Locks & Fasteners</h3>
              </div>
              <div class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <Wrench class="w-5 h-5 text-accent-cyan" />
              </div>
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
