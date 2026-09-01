<template>
  <div class="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-navy-800 transition-colors">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
      <!-- Left: Direct Contact & Helpline -->
      <div class="flex items-center space-x-4 flex-wrap justify-center md:justify-start">
        <a href="tel:03029355294" class="flex items-center space-x-1.5 hover:text-brand-300 transition-colors font-medium">
          <Phone class="w-3.5 h-3.5 text-brand-400" />
          <span>Call Helpline: <strong class="text-white">0302-9355294</strong></span>
        </a>
        <span class="text-navy-800">|</span>
        <a href="https://wa.me/923029355294" target="_blank" class="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
          <MessageCircle class="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Quick Order</span>
        </a>
        <span class="hidden lg:inline text-navy-800">|</span>
        <span class="hidden lg:flex items-center space-x-1 text-slate-400">
          <Truck class="w-3.5 h-3.5 text-accent-cyan" />
          <span>Nationwide Dispatch Across Pakistan</span>
        </span>
      </div>

      <!-- Right: Links & Admin Access -->
      <div class="flex items-center space-x-4 text-xs">
        <router-link to="/track" class="flex items-center space-x-1 hover:text-white transition-colors">
          <Compass class="w-3.5 h-3.5 text-brand-400" />
          <span>Track Order</span>
        </router-link>
        <span class="text-navy-800">|</span>
        <router-link to="/quote" class="hover:text-brand-300 transition-colors font-semibold text-brand-300 flex items-center space-x-1">
          <FileText class="w-3.5 h-3.5" />
          <span>Contractor / Bulk Quote</span>
        </router-link>
        <span class="text-navy-800">|</span>
        <router-link to="/admin/dashboard" class="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors bg-navy-850 px-2 py-0.5 rounded border border-navy-800 hover:border-brand-500">
          <Lock class="w-3 h-3 text-brand-400" />
          <span>Staff Portal</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Phone, MessageCircle, Truck, Compass, FileText, Lock } from 'lucide-vue-next';
</script>
