import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('alharsh_wishlist') || '[]')
  }),

  getters: {
    totalWishlist: (state) => state.items.length,
    isInWishlist: (state) => (id) => state.items.some(i => i._id === id)
  },

  actions: {
    toggleWishlist(product) {
      const idx = this.items.findIndex(i => i._id === product._id);
      if (idx !== -1) {
        this.items.splice(idx, 1);
      } else {
        this.items.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          image: product.images?.[0] || '/logo.png',
          category: product.category,
          slug: product.slug
        });
      }
      localStorage.setItem('alharsh_wishlist', JSON.stringify(this.items));
    }
  }
});
