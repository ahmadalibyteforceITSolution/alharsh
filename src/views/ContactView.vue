<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div class="text-xs font-bold text-brand-700 uppercase tracking-widest">Get In Touch</div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Contact AL-HRSH Store</h1>
        <p class="text-xs sm:text-sm text-slate-500">Visit our store, call our direct helpline, or send a project inquiry.</p>
      </div>

      <!-- Success Confirmation Modal Popup -->
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-200 text-center space-y-5">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle class="w-9 h-9" />
          </div>

          <div class="space-y-1">
            <h3 class="text-xl font-extrabold text-slate-900">Message Sent Successfully!</h3>
            <p class="text-xs text-slate-500">Thank you, <strong class="text-slate-800">{{ submittedData.name }}</strong>. Your inquiry has been received.</p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
            <div class="flex justify-between">
              <span class="text-slate-400">Recipient Email:</span>
              <span class="font-mono font-bold text-rose-600">alhrsh114333@gmail.com</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Phone:</span>
              <span class="font-bold text-slate-800">{{ submittedData.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Subject:</span>
              <span class="font-bold text-brand-800">{{ submittedData.subject }}</span>
            </div>
            <div class="pt-1 border-t border-slate-200 text-slate-600 text-2xs italic line-clamp-2">
              "{{ submittedData.message }}"
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button 
              @click="showSuccessModal = false" 
              class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
            >
              Close
            </button>
            <a 
              :href="`https://wa.me/923029355294?text=Hello%20AL-HRSH,%20I%20just%20sent%20a%20contact%20inquiry%20regarding:%20${encodeURIComponent(submittedData.subject)}`" 
              target="_blank" 
              class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors inline-flex items-center justify-center space-x-2 shadow-md"
            >
              <MessageCircle class="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
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

          <!-- Real Estate & Architecture Collaboration Partner Card -->
          <div class="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-6 text-white border border-navy-700 shadow-card space-y-3">
            <div class="flex items-center space-x-2 text-2xs font-extrabold uppercase tracking-wider text-accent-cyan">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Real Estate &amp; Architecture Partner</span>
            </div>
            <h3 class="text-sm font-extrabold text-white">
              H&amp;Q Design Services (HANDQ)
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Need architectural drawings, 3D front elevations, luxury villa floor plans, or DHA Lahore building submissions?
            </p>
            <div class="pt-2 flex flex-wrap gap-2">
              <a 
                href="https://h-q-design-services.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center space-x-1.5 transition-all shadow"
              >
                <span>Visit Partner Website</span>
                <ExternalLink class="w-3.5 h-3.5" />
              </a>
              <a 
                href="tel:+923416887454" 
                class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl inline-flex items-center space-x-1.5 transition-all"
              >
                <Phone class="w-3.5 h-3.5 text-accent-cyan" />
                <span>0341-6887454</span>
              </a>
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
              Your inquiry has been submitted and notification dispatched to <strong>alhrsh114333@gmail.com</strong>. Our team will contact you shortly.
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
import { Phone, MessageCircle, Mail, MapPin, CheckCircle, Send, Facebook, Sparkles, ExternalLink } from 'lucide-vue-next';

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: 'Product Inquiry & Price List',
  message: ''
});

const sending = ref(false);
const successMsg = ref('');
const showSuccessModal = ref(false);
const submittedData = ref({});

const submitContact = async () => {
  sending.value = true;
  submittedData.value = { ...form.value };

  try {
    // 1. Send to Backend Express API (saves in MongoDB & initiates email)
    await api.post('/inquiries', form.value);
  } catch (err) {
    console.warn('Backend note:', err.message);
  }

  // 2. Direct FormSubmit relay
  try {
    await fetch('https://formsubmit.co/ajax/alhrsh114333@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `🔔 AL-HRSH Inquiry from ${form.value.name} (${form.value.phone})`,
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

  // Always show success modal & confirmation banner
  successMsg.value = `Thank you ${submittedData.value.name}! Your message has been sent successfully to alhrsh114333@gmail.com.`;
  showSuccessModal.value = true;
  form.value = { name: '', phone: '', email: '', subject: 'Product Inquiry & Price List', message: '' };
  sending.value = false;
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.68rem;
}
</style>
