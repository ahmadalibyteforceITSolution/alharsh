import { createRouter, createWebHistory } from 'vue-router';

// Customer Storefront Views
import HomeView from '../views/HomeView.vue';
import ShopView from '../views/ShopView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import OrderSuccessView from '../views/OrderSuccessView.vue';
import OrderTrackingView from '../views/OrderTrackingView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import QuoteRequestView from '../views/QuoteRequestView.vue';
import WishlistView from '../views/WishlistView.vue';
import FAQView from '../views/FAQView.vue';
import PoliciesView from '../views/PoliciesView.vue';

// Admin Views
import AdminLayout from '../views/admin/AdminLayout.vue';
import AdminLoginView from '../views/admin/AdminLoginView.vue';
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import AdminProductsView from '../views/admin/AdminProductsView.vue';
import AdminCategoriesView from '../views/admin/AdminCategoriesView.vue';
import AdminOrdersView from '../views/admin/AdminOrdersView.vue';
import AdminQuotesView from '../views/admin/AdminQuotesView.vue';
import AdminBannersView from '../views/admin/AdminBannersView.vue';
import AdminCouponsView from '../views/admin/AdminCouponsView.vue';
import AdminInquiriesView from '../views/admin/AdminInquiriesView.vue';

const routes = [
  // Storefront
  { path: '/', name: 'home', component: HomeView },
  { path: '/shop', name: 'shop', component: ShopView },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },
  { path: '/order-success/:orderNumber', name: 'order-success', component: OrderSuccessView },
  { path: '/track', name: 'track', component: OrderTrackingView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/quote', name: 'quote', component: QuoteRequestView },
  { path: '/wishlist', name: 'wishlist', component: WishlistView },
  { path: '/faq', name: 'faq', component: FAQView },
  { path: '/policies', name: 'policies', component: PoliciesView },

  // Admin Portal
  { path: '/admin/login', name: 'admin-login', component: AdminLoginView },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboardView },
      { path: 'products', name: 'admin-products', component: AdminProductsView },
      { path: 'categories', name: 'admin-categories', component: AdminCategoriesView },
      { path: 'orders', name: 'admin-orders', component: AdminOrdersView },
      { path: 'quotes', name: 'admin-quotes', component: AdminQuotesView },
      { path: 'banners', name: 'admin-banners', component: AdminBannersView },
      { path: 'coupons', name: 'admin-coupons', component: AdminCouponsView },
      { path: 'inquiries', name: 'admin-inquiries', component: AdminInquiriesView }
    ]
  },

  // Fallback 404 redirect
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Admin Auth Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('alharsh_admin_token');
  if (to.path.startsWith('/admin') && to.name !== 'admin-login') {
    if (!token) {
      return next({ name: 'admin-login' });
    }
  }
  next();
});

export default router;
