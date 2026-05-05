import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { doctorService } from '../../services/appointmentService';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    
    try {
      await doctorService.deleteDoctor(id);
      toast.success('Doctor deleted successfully');
      fetchDoctors();
    } catch (error) {
      toast.error('Failed to delete doctor');
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingDoctor) {
        await doctorService.updateDoctor(editingDoctor._id, data);
        toast.success('Doctor updated successfully');
      } else {
        await doctorService.createDoctor(data);
        toast.success('Doctor added successfully');
      }
      setIsModalOpen(false);
      reset();
      setEditingDoctor(null);
      fetchDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    reset(doctor);
    setIsModalOpen(true);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Doctors</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove doctors</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingDoctor(null);
            reset({});
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <FaPlus />
          <span>Add Doctor</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                  {doctor.userId?.name?.charAt(0) || 'D'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Dr. {doctor.userId?.name}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Experience: {doctor.experience} years</p>
              <p>Fee: ₹{doctor.consultationFee}</p>
              <p className="text-xs">{doctor.userId?.email}</p>
            </div>

            <div className="mt-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(doctor)}
                className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
              >
                <FaEdit />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(doctor._id)}
                className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
              >
                <FaTrash />
                <span>Delete</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDoctor(null);
          reset({});
        }}
        title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User ID
            </label>
            <input
              {...register('userId', { required: 'User ID is required' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="Enter user ID"
            />
            {errors.userId && <p className="mt-1 text-sm text-red-500">{errors.userId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specialization
            </label>
            <input
              {...register('specialization', { required: 'Specialization is required' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
            {errors.specialization && <p className="mt-1 text-sm text-red-500">{errors.specialization.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience (years)
              </label>
              <input
                {...register('experience', { required: 'Experience is required' })}
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fee (₹)
              </label>
              <input
                {...register('consultationFee', { required: 'Fee is required' })}
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-medium"
          >
            {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
          </motion.button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default ManageDoctors;
