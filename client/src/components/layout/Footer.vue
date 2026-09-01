<template>
  <footer class="bg-navy-950 text-slate-300 pt-16 pb-8 border-t-4 border-brand-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid: Brand & Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
        
        <!-- Col 1 & 2: Company Intro -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white p-2.5 rounded-xl inline-block shadow-md">
            <img src="/logo.png" alt="AL-HRSH Official Logo" class="h-12 w-auto object-contain" />
          </div>
          <p class="text-xs text-slate-400 leading-relaxed pr-6">
            AL-HRSH is Pakistan's premier supplier and authorized distributor of certified Sanitary Ware, Popular PPRC & UPVC Piping Systems, Fast Cables, Schneider Switchgear, and heavy-duty Industrial Hardware Tools.
          </p>
          <div class="pt-2 space-y-2 text-xs">
            <div class="flex items-center space-x-3 text-slate-300">
              <Phone class="w-4 h-4 text-brand-400 shrink-0" />
              <span>Direct Phone: <strong class="text-white">0302-9355294</strong></span>
            </div>
            <div class="flex items-center space-x-3 text-slate-300">
              <MessageCircle class="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: <strong class="text-emerald-400">+92 302 9355294</strong></span>
            </div>
            <div class="flex items-center space-x-3 text-slate-300">
              <Mail class="w-4 h-4 text-accent-cyan shrink-0" />
              <span>Email: <strong class="text-white">support@alharsh.com</strong></span>
            </div>
            <div class="flex items-center space-x-3 text-slate-300">
              <MapPin class="w-4 h-4 text-rose-400 shrink-0" />
              <span>Central Distribution Warehouse & Showroom, Pakistan</span>
            </div>
          </div>
        </div>

        <!-- Col 3: Sanitary Categories -->
        <div>
          <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">Sanitary Range</h4>
          <ul class="space-y-2 text-xs">
            <li><router-link to="/shop?category=Sanitary&subcategory=Pipes+%26+Fittings+(PPRC+%26+PVC)" class="hover:text-brand-300 transition-colors">Popular PPRC Pipes PN20</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Bathroom+Fittings+%26+Taps" class="hover:text-brand-300 transition-colors">Brass Basin Mixers & Taps</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Commodes+%2F+Toilets" class="hover:text-brand-300 transition-colors">One-Piece Commode Suites</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Showers+%26+Shower+Sets" class="hover:text-brand-300 transition-colors">Rainfall Shower Systems</router-link></li>
            <li><router-link to="/shop?category=Sanitary&subcategory=Water+Tanks+%26+Accessories" class="hover:text-brand-300 transition-colors">Antibacterial Water Tanks</router-link></li>
            <li><router-link to="/shop?category=Sanitary" class="text-brand-400 hover:text-brand-300 font-semibold mt-1 inline-block">Browse All Sanitary &rarr;</router-link></li>
          </ul>
        </div>

        <!-- Col 4: Electrical & Hardware -->
        <div>
          <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">Electrical & Hardware</h4>
          <ul class="space-y-2 text-xs">
            <li><router-link to="/shop?category=Electrical&subcategory=Wires+%26+Cables" class="hover:text-brand-300 transition-colors">Fast Cables 100% Copper</router-link></li>
            <li><router-link to="/shop?category=Electrical&subcategory=Circuit+Breakers+%26+DBs" class="hover:text-brand-300 transition-colors">Schneider MCBs & DBs</router-link></li>
            <li><router-link to="/shop?category=Electrical&subcategory=Switches+%26+Sockets" class="hover:text-brand-300 transition-colors">Luxury Glass Switch Plates</router-link></li>
            <li><router-link to="/shop?category=Hardware&subcategory=Power+Tools" class="hover:text-brand-300 transition-colors">Rotary Hammers & Grinders</router-link></li>
            <li><router-link to="/shop?category=Hardware&subcategory=Locks%2C+Hinges+%26+Door+Fittings" class="hover:text-brand-300 transition-colors">Mortise Locks & Hinges</router-link></li>
            <li><router-link to="/shop?category=Hardware" class="text-brand-400 hover:text-brand-300 font-semibold mt-1 inline-block">Browse All Hardware &rarr;</router-link></li>
          </ul>
        </div>

        <!-- Col 5: Customer Service & Quick Links -->
        <div>
          <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">Customer Care</h4>
          <ul class="space-y-2 text-xs">
            <li><router-link to="/track" class="hover:text-brand-300 transition-colors">Track Your Order Live</router-link></li>
            <li><router-link to="/quote" class="text-brand-300 font-semibold hover:underline">Request Wholesale / B2B Quote</router-link></li>
            <li><router-link to="/about" class="hover:text-brand-300 transition-colors">About AL-HRSH</router-link></li>
            <li><router-link to="/contact" class="hover:text-brand-300 transition-colors">Store Location & Map</router-link></li>
            <li><router-link to="/faq" class="hover:text-brand-300 transition-colors">Frequently Asked Questions</router-link></li>
            <li><router-link to="/policies" class="hover:text-brand-300 transition-colors">Shipping & Return Policies</router-link></li>
            <li><router-link to="/admin/dashboard" class="text-slate-400 hover:text-white">Admin Management Portal</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Trust Badges Bar -->
      <div class="py-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-navy-800 text-xs">
        <div class="flex items-center space-x-3 text-slate-300">
          <ShieldCheck class="w-6 h-6 text-brand-400 shrink-0" />
          <div>
            <div class="font-bold text-white">100% Genuine Brands</div>
            <div class="text-2xs text-slate-400">Direct factory warranty</div>
          </div>
        </div>
        <div class="flex items-center space-x-3 text-slate-300">
          <Truck class="w-6 h-6 text-accent-cyan shrink-0" />
          <div>
            <div class="font-bold text-white">Fast Nationwide Delivery</div>
            <div class="text-2xs text-slate-400">Safe freight for pipes & sanitary</div>
          </div>
        </div>
        <div class="flex items-center space-x-3 text-slate-300">
          <CreditCard class="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <div class="font-bold text-white">COD & Online Payments</div>
            <div class="text-2xs text-slate-400">JazzCash, Easypaisa & Bank Transfer</div>
          </div>
        </div>
        <div class="flex items-center space-x-3 text-slate-300">
          <Headphones class="w-6 h-6 text-accent-orange shrink-0" />
          <div>
            <div class="font-bold text-white">Technical Support</div>
            <div class="text-2xs text-slate-400">Call 0302-9355294</div>
          </div>
        </div>
      </div>

      <!-- Bottom: Copyright & Legal -->
      <div class="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          &copy; 2026 <strong>AL-HRSH (Sanitary, Electrical & Hardware Products)</strong>. All Rights Reserved.
        </div>
        <div class="flex items-center space-x-6">
          <router-link to="/policies" class="hover:text-white">Terms & Conditions</router-link>
          <router-link to="/policies" class="hover:text-white">Privacy Policy</router-link>
          <router-link to="/policies" class="hover:text-white">Refund Policy</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-vue-next';
</script>

<style scoped>
.text-2xs {
  font-size: 0.65rem;
}
</style>
