<template>
  <div class="bg-navy-950 text-slate-300 text-2xs py-2 border-b border-navy-800 hidden md:block">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      
      <!-- Left: Direct Contact Details & Store Location -->
      <div class="flex items-center space-x-6">
        <div class="flex items-center space-x-1.5">
          <Phone class="w-3.5 h-3.5 text-accent-cyan" />
          <span>Helpline:</span>
          <a href="tel:03029355294" class="text-white font-bold hover:text-accent-cyan transition-colors">0302-9355294</a>
        </div>

        <div class="flex items-center space-x-1.5">
          <MessageCircle class="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp:</span>
          <a href="https://wa.me/923029355294" target="_blank" class="text-emerald-400 font-bold hover:underline">+92 302 9355294</a>
        </div>

        <div class="flex items-center space-x-1.5 text-slate-400">
          <MapPin class="w-3.5 h-3.5 text-rose-400" />
          <a href="https://www.google.com/maps/place/Al-HRSH+Electrical+Hardware+and+Saintary+Store/@31.413118,74.3738413,17z" target="_blank" class="hover:text-white transition-colors truncate max-w-xs">
            Al-HRSH Electrical, Hardware &amp; Sanitary Store
          </a>
        </div>
      </div>

      <!-- Right: Social Media, Live Tracking & Staff Admin Login -->
      <div class="flex items-center space-x-5">
        <!-- Facebook Social Link -->
        <a 
          href="https://www.facebook.com/AlHRSHstore" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors bg-blue-600/30 hover:bg-blue-600 px-2.5 py-0.5 rounded-full border border-blue-500/30"
          title="Visit Official Facebook Page"
        >
          <Facebook class="w-3 h-3 text-blue-400" />
          <span class="font-bold">facebook.com/AlHRSHstore</span>
        </a>

        <router-link to="/track" class="hover:text-white flex items-center space-x-1 transition-colors">
          <Truck class="w-3.5 h-3.5 text-brand-400" />
          <span>Track Order</span>
        </router-link>

        <router-link to="/quote" class="text-accent-cyan hover:underline font-bold">
          Contractor BOQ Portal
        </router-link>

        <router-link to="/admin" class="bg-brand-800 hover:bg-brand-700 text-white font-bold px-2.5 py-0.5 rounded transition-colors text-2xs">
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
