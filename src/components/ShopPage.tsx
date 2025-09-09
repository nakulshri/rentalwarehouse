import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Star, ArrowLeft } from 'lucide-react';
import ProductModal from './ProductModal';

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const all = querySnapshot.docs.map((docSnap: any) => ({ ...docSnap.data(), id: docSnap.id }));
      // Only show sale products
      const saleProducts = all.filter(p => p.type === 'sale');
      setProducts(saleProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
    <div className="min-h-screen bg-classywhite py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-classygray hover:text-classyblack mb-4 underline hover:no-underline bg-transparent border-none shadow-none p-0"
            style={{ background: 'none', boxShadow: 'none', border: 'none' }}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Our Products</h1>
          <p className="text-xl text-gray-600">Discover our premium collection of products available for purchase</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any, index: number) => (
              <div
                key={product.id}
                className="group bg-white rounded shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                onClick={() => handleViewProduct(product)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-classylavender text-classywhite px-2 py-1 text-xs font-medium rounded">
                      For Sale
                    </span>
                  </div>

                  {/* View Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-classywhite text-classygray p-2 rounded hover:bg-classylavender hover:text-classywhite transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-classyblack mb-2 group-hover:text-classylavender transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-classygray text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                 

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${(Number(product.price) || 0).toFixed(2)}
                    </span>
                    
                    {addedItems.has(product.id) ? (
                      <button className="bg-classylavendar text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
                        <Plus size={16} />
                        <span>Added!</span>
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="bg-classygray text-white px-4 py-2 rounded-lg  transition-colors duration-200 flex items-center space-x-2 text-sm"
                      >
                        <Plus size={16} />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available for sale at the moment.</p>
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