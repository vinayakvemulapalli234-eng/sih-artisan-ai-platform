import React, { createContext, useContext, useState, useEffect } from 'react';
import { createProductOnServer } from '../services/productService';
import {
  INITIAL_ARTISAN_ORDERS,
  BULK_ORDER_DATA,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [artisanOrders, setArtisanOrders] = useState(() => {
    const saved = localStorage.getItem('kalakriti_artisan_orders');
    return saved ? JSON.parse(saved) : INITIAL_ARTISAN_ORDERS;
  });

  const [bulkOrder, setBulkOrder] = useState(() => {
    const saved = localStorage.getItem('kalakriti_bulk_order');
    return saved ? JSON.parse(saved) : BULK_ORDER_DATA;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('kalakriti_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kalakriti_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('kalakriti_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [customerOrders, setCustomerOrders] = useState(() => {
    const saved = localStorage.getItem('kalakriti_customer_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [showBigOrderAlert, setShowBigOrderAlert] = useState(false);

  useEffect(() => { localStorage.setItem('kalakriti_artisan_orders', JSON.stringify(artisanOrders)); }, [artisanOrders]);
  useEffect(() => { localStorage.setItem('kalakriti_bulk_order', JSON.stringify(bulkOrder)); }, [bulkOrder]);
  useEffect(() => { localStorage.setItem('kalakriti_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('kalakriti_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('kalakriti_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('kalakriti_customer_orders', JSON.stringify(customerOrders)); }, [customerOrders]);

  const normalizeProduct = (p) => ({
    id: p.id,
    name: p.title,
    description: p.description,
    craft: p.category,
    price: p.dynamic_price ?? p.base_price,
    image: p.image_url,
    materialCost: p.material_cost,
    labourCost: p.labour_cost,
    otherCost: p.other_cost,
  });

  const addProduct = async (newProd) => {
    const payload = {
      title: newProd.name,
      description: newProd.description || '',
      category: newProd.craft || '',
      base_price: newProd.price,
      material_cost: newProd.materialCost || null,
      labour_cost: newProd.labourCost || null,
      other_cost: newProd.otherCost || null,
      image_url: newProd.image || '',
      language: 'en'
    };

    const result = await createProductOnServer(payload);
    if (result.success) {
      const normalized = normalizeProduct(result.product);
      normalized.artisanLocation = newProd.artisanLocation || '';
      setProducts(prev => [normalized, ...prev]);
      return normalized;
    } else {
      console.error('addProduct failed:', result.error);
      return null;
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const acceptBulkShare = (artisanId = 'art-1') => {
    setBulkOrder(prev => ({
      ...prev,
      artisans: prev.artisans.map(a => a.id === artisanId ? { ...a, status: 'Accepted & In Progress' } : a)
    }));
    setShowBigOrderAlert(false);
  };

  return (
    <AppDataContext.Provider
      value={{
        products,
        artisanOrders,
        bulkOrder,
        notifications,
        cart,
        favorites,
        customerOrders,
        showBigOrderAlert,
        setShowBigOrderAlert,
        addProduct,
        toggleFavorite,
        addToCart,
        removeFromCart,
        clearCart,
        acceptBulkShare,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);