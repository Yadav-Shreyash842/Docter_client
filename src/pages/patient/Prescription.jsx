import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPrescriptionBottleAlt, FaDownload } from 'react-icons/fa';
import { prescriptionService } from '../../services/appointmentService';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const data = await prescriptionService.getPrescriptionsByPatient(user._id);
      setPrescriptions(data);
    } catch (error) {
      toast.error('Failed to fetch prescriptions');
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Prescriptions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View your medical prescriptions</p>
      </div>

      {prescriptions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-white dark:bg-gray-800 p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <FaPrescriptionBottleAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No prescriptions found</p>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {prescriptions.map((prescription, index) => (
            <motion.div
              key={prescription._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    {prescription.doctor?.name?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Dr. {prescription.doctor?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(prescription.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-lg bg-primary-50 dark:bg-primary-900/20 p-3 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <FaDownload />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Medicines
                  </h4>
                  <div className="space-y-2">
                    {prescription.medicines.map((medicine, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-gray-50 dark:bg-gray-700 p-3"
                      >
                        <p className="font-medium text-gray-900 dark:text-white">
                          {medicine.name}
                        </p>
                        <div className="mt-1 grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>Dosage: {medicine.dosage}</span>
                          <span>Frequency: {medicine.frequency}</span>
                          <span>Duration: {medicine.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      {prescription.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Prescription;
