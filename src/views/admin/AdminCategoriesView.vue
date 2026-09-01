<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Category & Subcategory Hierarchy</h1>
        <p class="text-xs text-slate-400 mt-1">Manage Sanitary, Electrical & Hardware taxonomy in MongoDB</p>
      </div>
      <button @click="openAddCategory" class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center space-x-1.5">
        <Plus class="w-4 h-4" />
        <span>Add Category</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="cat in productStore.categories" :key="cat._id" class="bg-navy-950 rounded-3xl border border-navy-800 p-6 space-y-4 shadow-card">
        <div class="flex items-center justify-between border-b border-navy-800 pb-3">
          <div class="flex items-center space-x-2">
            <Layers class="w-5 h-5 text-brand-400" />
            <h3 class="font-extrabold text-white text-base">{{ cat.name }}</h3>
          </div>
          <span class="text-2xs bg-navy-900 text-slate-300 px-2 py-0.5 rounded font-mono">{{ cat.subcategories?.length || 0 }} Subs</span>
        </div>

        <p class="text-xs text-slate-400 line-clamp-2">{{ cat.description }}</p>

        <!-- Subcategories List -->
        <div class="space-y-1.5">
          <div class="text-2xs font-bold text-slate-400 uppercase">Child Subcategories:</div>
          <div class="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
            <div v-for="(sub, i) in cat.subcategories" :key="i" class="p-2 bg-navy-900 rounded-xl border border-navy-850 flex items-center justify-between">
              <span class="text-slate-200 font-medium">{{ sub.name }}</span>
            </div>
          </div>
        </div>

        <div class="pt-2 border-t border-navy-800 flex justify-between items-center text-xs">
          <button @click="openAddSubcategory(cat)" class="text-brand-400 hover:text-brand-300 font-bold flex items-center space-x-1">
            <Plus class="w-3.5 h-3.5" />
            <span>Add Subcategory</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div @click="isModalOpen = false" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-white">
          <h3 class="font-bold text-sm text-white">Add Subcategory to {{ selectedCat?.name }}</h3>
          <input v-model="newSubName" placeholder="Subcategory Name (e.g. Copper Solar Wires)" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs" />
          <div class="flex justify-end space-x-2 pt-2">
            <button @click="isModalOpen = false" class="px-4 py-2 text-xs text-slate-400">Cancel</button>
            <button @click="saveSubcategory" class="bg-brand-600 text-white font-bold px-5 py-2 rounded-xl text-xs">Save</button>
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
import { Plus, Layers } from 'lucide-vue-next';

const productStore = useProductStore();
const isModalOpen = ref(false);
const selectedCat = ref(null);
const newSubName = ref('');

const openAddSubcategory = (cat) => {
  selectedCat.value = cat;
  newSubName.value = '';
  isModalOpen.value = true;
};

const openAddCategory = async () => {
  const name = prompt('Enter new main Category name (e.g. Industrial Automation):');
  if (name) {
    await api.post('/categories', { name, description: 'Direct catalog line', subcategories: [] });
    await productStore.fetchCategories();
  }
};

const saveSubcategory = async () => {
  if (!newSubName.value.trim()) return;
  const currentSubs = selectedCat.value.subcategories || [];
  currentSubs.push({ name: newSubName.value.trim() });
  await api.put(`/categories/${selectedCat.value._id}`, { subcategories: currentSubs });
  await productStore.fetchCategories();
  isModalOpen.value = false;
};

onMounted(() => {
  productStore.fetchCategories();
});
</script>
