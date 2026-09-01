<template>
  <div class="min-h-screen flex flex-col justify-between">
    <!-- Render Storefront Topbar & Navbar if not in admin area -->
    <template v-if="!isAdminRoute">
      <TopHeader />
      <Navbar />
    </template>

    <!-- Main Router View -->
    <div class="flex-1">
      <router-view />
    </div>

    <!-- Render Storefront Footer & Floating Actions if not in admin area -->
    <template v-if="!isAdminRoute">
      <Footer />
      <FloatingActions />
      <CartDrawer />
      <QuickViewModal />
      <BulkQuoteModal />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TopHeader from './components/layout/TopHeader.vue';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import FloatingActions from './components/layout/FloatingActions.vue';
import CartDrawer from './components/layout/CartDrawer.vue';
import QuickViewModal from './components/common/QuickViewModal.vue';
import BulkQuoteModal from './components/common/BulkQuoteModal.vue';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>
