import { motion } from 'framer-motion';
import { FaUsers, FaUserMd, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import StatsCard from '../../components/StatsCard';

const AdminDashboard = () => {
  const appointmentData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'Booked', value: 30, color: '#3B82F6' },
    { name: 'Cancelled', value: 10, color: '#EF4444' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">System overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="1,234"
          icon={FaUsers}
          color="blue"
          trend={12}
        />
        <StatsCard
          title="Total Doctors"
          value="156"
          icon={FaUserMd}
          color="green"
          trend={8}
        />
        <StatsCard
          title="Appointments"
          value="856"
          icon={FaCalendarAlt}
          color="purple"
          trend={15}
        />
        <StatsCard
          title="Revenue"
          value="₹2.5M"
          icon={FaDollarSign}
          color="orange"
          trend={20}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Appointment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: 'New doctor registered', time: '2 minutes ago', color: 'green' },
              { action: 'Appointment booked', time: '15 minutes ago', color: 'blue' },
              { action: 'User registered', time: '1 hour ago', color: 'purple' },
              { action: 'Appointment cancelled', time: '2 hours ago', color: 'red' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 rounded-lg bg-gray-50 dark:bg-gray-700 p-3"
              >
                <div className={`h-2 w-2 rounded-full bg-${activity.color}-500`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
