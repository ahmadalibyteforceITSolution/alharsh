import { defineStore } from 'pinia';
import api from '../services/api';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: localStorage.getItem('alharsh_admin_token') || null,
    adminUser: JSON.parse(localStorage.getItem('alharsh_admin_user') || 'null'),
    stats: {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCategories: 0,
      lowStockCount: 0,
      pendingOrdersCount: 0,
      newQuotesCount: 0,
      categoryBreakdown: { Sanitary: 0, Electrical: 0, Hardware: 0 },
      recentOrders: [],
      lowStockAlerts: [],
      recentQuotes: []
    },
    orders: [],
    products: [],
    quotes: [],
    inquiries: [],
    categories: [],
    coupons: [],
    banners: [],
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post('/admin/login', { email, password });
        if (res.data.success) {
          this.token = res.data.token;
          this.adminUser = res.data.admin;
          localStorage.setItem('alharsh_admin_token', this.token);
          localStorage.setItem('alharsh_admin_user', JSON.stringify(this.adminUser));
          return { success: true };
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.adminUser = null;
      localStorage.removeItem('alharsh_admin_token');
      localStorage.removeItem('alharsh_admin_user');
    },

    async fetchStats() {
      try {
        const res = await api.get('/admin/stats');
        if (res.data.success) {
          this.stats = res.data.stats;
        }
      } catch (err) {
        console.error('Fetch admin stats error:', err);
      }
    },

    async fetchOrders(status = '') {
      this.loading = true;
      try {
        const res = await api.get(`/orders${status ? `?status=${status}` : ''}`);
        if (res.data.success) {
          this.orders = res.data.orders;
        }
      } catch (err) {
        console.error('Fetch orders error:', err);
      } finally {
        this.loading = false;
      }
    },

    async updateOrderStatus(orderId, updateData) {
      try {
        const res = await api.put(`/orders/${orderId}/status`, updateData);
        if (res.data.success) {
          await this.fetchOrders();
          await this.fetchStats();
          return { success: true, message: res.data.message };
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to update status' };
      }
    },

    async fetchProducts(params = {}) {
      this.loading = true;
      try {
        const res = await api.get('/products?limit=200');
        if (res.data.success) {
          this.products = res.data.products;
        }
      } catch (err) {
        console.error('Fetch products error:', err);
      } finally {
        this.loading = false;
      }
    },

    async createProduct(productData) {
      try {
        const res = await api.post('/products', productData);
        if (res.data.success) {
          await this.fetchProducts();
          await this.fetchStats();
          return { success: true, product: res.data.product };
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to create product in MongoDB' };
      }
    },

    async updateProduct(id, productData) {
      try {
        const res = await api.put(`/products/${id}`, productData);
        if (res.data.success) {
          await this.fetchProducts();
          return { success: true, product: res.data.product };
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to update product in MongoDB' };
      }
    },

    async deleteProduct(id) {
      try {
        const res = await api.delete(`/products/${id}`);
        if (res.data.success) {
          await this.fetchProducts();
          await this.fetchStats();
          return { success: true };
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to delete product' };
      }
    },

    async fetchQuotes() {
      try {
        const res = await api.get('/quotes');
        if (res.data.success) {
          this.quotes = res.data.quotes;
        }
      } catch (err) {
        console.error('Fetch quotes error:', err);
      }
    },

    async updateQuote(id, data) {
      try {
        const res = await api.put(`/quotes/${id}`, data);
        if (res.data.success) {
          await this.fetchQuotes();
          return { success: true };
        }
      } catch (err) {
        return { success: false, message: err.message };
      }
    },

    async fetchInquiries() {
      try {
        const res = await api.get('/inquiries');
        if (res.data.success) {
          this.inquiries = res.data.inquiries;
        }
      } catch (err) {
        console.error('Fetch inquiries error:', err);
      }
    },

    async fetchCoupons() {
      try {
        const res = await api.get('/coupons');
        if (res.data.success) {
          this.coupons = res.data.coupons;
        }
      } catch (err) {
        console.error('Fetch coupons error:', err);
      }
    },

    async createCoupon(data) {
      try {
        const res = await api.post('/coupons', data);
        if (res.data.success) {
          await this.fetchCoupons();
          return { success: true };
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to create coupon' };
      }
    },

    async deleteCoupon(id) {
      try {
        await api.delete(`/coupons/${id}`);
        await this.fetchCoupons();
        return { success: true };
      } catch (err) {
        return { success: false, message: err.message };
      }
    },

    async uploadImage(file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await api.post('/upload/single', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data.success) {
          return { success: true, url: res.data.url };
        }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Image upload failed' };
      }
    }
  }
});
