import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Heart, Compass, Users, ShoppingCart, User, MapPin, LogOut,Package } from 'lucide-react';
import { HeaderBar } from '../common/HeaderBar';
import { BottomNav } from '../common/BottomNav';
import { CustomerProductCard } from './CustomerProductCard';
import { ProductDetailsModal } from './ProductDetailsModal';
import { CartView } from './CartView';
import { CustomerOrders } from './CustomerOrders';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { fetchAllProducts,fetchSellers, fetchMyOrders} from '../../services/productService';

export const CustomerHome = () => {
  const { favorites } = useAppData();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [artisans, setArtisans] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchAllProducts();
      if (result.success) {
      const mapped = result.products.map(p => ({
          id: p.id,
          ownerId: p.owner_id,
          name: p.title,
          description: p.description,
          image: p.image_url,
          price: p.dynamic_price ?? p.base_price,
          craft: p.category || 'Handmade',
          artisanName: p.owner_name || 'Artisan',
          artisanLocation: '',
          materialCost: p.material_cost,
          labourCost: p.labour_cost,
          otherCost: p.other_cost,
          tags: null,
        }));
        setProducts(mapped);
      }
      setLoadingProducts(false);
    };
    loadProducts();

    const loadArtisans = async () => {
      const result = await fetchSellers();
      if (result.success) {
        setArtisans(result.sellers);
      }
    };
    loadArtisans();

    const loadOrdersCount = async () => {
      const result = await fetchMyOrders();
      if (result.success) {
        setOrdersCount(result.orders.length);
      }
    };
    loadOrdersCount();
  }, []);
  const [activeTab, setActiveTab] = useState('home');// 'home' | 'explore' | 'artisans' | 'favorites' | 'cart' | 'profile' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const categories = ['All', 'Kalamkari', 'Blue Pottery', 'Pashmina Weaving', 'Wooden Toys', 'Banarasi Silk', 'Pichwai'];

  const filteredProducts = products.filter(p => {
    const name = p.name || '';
    const craft = p.craft || '';
    const artisanName = p.artisanName || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          artisanName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || craft.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] select-none min-h-full">
      <HeaderBar />


      {/* Main Tab View Router */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {activeTab === 'home' && (
          <div className="p-4 space-y-5">
            {/* Search Bar */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-xs font-semibold text-stone-900 focus:outline-none focus:border-emerald-600 shadow-sm"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Hero Marketplace Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
              <div className="max-w-[220px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 block mb-1">
                  Direct From Master Artisans
                </span>
                <h2 className="text-xl font-extrabold leading-tight">
                  Every craft has a soul. Every thread tells a history.
                </h2>
                <p className="text-xs text-emerald-100 font-medium mt-1">
                  100% GI-Tagged Authenticity & Direct Artisan Support
                </p>
              </div>
            </div>

            {/* "Handcrafted For You" Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-1.5">
                  <Sparkles size={18} className="text-amber-500" />
                  <span>{t('handcrafted_for_you')}</span>
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  My Orders
                </button>
              </div>

              {/* Product Cards Feed matching uploaded reference screenshots */}
              <div className="grid grid-cols-1 gap-4">
                {filteredProducts.map((prod) => (
                  <CustomerProductCard
                    key={prod.id}
                    product={prod}
                    onClick={() => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
          <div className="p-4 space-y-4">
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Explore Crafts</h2>
            <div className="grid grid-cols-1 gap-4">
              {products.map((prod) => (
                <CustomerProductCard
                  key={prod.id}
                  product={prod}
                  onClick={() => setSelectedProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ARTISANS TAB */}
        {activeTab === 'artisans' && (
          <div className="p-4 space-y-4">
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Master Artisans</h2>
    {artisans.length === 0 ? (
      <div className="py-16 text-center text-stone-400 font-semibold text-xs">
        No artisans have listed products yet.
      </div>
    ) : (
            <div className="space-y-3">
              {artisans.map((artisan) => (
  <div
    key={artisan.id}
    onClick={() => setSelectedArtisan(artisan)}
    className="bg-white rounded-3xl p-4 border border-stone-200 shadow-md flex items-center gap-4 cursor-pointer hover:border-emerald-600 transition"
  >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-extrabold shrink-0 border-2 border-emerald-500">
              {artisan.name?.charAt(0) || 'A'}
            </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-extrabold text-stone-900">{artisan.name}</h4>
                    <p className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                <MapPin size={12} /> {artisan.phone || artisan.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
    )}
          </div>
        )}
{/* ARTISAN DETAIL VIEW */}
{selectedArtisan && (
  <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto">
    <div className="sticky top-0 bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3 shadow-2xs z-10">
      <button
        onClick={() => setSelectedArtisan(null)}
        className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
      >
        ←
      </button>
      <h2 className="text-base font-extrabold text-stone-900">{selectedArtisan.name}</h2>
    </div>

    <div className="p-4 space-y-4">
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-md flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-extrabold shrink-0 border-2 border-emerald-500">
          {selectedArtisan.name?.charAt(0) || 'A'}
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-stone-900">{selectedArtisan.name}</h3>
          <p className="text-xs font-semibold text-stone-500">{selectedArtisan.phone || selectedArtisan.email}</p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider">
        Their Products ({products.filter(p => p.ownerId === selectedArtisan.id).length})
      </h3>

      {products.filter(p => p.ownerId === selectedArtisan.id).length === 0 ? (
        <div className="py-12 text-center text-stone-400 font-semibold text-xs">
          This artisan hasn't listed any products yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products
            .filter(p => p.ownerId === selectedArtisan.id)
            .map((prod) => (
              <CustomerProductCard
                key={prod.id}
                product={prod}
                onClick={() => { setSelectedArtisan(null); setSelectedProduct(prod); }}
              />
            ))}
        </div>
      )}
    </div>
  </div>
)}
        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="p-4 space-y-4">
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <Heart size={24} className="text-red-500 fill-current" />
              <span>Favorites ({favoriteProducts.length})</span>
            </h2>
            {favoriteProducts.length === 0 ? (
              <div className="py-16 text-center text-stone-400 font-semibold text-xs">
                No favorites saved yet. Tap ♡ on any product to save it here.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {favoriteProducts.map((prod) => (
                  <CustomerProductCard key={prod.id} product={prod} onClick={() => setSelectedProduct(prod)} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CART TAB */}
        {activeTab === 'cart' && <CartView onOrderPlaced={() => setActiveTab('orders')} />}
          {/* PROFILE TAB */}
{activeTab === 'profile' && (
  <div className="p-4 space-y-4">
    <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-md flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-extrabold shrink-0 border-2 border-emerald-300">
        {user?.name?.charAt(0) || 'C'}
      </div>
      <div>
        <h3 className="text-lg font-extrabold text-stone-900">{user?.name || 'Customer'}</h3>
        <p className="text-xs font-semibold text-stone-500">{user?.identifier || ''}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
        <span className="text-stone-400 text-xs font-bold block">Orders Placed</span>
        <span className="text-xl font-extrabold text-emerald-800 mt-1 block">{ordersCount}</span>
      </div>
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
        <span className="text-stone-400 text-xs font-bold block">Favorites</span>
        <span className="text-xl font-extrabold text-stone-900 mt-1 block">{favoriteProducts.length}</span>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-stone-200 shadow-md divide-y divide-stone-100 text-xs font-bold text-stone-700">
      <div
        onClick={() => setActiveTab('orders')}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50"
      >
        <span className="flex items-center gap-3"><Package size={18} className="text-emerald-700" /> My Orders</span>
        <span className="text-stone-400">→</span>
      </div>
      <div
        onClick={() => setActiveTab('favorites')}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50"
      >
        <span className="flex items-center gap-3"><Heart size={18} className="text-red-500" /> My Favorites</span>
        <span className="text-stone-400">→</span>
      </div>
    </div>

    <button
      onClick={logout}
      className="w-full py-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-2xl font-bold text-xs transition"
    >
      Switch Role / Logout
    </button>
  </div>
)}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && <CustomerOrders />}
      </div>

      {/* Product Detail Drawer */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
