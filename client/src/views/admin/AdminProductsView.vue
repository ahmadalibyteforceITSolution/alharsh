<template>
  <div class="p-6 sm:p-10 space-y-6">
    
    <!-- Top Header & Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Products Catalog Management</h1>
        <p class="text-xs text-slate-400 mt-1">Upload, edit, manage stock, and delete items from MongoDB</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="openAddModal"
          class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center space-x-1.5"
        >
          <Plus class="w-4 h-4" />
          <span>Upload Product</span>
        </button>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-navy-950 p-4 rounded-2xl border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      <div class="relative flex-1 w-full sm:w-auto max-w-md">
        <input 
          v-model="searchQuery" 
          placeholder="Search products by title, SKU, or brand..." 
          class="w-full bg-slate-800 border border-slate-700 text-white pl-9 pr-4 py-2 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />
        <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
        <select 
          v-model="categoryFilter" 
          class="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Sanitary">Sanitary</option>
          <option value="Electrical">Electrical</option>
          <option value="Hardware">Hardware</option>
        </select>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-navy-950 rounded-3xl border border-navy-800 overflow-hidden shadow-card">
      <div v-if="adminStore.loading" class="py-20 text-center space-y-3">
        <div class="w-10 h-10 border-4 border-brand-400 border-t-brand-700 rounded-full animate-spin mx-auto"></div>
        <p class="text-xs text-slate-400 font-medium">Fetching catalog from MongoDB...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="py-16 text-center text-xs text-slate-400 space-y-3">
        <Package class="w-10 h-10 mx-auto text-slate-600" />
        <p>No products found in MongoDB for this filter.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead>
            <tr class="text-slate-400 uppercase tracking-wider text-2xs bg-navy-900 border-b border-navy-800">
              <th class="p-4">Product Info</th>
              <th class="p-4">Category / Sub</th>
              <th class="p-4 text-right">Price (PKR)</th>
              <th class="p-4 text-center">Stock</th>
              <th class="p-4 text-center">Badges</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy-800/60">
            <tr v-for="item in filteredProducts" :key="item._id" class="hover:bg-navy-900/50">
              <td class="p-4 flex items-center space-x-3">
                <img :src="item.images?.[0] || '/logo.png'" :alt="item.name" class="w-12 h-12 object-cover rounded-xl border border-slate-700 shrink-0 bg-slate-800" />
                <div class="truncate max-w-xs">
                  <div class="font-bold text-white truncate">{{ item.name }}</div>
                  <div class="text-2xs text-slate-400 font-mono">SKU: {{ item.sku }} &bull; Brand: {{ item.brand }}</div>
                </div>
              </td>

              <td class="p-4">
                <span class="inline-block font-bold text-white">{{ item.category }}</span>
                <div class="text-2xs text-slate-400">{{ item.subcategory }}</div>
              </td>

              <td class="p-4 text-right">
                <div class="font-bold text-white text-sm">Rs. {{ (item.salePrice || item.price).toLocaleString() }}</div>
                <div v-if="item.salePrice" class="text-2xs text-slate-400 line-through">Rs. {{ item.price.toLocaleString() }}</div>
              </td>

              <td class="p-4 text-center">
                <span 
                  class="font-bold text-2xs px-2.5 py-1 rounded-full uppercase"
                  :class="item.stock > 15 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'"
                >
                  {{ item.stock }} in stock
                </span>
              </td>

              <td class="p-4 text-center space-x-1">
                <span v-if="item.featured" class="bg-brand-950 text-brand-400 text-2xs px-2 py-0.5 rounded font-bold">Featured</span>
                <span v-if="item.bestSeller" class="bg-amber-950 text-amber-400 text-2xs px-2 py-0.5 rounded font-bold">Bestseller</span>
              </td>

              <td class="p-4 text-right space-x-2">
                <button @click="openEditModal(item)" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors" title="Edit">
                  <Edit2 class="w-3.5 h-3.5" />
                </button>
                <button @click="deleteProduct(item)" class="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded-lg transition-colors" title="Delete">
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Create/Edit Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div @click="isModalOpen = false" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
          
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 class="text-lg font-extrabold text-white">
              {{ isEditing ? 'Edit Product in MongoDB' : 'Upload New Product to MongoDB' }}
            </h2>
            <button @click="isModalOpen = false" class="p-1 text-slate-400 hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="saveProduct" class="space-y-4 text-xs">
            
            <!-- Title & SKU -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2">
                <label class="block font-bold text-slate-300 mb-1">Product Title *</label>
                <input v-model="form.name" required placeholder="e.g. Popular PPRC Pipe PN-20 32mm" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">SKU Code</label>
                <input v-model="form.sku" placeholder="ALH-SAN-001" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl uppercase focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
            </div>

            <!-- Category, Subcategory & Brand -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-slate-300 mb-1">Main Category *</label>
                <select v-model="form.category" required class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option value="Sanitary">Sanitary</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">Subcategory *</label>
                <input v-model="form.subcategory" required placeholder="e.g. Pipes & Fittings (PPRC & PVC)" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">Brand Name</label>
                <input v-model="form.brand" placeholder="e.g. Popular Pipes Group" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
            </div>

            <!-- Price, Sale Price, Stock & Unit -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label class="block font-bold text-slate-300 mb-1">Regular Price (PKR) *</label>
                <input v-model.number="form.price" type="number" required placeholder="1850" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">Sale Price (Optional)</label>
                <input v-model.number="form.salePrice" type="number" placeholder="1650" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">Stock Count</label>
                <input v-model.number="form.stock" type="number" placeholder="25" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">Unit</label>
                <input v-model="form.unit" placeholder="Piece / Length / Coil" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
            </div>

            <!-- Image URL & Manual Upload -->
            <div class="space-y-2">
              <label class="block font-bold text-slate-300">Product Image (URL or Upload File)</label>
              <div class="flex gap-2">
                <input v-model="imageUrlInput" placeholder="Paste image URL (e.g. https://...)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                <button type="button" @click="addImageUrl" class="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-xl text-white font-bold">Add URL</button>
              </div>

              <div class="flex items-center gap-2 pt-1">
                <input type="file" @change="handleFileUpload" accept="image/*" class="text-2xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-700 file:text-white hover:file:bg-brand-600" />
                <span v-if="uploadingImage" class="text-2xs text-brand-400">Uploading to server...</span>
              </div>

              <!-- Added Images List -->
              <div v-if="form.images.length > 0" class="flex gap-2 pt-2 overflow-x-auto">
                <div v-for="(img, i) in form.images" :key="i" class="relative w-16 h-16 rounded-xl border border-slate-700 overflow-hidden shrink-0 group">
                  <img :src="img" class="w-full h-full object-cover" />
                  <button type="button" @click="form.images.splice(i, 1)" class="absolute inset-0 bg-rose-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block font-bold text-slate-300 mb-1">Product Description</label>
              <textarea v-model="form.description" rows="3" placeholder="Full technical specifications and applications..." class="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"></textarea>
            </div>

            <!-- Dynamic Specifications Builder -->
            <div class="space-y-2 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
              <div class="flex items-center justify-between">
                <label class="font-bold text-slate-300">Technical Specifications (Key & Value)</label>
                <button type="button" @click="addSpecRow" class="text-2xs bg-brand-700 text-white px-2.5 py-1 rounded-lg font-bold hover:bg-brand-600">+ Add Spec</button>
              </div>

              <div v-for="(spec, index) in form.specifications" :key="index" class="flex gap-2 items-center">
                <input v-model="spec.label" placeholder="Attribute (e.g. Pressure Rating)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs" />
                <input v-model="spec.value" placeholder="Value (e.g. PN-20 / 20 Bar)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs" />
                <button type="button" @click="form.specifications.splice(index, 1)" class="text-rose-400 hover:text-rose-300 p-1">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Badges Checkboxes -->
            <div class="flex items-center gap-6 pt-1">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="form.featured" class="rounded text-brand-600 focus:ring-brand-500" />
                <span>Featured on Homepage</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="form.bestSeller" class="rounded text-brand-600 focus:ring-brand-500" />
                <span>Best Seller Badge</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="form.isNewArrival" class="rounded text-brand-600 focus:ring-brand-500" />
                <span>New Arrival</span>
              </label>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button type="button" @click="isModalOpen = false" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold">Cancel</button>
              <button type="submit" :disabled="saving" class="bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-2.5 rounded-xl shadow-lg transition-colors disabled:opacity-50">
                {{ saving ? 'Saving to MongoDB...' : 'Save Product' }}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { Plus, Search, Package, Edit2, Trash2, X } from 'lucide-vue-next';

const adminStore = useAdminStore();
const searchQuery = ref('');
const categoryFilter = ref('All');
const isModalOpen = ref(false);
const isEditing = ref(false);
const saving = ref(false);
const uploadingImage = ref(false);
const imageUrlInput = ref('');

const form = ref({
  _id: null,
  name: '',
  sku: '',
  category: 'Sanitary',
  subcategory: 'Pipes & Fittings (PPRC & PVC)',
  brand: 'Popular Pipes Group',
  price: 1000,
  salePrice: null,
  stock: 25,
  unit: 'Piece',
  images: [],
  description: '',
  specifications: [{ label: 'Pressure Rating', value: 'PN-20' }],
  featured: false,
  bestSeller: false,
  isNewArrival: false
});

const filteredProducts = computed(() => {
  return adminStore.products.filter(p => {
    const matchCat = categoryFilter.value === 'All' || p.category === categoryFilter.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)) || (p.brand && p.brand.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
});

const openAddModal = () => {
  isEditing.value = false;
  form.value = {
    _id: null,
    name: '',
    sku: `ALH-${Math.floor(1000 + Math.random() * 9000)}`,
    category: 'Sanitary',
    subcategory: 'Pipes & Fittings (PPRC & PVC)',
    brand: 'Popular Pipes Group',
    price: 1500,
    salePrice: null,
    stock: 50,
    unit: 'Piece',
    images: ['https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80'],
    description: '',
    specifications: [
      { label: 'Standard', value: 'DIN 8077/8078' },
      { label: 'Material', value: '100% Virgin PPRC Type-3' }
    ],
    featured: false,
    bestSeller: false,
    isNewArrival: true
  };
  isModalOpen.value = true;
};

const openEditModal = (item) => {
  isEditing.value = true;
  form.value = JSON.parse(JSON.stringify(item));
  if (!form.value.images) form.value.images = [];
  if (!form.value.specifications) form.value.specifications = [];
  isModalOpen.value = true;
};

const addImageUrl = () => {
  if (imageUrlInput.value.trim()) {
    form.value.images.push(imageUrlInput.value.trim());
    imageUrlInput.value = '';
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  uploadingImage.value = true;
  const res = await adminStore.uploadImage(file);
  uploadingImage.value = false;
  if (res?.success) {
    form.value.images.push(res.url);
  } else {
    alert(res?.message || 'Upload failed');
  }
};

const addSpecRow = () => {
  form.value.specifications.push({ label: '', value: '' });
};

const saveProduct = async () => {
  saving.value = true;
  try {
    if (isEditing.value && form.value._id) {
      await adminStore.updateProduct(form.value._id, form.value);
    } else {
      await adminStore.createProduct(form.value);
    }
    isModalOpen.value = false;
  } catch (e) {
    alert(e.message);
  } finally {
    saving.value = false;
  }
};

const deleteProduct = async (item) => {
  if (confirm(`Are you sure you want to permanently delete "${item.name}" from MongoDB?`)) {
    await adminStore.deleteProduct(item._id);
  }
};

onMounted(() => {
  adminStore.fetchProducts();
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
