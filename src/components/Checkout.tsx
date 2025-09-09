import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection, doc, updateDoc, arrayUnion, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface AddressForm {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState<AddressForm>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Please sign in to place an order');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      setError('');


      // Get user name from users collection
      let customerName = '';
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        customerName = userDoc.exists() ? userDoc.data().name || '' : '';
      } catch {}

      // Create order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: currentUser.uid,
        customerName: customerName,
        customerEmail: currentUser.email,
        email: currentUser.email, // for compatibility
        items: items,
        address: address,
        shippingAddress: address, // for compatibility
        total: getTotal(),
        status: 'pending',
        timestamp: serverTimestamp()
      });

      // Update user's orders array
      await updateDoc(doc(db, 'users', currentUser.uid), {
        orders: arrayUnion(orderRef.id)
      });

      // Send order confirmation email via Netlify function
      try {
        await fetch('/.netlify/functions/send-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: currentUser.email,
            orderId: orderRef.id,
            name: customerName
          })
        });
      } catch (e) {
        // Optionally log or ignore email errors
      }

      // Clear cart
      clearCart();

      // Redirect to order confirmation
      navigate(`/order-confirmation/${orderRef.id}`);
    } catch (error: any) {
      setError('Failed to place order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h2>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Shipping Address</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={address.fullName}
                  onChange={(e) => handleAddressChange('fullName', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={address.phone}
                  onChange={(e) => handleAddressChange('phone', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={address.address}
                  onChange={(e) => handleAddressChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={address.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 