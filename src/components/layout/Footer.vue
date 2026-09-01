<template>
  <footer class="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Top Trust Banner -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-navy-800 text-xs">
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center text-accent-cyan shrink-0">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-white text-sm">100% Genuine Supplies</h4>
            <p class="text-slate-400 text-2xs mt-0.5">Authorised channel distributor for certified brands</p>
          </div>
        </div>

        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center text-accent-cyan shrink-0">
            <Truck class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-white text-sm">Express Freight Delivery</h4>
            <p class="text-slate-400 text-2xs mt-0.5">Nationwide delivery for pipes, commodes & reels</p>
          </div>
        </div>

        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center text-accent-cyan shrink-0">
            <Headphones class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-white text-sm">24/7 Helpline: 0302-9355294</h4>
            <p class="text-slate-400 text-2xs mt-0.5">Direct phone & WhatsApp technical support</p>
          </div>
        </div>

        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center text-accent-cyan shrink-0">
            <FileSpreadsheet class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-white text-sm">Contractor BOQ Portal</h4>
            <p class="text-slate-400 text-2xs mt-0.5">Wholesale factory rates for commercial builders</p>
          </div>
        </div>
      </div>

      <!-- Main Footer Links Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        
        <!-- Company Info & Social Media -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="bg-white p-2 rounded-xl shadow-md">
              <img src="/logo.png" alt="AL-HRSH Official Logo" class="h-10 w-auto object-contain" />
            </div>
            <div>
              <span class="font-extrabold text-lg text-white tracking-wider block">AL-HRSH</span>
              <span class="text-2xs text-accent-cyan font-bold uppercase block -mt-1">Electrical, Hardware &amp; Sanitary Store</span>
            </div>
          </div>

          <p class="text-slate-400 leading-relaxed text-xs max-w-sm">
            Premier supplier of genuine building, plumbing, electrical, and hardware materials. Authorized channel distributor for Popular Pipes Group, Fast Cables, Schneider Electric, and Sonex Sanitary.
          </p>

          <!-- Social Media Buttons -->
          <div class="space-y-2 pt-1">
            <div class="text-2xs font-bold text-slate-400 uppercase">Connect With Us:</div>
            <div class="flex items-center space-x-3">
              <a 
                href="https://www.facebook.com/AlHRSHstore" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition-all"
                title="Follow us on Facebook"
              >
                <Facebook class="w-4 h-4" />
                <span>Facebook Page</span>
              </a>

              <a 
                href="https://wa.me/923029355294" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle class="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Sanitary Quick Links -->
        <div class="space-y-3">
          <h3 class="font-bold text-white text-sm uppercase tracking-wider text-accent-cyan">Sanitary Lines</h3>
          <ul class="space-y-2 text-slate-400">
            <li><router-link to="/shop?category=Sanitary&subcategory=Pipes+%26+Fittings+(PPRC+%26+PVC)" class="hover:text-white transition-colors">Popular PPRC Pipes</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Bathroom+Fittings+%26+Taps" class="hover:text-white transition-colors">Brass Bathroom Taps</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Commodes+%2F+Toilets" class="hover:text-white transition-colors">Commodes &amp; Suites</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Showers+%26+Shower+Sets" class="hover:text-white transition-colors">Rainfall Showers</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Water+Tanks+%26+Accessories" class="hover:text-white transition-colors">Water Tanks</router-link></li>
          </ul>
        </div>

        <!-- Electrical & Hardware Links -->
        <div class="space-y-3">
          <h3 class="font-bold text-white text-sm uppercase tracking-wider text-accent-cyan">Electrical &amp; Tools</h3>
          <ul class="space-y-2 text-slate-400">
            <li><router-link to="/shop?category=Electrical&subcategory=Wires+%26+Cables" class="hover:text-white transition-colors">Fast Cables 100% Copper</router-link></li>
            <li><router-link to="/shop?category=Electrical&subcategory=Circuit+Breakers+%26+DBs" class="hover:text-white transition-colors">Schneider MCB Breakers</router-link></li>
            <li><router-link to="/shop?category=Electrical&subcategory=Switches+%26+Sockets" class="hover:text-white transition-colors">Piano Glass Switches</router-link></li>
            <li><router-link to="/shop?category=Hardware&subcategory=Power+Tools" class="hover:text-white transition-colors">Power Drills &amp; Grinders</router-link></li>
            <li><router-link to="/shop?category=Hardware&subcategory=Locks%2C+Hinges+%26+Door+Fittings" class="hover:text-white transition-colors">Yale Mortise Locks</router-link></li>
          </ul>
        </div>

        <!-- Store Location & Google Maps -->
        <div class="space-y-3">
          <h3 class="font-bold text-white text-sm uppercase tracking-wider text-accent-cyan">Store Location</h3>
          <div class="space-y-2 text-slate-400">
            <div class="flex items-start space-x-2">
              <MapPin class="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong class="text-white block text-xs">Al-HRSH Store</strong>
                <span>Electrical, Hardware and Sanitary Store</span>
              </div>
            </div>
            <a 
              href="https://www.google.com/maps/place/Al-HRSH+Electrical+Hardware+and+Saintary+Store/@31.413118,74.3738413,17z/data=!3m1!4b1!4m6!3m5!1s0x391907122e1d61af:0x841df44bfa54f6d9!8m2!3d31.413118!4d74.3738413!16s%2Fg%2F11r2rn7g4r" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center space-x-1.5 text-accent-cyan hover:underline font-bold text-xs pt-1"
            >
              <Navigation class="w-3.5 h-3.5" />
              <span>Open in Google Maps &rarr;</span>
            </a>
            <div class="pt-2 text-2xs space-y-1 text-slate-300">
              <div>Helpline: <a href="tel:03029355294" class="font-bold text-white">0302-9355294</a></div>
              <div>Mobile: <a href="tel:03491175847" class="font-bold text-white">0349-1175847</a></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-navy-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-slate-400">
        <div>
          &copy; {{ new Date().getFullYear() }} AL-HRSH Electrical, Hardware &amp; Sanitary Store. All rights reserved.
        </div>
        <div class="flex items-center space-x-4">
          <router-link to="/policies" class="hover:text-white transition-colors">Privacy Policy</router-link>
          <router-link to="/policies" class="hover:text-white transition-colors">Terms of Service</router-link>
          <router-link to="/faq" class="hover:text-white transition-colors">FAQ</router-link>
          <router-link to="/admin" class="hover:text-white text-slate-400 transition-colors">Staff Portal</router-link>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ShieldCheck, Truck, Headphones, FileSpreadsheet, MapPin, Facebook, MessageCircle, Navigation } from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.7rem;
}
</style>
