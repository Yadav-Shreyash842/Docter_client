import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash, FaPrescriptionBottleAlt } from 'react-icons/fa';
import { prescriptionService } from '../../services/appointmentService';
import { appointmentService } from '../../services/appointmentService';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const AddPrescription = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medicines',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getDoctorAppointments();
      const completed = data.filter(apt => apt.status === 'completed');
      setAppointments(completed);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await prescriptionService.createPrescription(data);
      toast.success('Prescription added successfully!');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add prescription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Prescription</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Create prescription for your patients</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Patient
            </label>
            <select
              {...register('patient', { required: 'Patient is required' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Choose a patient</option>
              {appointments.map((apt) => (
                <option key={apt._id} value={apt.patient?._id}>
                  {apt.patient?.name} - {new Date(apt.appointmentDate).toLocaleDateString()}
                </option>
              ))}
            </select>
            {errors.patient && (
              <p className="mt-1 text-sm text-red-500">{errors.patient.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Medicines
              </label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => append({ name: '', dosage: '', frequency: '', duration: '' })}
                className="flex items-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-600 transition-colors"
              >
                <FaPlus />
                <span>Add Medicine</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Medicine {index + 1}
                    </h4>
                    {fields.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </motion.button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register(`medicines.${index}.name`, { required: 'Medicine name is required' })}
                        placeholder="Medicine name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      {errors.medicines?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.medicines[index].name.message}</p>
                      )}
                    </div>
                    <input
                      {...register(`medicines.${index}.dosage`)}
                      placeholder="Dosage (e.g., 500mg)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      {...register(`medicines.${index}.frequency`)}
                      placeholder="Frequency (e.g., Twice daily)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      {...register(`medicines.${index}.duration`)}
                      placeholder="Duration (e.g., 7 days)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes
            </label>
            <textarea
              {...register('notes')}
              rows={4}
              placeholder="Add any additional instructions or notes..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader size="sm" />
            ) : (
              <>
                <FaPrescriptionBottleAlt />
                <span>Create Prescription</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddPrescription;
