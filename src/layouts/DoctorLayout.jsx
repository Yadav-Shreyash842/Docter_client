import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt, FaCalendarAlt, FaPrescriptionBottleAlt,
  FaUserMd, FaCog, FaBars, FaTimes, FaBell, FaMoon, FaSun,
  FaSignOutAlt, FaStethoscope, FaClipboardList
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DoctorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaTachometerAlt, path: '/doctor/dashboard' },
    { name: 'Appointments', icon: FaCalendarAlt, path: '/doctor/appointments' },
    { name: 'Add Prescription', icon: FaPrescriptionBottleAlt, path: '/doctor/prescription' },
    { name: 'My Profile', icon: FaUserMd, path: '/doctor/profile' },
    { name: 'Settings', icon: FaCog, path: '/doctor/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-gray-900">

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR - Deep Blue/Indigo theme for Doctor */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 z-50 h-screen w-64 lg:translate-x-0 lg:static lg:block flex-shrink-0"
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 dark:from-gray-800 dark:to-gray-900 shadow-2xl">

          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-600/30">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                <FaStethoscope className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">HealthCare+</h1>
                <p className="text-indigo-200 text-xs">Doctor Portal</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <FaTimes />
            </button>
          </div>

          {/* Doctor Info */}
          <div className="px-6 py-4 border-b border-indigo-600/30">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/30">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Dr. {user?.name}</p>
                <p className="text-indigo-200 text-xs">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-400/30 text-indigo-100 text-xs rounded-full">
                  Doctor
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-lg font-semibold'
                        : 'text-indigo-100 hover:bg-white/10'
                    }`
                  }
                >
                  <item.icon className="text-lg flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-indigo-600/30">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-indigo-100 hover:bg-red-500/20 hover:text-red-200 transition-all"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Dr. <span className="text-indigo-600">{user?.name}</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Doctor Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaBell className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-4 lg:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DoctorLayout;
