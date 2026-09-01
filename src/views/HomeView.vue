<template>
  <div>
    <!-- Hero Banner Slider -->
    <HeroSlider :banners="productStore.banners" />

    <!-- Core Categories Grid -->
    <CategoryGrid />

    <!-- Popular Pipes Group Engineering Showcase -->
    <PipesShowcase />

    <!-- Featured Products Showcase with Tabs -->
    <FeaturedShowcase :products="productStore.products" />

    <!-- Bulk Contractor Quote Banner Section -->
    <BulkQuoteSection />

    <!-- Why Choose Us -->
    <WhyChooseUs />

    <!-- Brand Partners -->
    <BrandPartners />

    <!-- Testimonials -->
    <Testimonials />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/products';
import HeroSlider from '../components/home/HeroSlider.vue';
import CategoryGrid from '../components/home/CategoryGrid.vue';
import PipesShowcase from '../components/home/PipesShowcase.vue';
import FeaturedShowcase from '../components/home/FeaturedShowcase.vue';
import BulkQuoteSection from '../components/home/BulkQuoteSection.vue';
import WhyChooseUs from '../components/home/WhyChooseUs.vue';
import BrandPartners from '../components/home/BrandPartners.vue';
import Testimonials from '../components/home/Testimonials.vue';

const productStore = useProductStore();

onMounted(async () => {
  await Promise.all([
    productStore.fetchBanners(),
    productStore.fetchCategories(),
    productStore.fetchProducts({ limit: 20 })
  ]);
});
</script>
