<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div class="text-xs font-bold text-brand-700 uppercase tracking-widest">Get In Touch</div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Contact AL-HRSH Support & Sales</h1>
        <p class="text-xs sm:text-sm text-slate-500">Reach our commercial supply and customer care teams directly.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Contact Details & Store Info -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Direct Channels</h2>

            <div class="space-y-4 text-xs">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                  <Phone class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Call Helpline</div>
                  <a href="tel:03029355294" class="text-sm font-extrabold text-brand-900 hover:underline">0302-9355294</a>
                  <div class="text-2xs text-slate-500">Available Mon-Sat: 9:00 AM - 9:00 PM</div>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">WhatsApp Quick Orders</div>
                  <a href="https://wa.me/923029355294" target="_blank" class="text-sm font-extrabold text-emerald-700 hover:underline">+92 302 9355294</a>
                  <div class="text-2xs text-slate-500">Instant price quotes & photo inquiries</div>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                  <Mail class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Email Inquiries</div>
                  <a href="mailto:support@alharsh.com" class="text-sm font-extrabold text-slate-800 hover:underline">support@alharsh.com</a>
                  <div class="text-2xs text-slate-500">Official RFP and tender submissions</div>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <MapPin class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Central Logistics Hub</div>
                  <div class="text-xs font-bold text-slate-800">AL-HRSH Sanitary & Hardware Plaza</div>
                  <div class="text-2xs text-slate-500">Main Commercial Hub, Pakistan</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Google Map Interactive Preview -->
          <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-card overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.7645161879717!2d74.34149!3d31.50367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzEzLjIiTiA3NMKwMjAnMjkuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
              class="w-full h-48 rounded-2xl border-0" 
              loading="lazy"
            ></iframe>
          </div>

        </div>

        <!-- Right: Working Contact Form submitting to MongoDB -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <h2 class="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Send Us a Message</h2>

          <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs space-y-1">
            <div class="font-bold text-sm flex items-center space-x-1.5">
              <CheckCircle class="w-4 h-4 text-emerald-600" />
              <span>Message Sent Successfully!</span>
            </div>
            <p>{{ successMsg }}</p>
          </div>

          <form v-else @submit.prevent="submitContact" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input 
                  v-model="form.name" 
                  required 
                  placeholder="e.g. Asad Mahmood" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Phone Number (03xx-xxxxxxx) *</label>
                <input 
                  v-model="form.phone" 
                  required 
                  placeholder="0300-1234567" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder="asad@example.com" 
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Inquiry Subject</label>
                <select v-model="form.subject" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option>Product Inquiry & Price List</option>
                  <option>Order Delivery Status</option>
                  <option>Contractor / Bulk Project Quotation</option>
                  <option>Dealership / Retail Reselling</option>
                  <option>Other Question</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Your Message or Required Items *</label>
              <textarea 
                v-model="form.message" 
                rows="4" 
                required 
                placeholder="Type your message here..." 
                class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="sending"
              class="w-full sm:w-auto bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send class="w-4 h-4" />
              <span>{{ sending ? 'Sending Message...' : 'Send Message' }}</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { Phone, MessageCircle, Mail, MapPin, CheckCircle, Send } from 'lucide-vue-next';

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: 'Product Inquiry & Price List',
  message: ''
});

const sending = ref(false);
const successMsg = ref('');

const submitContact = async () => {
  sending.value = true;
  try {
    const res = await api.post('/inquiries', form.value);
    if (res.data.success) {
      successMsg.value = res.data.message;
      form.value = { name: '', phone: '', email: '', subject: 'Product Inquiry & Price List', message: '' };
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to submit inquiry');
  } finally {
    sending.value = false;
  }
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
