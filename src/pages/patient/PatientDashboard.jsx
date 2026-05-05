import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserMd, FaPrescriptionBottleAlt, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../../components/StatsCard';
import AppointmentCard from '../../components/AppointmentCard';
import { appointmentService } from '../../services/appointmentService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const chartData = [
    { month: 'Jan', appointments: 2 },
    { month: 'Feb', appointments: 3 },
    { month: 'Mar', appointments: 1 },
    { month: 'Apr', appointments: 4 },
    { month: 'May', appointments: 2 },
    { month: 'Jun', appointments: 5 },
  ];

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
    try {
      await appointmentService.cancelAppointment(id);
      toast.success('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'booked');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your health overview</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/doctors')}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <FaCalendarAlt />
          <span>Book Appointment</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Upcoming Appointments"
          value={upcomingAppointments.length}
          icon={FaCalendarAlt}
          color="blue"
          trend={12}
        />
        <StatsCard
          title="Completed Visits"
          value={completedAppointments.length}
          icon={FaUserMd}
          color="green"
          trend={8}
        />
        <StatsCard
          title="Prescriptions"
          value="5"
          icon={FaPrescriptionBottleAlt}
          color="purple"
          trend={-3}
        />
        <StatsCard
          title="Health Score"
          value="92%"
          icon={FaChartLine}
          color="orange"
          trend={5}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Appointment History
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#0EA5E9"
                  strokeWidth={3}
                  dot={{ fill: '#0EA5E9', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/doctors')}
                className="w-full rounded-lg bg-primary-50 dark:bg-primary-900/20 p-4 text-left hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <p className="font-medium text-primary-900 dark:text-primary-100">Find a Doctor</p>
                <p className="text-sm text-primary-600 dark:text-primary-400">Browse specialists</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/prescriptions')}
                className="w-full rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-left hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <p className="font-medium text-green-900 dark:text-green-100">View Prescriptions</p>
                <p className="text-sm text-green-600 dark:text-green-400">Check your medications</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/appointments')}
                className="w-full rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4 text-left hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <p className="font-medium text-purple-900 dark:text-purple-100">My Appointments</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">View all bookings</p>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Appointments
        </h2>
        {upcomingAppointments.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <FaCalendarAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No upcoming appointments</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/doctors')}
              className="mt-4 rounded-lg bg-primary-500 px-6 py-2 text-white"
            >
              Book Now
            </motion.button>
          </div>
        ) : (
          <div className="grid gap-4">
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={handleCancelAppointment}
                userRole="patient"
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PatientDashboard;
