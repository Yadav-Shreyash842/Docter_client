import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaPrescriptionBottleAlt,
  FaChartLine,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
    ];

    if (user?.role === 'patient') {
      return [
        ...baseItems,
        { name: 'Doctors', icon: FaUserMd, path: '/doctors' },
        { name: 'My Appointments', icon: FaCalendarAlt, path: '/appointments' },
        { name: 'Prescriptions', icon: FaPrescriptionBottleAlt, path: '/prescriptions' },
      ];
    }

    if (user?.role === 'doctor') {
      return [
        ...baseItems,
        { name: 'Appointments', icon: FaCalendarAlt, path: '/doctor/appointments' },
        { name: 'Add Prescription', icon: FaPrescriptionBottleAlt, path: '/doctor/prescription' },
        { name: 'Profile', icon: FaUserMd, path: '/doctor/profile' },
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { name: 'Manage Doctors', icon: FaUserMd, path: '/admin/doctors' },
        { name: 'Manage Users', icon: FaUsers, path: '/admin/users' },
        { name: 'Appointments', icon: FaCalendarAlt, path: '/admin/appointments' },
        { name: 'Analytics', icon: FaChartLine, path: '/admin/analytics' },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:translate-x-0 lg:static"
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-2xl font-bold text-transparent"
          >
            HealthCare+
          </motion.h1>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-lg px-4 py-3 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={isActive ? 'text-white' : 'text-gray-500'} />
                      <span className="font-medium">{item.name}</span>
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700 p-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className="flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <FaCog />
            <span className="font-medium">Settings</span>
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
