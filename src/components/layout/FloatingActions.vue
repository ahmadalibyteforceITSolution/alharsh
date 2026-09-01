<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 items-end">
    <!-- Click to Call Floating Button -->
    <a 
      href="tel:03029355294"
      class="group flex items-center bg-brand-800 hover:bg-brand-700 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
      title="Call Helpline: 0302-9355294"
    >
      <Phone class="w-6 h-6 animate-pulse" />
      <span class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
        0302-9355294
      </span>
    </a>

    <!-- WhatsApp Floating Button -->
    <a 
      href="https://wa.me/923029355294?text=Hello%20AL-HRSH,%20I%20would%20like%20to%20inquire%20about%20products%20and%20rates." 
      target="_blank"
      class="group flex items-center bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
      title="Chat on WhatsApp"
    >
      <MessageCircle class="w-6 h-6" />
      <span class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
        WhatsApp Order
      </span>
    </a>
  </div>
</template>

<script setup>
import { Phone, MessageCircle } from 'lucide-vue-next';
</script>
