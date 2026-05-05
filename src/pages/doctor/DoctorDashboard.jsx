import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../../components/StatsCard';
import AppointmentCard from '../../components/AppointmentCard';
import { appointmentService } from '../../services/appointmentService';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartData = [
    { day: 'Mon', patients: 12 },
    { day: 'Tue', patients: 15 },
    { day: 'Wed', patients: 10 },
    { day: 'Thu', patients: 18 },
    { day: 'Fri', patients: 14 },
    { day: 'Sat', patients: 8 },
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getDoctorAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAppointment = async (id) => {
    try {
      await appointmentService.completeAppointment(id);
      toast.success('Appointment marked as completed');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to complete appointment');
    }
  };

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toDateString();
    const aptDate = new Date(apt.appointmentDate).toDateString();
    return today === aptDate && apt.status === 'booked';
  });

  const completedAppointments = appointments.filter(apt => apt.status === 'completed');
  const totalPatients = new Set(appointments.map(apt => apt.patient?._id)).size;

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your appointments and patients</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={FaCalendarAlt}
          color="blue"
          trend={15}
        />
        <StatsCard
          title="Total Patients"
          value={totalPatients}
          icon={FaUsers}
          color="green"
          trend={8}
        />
        <StatsCard
          title="Completed"
          value={completedAppointments.length}
          icon={FaCheckCircle}
          color="purple"
          trend={12}
        />
        <StatsCard
          title="Revenue"
          value="₹45,000"
          icon={FaDollarSign}
          color="orange"
          trend={20}
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
              Weekly Patient Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="patients" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
              </BarChart>
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
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                <p className="text-sm text-blue-600 dark:text-blue-400">Average Rating</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">4.8/5.0</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
                <p className="text-sm text-green-600 dark:text-green-400">Success Rate</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">96%</p>
              </div>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4">
                <p className="text-sm text-purple-600 dark:text-purple-400">Experience</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">10 Years</p>
              </div>
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
          Today's Appointments
        </h2>
        {todayAppointments.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <FaCalendarAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No appointments for today</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {todayAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onComplete={handleCompleteAppointment}
                userRole="doctor"
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DoctorDashboard;
