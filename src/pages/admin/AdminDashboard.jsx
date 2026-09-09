import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  LogOut,
  Store,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { formatPrice } from '../../utils/helpers';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/orders/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600',
      change: '+18.2%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600',
      change: '+12.5%'
    },
    {
      title: 'Live Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'bg-amber-50 text-amber-600',
      change: 'Active'
    },
    {
      title: 'Registered Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      change: 'Verified'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="admin-sidebar w-full md:w-64 p-6 shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="text-2xl font-black tracking-tight font-integral text-white">
              SHOP.CO
            </Link>
            <span className="px-2 py-0.5 bg-neutral-800 text-[10px] font-bold rounded text-gray-300">
              ADMIN
            </span>
          </div>

          <nav className="space-y-1.5">
            <Link to="/admin" className="admin-nav-item active">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </Link>
            <Link to="/admin/products" className="admin-nav-item">
              <Package size={18} />
              <span>Products CRUD</span>
            </Link>
            <Link to="/admin/orders" className="admin-nav-item">
              <ShoppingBag size={18} />
              <span>Manage Orders</span>
            </Link>
            <Link to="/" className="admin-nav-item">
              <Store size={18} />
              <span>View Storefront</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-800">
          <div className="mb-4">
            <p className="text-xs text-gray-400">Logged in as:</p>
            <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium py-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Store Overview</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Welcome back to your Shop.co administration and operations hub
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products?action=new"
              className="px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="stat-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-gray-500">{card.title}</span>
                      <div className={`p-2.5 rounded-xl ${card.color}`}>
                        <Icon size={20} />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-black mb-2">
                      {card.value}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                      <TrendingUp size={14} />
                      <span>{card.change}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-black">Recent Store Orders</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Latest customer purchases made on the storefront</p>
                </div>

                <Link
                  to="/admin/orders"
                  className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {stats.recentOrders.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                  No orders recorded yet. Once a customer checks out, orders will appear here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Items</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stats.recentOrders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 font-mono text-xs font-bold text-black">
                            #{ord._id.substring(ord._id.length - 8)}
                          </td>
                          <td className="py-3.5 text-gray-800 font-medium">
                            {ord.shippingAddress?.fullName || ord.user?.name || 'Customer'}
                          </td>
                          <td className="py-3.5 text-gray-500 text-xs">
                            {ord.orderItems?.length || 0} item(s)
                          </td>
                          <td className="py-3.5 font-bold text-black">
                            {formatPrice(ord.totalPrice)}
                          </td>
                          <td className="py-3.5">
                            <span className="px-2.5 py-1 bg-gray-100 text-black text-xs font-bold rounded-full">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-xs text-gray-500">
                            {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

