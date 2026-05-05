import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserMd, FaPrescriptionBottleAlt, FaHeartbeat, FaArrowRight } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../../components/StatsCard';
import AppointmentCard from '../../components/AppointmentCard';
import { appointmentService } from '../../services/appointmentService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const chartData = [
    { month: 'Jan', visits: 2 },
    { month: 'Feb', visits: 3 },
    { month: 'Mar', visits: 1 },
    { month: 'Apr', visits: 4 },
    { month: 'May', visits: 2 },
    { month: 'Jun', visits: 5 },
  ];

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getPatientAppointments();
      setAppointments(data);
    } catch {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await appointmentService.cancelAppointment(id);
      toast.success('Appointment cancelled');
      fetchAppointments();
    } catch {
      toast.error('Failed to cancel');
    }
  };

  const upcoming = appointments.filter(a => a.status === 'booked');
  const completed = appointments.filter(a => a.status === 'completed');

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Hello, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your health overview</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/patient/doctors')}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-teal-500/30"
        >
          <FaCalendarAlt />
          <span>Book Appointment</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Upcoming" value={upcoming.length} icon={FaCalendarAlt} color="blue" />
        <StatsCard title="Completed" value={completed.length} icon={FaUserMd} color="green" />
        <StatsCard title="Prescriptions" value={completed.length} icon={FaPrescriptionBottleAlt} color="purple" />
        <StatsCard title="Health Score" value="92%" icon={FaHeartbeat} color="orange" />
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visit History</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Line type="monotone" dataKey="visits" stroke="#14B8A6" strokeWidth={3} dot={{ fill: '#14B8A6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Find a Doctor', sub: 'Browse specialists', path: '/patient/doctors', color: 'teal' },
              { label: 'My Appointments', sub: 'View all bookings', path: '/patient/appointments', color: 'blue' },
              { label: 'Prescriptions', sub: 'View medications', path: '/patient/prescriptions', color: 'purple' },
            ].map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all text-left"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
                </div>
                <FaArrowRight className="text-gray-400 text-sm" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
          <button
            onClick={() => navigate('/patient/appointments')}
            className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
          >
            View all
          </button>
        </div>

        {upcoming.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-10 text-center border border-dashed border-gray-200 dark:border-gray-700">
            <FaCalendarAlt className="mx-auto text-5xl text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">No upcoming appointments</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/patient/doctors')}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium"
            >
              Book Now
            </motion.button>
          </div>
        ) : (
          <div className="grid gap-4">
            {upcoming.slice(0, 3).map(apt => (
              <AppointmentCard key={apt._id} appointment={apt} onCancel={handleCancel} userRole="patient" />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PatientDashboard;
