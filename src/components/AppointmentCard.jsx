import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaVideo, FaTimes, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';

const AppointmentCard = ({ appointment, onCancel, onComplete, onJoin, userRole }) => {
  const statusColors = {
    booked: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const doctorName = appointment.doctor?.userId?.name || 'Unknown Doctor';
  const patientName = appointment.patient?.name || 'Unknown Patient';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
              {userRole === 'patient' ? doctorName.charAt(0) : patientName.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {userRole === 'patient' ? `Dr. ${doctorName}` : patientName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {appointment.doctor?.specialization}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FaCalendarAlt className="text-primary-500" />
              <span>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FaClock className="text-primary-500" />
              <span>{appointment.appointmentTime}</span>
            </div>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
          {appointment.status}
        </span>
      </div>

      {appointment.status === 'booked' && (
        <div className="mt-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onJoin && onJoin(appointment)}
            className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-medium text-white"
          >
            <FaVideo />
            <span>Join Consultation</span>
          </motion.button>
          {userRole === 'doctor' && onComplete && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onComplete(appointment._id)}
              className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              <FaCheck />
            </motion.button>
          )}
          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCancel(appointment._id)}
              className="flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              <FaTimes />
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;
