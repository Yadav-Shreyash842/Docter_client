import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import AppointmentCard from '../../components/AppointmentCard';
import { appointmentService } from '../../services/appointmentService';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getPatientAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      await appointmentService.cancelAppointment(id);
      toast.success('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your appointments</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'booked', 'completed', 'cancelled'].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-lg font-medium capitalize transition-all whitespace-nowrap ${
              filter === status
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {status}
          </motion.button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <FaCalendarAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No appointments found</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AppointmentCard
                appointment={appointment}
                onCancel={handleCancelAppointment}
                userRole="patient"
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyAppointments;
