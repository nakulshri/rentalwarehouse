import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Eye, Star, ArrowLeft, ShoppingBag, Filter, Sparkles, Check, Heart, Share2 } from 'lucide-react';
import ProductModal from './ProductModal';

const categoryOptions = [
  { label: 'All Products', value: '', icon: '🛍️' },
  { label: 'Crockery', value: 'crockery', icon: '🍽️' },
  { label: 'Lighting', value: 'lighting', icon: '💡' },
  { label: 'Decor', value: 'decor', icon: '🎨' },
  { label: 'Stages', value: 'stages', icon: '🎭' },
];

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Read category from query string on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || '';
    setSelectedCategory(cat);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const all = querySnapshot.docs.map((docSnap: any) => ({ ...docSnap.data(), id: docSnap.id }));
      // Only show sale products
      let saleProducts = all.filter(p => p.type === 'sale');
      if (selectedCategory) {
        saleProducts = saleProducts.filter(p => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());
      }
      
      // Sort products
      saleProducts.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return (a.price || 0) - (b.price || 0);
          default:
            return 0;
        }
      });
      
      setProducts(saleProducts);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    addToCart({
      id: product.id,
      title: product.name,
      price: Number(product.price) || 0,
      quantity: 1,
      type: product.type,
      image: product.imageUrl
    });

    // Show feedback
    setAddedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
  {/* Hero Section */}
  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/company-logo.png" alt="The Rental Warehouse" className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain mr-3" />
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Shop Our Products</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Discover our premium collection of products available for purchase. 
              Quality items for your special events and everyday needs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map(opt => (
                  <button
                    key={opt.value}
                    className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === opt.value 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      setSelectedCategory(opt.value);
                      navigate(opt.value ? `/shop?category=${opt.value}` : '/shop');
                    }}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-lg">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </span>
                    {selectedCategory === opt.value && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-indigo-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="lg:ml-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="text-lg text-gray-600">Loading products...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="group card overflow-hidden cursor-pointer border border-gray-100"
                onClick={() => handleViewProduct(product)}
              >
                {/* Product Image */}
                <div className="relative flex items-center justify-center bg-gray-50 h-40 sm:h-48 md:h-56">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 text-sm font-semibold rounded-full shadow-lg flex items-center space-x-1">
                      <Sparkles className="w-4 h-4" />
                      <span>For Sale</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-2.5 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-lg">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-2.5 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-lg">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-2.5 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <div className="mb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-snug">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className="text-amber-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                  </div>

                  {/* Price and Action - stacked on mobile to avoid overlap */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
                    <div className="w-full sm:w-auto text-center sm:text-right">
                      <span className="text-sm text-gray-500 italic">Contact for pricing</span>
                    </div>

                    <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                      {addedItems.has(product.id) ? (
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 rounded-md font-semibold flex items-center space-x-2 shadow-sm min-w-[88px] justify-center">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Added</span>
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-2 rounded-md font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-150 flex items-center space-x-2 shadow min-w-[72px] justify-center"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm">Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600">No products available for sale at the moment. Check back soon!</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ShopPage;