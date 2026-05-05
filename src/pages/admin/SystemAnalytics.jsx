import { motion } from 'framer-motion';
import { FaUsers, FaUserMd, FaCalendarAlt, FaDollarSign, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import StatsCard from '../../components/StatsCard';

const SystemAnalytics = () => {
  // Revenue data
  const revenueData = [
    { month: 'Jan', revenue: 45000, appointments: 120, patients: 85 },
    { month: 'Feb', revenue: 52000, appointments: 145, patients: 98 },
    { month: 'Mar', revenue: 48000, appointments: 132, patients: 92 },
    { month: 'Apr', revenue: 61000, appointments: 168, patients: 115 },
    { month: 'May', revenue: 55000, appointments: 152, patients: 105 },
    { month: 'Jun', revenue: 67000, appointments: 185, patients: 128 },
  ];

  // Doctor performance
  const doctorPerformance = [
    { name: 'Dr. Sarah Wilson', appointments: 145, rating: 4.8, revenue: 145000 },
    { name: 'Dr. Mike Johnson', appointments: 132, rating: 4.7, revenue: 132000 },
    { name: 'Dr. Emily Brown', appointments: 128, rating: 4.9, revenue: 128000 },
    { name: 'Dr. John Smith', appointments: 115, rating: 4.6, revenue: 115000 },
    { name: 'Dr. Lisa Davis', appointments: 98, rating: 4.8, revenue: 98000 },
  ];

  // Appointment distribution by specialization
  const specializationData = [
    { name: 'Cardiology', value: 35, color: '#3B82F6' },
    { name: 'Dermatology', value: 25, color: '#10B981' },
    { name: 'Pediatrics', value: 20, color: '#F59E0B' },
    { name: 'Orthopedics', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' },
  ];

  // Peak hours data
  const peakHoursData = [
    { hour: '9 AM', appointments: 12 },
    { hour: '10 AM', appointments: 25 },
    { hour: '11 AM', appointments: 32 },
    { hour: '12 PM', appointments: 18 },
    { hour: '2 PM', appointments: 28 },
    { hour: '3 PM', appointments: 35 },
    { hour: '4 PM', appointments: 30 },
    { hour: '5 PM', appointments: 22 },
  ];

  // System alerts
  const systemAlerts = [
    { type: 'warning', message: 'High appointment load detected for tomorrow', time: '5 mins ago' },
    { type: 'info', message: '3 doctors have availability conflicts', time: '15 mins ago' },
    { type: 'success', message: 'System backup completed successfully', time: '1 hour ago' },
    { type: 'warning', message: 'Payment gateway response time increased', time: '2 hours ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive system insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹3.28M"
          icon={FaDollarSign}
          color="green"
          trend={18}
        />
        <StatsCard
          title="Active Users"
          value="1,234"
          icon={FaUsers}
          color="blue"
          trend={12}
        />
        <StatsCard
          title="Total Doctors"
          value="156"
          icon={FaUserMd}
          color="purple"
          trend={8}
        />
        <StatsCard
          title="Appointments"
          value="856"
          icon={FaCalendarAlt}
          color="orange"
          trend={15}
        />
      </div>

      {/* System Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center space-x-2 mb-4">
          <FaExclamationTriangle className="text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Alerts</h2>
        </div>
        <div className="space-y-3">
          {systemAlerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-3 p-4 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                alert.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20' :
                'bg-green-50 dark:bg-green-900/20'
              }`}
            >
              <div className={`h-2 w-2 rounded-full mt-2 ${
                alert.type === 'warning' ? 'bg-yellow-500' :
                alert.type === 'info' ? 'bg-blue-500' :
                'bg-green-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Revenue & Appointments Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Appointments by Specialization
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specializationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {specializationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Peak Hours & Doctor Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Peak Appointment Hours
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="appointments" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Doctors
          </h2>
          <div className="space-y-4">
            {doctorPerformance.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {doctor.appointments} appointments • ⭐ {doctor.rating}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">
                    ₹{(doctor.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Patient Growth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Patient Growth & Appointments
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 6 }}
              name="Appointments"
            />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', r: 6 }}
              name="New Patients"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default SystemAnalytics;
