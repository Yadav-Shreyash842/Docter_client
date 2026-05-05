import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import DoctorCard from '../../components/DoctorCard';
import Modal from '../../components/Modal';
import { doctorService, appointmentService } from '../../services/appointmentService';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(doctor =>
      doctor.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const fetchDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    setBookingLoading(true);
    try {
      await appointmentService.bookAppointment({
        doctor: selectedDoctor._id,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
      });
      toast.success('Appointment booked successfully!');
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find a Doctor</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Book an appointment with our specialists</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FaFilter />
          <span>Filters</span>
        </motion.button>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No doctors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DoctorCard doctor={doctor} onBook={handleBookClick} />
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Appointment"
        size="md"
      >
        {selectedDoctor && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Doctor</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Dr. {selectedDoctor.userId?.name}
              </p>
              <p className="text-sm text-primary-600 dark:text-primary-400">
                {selectedDoctor.specialization}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Appointment Date
              </label>
              <input
                {...register('appointmentDate', { required: 'Date is required' })}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.appointmentDate && (
                <p className="mt-1 text-sm text-red-500">{errors.appointmentDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Slot
              </label>
              <select
                {...register('appointmentTime', { required: 'Time slot is required' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.appointmentTime && (
                <p className="mt-1 text-sm text-red-500">{errors.appointmentTime.message}</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={bookingLoading}
                className="flex-1 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-white font-medium disabled:opacity-50"
              >
                {bookingLoading ? <Loader size="sm" /> : 'Confirm Booking'}
              </motion.button>
            </div>
          </form>
        )}
      </Modal>
    </motion.div>
  );
};

export default BookAppointment;
