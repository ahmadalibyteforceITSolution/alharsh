import { defineStore } from 'pinia';
import api from '../services/api';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    banners: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    selectedCategory: 'All',
    selectedSubcategory: '',
    selectedBrand: '',
    searchQuery: '',
    sortBy: 'newest',
    priceRange: [0, 100000],
    inStockOnly: false
  }),

  getters: {
    sanitaryProducts: (state) => state.products.filter(p => p.category === 'Sanitary'),
    electricalProducts: (state) => state.products.filter(p => p.category === 'Electrical'),
    hardwareProducts: (state) => state.products.filter(p => p.category === 'Hardware'),
    featuredProducts: (state) => state.products.filter(p => p.featured),
    bestSellers: (state) => state.products.filter(p => p.bestSeller),
    newArrivals: (state) => state.products.filter(p => p.isNewArrival)
  },

  actions: {
    async fetchCategories() {
      try {
        const res = await api.get('/categories');
        if (res.data.success) {
          this.categories = res.data.categories;
        }
      } catch (err) {
        console.error('Error fetching categories from MongoDB API:', err);
      }
    },

    async fetchBanners() {
      try {
        const res = await api.get('/banners');
        if (res.data.success) {
          this.banners = res.data.banners;
        }
      } catch (err) {
        console.error('Error fetching banners from MongoDB API:', err);
      }
    },

    async fetchProducts(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const queryParams = new URLSearchParams();
        if (params.category && params.category !== 'All') queryParams.append('category', params.category);
        if (params.subcategory) queryParams.append('subcategory', params.subcategory);
        if (params.brand) queryParams.append('brand', params.brand);
        if (params.search) queryParams.append('search', params.search);
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.featured) queryParams.append('featured', 'true');
        if (params.bestSeller) queryParams.append('bestSeller', 'true');
        if (params.isNewArrival) queryParams.append('isNewArrival', 'true');
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit || 50);

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.data.success) {
          this.products = res.data.products;
          this.totalCount = res.data.count;
          this.currentPage = res.data.page;
          this.totalPages = res.data.totalPages;
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch live products';
        console.error('Products API Error:', err);
      } finally {
        this.loading = false;
      }
    },

    async getProductDetails(idOrSlug) {
      try {
        const res = await api.get(`/products/${idOrSlug}`);
        if (res.data.success) {
          return {
            product: res.data.product,
            related: res.data.relatedProducts || []
          };
        }
      } catch (err) {
        console.error('Single Product API Error:', err);
        return null;
      }
    }
  }
});
