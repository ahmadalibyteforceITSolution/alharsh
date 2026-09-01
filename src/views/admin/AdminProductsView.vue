<template>
  <div class="p-6 sm:p-10 space-y-6">
    
    <!-- Top Header & Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Products Catalog Management</h1>
        <p class="text-xs text-slate-400 mt-1">Upload and manage all product data, specs, and images in MongoDB Atlas</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="openAddModal"
          class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg hover:shadow-glow transition-all flex items-center space-x-2"
        >
          <Plus class="w-4 h-4" />
          <span>Upload New Product</span>
        </button>
      </div>
    </div>

    <!-- Alert Toast Message -->
    <div v-if="toastMessage" class="p-4 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fadeIn">
      <div class="flex items-center space-x-2">
        <CheckCircle class="w-5 h-5 text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
      <button @click="toastMessage = ''" class="text-emerald-400 hover:text-emerald-200">
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-navy-950 p-4 rounded-2xl border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      <div class="relative flex-1 w-full sm:w-auto max-w-md">
        <input 
          v-model="searchQuery" 
          placeholder="Search products by title, SKU, or brand..." 
          class="w-full bg-slate-800 border border-slate-700 text-white pl-9 pr-4 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />
        <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
        <select 
          v-model="categoryFilter" 
          class="bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
        <p class="text-xs text-slate-400 font-medium">Fetching catalog live from MongoDB Atlas...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="py-20 text-center text-xs text-slate-400 space-y-4">
        <div class="w-14 h-14 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <Package class="w-7 h-7" />
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-sm">No Products in Database Yet</h3>
          <p class="text-slate-400 max-w-sm mx-auto">Click "Upload New Product" above to manually add your first product with images and technical specifications.</p>
        </div>
        <button @click="openAddModal" class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition-colors">
          + Add First Product
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead>
            <tr class="text-slate-400 uppercase tracking-wider text-2xs bg-navy-900 border-b border-navy-800">
              <th class="p-4">Product Info</th>
              <th class="p-4">Category / Sub</th>
              <th class="p-4 text-right">Price (PKR)</th>
              <th class="p-4 text-center">Stock</th>
              <th class="p-4 text-center">Specifications</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy-800/60">
            <tr v-for="item in filteredProducts" :key="item._id" class="hover:bg-navy-900/50">
              <td class="p-4 flex items-center space-x-3">
                <img 
                  :src="item.images?.[0] || '/images/placeholder.svg'" 
                  :alt="item.name" 
                  @error="onImgError"
                  class="w-12 h-12 object-cover rounded-xl border border-slate-700 shrink-0 bg-slate-800" 
                />
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
                <div class="text-2xs text-slate-400">per {{ item.unit }}</div>
              </td>

              <td class="p-4 text-center">
                <span 
                  class="font-bold text-2xs px-2.5 py-1 rounded-full uppercase"
                  :class="item.stock > 10 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'"
                >
                  {{ item.stock }} in stock
                </span>
              </td>

              <td class="p-4 text-center">
                <span class="bg-slate-800 text-slate-300 text-2xs px-2.5 py-1 rounded-lg font-mono">
                  {{ item.specifications?.length || 0 }} specs
                </span>
              </td>

              <td class="p-4 text-right space-x-2">
                <button @click="openEditModal(item)" class="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors" title="Edit">
                  <Edit2 class="w-3.5 h-3.5" />
                </button>
                <button @click="deleteProduct(item)" class="p-2 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded-lg transition-colors" title="Delete">
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Create/Edit Modal with Complete Field Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div @click="isModalOpen = false" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
          
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="text-lg font-extrabold text-white">
                {{ isEditing ? 'Edit Product in MongoDB Atlas' : 'Upload Product to MongoDB Atlas' }}
              </h2>
              <p class="text-2xs text-slate-400">All data, specs, and images are saved permanently to MongoDB</p>
            </div>
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
                <input v-model="form.sku" placeholder="ALH-SAN-001" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl uppercase font-mono focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
            </div>

            <!-- Category, Subcategory & Brand -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-slate-300 mb-1">Main Category *</label>
                <select v-model="form.category" @change="onCategoryChange" required class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none">
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
                <input v-model="form.brand" placeholder="e.g. Popular Pipes Group / Fast Cables" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
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
                <label class="block font-bold text-slate-300 mb-1">Stock Quantity</label>
                <input v-model.number="form.stock" type="number" placeholder="50" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-300 mb-1">Unit</label>
                <select v-model="form.unit" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option value="Piece">Piece</option>
                  <option value="Length (4 Meter)">Length (4 Meter)</option>
                  <option value="Coil (90 Meter)">Coil (90 Meter)</option>
                  <option value="Meter">Meter</option>
                  <option value="Set">Set</option>
                  <option value="Box">Box</option>
                  <option value="Pair">Pair</option>
                  <option value="Pack">Pack</option>
                </select>
              </div>
            </div>

            <!-- Image Upload & URL Management -->
            <div class="space-y-2 bg-slate-800/40 p-4 rounded-2xl border border-slate-700">
              <label class="block font-bold text-slate-300">Product Images</label>
              
              <div class="flex gap-2">
                <input v-model="imageUrlInput" placeholder="Paste image URL (e.g. https://... or /images/...)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3.5 py-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                <button type="button" @click="addImageUrl" class="bg-brand-700 hover:bg-brand-600 px-4 py-2 rounded-xl text-white font-bold transition-colors">
                  Add Image URL
                </button>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <label class="text-2xs font-bold text-slate-400">Or Upload from Device:</label>
                <input type="file" @change="handleFileUpload" accept="image/*" class="text-2xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-700 file:text-white hover:file:bg-brand-600 cursor-pointer" />
                <span v-if="uploadingImage" class="text-2xs text-brand-400 animate-pulse">Uploading to server...</span>
              </div>

              <!-- Image Thumbnails Preview -->
              <div v-if="form.images && form.images.length > 0" class="flex gap-3 pt-2 overflow-x-auto">
                <div v-for="(img, i) in form.images" :key="i" class="relative w-16 h-16 rounded-xl border border-slate-700 overflow-hidden shrink-0 group">
                  <img :src="img" @error="onImgError" class="w-full h-full object-cover" />
                  <button type="button" @click="form.images.splice(i, 1)" class="absolute inset-0 bg-rose-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Remove Image">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block font-bold text-slate-300 mb-1">Product Description / Features Summary</label>
              <textarea v-model="form.description" rows="3" placeholder="Provide complete technical details, manufacturing certifications, applications, and installation guides..." class="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"></textarea>
            </div>

            <!-- Dynamic Technical Specifications Builder -->
            <div class="space-y-2.5 bg-slate-800/40 p-4 rounded-2xl border border-slate-700">
              <div class="flex items-center justify-between">
                <div>
                  <label class="font-bold text-slate-300 block">Technical Specifications Table</label>
                  <span class="text-2xs text-slate-400">Attributes displayed in table on product page</span>
                </div>
                <button type="button" @click="addSpecRow" class="text-2xs bg-brand-700 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-brand-600 transition-colors flex items-center space-x-1">
                  <Plus class="w-3 h-3" />
                  <span>Add Spec Row</span>
                </button>
              </div>

              <div v-for="(spec, index) in form.specifications" :key="index" class="flex gap-2 items-center">
                <input v-model="spec.label" placeholder="Attribute (e.g. Pressure Rating, Conductor Gauge)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                <input v-model="spec.value" placeholder="Value (e.g. PN-20 / 20 Bar, 99.99% Pure Copper)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                <button type="button" @click="form.specifications.splice(index, 1)" class="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-950">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Badges Checkboxes -->
            <div class="flex items-center gap-6 pt-1 flex-wrap">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="form.featured" class="rounded text-brand-600 focus:ring-brand-500" />
                <span>Show in Homepage Featured</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="form.bestSeller" class="rounded text-brand-600 focus:ring-brand-500" />
                <span>Best Seller Badge</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="form.isNewArrival" class="rounded text-brand-600 focus:ring-brand-500" />
                <span>New Arrival Badge</span>
              </label>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button type="button" @click="isModalOpen = false" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold">Cancel</button>
              <button type="submit" :disabled="saving" class="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-2.5 rounded-xl shadow-lg transition-colors disabled:opacity-50 flex items-center space-x-2">
                <Save class="w-4 h-4" />
                <span>{{ saving ? 'Saving into MongoDB...' : 'Save Product to Database' }}</span>
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
import { Plus, Search, Package, Edit2, Trash2, X, CheckCircle, Save } from 'lucide-vue-next';

const adminStore = useAdminStore();
const searchQuery = ref('');
const categoryFilter = ref('All');
const isModalOpen = ref(false);
const isEditing = ref(false);
const saving = ref(false);
const uploadingImage = ref(false);
const imageUrlInput = ref('');
const toastMessage = ref('');

const onImgError = (e) => {
  e.target.src = '/images/placeholder.svg';
};

const form = ref({
  _id: null,
  name: '',
  sku: '',
  category: 'Sanitary',
  subcategory: 'Pipes & Fittings (PPRC & PVC)',
  brand: 'Popular Pipes Group',
  price: 1500,
  salePrice: null,
  stock: 50,
  unit: 'Piece',
  images: [],
  description: '',
  specifications: [
    { label: 'Pressure Rating', value: 'PN-20' },
    { label: 'Standard', value: 'DIN 8077/8078' }
  ],
  featured: true,
  bestSeller: false,
  isNewArrival: true
});

const filteredProducts = computed(() => {
  return adminStore.products.filter(p => {
    const matchCat = categoryFilter.value === 'All' || p.category === categoryFilter.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)) || (p.brand && p.brand.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
});

const onCategoryChange = () => {
  if (form.value.category === 'Sanitary') {
    form.value.subcategory = 'Pipes & Fittings (PPRC & PVC)';
    form.value.brand = 'Popular Pipes Group';
  } else if (form.value.category === 'Electrical') {
    form.value.subcategory = 'Wires & Cables';
    form.value.brand = 'Fast Cables';
  } else {
    form.value.subcategory = 'Power Tools';
    form.value.brand = 'Bosch / Makita';
  }
};

const openAddModal = () => {
  isEditing.value = false;
  form.value = {
    _id: null,
    name: '',
    sku: `ALH-SAN-${Math.floor(1000 + Math.random() * 9000)}`,
    category: 'Sanitary',
    subcategory: 'Pipes & Fittings (PPRC & PVC)',
    brand: 'Popular Pipes Group',
    price: 1800,
    salePrice: null,
    stock: 50,
    unit: 'Piece',
    images: ['/images/placeholder.svg'],
    description: 'Manufactured with 100% pure certified virgin materials. Resistant to scaling, chemical corrosion, and high operating temperatures.',
    specifications: [
      { label: 'Standard', value: 'DIN 8077/8078' },
      { label: 'Pressure Rating', value: 'PN-20' },
      { label: 'Warranty', value: '50 Years Guarantee' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true
  };
  isModalOpen.value = true;
};

const openEditModal = (item) => {
  isEditing.value = true;
  form.value = JSON.parse(JSON.stringify(item));
  if (!form.value.images || form.value.images.length === 0) form.value.images = ['/images/placeholder.svg'];
  if (!form.value.specifications) form.value.specifications = [];
  isModalOpen.value = true;
};

const addImageUrl = () => {
  if (imageUrlInput.value.trim()) {
    if (!form.value.images) form.value.images = [];
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
    if (!form.value.images) form.value.images = [];
    form.value.images.push(res.url);
  } else {
    alert(res?.message || 'Upload failed');
  }
};

const addSpecRow = () => {
  if (!form.value.specifications) form.value.specifications = [];
  form.value.specifications.push({ label: '', value: '' });
};

const saveProduct = async () => {
  saving.value = true;
  try {
    if (isEditing.value && form.value._id) {
      await adminStore.updateProduct(form.value._id, form.value);
      toastMessage.value = `Product "${form.value.name}" updated in MongoDB successfully!`;
    } else {
      await adminStore.createProduct(form.value);
      toastMessage.value = `Product "${form.value.name}" saved into MongoDB Atlas successfully!`;
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
    toastMessage.value = `Product "${item.name}" deleted from MongoDB.`;
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
