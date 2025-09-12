import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle, Package, MapPin, Calendar, CreditCard, ArrowRight, Home, ShoppingBag, Mail, Phone } from 'lucide-react';

interface OrderData {
  id: string;
  items: any[];
  address: any;
  total: number;
  status: string;
  timestamp: any;
  email: string;
}

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    // Listen for real-time updates to the order
    const unsub = onSnapshot(doc(db, 'orders', orderId), (orderDoc) => {
      if (orderDoc.exists()) {
        setOrder({ id: orderDoc.id, ...orderDoc.data() } as OrderData);
      } else {
        setOrder(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching order:', error);
      setLoading(false);
    });
    return () => unsub();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Order Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 text-center animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 mb-3">
                You will receive an invoice with delivery charges and payment options in your email.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Order Status:</span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  order?.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : order?.status === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {order?.status || 'pending'}
                </span>
              </div>
            </div>
            <button
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => setShowPopup(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your order. We've received your request and will process it shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Package className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Order ID</label>
                    <p className="text-lg font-mono text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Amount</label>
                    <p className="text-2xl font-bold text-indigo-600">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full ${
                        order.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : order.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {order.status === 'pending' && '⏳ Pending Approval'}
                        {order.status === 'approved' && '✅ Approved'}
                        {!['pending', 'approved'].includes(order.status) && `📋 ${order.status}`}
                      </span>
                    </div>
                  </div>
                  {order.timestamp && (
                    <div>
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Order Date</label>
                      <p className="text-lg text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {order.timestamp.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Shipping Address</h3>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">{order.address.fullName}</p>
                  <p className="text-gray-700">{order.address.address}</p>
                  <p className="text-gray-700">
                    {order.address.city}, {order.address.state} {order.address.zipCode}
                  </p>
                  <div className="flex items-center text-gray-600 mt-3">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{order.address.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <ShoppingBag className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Order Items</h3>
              </div>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500 capitalize">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-indigo-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What's Next?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Confirmation</h4>
                    <p className="text-sm text-gray-600">Check your email for order details and next steps.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Payment Processing</h4>
                    <p className="text-sm text-gray-600">We'll send you payment details and delivery charges.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Delivery</h4>
                    <p className="text-sm text-gray-600">Once approved, we'll arrange delivery to your address.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to="/orders"
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Package className="w-5 h-5 mr-2" />
                  View All Orders
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 