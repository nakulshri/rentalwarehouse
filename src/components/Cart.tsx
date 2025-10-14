import React from 'react';
import { useCartStore, CartItem } from '../store/cartStore';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-xl text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Link>
                <Link
                  to="/rent"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Truck className="w-5 h-5 mr-2" />
                  Browse Rentals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Your Shopping Cart</h2>
          <p className="text-lg text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {items.map((item: CartItem, index: number) => (
                <div key={item.id} className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <div className="relative">
                          <img
                              src={item.image || 'https://placehold.co/150x150'}
                            alt={item.title}
                            className="w-20 h-20 object-contain rounded-xl shadow-md"
                          />
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {item.type === 'sale' ? 'Sale' : 'Rental'}
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 capitalize font-medium">{item.type}</p>
                        <p className="text-lg font-bold text-indigo-600 mt-1">
                          ${(Number(item.price) || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-50 rounded-xl border-2 border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-6 py-3 text-center min-w-[4rem] font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Clear Cart */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center space-x-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-indigo-600" />
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <span className="font-medium text-gray-900">{item.title}</span>
                      <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-indigo-600">
                      ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-indigo-600">${getTotal().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                <Shield className="w-4 h-4" />
                <span>Secure Checkout</span>
              </div>
              
              <Link
                to="/checkout"
                className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 