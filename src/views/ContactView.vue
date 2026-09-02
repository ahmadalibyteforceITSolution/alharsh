<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div class="text-xs font-bold text-brand-700 uppercase tracking-widest">Get In Touch</div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Contact AL-HRSH Store</h1>
        <p class="text-xs sm:text-sm text-slate-500">Visit our store, call our direct helpline, or send a project inquiry.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Contact Details & Store Info -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Store & Direct Channels</h2>

            <div class="space-y-4 text-xs">
              <!-- Helpline Phone -->
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                  <Phone class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Call Helpline</div>
                  <a href="tel:03029355294" class="text-sm font-extrabold text-brand-900 hover:underline">0302-9355294</a>
                  <div class="text-2xs text-slate-500">Alt Phone: <a href="tel:03491175847" class="font-bold text-slate-700">0349-1175847</a></div>
                </div>
              </div>

              <!-- WhatsApp -->
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

              <!-- Facebook Social Page -->
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Facebook class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Official Facebook Page</div>
                  <a href="https://www.facebook.com/AlHRSHstore" target="_blank" class="text-sm font-extrabold text-blue-600 hover:underline">facebook.com/AlHRSHstore</a>
                  <div class="text-2xs text-slate-500">Latest stock arrivals & customer updates</div>
                </div>
              </div>

              <!-- Email Link -->
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <Mail class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Official Email</div>
                  <a href="mailto:alhrsh114333@gmail.com" class="text-sm font-extrabold text-rose-700 hover:underline">alhrsh114333@gmail.com</a>
                  <div class="text-2xs text-slate-500">Direct inquiries & quotation requests</div>
                </div>
              </div>

              <!-- Physical Location -->
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <MapPin class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-2xs text-slate-400 font-bold uppercase">Physical Store Location</div>
                  <div class="text-xs font-bold text-slate-800">Al-HRSH Electrical Hardware and Sanitary Store</div>
                  <a 
                    href="https://www.google.com/maps/place/Al-HRSH+Electrical+Hardware+and+Saintary+Store/@31.413118,74.3738413,17z/data=!3m1!4b1!4m6!3m5!1s0x391907122e1d61af:0x841df44bfa54f6d9!8m2!3d31.413118!4d74.3738413!16s%2Fg%2F11r2rn7g4r" 
                    target="_blank" 
                    class="text-2xs text-brand-700 font-bold hover:underline inline-flex items-center space-x-1 mt-1"
                  >
                    <span>View on Google Maps &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Embedded Google Map -->
          <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-card overflow-hidden space-y-2">
            <div class="flex items-center justify-between text-xs px-2 font-bold text-slate-700">
              <span>Google Maps Location</span>
              <a 
                href="https://www.google.com/maps/place/Al-HRSH+Electrical+Hardware+and+Saintary+Store/@31.413118,74.3738413,17z" 
                target="_blank" 
                class="text-2xs text-brand-700 hover:underline"
              >
                Open Fullscreen
              </a>
            </div>
            <iframe 
              src="https://maps.google.com/maps?q=31.413118,74.3738413&hl=en&z=17&output=embed" 
              class="w-full h-56 rounded-2xl border-0" 
              loading="lazy"
            ></iframe>
          </div>

        </div>

        <!-- Right: Working Contact Form -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <h2 class="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Send Us a Direct Message</h2>

          <div v-if="successMsg" class="p-5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs space-y-2 shadow-sm">
            <div class="font-extrabold text-sm flex items-center space-x-2 text-emerald-800">
              <CheckCircle class="w-5 h-5 text-emerald-600" />
              <span>Message Sent Successfully!</span>
            </div>
            <p class="leading-relaxed text-slate-700">
              Your inquiry has been submitted and notification dispatched to <strong>alhrsh114333@gmail.com</strong>. Our team will contact you shortly via phone or WhatsApp.
            </p>
            <button @click="successMsg = ''" class="mt-2 text-2xs font-bold text-emerald-700 hover:underline">
              Send another message &rarr;
            </button>
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
                  <option>Store Visit & Timings</option>
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
                placeholder="Type your required pipe sizes, cables, tools, or questions..." 
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
import { Phone, MessageCircle, Mail, MapPin, CheckCircle, Send, Facebook } from 'lucide-vue-next';

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
    // 1. Send to Backend (saves in MongoDB & triggers email)
    await api.post('/inquiries', form.value);

    // 2. Direct FormSubmit relay to alhrsh114333@gmail.com
    try {
      await fetch('https://formsubmit.co/ajax/alhrsh114333@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔔 AL-HRSH Contact Inquiry from ${form.value.name} (${form.value.phone})`,
          'Customer Name': form.value.name,
          'Phone': form.value.phone,
          'Email': form.value.email || 'Not provided',
          'Subject': form.value.subject,
          'Message': form.value.message,
          _template: 'table'
        })
      });
    } catch (e) {
      console.warn('FormSubmit note:', e.message);
    }

    successMsg.value = 'Your message has been sent successfully to alhrsh114333@gmail.com!';
    form.value = { name: '', phone: '', email: '', subject: 'Product Inquiry & Price List', message: '' };
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
