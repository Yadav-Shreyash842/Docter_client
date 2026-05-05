import { motion } from 'framer-motion';
import { FaStar, FaUserMd, FaCalendarAlt } from 'react-icons/fa';

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
            {doctor.userId?.name?.charAt(0) || 'D'}
          </div>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dr. {doctor.userId?.name}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            {doctor.specialization}
          </p>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <FaUserMd className="mr-1" />
              {doctor.experience} years
            </span>
            <span className="flex items-center">
              <FaStar className="mr-1 text-yellow-400" />
              4.8
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Consultation Fee</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{doctor.consultationFee}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook(doctor)}
            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <FaCalendarAlt />
            <span>Book Now</span>
          </motion.button>
        </div>
      </div>

      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 opacity-20 blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
};

export default DoctorCard;
