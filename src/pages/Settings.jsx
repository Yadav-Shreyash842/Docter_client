import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser, FaBell, FaLock, FaPalette, FaSave, FaCamera,
  FaEye, FaEyeSlash, FaCheckCircle, FaShieldAlt, FaKey
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-primary-500
      after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
      after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
  </label>
);

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [photo, setPhoto] = useState(() => {
    const key = user?.role === 'doctor' ? 'doctorPhoto' : 'patientPhoto';
    return localStorage.getItem(key) || null;
  });
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const fileRef = useRef();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    bio: '',
    specialization: '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    promotionalEmails: false,
  });

  const [appearance, setAppearance] = useState({
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target.result);
      const key = user?.role === 'doctor' ? 'doctorPhoto' : 'patientPhoto';
      localStorage.setItem(key, ev.target.result);
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Profile updated successfully!');
    setSavingProfile(false);
  };

  const handleChangePassword = async () => {
    if (!passwords.oldPassword) { toast.error('Enter your current password'); return; }
    if (passwords.newPassword.length < 6) { toast.error('New password must be at least 6 characters'); return; }
    if (passwords.newPassword !== passwords.confirmPassword) { toast.error('Passwords do not match'); return; }
    setSavingPassword(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Password changed successfully!');
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setSavingPassword(false);
  };

  const tabs = [
    { id: 'profile',       label: 'Profile',       icon: FaUser },
    { id: 'password',      label: 'Password',      icon: FaKey },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance',    label: 'Appearance',    icon: FaPalette },
  ];

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-600 transition-all outline-none";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your profile, password and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ── Tabs ── */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-3 shadow-sm border border-gray-100 dark:border-gray-700 space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="lg:col-span-3">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

            {/* ── PROFILE TAB ── */}
            {activeTab === 'profile' && (
              <div>
                {/* Cover + Avatar */}
                <div className="relative h-28 bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600">
                  <div className="absolute -bottom-10 left-6">
                    <div className="relative group cursor-pointer" onClick={() => fileRef.current.click()}>
                      {photo ? (
                        <img src={photo} alt="avatar" className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-800 shadow-xl" />
                      ) : (
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 ring-4 ring-white dark:ring-gray-800 shadow-xl flex items-center justify-center text-white text-3xl font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <FaCamera className="text-white text-xl" />
                      </div>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </div>
                </div>

                <div className="pt-14 px-6 pb-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role} • {user?.email}</p>
                    </div>
                    <button onClick={() => fileRef.current.click()}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                      <FaCamera className="text-xs" />
                      <span>Change Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                      <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={inputCls} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                      <input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} type="email" className={inputCls} placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                      <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} type="tel" className={inputCls} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
                      <input value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} className={inputCls} placeholder="City, State" />
                    </div>
                    {user?.role === 'doctor' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Specialization</label>
                        <input value={profile.specialization} onChange={e => setProfile({ ...profile, specialization: e.target.value })} className={inputCls} placeholder="e.g. Cardiologist" />
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                      <textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} rows={3} className={inputCls} placeholder="Tell us about yourself..." />
                    </div>
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile} disabled={savingProfile}
                    className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg disabled:opacity-60">
                    {savingProfile ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><FaSave /><span>Save Profile</span></>
                    )}
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── PASSWORD TAB ── */}
            {activeTab === 'password' && (
              <div className="p-6 space-y-5">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                    <FaShieldAlt className="text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Keep your account secure</p>
                  </div>
                </div>

                {/* Password strength tips */}
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4 space-y-1">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Password requirements:</p>
                  {['At least 6 characters', 'Mix of letters and numbers', 'Avoid common passwords'].map(tip => (
                    <div key={tip} className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                      <FaCheckCircle className="text-xs" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>

                {[
                  { key: 'oldPassword', label: 'Current Password', show: showOldPass, toggle: () => setShowOldPass(!showOldPass) },
                  { key: 'newPassword', label: 'New Password',     show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                  { key: 'confirmPassword', label: 'Confirm New Password', show: showConfPass, toggle: () => setShowConfPass(!showConfPass) },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
                    <div className="relative">
                      <input
                        type={field.show ? 'text' : 'password'}
                        value={passwords[field.key]}
                        onChange={e => setPasswords({ ...passwords, [field.key]: e.target.value })}
                        className={inputCls + ' pr-12'}
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={field.toggle}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        {field.show ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                ))}

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleChangePassword} disabled={savingPassword}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg disabled:opacity-60">
                  {savingPassword ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><FaKey /><span>Update Password</span></>
                  )}
                </motion.button>
              </div>
            )}

            {/* ── NOTIFICATIONS TAB ── */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                {[
                  { key: 'emailNotifications',  label: 'Email Notifications',  desc: 'Receive updates via email' },
                  { key: 'smsNotifications',     label: 'SMS Notifications',    desc: 'Receive updates via SMS' },
                  { key: 'appointmentReminders', label: 'Appointment Reminders',desc: 'Get reminded before appointments' },
                  { key: 'promotionalEmails',    label: 'Promotional Emails',   desc: 'Offers and health tips' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={notifications[item.key]} onChange={v => setNotifications({ ...notifications, [item.key]: v })} />
                  </div>
                ))}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success('Notification preferences saved!')}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg mt-2">
                  <FaSave /><span>Save Preferences</span>
                </motion.button>
              </div>
            )}

            {/* ── APPEARANCE TAB ── */}
            {activeTab === 'appearance' && (
              <div className="p-6 space-y-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Appearance & Language</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
                    <select value={appearance.language} onChange={e => setAppearance({ ...appearance, language: e.target.value })} className={inputCls}>
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date Format</label>
                    <select value={appearance.dateFormat} onChange={e => setAppearance({ ...appearance, dateFormat: e.target.value })} className={inputCls}>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Time Format</label>
                    <select value={appearance.timeFormat} onChange={e => setAppearance({ ...appearance, timeFormat: e.target.value })} className={inputCls}>
                      <option value="12h">12 Hour (AM/PM)</option>
                      <option value="24h">24 Hour</option>
                    </select>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success('Appearance settings saved!')}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg">
                  <FaSave /><span>Save Settings</span>
                </motion.button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
