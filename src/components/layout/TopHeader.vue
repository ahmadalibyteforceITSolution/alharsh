<template>
  <div class="bg-navy-950 text-slate-300 text-2xs py-2 border-b border-navy-800 hidden md:block">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center whitespace-nowrap">
      
      <!-- Left: Direct Contact Details & Store Location -->
      <div class="flex items-center space-x-5 shrink-0">
        <!-- Helpline -->
        <div class="flex items-center space-x-1.5 whitespace-nowrap">
          <Phone class="w-3.5 h-3.5 text-accent-cyan shrink-0" />
          <span class="text-slate-400">Helpline:</span>
          <a href="tel:03029355294" class="text-white font-bold hover:text-accent-cyan transition-colors whitespace-nowrap">
            0302-9355294
          </a>
        </div>

        <!-- WhatsApp -->
        <div class="flex items-center space-x-1.5 whitespace-nowrap">
          <MessageCircle class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span class="text-slate-400">WhatsApp:</span>
          <a href="https://wa.me/923029355294" target="_blank" class="text-emerald-400 font-bold hover:underline whitespace-nowrap">
            +92 302 9355294
          </a>
        </div>

        <!-- Store Location Pin -->
        <div class="flex items-center space-x-1.5 text-slate-300 whitespace-nowrap">
          <MapPin class="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <a 
            href="https://www.google.com/maps/place/Al-HRSH+Electrical+Hardware+and+Saintary+Store/@31.413118,74.3738413,17z" 
            target="_blank" 
            class="hover:text-white transition-colors whitespace-nowrap"
          >
            Al-HRSH Store Lahore
          </a>
        </div>
      </div>

      <!-- Right: Facebook, Track Order, BOQ, Admin -->
      <div class="flex items-center space-x-4 shrink-0">
        <!-- Facebook Social Link -->
        <a 
          href="https://www.facebook.com/AlHRSHstore" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors bg-blue-600/30 hover:bg-blue-600 px-2.5 py-1 rounded-full border border-blue-500/30 whitespace-nowrap"
          title="Visit Official Facebook Page"
        >
          <Facebook class="w-3 h-3 text-blue-400" />
          <span class="font-bold">facebook.com/AlHRSHstore</span>
        </a>

        <!-- Track Order -->
        <router-link to="/track" class="hover:text-white flex items-center space-x-1 transition-colors whitespace-nowrap text-slate-300">
          <Truck class="w-3.5 h-3.5 text-brand-400 shrink-0" />
          <span>Track Order</span>
        </router-link>

        <!-- Contractor BOQ -->
        <router-link to="/quote" class="text-accent-cyan hover:underline font-bold whitespace-nowrap">
          Contractor BOQ
        </router-link>

        <!-- Staff Admin Button -->
        <router-link to="/admin" class="bg-brand-700 hover:bg-brand-600 text-white font-bold px-3 py-1 rounded-md transition-colors text-2xs whitespace-nowrap shadow-sm">
          Staff Admin &rarr;
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Phone, MessageCircle, MapPin, Truck, Facebook } from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.72rem;
}
</style>
