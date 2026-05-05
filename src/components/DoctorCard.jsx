import { motion } from 'framer-motion';
import { FaStar, FaUserMd, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DoctorCard = ({ doctor, onBook }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleBook = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    if (user?.role === 'doctor') {
      toast.error('Doctors cannot book appointments');
      return;
    }
    if (onBook) onBook(doctor);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
    >
      {/* Top glow */}
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-60 blur-3xl transition-opacity duration-500" />

      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {doctor.userId?.name?.charAt(0) || 'D'}
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
            Dr. {doctor.userId?.name}
          </h3>
          <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
            {doctor.specialization}
          </p>
          <div className="mt-1.5 flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <FaUserMd className="text-gray-400" />
              <span>{doctor.experience} yrs exp</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaStar className="text-yellow-400" />
              <span>4.8</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {doctor.bio && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {doctor.bio}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-gray-900 dark:text-white">
          <FaRupeeSign className="text-green-500 text-sm" />
          <span className="text-lg font-bold">{doctor.consultationFee}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">/visit</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBook}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-teal-500/30 transition-all"
        >
          <FaCalendarAlt className="text-xs" />
          <span>Book Now</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
