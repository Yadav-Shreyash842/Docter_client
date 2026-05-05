import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFilter, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  // Mock data - Replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setAppointments([
        {
          _id: '1',
          patient: { name: 'John Doe', email: 'john@test.com' },
          doctor: { userId: { name: 'Dr. Sarah Wilson' }, specialization: 'Cardiologist' },
          appointmentDate: '2024-02-15',
          appointmentTime: '10:00 AM',
          status: 'booked',
          paymentStatus: 'paid',
          createdAt: '2024-02-10'
        },
        {
          _id: '2',
          patient: { name: 'Jane Smith', email: 'jane@test.com' },
          doctor: { userId: { name: 'Dr. Mike Johnson' }, specialization: 'Dermatologist' },
          appointmentDate: '2024-02-16',
          appointmentTime: '02:00 PM',
          status: 'completed',
          paymentStatus: 'paid',
          createdAt: '2024-02-11'
        },
        {
          _id: '3',
          patient: { name: 'Bob Wilson', email: 'bob@test.com' },
          doctor: { userId: { name: 'Dr. Sarah Wilson' }, specialization: 'Cardiologist' },
          appointmentDate: '2024-02-14',
          appointmentTime: '11:00 AM',
          status: 'cancelled',
          paymentStatus: 'refunded',
          createdAt: '2024-02-09'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBulkCancel = () => {
    if (selectedAppointments.length === 0) {
      toast.error('Please select appointments to cancel');
      return;
    }
    toast.success(`${selectedAppointments.length} appointments cancelled`);
    setSelectedAppointments([]);
  };

  const handleExport = () => {
    toast.success('Exporting appointments data...');
  };

  const toggleSelectAppointment = (id) => {
    setSelectedAppointments(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesDate = filterDate === 'all' || 
      (filterDate === 'today' && new Date(apt.appointmentDate).toDateString() === new Date().toDateString()) ||
      (filterDate === 'upcoming' && new Date(apt.appointmentDate) > new Date());
    return matchesStatus && matchesDate;
  });

  const stats = {
    total: appointments.length,
    booked: appointments.filter(a => a.status === 'booked').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage all appointments</p>
        </div>
        <div className="flex space-x-3">
          {selectedAppointments.length > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBulkCancel}
              className="flex items-center space-x-2 rounded-lg bg-red-500 px-6 py-3 text-white font-medium shadow-lg"
            >
              <FaTimesCircle />
              <span>Cancel Selected ({selectedAppointments.length})</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="flex items-center space-x-2 rounded-lg bg-green-500 px-6 py-3 text-white font-medium shadow-lg"
          >
            <FaDownload />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white"
        >
          <p className="text-sm opacity-90">Total Appointments</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white"
        >
          <p className="text-sm opacity-90">Booked</p>
          <p className="text-3xl font-bold mt-2">{stats.booked}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white"
        >
          <p className="text-sm opacity-90">Completed</p>
          <p className="text-3xl font-bold mt-2">{stats.completed}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white"
        >
          <p className="text-sm opacity-90">Cancelled</p>
          <p className="text-3xl font-bold mt-2">{stats.cancelled}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="booked">Booked</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* Appointments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAppointments(filteredAppointments.map(a => a._id));
                      } else {
                        setSelectedAppointments([]);
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAppointments.map((apt, index) => (
                <motion.tr
                  key={apt._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAppointments.includes(apt._id)}
                      onChange={() => toggleSelectAppointment(apt._id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {apt.patient.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {apt.patient.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {apt.doctor.userId.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {apt.doctor.specialization}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {format(new Date(apt.appointmentDate), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {apt.appointmentTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'booked' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      apt.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.paymentStatus === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      apt.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {apt.paymentStatus}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManageAppointments;
