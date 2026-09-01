import { defineStore } from 'pinia';
import api from '../services/api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('alharsh_cart') || '[]'),
    isDrawerOpen: false,
    appliedCoupon: null,
    discountAmount: 0,
    shippingFee: 0, // Free shipping on orders or configurable
    quickViewProduct: null,
    quoteModalProduct: null
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    total: (state) => {
      const sub = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const withDiscount = Math.max(0, sub - state.discountAmount);
      return withDiscount + state.shippingFee;
    }
  },

  actions: {
    saveToStorage() {
      localStorage.setItem('alharsh_cart', JSON.stringify(this.items));
    },

    addItem(product, quantity = 1) {
      const existing = this.items.find(i => i._id === product._id);
      const effectivePrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;

      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          _id: product._id,
          name: product.name,
          sku: product.sku || '',
          category: product.category,
          price: effectivePrice,
          originalPrice: product.price,
          unit: product.unit || 'Piece',
          image: product.images && product.images.length > 0 ? product.images[0] : '/logo.png',
          quantity: quantity,
          stock: product.stock
        });
      }

      this.saveToStorage();
      this.isDrawerOpen = true;
    },

    updateQuantity(id, quantity) {
      const item = this.items.find(i => i._id === id);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(id);
        } else {
          item.quantity = quantity;
          this.saveToStorage();
        }
      }
    },

    removeItem(id) {
      this.items = this.items.filter(i => i._id !== id);
      this.saveToStorage();
      if (this.appliedCoupon) {
        this.recalculateDiscount();
      }
    },

    clearCart() {
      this.items = [];
      this.appliedCoupon = null;
      this.discountAmount = 0;
      this.saveToStorage();
    },

    async applyCoupon(code) {
      try {
        const response = await api.post('/coupons/validate', {
          code,
          cartTotal: this.subtotal
        });
        if (response.data.success) {
          this.appliedCoupon = response.data.coupon;
          this.discountAmount = response.data.discount;
          return { success: true, message: response.data.message };
        }
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to apply coupon'
        };
      }
    },

    removeCoupon() {
      this.appliedCoupon = null;
      this.discountAmount = 0;
    },

    recalculateDiscount() {
      if (!this.appliedCoupon) return;
      if (this.appliedCoupon.minOrderAmount && this.subtotal < this.appliedCoupon.minOrderAmount) {
        this.removeCoupon();
        return;
      }
      if (this.appliedCoupon.discountType === 'percentage') {
        let disc = Math.round((this.subtotal * this.appliedCoupon.discountValue) / 100);
        if (this.appliedCoupon.maxDiscount && disc > this.appliedCoupon.maxDiscount) {
          disc = this.appliedCoupon.maxDiscount;
        }
        this.discountAmount = disc;
      } else {
        this.discountAmount = this.appliedCoupon.discountValue;
      }
    },

    openQuickView(product) {
      this.quickViewProduct = product;
    },

    closeQuickView() {
      this.quickViewProduct = null;
    },

    openQuoteModal(product = null) {
      this.quoteModalProduct = product;
    },

    closeQuoteModal() {
      this.quoteModalProduct = null;
    }
  }
});
