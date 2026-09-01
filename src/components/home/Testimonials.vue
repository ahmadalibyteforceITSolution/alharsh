<template>
  <section class="py-14 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div class="text-xs font-bold text-brand-700 uppercase tracking-widest">Client Testimonials</div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Trusted by Leading Contractors & Homeowners</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex text-amber-400">
              <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
            </div>
            <p class="text-xs text-slate-600 italic leading-relaxed">
              "We procured all Popular PPRC pipes and Schneider switchgear for our 8-storey commercial project from AL-HRSH. Pricing was completely direct distributor rate, and every single test cert was delivered on schedule."
            </p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex items-center space-x-3">
            <div class="w-9 h-9 rounded-full bg-brand-800 text-white font-bold text-xs flex items-center justify-center">
              TR
            </div>
            <div>
              <div class="text-xs font-bold text-slate-900">Engr. Tariq Rasheed</div>
              <div class="text-2xs text-slate-500">Chief Project Engineer, Islamabad</div>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex text-amber-400">
              <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
            </div>
            <p class="text-xs text-slate-600 italic leading-relaxed">
              "Ordered Fast Cables copper coils and Total rotary hammer drills online. The delivery was at our Lahore site in under 24 hours. The packaging of porcelain commodes was exceptionally safe."
            </p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex items-center space-x-3">
            <div class="w-9 h-9 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center">
              MK
            </div>
            <div>
              <div class="text-xs font-bold text-slate-900">Malik Kamran</div>
              <div class="text-2xs text-slate-500">General Contractor, DHA Phase 6</div>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex text-amber-400">
              <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
            </div>
            <p class="text-xs text-slate-600 italic leading-relaxed">
              "The ability to request contractor quotes directly and track delivery status live via the portal is unmatched. 0302-9355294 helpline is always responsive."
            </p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex items-center space-x-3">
            <div class="w-9 h-9 rounded-full bg-accent-teal text-emerald-800 font-bold text-xs flex items-center justify-center bg-emerald-100">
              ZA
            </div>
            <div>
              <div class="text-xs font-bold text-slate-900">Zahid Ali Khan</div>
              <div class="text-2xs text-slate-500">Retail Hardware Store Owner, Rawalpindi</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { Star } from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
