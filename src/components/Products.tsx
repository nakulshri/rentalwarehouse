import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Phone, Plus, Check } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';

const Products = () => {
  const [activeTab, setActiveTab] = useState<'sale' | 'rental'>('sale');
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { currentUser } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const all = querySnapshot.docs.map((docSnap: any) => ({ ...docSnap.data(), id: docSnap.id }));
      setProducts(all.slice(0, 6)); // Show first 6 products
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Only show sale items in the main products section
  const displayedProducts = products.filter(p => p.type === 'sale');

  const handleAddToCart = (product: any) => {
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

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Our Products</h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Premium inventory available for purchase</p>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product: any, index: number) => (
              <div
              key={product.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-[460px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
            
                <div className="mt-auto">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-bold text-gray-800">${(Number(product.price) || 0).toFixed(2)}</span>
                    {addedItems.has(product.id) ? (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                        <Check size={16} />
                        <span>Added!</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2"
                      >
                        <Plus size={16} />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <button onClick={() => navigate('/products')} className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">Explore More</button>
        </div>
      </div>
    </section>
  );
};

export default Products;