import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-classywhite py-12">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <CheckCircle className="mx-auto h-14 w-14 text-green-600 mb-3" />
            <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
            <p className="text-gray-700 mb-4">
              You will receive an invoice with delivery charges and a payment option in your email.<br />
              Your order status is currently <span className="font-semibold text-yellow-700">{order?.status || 'pending'}</span>.<br />
              Once the admin approves your order, it will be marked as <span className="font-semibold text-green-700">approved</span>.
            </p>
            <button
              className="mt-2 px-5 py-2 rounded bg-classygray text-white font-semibold hover:bg-classyblack transition"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-center mb-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order.<br />
              <span className="block mt-2">
                <span className="font-medium">Order Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${order?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order?.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{order?.status}</span>
              </span>
              <span className="block mt-1 text-sm text-gray-500">
                {order?.status === 'pending' && 'Waiting for admin approval.'}
                {order?.status === 'approved' && 'Your order has been approved!'}
                {order?.status && !['pending','approved'].includes(order.status) && `Order is ${order.status}.`}
              </span>
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID:</span> {order.id}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
                  {order.timestamp && (
                    <p><span className="font-medium">Date:</span> {order.timestamp.toDate().toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                <div className="space-y-1">
                  <p>{order.address.fullName}</p>
                  <p>{order.address.address}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/orders"
                className="flex-1 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View All Orders
              </Link>
              <Link
                to="/"
                className="flex-1 text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 