import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaRupeeSign, FaArrowRight, FaPlus } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../../components/StatsCard';
import AppointmentCard from '../../components/AppointmentCard';
import { appointmentService } from '../../services/appointmentService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const chartData = [
    { day: 'Mon', patients: 4 },
    { day: 'Tue', patients: 7 },
    { day: 'Wed', patients: 5 },
    { day: 'Thu', patients: 9 },
    { day: 'Fri', patients: 6 },
    { day: 'Sat', patients: 3 },
  ];

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getDoctorAppointments();
      setAppointments(data);
    } catch {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await appointmentService.completeAppointment(id);
      toast.success('Appointment completed!');
      fetchAppointments();
    } catch {
      toast.error('Failed to update');
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

  const today = new Date().toDateString();
  const todayApts = appointments.filter(a =>
    new Date(a.appointmentDate).toDateString() === today && a.status === 'booked'
  );
  const completed = appointments.filter(a => a.status === 'completed');
  const totalPatients = new Set(appointments.map(a => a.patient?._id)).size;

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dr. {user?.name} 👨‍⚕️
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {todayApts.length} appointment{todayApts.length !== 1 ? 's' : ''} today
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/doctor/prescription')}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/30"
          >
            <FaPlus />
            <span>Add Prescription</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/doctor/appointments')}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-medium"
          >
            <FaCalendarAlt />
            <span>All Appointments</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Today's Patients" value={todayApts.length} icon={FaCalendarAlt} color="blue" />
        <StatsCard title="Total Patients" value={totalPatients} icon={FaUsers} color="green" />
        <StatsCard title="Completed" value={completed.length} icon={FaCheckCircle} color="purple" />
        <StatsCard title="Revenue" value={`₹${completed.length * 1000}`} icon={FaRupeeSign} color="orange" />
      </div>

      {/* Chart + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Patients</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="patients" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'View Appointments', sub: 'Manage your schedule', path: '/doctor/appointments' },
              { label: 'Add Prescription', sub: 'Create for patient', path: '/doctor/prescription' },
              { label: 'Update Profile', sub: 'Edit your info', path: '/doctor/profile' },
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

      {/* Today's Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Appointments</h2>
          <button
            onClick={() => navigate('/doctor/appointments')}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View all
          </button>
        </div>

        {todayApts.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-10 text-center border border-dashed border-gray-200 dark:border-gray-700">
            <FaCalendarAlt className="mx-auto text-5xl text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No appointments scheduled for today</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {todayApts.map(apt => (
              <AppointmentCard
                key={apt._id}
                appointment={apt}
                onComplete={handleComplete}
                onCancel={handleCancel}
                userRole="doctor"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;
