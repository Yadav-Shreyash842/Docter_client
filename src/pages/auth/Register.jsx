import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaHeart, FaArrowLeft, FaUserMd } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: 'patient' }
  });

  const password = watch('password');
  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...userData } = data;
      const user = await registerUser(userData);
      toast.success(`Account created! Welcome, ${user.name}!`);

      if (user.role === 'doctor') {
        navigate('/doctor/dashboard', { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/patient/dashboard', { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-2xl">
              <FaHeart className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-white">HealthCare+</h1>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Join Us Today</h2>
          <p className="text-primary-200 text-lg max-w-md">
            Create your account and start your healthcare journey with us.
          </p>

          {/* Role Cards */}
          <div className="mt-10 space-y-4">
            <div className={`p-4 rounded-2xl border-2 transition-all ${selectedRole === 'patient' ? 'border-primary-400 bg-primary-500/20' : 'border-white/10 bg-white/5'}`}>
              <div className="flex items-center space-x-3">
                <FaUser className="text-primary-300 text-xl" />
                <div className="text-left">
                  <p className="text-white font-semibold">Patient Account</p>
                  <p className="text-primary-200 text-sm">Book appointments, view prescriptions</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-2xl border-2 transition-all ${selectedRole === 'doctor' ? 'border-indigo-400 bg-indigo-500/20' : 'border-white/10 bg-white/5'}`}>
              <div className="flex items-center space-x-3">
                <FaUserMd className="text-indigo-300 text-xl" />
                <div className="text-left">
                  <p className="text-white font-semibold">Doctor Account</p>
                  <p className="text-primary-200 text-sm">Manage appointments, add prescriptions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-300 hover:text-white mb-8 transition-colors">
            <FaArrowLeft className="text-sm" />
            <span className="text-sm">Back to Home</span>
          </Link>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-primary-200">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-primary-200 mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['patient', 'doctor'].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedRole === role
                          ? 'border-primary-400 bg-primary-500/20 text-white'
                          : 'border-white/20 text-primary-300 hover:border-white/40'
                      }`}
                    >
                      <input
                        {...register('role')}
                        type="radio"
                        value={role}
                        className="hidden"
                      />
                      {role === 'patient' ? <FaUser /> : <FaUserMd />}
                      <span className="capitalize font-medium">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-200 mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300" />
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-200 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                    })}
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-200 mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                    type="password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-200 mb-2">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300" />
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm password',
                      validate: v => v === password || 'Passwords do not match',
                    })}
                    type="password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3.5 rounded-xl font-semibold shadow-lg transition-all disabled:opacity-50 mt-2"
              >
                {loading ? <Loader size="sm" /> : (
                  <>
                    <FaUserPlus />
                    <span>Create Account</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-200 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-white font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
