import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt, FaCalendarAlt, FaPrescriptionBottleAlt, FaUserMd,
  FaCog, FaBars, FaTimes, FaBell, FaMoon, FaSun, FaSignOutAlt,
  FaStethoscope, FaCamera, FaChevronDown, FaKey, FaShieldAlt, FaHome,
  FaUser, FaClipboardList
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DoctorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [profileOpen, setProfileOpen] = useState(false);
  const [photo, setPhoto] = useState(() => localStorage.getItem('doctorPhoto') || null);
  const fileRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    darkMode ? document.documentElement.classList.add('dark')
             : document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target.result);
      localStorage.setItem('doctorPhoto', ev.target.result);
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const menuItems = [
    { name: 'Dashboard',        icon: FaTachometerAlt,         path: '/doctor/dashboard' },
    { name: 'Appointments',     icon: FaCalendarAlt,           path: '/doctor/appointments' },
    { name: 'Add Prescription', icon: FaPrescriptionBottleAlt, path: '/doctor/prescription' },
    { name: 'My Profile',       icon: FaUserMd,                path: '/doctor/profile' },
    { name: 'Settings',         icon: FaCog,                   path: '/doctor/settings' },
  ];

  const Avatar = ({ size = 'md', ring = false }) => {
    const sizes = { sm: 'h-8 w-8 text-sm', md: 'h-11 w-11 text-base', lg: 'h-20 w-20 text-3xl' };
    return photo ? (
      <img src={photo} alt="avatar"
        className={`${sizes[size]} rounded-full object-cover ${ring ? 'ring-2 ring-white/40' : ''}`} />
    ) : (
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold ${ring ? 'ring-2 ring-white/40' : ''}`}>
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-gray-900">

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 z-50 h-screen w-64 lg:translate-x-0 lg:static lg:block flex-shrink-0"
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 shadow-2xl">

          {/* Logo */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-500/30">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-inner">
                <FaStethoscope className="text-white text-base" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">HealthCare+</p>
                <p className="text-indigo-200 text-[10px] uppercase tracking-widest">Doctor Portal</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-indigo-200 hover:text-white">
              <FaTimes />
            </button>
          </div>

          {/* ── Doctor Profile Card ── */}
          <div className="mx-4 my-4 rounded-2xl bg-white/10 backdrop-blur p-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0 cursor-pointer group" onClick={() => fileRef.current.click()}>
                <Avatar size="md" ring />
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <FaCamera className="text-white text-xs" />
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">Dr. {user?.name}</p>
                <p className="text-indigo-200 text-xs truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-400/30 text-indigo-100 text-[10px] rounded-full font-medium">
                  Doctor
                </span>
              </div>
            </div>
            <button
              onClick={() => { navigate('/doctor/profile'); setSidebarOpen(false); }}
              className="mt-3 w-full text-xs text-indigo-200 hover:text-white flex items-center justify-center space-x-1 py-1.5 rounded-lg hover:bg-white/10 transition-all"
            >
              <FaCamera className="text-[10px]" />
              <span>Edit Profile & Photo</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
            <p className="text-indigo-300/60 text-[10px] uppercase tracking-widest px-3 pb-2 font-semibold">Menu</p>
            {menuItems.map((item, i) => (
              <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <NavLink to={item.path} onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-sm ${
                      isActive ? 'bg-white text-indigo-700 shadow-lg font-semibold'
                               : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="text-base flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Bottom */}
          <div className="px-3 pb-4 space-y-1 border-t border-indigo-500/30 pt-3">
            <button onClick={() => navigate('/')}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-indigo-200 hover:bg-white/10 hover:text-white transition-all text-sm">
              <FaHome /><span>Back to Home</span>
            </button>
            <button onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-indigo-200 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm">
              <FaSignOutAlt /><span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ── MAIN ── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
            <div className="hidden sm:block">
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                Dr. <span className="text-indigo-600 dark:text-indigo-400">{user?.name}</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Doctor Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              <FaBell />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <Avatar size="sm" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">Dr. {user?.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Doctor</p>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-indigo-600 to-indigo-700">
                      <div className="flex items-center space-x-3">
                        <div className="relative cursor-pointer group" onClick={() => { fileRef.current.click(); setProfileOpen(false); }}>
                          <Avatar size="md" ring />
                          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <FaCamera className="text-white text-xs" />
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Dr. {user?.name}</p>
                          <p className="text-indigo-200 text-xs">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 text-white text-[10px] rounded-full">Doctor</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      {[
                        { icon: FaUser,      label: 'Edit Profile',    sub: 'Update your details',    action: () => { navigate('/doctor/profile'); setProfileOpen(false); } },
                        { icon: FaCamera,    label: 'Change Photo',    sub: 'Upload profile picture', action: () => { fileRef.current.click(); setProfileOpen(false); } },
                        { icon: FaKey,       label: 'Change Password', sub: 'Update your password',   action: () => { navigate('/doctor/settings'); setProfileOpen(false); } },
                        { icon: FaClipboardList, label: 'My Appointments', sub: 'View schedule',      action: () => { navigate('/doctor/appointments'); setProfileOpen(false); } },
                        { icon: FaCog,       label: 'Settings',        sub: 'App preferences',        action: () => { navigate('/doctor/settings'); setProfileOpen(false); } },
                      ].map((item) => (
                        <button key={item.label} onClick={item.action}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-left group">
                          <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                            <item.icon className="text-indigo-600 dark:text-indigo-400 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{item.label}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{item.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                      <button onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left">
                        <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                          <FaSignOutAlt className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-600 dark:text-red-400">Logout</p>
                          <p className="text-xs text-gray-400">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-y-auto p-4 lg:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DoctorLayout;
