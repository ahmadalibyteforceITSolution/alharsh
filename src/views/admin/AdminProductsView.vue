<template>
  <div class="space-y-6">
    
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 rounded-3xl border border-navy-800 shadow-xl">
      <div>
        <h1 class="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <Package class="w-6 h-6 text-accent-cyan" />
          <span>MongoDB Products Inventory</span>
        </h1>
        <p class="text-xs text-slate-400 mt-1">Manage, add, and configure live store products stored directly in MongoDB Atlas</p>
      </div>

      <button 
        @click="openAddModal"
        class="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2 text-xs"
      >
        <Plus class="w-4 h-4" />
        <span>Add New Product</span>
      </button>
    </div>

    <!-- Alert / Toast Popup -->
    <div v-if="toastMessage" class="p-4 bg-emerald-950/80 border border-emerald-600 text-emerald-300 rounded-2xl text-xs flex items-center justify-between font-bold animate-bounce shadow-lg">
      <div class="flex items-center space-x-2">
        <CheckCircle class="w-5 h-5 text-emerald-400" />
        <span>{{ toastMessage }}</span>
      </div>
      <button @click="toastMessage = ''" class="text-emerald-400 hover:text-white">
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Error Alert Modal Popup (e.g. >20MB limit or upload issue) -->
    <div v-if="alertPopup" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        <div class="flex items-center space-x-3 text-rose-400">
          <div class="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800 flex items-center justify-center shrink-0">
            <AlertTriangle class="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 class="font-extrabold text-white text-sm">Image Upload Notice</h3>
            <p class="text-2xs text-rose-400 font-bold uppercase tracking-wider">File Size / Format Limit</p>
          </div>
        </div>

        <div class="p-3.5 bg-rose-950/40 rounded-2xl border border-rose-900/60 text-xs text-rose-200 leading-relaxed font-medium">
          {{ alertPopup }}
        </div>

        <div class="flex justify-end">
          <button 
            @click="alertPopup = ''" 
            class="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-2 rounded-xl text-xs shadow transition-all"
          >
            Understood
          </button>
        </div>
      </div>
    </div>

    <!-- Filter & Search Controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative md:col-span-2">
        <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search by title, SKU, brand, or specs..."
          class="w-full bg-slate-900 border border-slate-800 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <select 
          v-model="categoryFilter"
          class="w-full bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Sanitary">Sanitary</option>
          <option value="Electrical">Electrical</option>
          <option value="Hardware">Hardware</option>
        </select>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-slate-900 border border-navy-800 rounded-3xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-navy-950/80 text-slate-400 uppercase text-2xs font-bold border-b border-navy-800">
            <tr>
              <th class="py-3.5 px-4">Item</th>
              <th class="py-3.5 px-4">SKU / Brand</th>
              <th class="py-3.5 px-4">Category / Sub</th>
              <th class="py-3.5 px-4">Price / Unit</th>
              <th class="py-3.5 px-4">Stock</th>
              <th class="py-3.5 px-4">Badges</th>
              <th class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7" class="py-12 text-center text-slate-500">
                No products found in MongoDB. Click "Add New Product" to populate your catalog.
              </td>
            </tr>
            <tr v-for="item in filteredProducts" :key="item._id" class="hover:bg-slate-800/40 transition-colors">
              <td class="py-3 px-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                    <img :src="item.images?.[0] || '/images/placeholder.svg'" @error="onImgError" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div class="font-bold text-white max-w-xs truncate">{{ item.name }}</div>
                    <div class="text-2xs text-slate-400 mt-0.5">{{ item.specifications?.length || 0 }} specs configured</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="font-mono text-accent-cyan font-bold">{{ item.sku || 'N/A' }}</div>
                <div class="text-2xs text-slate-400">{{ item.brand || 'Generic' }}</div>
              </td>
              <td class="py-3 px-4">
                <span class="inline-block bg-slate-800 text-slate-200 px-2.5 py-1 rounded-full text-2xs font-bold">
                  {{ item.category }}
                </span>
                <div class="text-2xs text-slate-400 mt-1">{{ item.subcategory }}</div>
              </td>
              <td class="py-3 px-4">
                <div class="font-bold text-white">Rs. {{ item.price?.toLocaleString() }}</div>
                <div v-if="item.salePrice" class="text-2xs text-emerald-400 font-bold">Sale: Rs. {{ item.salePrice?.toLocaleString() }}</div>
                <div class="text-2xs text-slate-400">per {{ item.unit || 'Piece' }}</div>
              </td>
              <td class="py-3 px-4">
                <span :class="item.stock > 10 ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-rose-950 text-rose-400 border-rose-800'" class="px-2.5 py-1 rounded-full text-2xs font-bold border">
                  {{ item.stock }} in stock
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex flex-wrap gap-1">
                  <span v-if="item.featured" class="bg-amber-950 text-amber-400 text-2xs px-2 py-0.5 rounded border border-amber-800">Featured</span>
                  <span v-if="item.isNewArrival" class="bg-blue-950 text-blue-400 text-2xs px-2 py-0.5 rounded border border-blue-800">New</span>
                  <span v-if="item.bestSeller" class="bg-purple-950 text-purple-400 text-2xs px-2 py-0.5 rounded border border-purple-800">Best Seller</span>
                </div>
              </td>
              <td class="py-3 px-4 text-right space-x-2">
                <button @click="openEditModal(item)" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors" title="Edit Product">
                  <Edit2 class="w-3.5 h-3.5" />
                </button>
                <button @click="deleteProduct(item)" class="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded-lg transition-colors" title="Delete Product">
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Create/Edit Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
      <div class="bg-slate-900 border border-navy-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        <div class="flex justify-between items-center pb-4 border-b border-slate-800">
          <h2 class="text-base font-extrabold text-white">
            {{ isEditing ? 'Edit Product Details' : 'Add New Product to MongoDB' }}
          </h2>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-white">
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="saveProduct" class="space-y-4 pt-4 text-xs">
          
          <!-- Basic Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-300 mb-1">Product Title *</label>
              <input v-model="form.name" required placeholder="Popular PPRC Pipe PN-20 25mm (3/4 Inch)" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-300 mb-1">SKU Code (Auto or Manual)</label>
              <input v-model="form.sku" placeholder="ALH-SAN-PPRC-25" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-300 mb-1">Category *</label>
              <select v-model="form.category" @change="onCategoryChange" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none">
                <option value="Sanitary">Sanitary</option>
                <option value="Electrical">Electrical</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-300 mb-1">Subcategory</label>
              <input v-model="form.subcategory" placeholder="Pipes & Fittings (PPRC & PVC)" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-300 mb-1">Brand Name</label>
              <input v-model="form.brand" placeholder="Popular Pipes Group / Fast Cables" class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
          </div>

          <!-- Pricing & Stock -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label class="block font-bold text-slate-300 mb-1">Price (Rs.) *</label>
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

          <!-- Image Upload & URL Management with 20 MB Limit -->
          <div class="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700">
            <div class="flex justify-between items-center">
              <label class="block font-bold text-slate-300">Product Images</label>
              <span class="text-2xs bg-slate-800 text-amber-300 px-2 py-0.5 rounded-md font-bold border border-amber-800/40">
                Max Upload Limit: 20 MB
              </span>
            </div>
            
            <div class="flex gap-2">
              <input v-model="imageUrlInput" placeholder="Paste image URL (e.g. https://... or /images/...)" class="flex-1 bg-slate-800 border border-slate-700 text-white px-3.5 py-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              <button type="button" @click="addImageUrl" class="bg-brand-700 hover:bg-brand-600 px-4 py-2 rounded-xl text-white font-bold transition-colors">
                Add URL
              </button>
            </div>

            <div class="flex items-center gap-3 pt-1">
              <label class="text-2xs font-bold text-slate-400">Or Upload from Device:</label>
              <input 
                ref="fileInputRef"
                type="file" 
                @change="handleFileUpload" 
                accept="image/*" 
                class="text-2xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-700 file:text-white hover:file:bg-brand-600 cursor-pointer" 
              />
              <span v-if="uploadingImage" class="text-2xs text-brand-400 animate-pulse">Processing image...</span>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAdminStore } from '../../stores/admin';
import { Plus, Search, Package, Edit2, Trash2, X, CheckCircle, Save, AlertTriangle } from 'lucide-vue-next';

const adminStore = useAdminStore();
const searchQuery = ref('');
const categoryFilter = ref('All');
const isModalOpen = ref(false);
const isEditing = ref(false);
const saving = ref(false);
const uploadingImage = ref(false);
const imageUrlInput = ref('');
const toastMessage = ref('');
const alertPopup = ref('');
const fileInputRef = ref(null);

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

  // 20 MB size limit check
  const MAX_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    alertPopup.value = `The selected file is ${sizeInMB} MB. Maximum allowed image upload size is 20 MB. Please select an image under 20 MB.`;
    if (fileInputRef.value) fileInputRef.value.value = '';
    return;
  }

  uploadingImage.value = true;
  const res = await adminStore.uploadImage(file);
  uploadingImage.value = false;

  if (fileInputRef.value) fileInputRef.value.value = '';

  if (res?.success) {
    if (!form.value.images) form.value.images = [];
    // If it currently only contains placeholder, replace it
    if (form.value.images.length === 1 && form.value.images[0] === '/images/placeholder.svg') {
      form.value.images = [res.url];
    } else {
      form.value.images.push(res.url);
    }
    toastMessage.value = 'Image uploaded and attached successfully!';
  } else {
    alertPopup.value = res?.message || 'Image upload failed. Please try again.';
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
    alertPopup.value = e.message;
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
