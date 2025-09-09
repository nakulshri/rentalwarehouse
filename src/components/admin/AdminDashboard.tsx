import React, { useEffect, useState, Suspense } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Plus, Edit, Trash2, Eye, Package, Users, ShoppingCart, DollarSign, X } from 'lucide-react';
import AddProduct from './AddProduct';

// Lazy load CreateBlog
const CreateBlog = React.lazy(() => import('./CreateBlog'));

// ErrorBoundary so modal errors don't crash dashboard
class ModalErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // You can also log error to an error reporting service here
    // console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-red-600">Something went wrong. Please close this modal and try again.</div>;
    }
    return this.props.children;
  }
}

// ---- Modal Component (final, scrollable, always accessible) ----
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative flex flex-col max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-indigo-500"
          onClick={onClose}
          tabIndex={0}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto p-6 flex-1 min-h-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
}

interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: any;
  shippingAddress: any;
}
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: any;
}
interface Product {
  id: string;
  name: string;
  price: number;
  type: string;
  imageUrl: string;
  description: string;
  category: string;
  inStock: boolean;
  createdAt: any;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'products'>('orders');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  // Only test Firebase in console, never renders
  useEffect(() => {
    async function testConnection() {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        console.log("Firebase connection test:", snapshot.size, "products found.");
      } catch (e) {
        console.log("Firebase connection failed:", e);
      }
    }
    testConnection();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      setOrders(ordersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId || 'Unknown',
          items: data.items || [],
          total: Number(data.total) || 0,
          status: data.status || 'pending',
          createdAt: data.createdAt || null,
          shippingAddress: data.shippingAddress || {}
        };
      }));
      const usersSnapshot = await getDocs(collection(db, 'users'));
      setUsers(usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Unknown',
          email: data.email || 'No email',
          createdAt: data.createdAt || null
        };
      }));
      const productsSnapshot = await getDocs(collection(db, 'products'));
      setProducts(productsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Unnamed Product',
          price: data.type === 'rental' ? 0 : (Number(data.price) || 0),
          type: data.type || 'sale',
          imageUrl: data.imageUrl || '',
          description: data.description || '',
          category: data.category || '',
          inStock: data.inStock !== false,
          createdAt: data.createdAt || null
        };
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(prev => prev.filter(product => product.id !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalProducts: products.length,
    totalUsers: users.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <div className="mt-4 text-gray-500">Loading the admin dashboard...</div>
        </div>
      </div>
    );
  }

  // ---- UI ----
  return (
    <div className="min-h-screen bg-[#f7f8fa] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage orders, users, products, and create a blog post.</p>
          </div>
          <button
            className="mt-3 md:mt-0 px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white hover:bg-indigo-600 shadow transition"
            onClick={() => setShowCreateBlog(true)}
          >
            + Create Blog
          </button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            Icon={DollarSign}
            bg="bg-blue-100"
            color="text-blue-600"
          />
          <StatCard
            label="Pending Orders"
            value={stats.pendingOrders}
            Icon={ShoppingCart}
            bg="bg-yellow-100"
            color="text-yellow-600"
          />
          <StatCard
            label="Total Products"
            value={stats.totalProducts}
            Icon={Package}
            bg="bg-green-100"
            color="text-green-600"
          />
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            Icon={Users}
            bg="bg-purple-100"
            color="text-purple-600"
          />
        </section>

        {/* Tabs */}
        <nav className="mb-4 flex rounded-lg overflow-hidden shadow border bg-white">
          <TabNav active={activeTab} setActive={setActiveTab} orders={orders.length} users={users.length} products={products.length} />
        </nav>

        <main className="bg-white rounded-xl shadow px-4 py-6">
          {activeTab === 'orders' && (
            <OrdersTable orders={orders} formatDate={formatDate} updateOrderStatus={updateOrderStatus} users={users} />
          )}
          {activeTab === 'users' && (
            <UsersTable users={users} formatDate={formatDate} />
          )}
          {activeTab === 'products' && (
            <ProductsTable products={products} onEdit={() => {}} onDelete={deleteProduct} onAddProduct={() => setShowAddProduct(true)} />
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <Modal onClose={() => setShowAddProduct(false)}>
          <AddProduct onClose={() => setShowAddProduct(false)} onProductAdded={fetchData} />
        </Modal>
      )}

      {/* Blog Modal - error boundary and scrollable */}
      {showCreateBlog && (
        <Modal onClose={() => setShowCreateBlog(false)}>
          <ModalErrorBoundary>
            <Suspense fallback={<div>Loading blog form...</div>}>
              <CreateBlog
                onBlogCreated={() => {
                  setShowCreateBlog(false);
                  // Optionally refetch blogs if you list them
                }}
              />
            </Suspense>
          </ModalErrorBoundary>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;

// --- STAT CARD ---
function StatCard({ label, value, Icon, bg, color }: any) {
  return (
    <div className={`rounded-lg shadow flex items-center p-4 ${bg}`}>
      <div className={`p-2 rounded-lg ${color} bg-white mr-3 shadow`}>
        <Icon className={`w-6 h-6`} />
      </div>
      <div>
        <div className="text-xs text-gray-600 font-medium">{label}</div>
        <div className="text-xl font-bold text-gray-700">{value}</div>
      </div>
    </div>
  );
}

// --- TAB NAV ---
function TabNav({ active, setActive, orders, users, products }: any) {
  return (
    <>
      <button
        onClick={() => setActive('orders')}
        className={`flex-1 px-4 py-3 focus:outline-none font-medium border-b-2 transition
          ${active === 'orders'
            ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-indigo-700'}
        `}
      >
        Orders <span className="font-bold">({orders})</span>
      </button>
      <button
        onClick={() => setActive('users')}
        className={`flex-1 px-4 py-3 focus:outline-none font-medium border-b-2 transition
          ${active === 'users'
            ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-indigo-700'}
        `}
      >
        Users <span className="font-bold">({users})</span>
      </button>
      <button
        onClick={() => setActive('products')}
        className={`flex-1 px-4 py-3 focus:outline-none font-medium border-b-2 transition
          ${active === 'products'
            ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-indigo-700'}
        `}
      >
        Products <span className="font-bold">({products})</span>
      </button>
    </>
  );
}

// --- TABLES ---
function OrdersTable({ orders, formatDate, updateOrderStatus, users }: any) {
  if (!orders.length) return <div className="py-6 text-gray-400 text-center">No orders found.</div>;
  // Map userId to user info
  const userMap = React.useMemo(() => {
    const map: Record<string, { name: string; email: string }> = {};
    users.forEach((u: any) => { map[u.id] = { name: u.name, email: u.email }; });
    return map;
  }, [users]);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 font-semibold text-gray-600">
          <tr>
            <th className="px-3 py-2 text-left">Order ID</th>
            <th className="px-3 py-2 text-left">Customer</th>
            <th className="px-3 py-2 text-left">Total</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => {
            const user = userMap[order.userId];
            return (
              <tr key={order.id} className="border-t">
                <td className="px-3 py-2">{order.id}</td>
                <td className="px-3 py-2">
                  {user ? (
                    <>
                      <span className="font-medium">{user.name}</span>
                      <span className="block text-xs text-gray-500">{user.email}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Unknown</span>
                  )}
                </td>
                <td className="px-3 py-2">${order.total.toFixed(2)}</td>
                <td className="px-3 py-2">
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-3 py-2">{formatDate(order.createdAt)}</td>
                <td className="px-3 py-2 text-center">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function UsersTable({ users, formatDate }: any) {
  if (!users.length) return <div className="py-6 text-gray-400 text-center">No users found.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 font-semibold text-gray-600">
          <tr>
            <th className="px-3 py-2 text-left">User ID</th>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="border-t">
              <td className="px-3 py-2">{user.id}</td>
              <td className="px-3 py-2">{user.name}</td>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTable({ products, onEdit, onDelete, onAddProduct }: any) {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-800">Manage Products</h3>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded transition"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>
      {products.length === 0 ? (
        <div className="py-6 text-gray-400 text-center">No products yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 font-semibold text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left">Image</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Price/Pricing</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-left">Stock</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-t">
                  <td className="px-3 py-2">
                    <img
                      src={product.imageUrl || 'https://placehold.co/48x48'}
                      alt={product.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-3 py-2">{product.name}</td>
                  <td className="px-3 py-2">
                    <span className="italic text-gray-400">Contact for pricing</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.type === 'sale'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {product.type === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  </td>
                  <td className="px-3 py-2">{product.category}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button className="inline-flex items-center text-indigo-600 hover:text-indigo-900 mr-1"
                      onClick={() => onEdit(product.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="inline-flex items-center text-red-600 hover:text-red-900"
                      onClick={() => onDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
