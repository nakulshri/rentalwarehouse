import React from 'react';
import { X, Plus, Phone, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
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
  };

  const handleContact = () => {
    navigate('/contact');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                <span
                onClick={onClose}
                className="cursor-pointer hover:bg-gray-100 rounded-full p-1 transition"
                title="Close"
                >
                <X size={24} />
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    product.type === 'sale' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {product.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(4.8/5)</span>
                </div>

                                     <div className="border-t border-gray-200 pt-4">
                       <div className="flex items-center justify-between mb-4">
                         <div>
                           {product.type === 'sale' ? (
                             <>
                               <span className="text-3xl font-bold text-gray-900">
                                 ${(Number(product.price) || 0).toFixed(2)}
                               </span>
                             </>
                           ) : (
                             <span className="text-2xl font-bold text-gray-900">
                               Contact for Pricing
                             </span>
                           )}
                         </div>
                       </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {product.type === 'sale' ? (
                      <button
                        onClick={handleAddToCart}
                        className="w-full flex items-center justify-center space-x-2 bg-classygray text-white px-6 py-3 rounded-lg  transition-colors duration-200 font-medium"
                      >
                        <Plus size={20} />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleContact}
                        className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium"
                      >
                        <Phone size={20} />
                        <span>Contact for Rental</span>
                      </button>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <p>• Free delivery within 50 miles</p>
                    <p>• 30-day return policy</p>
                    <p>• Professional installation available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 