<template>
  <div class="relative overflow-hidden bg-navy-950 text-white min-h-[480px] lg:min-h-[540px] flex items-center">
    
    <!-- Background Slides -->
    <div 
      v-for="(banner, index) in banners" 
      :key="banner._id || index"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <img 
        v-if="banner.image"
        :src="banner.image" 
        :alt="banner.title" 
        @error="onImgError"
        class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out" 
      />
      <div class="absolute inset-0 popular-blue-mesh opacity-95"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div v-if="activeBanner" class="max-w-2xl space-y-5 animate-fadeIn">
        
        <!-- Tag & Badge -->
        <div class="flex items-center space-x-2 flex-wrap gap-y-2">
          <span class="bg-brand-600/90 text-white text-2xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm border border-brand-400/30">
            {{ activeBanner.tag || 'CERTIFIED GENUINE SUPPLIES' }}
          </span>
          <span class="bg-navy-900/90 text-accent-cyan text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-accent-cyan/30 flex items-center space-x-1">
            <Award class="w-3.5 h-3.5 text-accent-cyan" />
            <span>{{ activeBanner.badgeText || 'ISO 9001:2015 TESTED' }}</span>
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {{ activeBanner.title }} <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-accent-cyan to-brand-100">
            {{ activeBanner.highlightText }}
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
          {{ activeBanner.subtitle }}
        </p>

        <!-- CTA Action Buttons -->
        <div class="flex items-center space-x-4 pt-2 flex-wrap gap-y-3">
          <router-link 
            :to="activeBanner.buttonLink || '/shop'" 
            class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 flex items-center space-x-2 active:scale-95"
          >
            <span>{{ activeBanner.buttonText || 'Explore Catalog' }}</span>
            <ArrowRight class="w-4 h-4" />
          </router-link>

          <router-link 
            :to="activeBanner.secondaryButtonLink || '/quote'" 
            class="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center space-x-2"
          >
            <FileText class="w-4 h-4 text-brand-300" />
            <span>{{ activeBanner.secondaryButtonText || 'Contractor Bulk Quote' }}</span>
          </router-link>
        </div>

        <!-- Highlights Row -->
        <div class="pt-6 grid grid-cols-3 gap-4 border-t border-slate-700/50 text-2xs text-slate-300 max-w-lg">
          <div class="flex items-center space-x-2">
            <CheckCircle2 class="w-4 h-4 text-accent-cyan shrink-0" />
            <span>100% Genuine Certified</span>
          </div>
          <div class="flex items-center space-x-2">
            <Truck class="w-4 h-4 text-brand-400 shrink-0" />
            <span>Fast Nationwide Dispatch</span>
          </div>
          <div class="flex items-center space-x-2">
            <Percent class="w-4 h-4 text-amber-400 shrink-0" />
            <span>Trade Wholesale Rates</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      v-if="banners.length > 1"
      @click="prevSlide" 
      class="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-navy-950/60 hover:bg-brand-800 text-white flex items-center justify-center backdrop-blur-sm transition-all"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <button 
      v-if="banners.length > 1"
      @click="nextSlide" 
      class="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-navy-950/60 hover:bg-brand-800 text-white flex items-center justify-center backdrop-blur-sm transition-all"
    >
      <ChevronRight class="w-6 h-6" />
    </button>

    <!-- Slide Indicators -->
    <div v-if="banners.length > 1" class="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
      <button 
        v-for="(_, idx) in banners" 
        :key="idx" 
        @click="currentSlide = idx" 
        class="h-2 rounded-full transition-all duration-300"
        :class="currentSlide === idx ? 'w-8 bg-brand-400' : 'w-2 bg-slate-500/50 hover:bg-slate-300'"
      ></button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ArrowRight, FileText, Award, CheckCircle2, Truck, Percent, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  }
});

const currentSlide = ref(0);
let timer = null;

const onImgError = (e) => {
  e.target.style.display = 'none';
};

const activeBanner = computed(() => {
  if (props.banners && props.banners.length > 0) {
    return props.banners[currentSlide.value] || props.banners[0];
  }
  return {
    title: 'AL-HRSH INDUSTRIAL SUPPLIES',
    highlightText: 'Sanitary, Electrical & Hardware Products',
    subtitle: 'Direct distributor rates, certified materials, and express nationwide freight across Pakistan.',
    buttonText: 'Explore Catalog',
    buttonLink: '/shop',
    secondaryButtonText: 'Request Bulk Quote',
    secondaryButtonLink: '/quote',
    tag: 'CERTIFIED GENUINE SUPPLIES',
    badgeText: 'ISO 9001:2015 TESTED'
  };
});

const nextSlide = () => {
  if (props.banners.length > 1) {
    currentSlide.value = (currentSlide.value + 1) % props.banners.length;
  }
};

const prevSlide = () => {
  if (props.banners.length > 1) {
    currentSlide.value = (currentSlide.value - 1 + props.banners.length) % props.banners.length;
  }
};

onMounted(() => {
  timer = setInterval(() => {
    nextSlide();
  }, 6000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.7rem;
}
</style>
