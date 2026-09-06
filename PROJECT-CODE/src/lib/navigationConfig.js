/**
 * SIH Artisan Project — Config-Driven Navigation
 * Team members can extend these nav arrays without altering AppShell/Sidebar/TopBar.
 */

export const customerNav = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'explore', label: 'Explore', icon: 'Compass' },
  { id: 'craft-graph', label: 'Craft Graph', icon: 'Share2', badge: 'Interactive' },
  { id: 'artisans', label: 'Artisans', icon: 'Users' },
  { id: 'favorites', label: 'Favorites', icon: 'Heart' },
  { id: 'cart', label: 'Cart', icon: 'ShoppingBag' },
  { id: 'orders', label: 'Orders', icon: 'Package' },
  { id: 'profile', label: 'Profile', icon: 'User' },
];

export const artisanNav = [
  { id: 'overview', label: 'Home', icon: 'Home' },
  { id: 'add-product', label: 'Add Product', icon: 'PlusCircle' },
  { id: 'products', label: 'My Products', icon: 'Box' },
  { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', badge: '3' },
  { id: 'inventory', label: 'Inventory', icon: 'Archive' },
  { id: 'help', label: 'Help & Support', icon: 'HelpCircle' },
  { id: 'profile', label: 'Profile', icon: 'User' },
];

export const adminNav = [
  { id: 'overview', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'users', label: 'Users', icon: 'Users' },
  { id: 'artisans', label: 'Artisans', icon: 'UserCheck' },
  { id: 'products', label: 'Products', icon: 'Box' },
  { id: 'crafts', label: 'Crafts & Graph', icon: 'Network' },
  { id: 'reports', label: 'Reports', icon: 'AlertTriangle' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
];

export const getNavForRole = (role) => {
  switch (role) {
    case 'artisan':
      return artisanNav;
    case 'admin':
      return adminNav;
    case 'customer':
    default:
      return customerNav;
  }
};
