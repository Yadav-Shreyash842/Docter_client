import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaVideo, FaTimes, FaCheck, FaUser, FaUserMd } from 'react-icons/fa';
import { format } from 'date-fns';

const statusConfig = {
  booked:    { bg: 'bg-blue-100 dark:bg-blue-900/30',    text: 'text-blue-700 dark:text-blue-300',    label: 'Booked' },
  completed: { bg: 'bg-green-100 dark:bg-green-900/30',  text: 'text-green-700 dark:text-green-300',  label: 'Completed' },
  cancelled: { bg: 'bg-red-100 dark:bg-red-900/30',      text: 'text-red-700 dark:text-red-300',      label: 'Cancelled' },
};

const AppointmentCard = ({ appointment, onCancel, onComplete, userRole }) => {
  const status = statusConfig[appointment.status] || statusConfig.booked;
  const isDoctor = userRole === 'doctor';

  const displayName = isDoctor
    ? appointment.patient?.name || 'Unknown Patient'
    : `Dr. ${appointment.doctor?.userId?.name || 'Unknown Doctor'}`;

  const subText = isDoctor
    ? appointment.patient?.email
    : appointment.doctor?.specialization;

  const avatarLetter = displayName.replace('Dr. ', '').charAt(0).toUpperCase();
  const avatarGradient = isDoctor
    ? 'from-teal-400 to-teal-600'
    : 'from-indigo-400 to-indigo-600';

  let formattedDate = 'Invalid date';
  try {
    formattedDate = format(new Date(appointment.appointmentDate), 'MMM dd, yyyy');
  } catch {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Avatar + Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
            {avatarLetter}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {displayName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{subText}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <span className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <FaCalendarAlt className="text-primary-400" />
                <span>{formattedDate}</span>
              </span>
              <span className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <FaClock className="text-primary-400" />
                <span>{appointment.appointmentTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Status badge */}
        <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>

      {/* Actions - only for booked */}
      {appointment.status === 'booked' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {/* Join consultation - both roles */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            <FaVideo className="text-xs" />
            <span>Join Consultation</span>
          </motion.button>

          {/* Complete - doctor only */}
          {isDoctor && onComplete && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onComplete(appointment._id)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors"
            >
              <FaCheck className="text-xs" />
              <span>Mark Complete</span>
            </motion.button>
          )}

          {/* Cancel - both roles */}
          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (window.confirm('Cancel this appointment?')) onCancel(appointment._id);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium transition-colors"
            >
              <FaTimes className="text-xs" />
              <span>Cancel</span>
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;
