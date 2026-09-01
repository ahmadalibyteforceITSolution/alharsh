<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Home Hero Banners</h1>
        <p class="text-xs text-slate-400 mt-1">Manage carousel slides on the homepage in MongoDB</p>
      </div>
      <button @click="openAddBanner" class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5">
        <Plus class="w-4 h-4" />
        <span>Add Banner Slide</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="banner in productStore.banners" :key="banner._id" class="bg-navy-950 rounded-3xl border border-navy-800 overflow-hidden shadow-card flex flex-col justify-between">
        <div class="aspect-video bg-slate-800 relative overflow-hidden">
          <img :src="banner.image" :alt="banner.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <span class="bg-brand-600 text-2xs font-extrabold px-2 py-0.5 rounded">{{ banner.tag }}</span>
            <h3 class="text-sm font-bold mt-1 line-clamp-1">{{ banner.title }}</h3>
          </div>
        </div>
        <div class="p-5 space-y-3">
          <p class="text-xs text-slate-300">{{ banner.subtitle }}</p>
          <div class="pt-2 border-t border-navy-800 flex justify-between items-center text-xs">
            <span class="text-2xs text-accent-cyan font-bold font-mono">Link: {{ banner.buttonLink }}</span>
            <button @click="deleteBanner(banner._id)" class="text-rose-400 hover:text-rose-300 font-bold">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div @click="isModalOpen = false" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl text-white">
          <h3 class="font-bold text-sm text-white">Add Hero Slide</h3>
          <input v-model="form.title" placeholder="Title (e.g. HIGH PRESSURE PPRC PIPING)" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs" />
          <input v-model="form.highlightText" placeholder="Highlight Text" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs" />
          <textarea v-model="form.subtitle" rows="2" placeholder="Subtitle description..." class="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-xs"></textarea>
          <input v-model="form.image" placeholder="Image URL (https://...)" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs" />
          <div class="flex justify-end space-x-2 pt-2">
            <button @click="isModalOpen = false" class="px-4 py-2 text-xs text-slate-400">Cancel</button>
            <button @click="saveBanner" class="bg-brand-600 text-white font-bold px-5 py-2 rounded-xl text-xs">Save Slide</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../../stores/products';
import api from '../../services/api';
import { Plus, Trash2 } from 'lucide-vue-next';

const productStore = useProductStore();
const isModalOpen = ref(false);
const form = ref({
  title: '',
  highlightText: '',
  subtitle: '',
  image: '',
  buttonText: 'Shop Catalog',
  buttonLink: '/shop',
  tag: 'PREMIUM QUALITY'
});

const openAddBanner = () => {
  form.value = {
    title: 'ENGINEERED FOR SUPREME DURABILITY',
    highlightText: 'Popular Pipes Group',
    subtitle: '100% Virgin polymer pipes & sanitary fittings.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    buttonText: 'Explore Catalog',
    buttonLink: '/shop',
    tag: 'AUTHORISED DISTRIBUTOR'
  };
  isModalOpen.value = true;
};

const saveBanner = async () => {
  await api.post('/banners', form.value);
  await productStore.fetchBanners();
  isModalOpen.value = false;
};

const deleteBanner = async (id) => {
  if (confirm('Delete this banner from MongoDB?')) {
    await api.delete(`/banners/${id}`);
    await productStore.fetchBanners();
  }
};

onMounted(() => {
  productStore.fetchBanners();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
