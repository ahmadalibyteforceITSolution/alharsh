<template>
  <div class="min-h-screen bg-navy-950 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-900 border border-navy-800 rounded-3xl p-8 shadow-2xl space-y-6">
      
      <!-- Brand Header -->
      <div class="text-center space-y-3">
        <div class="bg-white p-3 rounded-2xl inline-block shadow-md">
          <img src="/logo.png" alt="AL-HRSH Official Logo" class="h-12 w-auto object-contain mx-auto" />
        </div>
        <h1 class="text-xl font-extrabold text-white tracking-tight">AL-HRSH Staff & Admin Portal</h1>
        <p class="text-xs text-slate-400">Sign in with authorized staff credentials to manage MongoDB store catalog</p>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="p-3.5 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center space-x-2 font-medium">
        <AlertCircle class="w-4 h-4 shrink-0" />
        <span>{{ error }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4 text-xs">
        <div>
          <label class="block text-slate-300 font-bold mb-1.5">Admin Email</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            placeholder="admin@alharsh.com" 
            class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-3 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-slate-300 font-bold mb-1.5">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full bg-slate-800 border border-slate-700 text-white px-3.5 py-3 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Lock class="w-4 h-4" />
          <span>{{ loading ? 'Authenticating...' : 'Sign In To Admin Portal' }}</span>
        </button>
      </form>

      <!-- Default Credentials Hint -->
      <div class="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-2xs text-slate-400 space-y-1">
        <div class="font-bold text-slate-300">Default Staff Access:</div>
        <div>Email: <code class="text-accent-cyan">admin@alharsh.com</code></div>
        <div>Password: <code class="text-accent-cyan">admin12345</code></div>
      </div>

      <div class="text-center pt-2">
        <router-link to="/" class="text-2xs text-brand-400 hover:underline">
          &larr; Return to Customer Storefront
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '../../stores/admin';
import { AlertCircle, Lock } from 'lucide-vue-next';

const router = useRouter();
const adminStore = useAdminStore();

const email = ref('admin@alharsh.com');
const password = ref('admin12345');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  const result = await adminStore.login(email.value, password.value);
  loading.value = false;
  if (result.success) {
    router.push('/admin/dashboard');
  } else {
    error.value = result.message || 'Invalid email or password.';
  }
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
