import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaCalendarAlt, FaArrowLeft, FaUserMd, FaHeart } from 'react-icons/fa';

const ExpertDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const specializations = [
    'All Specializations',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Dentistry',
    'Psychiatry',
    'Ophthalmology'
  ];

  // Mock doctors data
  useEffect(() => {
    setDoctors([
      {
        id: 1,
        name: 'Dr. Sarah Wilson',
        specialization: 'Cardiology',
        experience: 15,
        rating: 4.9,
        reviews: 245,
        consultationFee: 1500,
        availability: 'Available Today',
        image: 'S',
        qualifications: 'MBBS, MD (Cardiology)',
        languages: ['English', 'Hindi'],
        about: 'Specialized in heart diseases with 15+ years of experience'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialization: 'Dermatology',
        experience: 12,
        rating: 4.8,
        reviews: 189,
        consultationFee: 1200,
        availability: 'Available Tomorrow',
        image: 'M',
        qualifications: 'MBBS, MD (Dermatology)',
        languages: ['English', 'Mandarin'],
        about: 'Expert in skin care and cosmetic dermatology'
      },
      {
        id: 3,
        name: 'Dr. Emily Brown',
        specialization: 'Pediatrics',
        experience: 10,
        rating: 4.9,
        reviews: 312,
        consultationFee: 1000,
        availability: 'Available Today',
        image: 'E',
        qualifications: 'MBBS, MD (Pediatrics)',
        languages: ['English', 'Spanish'],
        about: 'Caring for children with compassion and expertise'
      },
      {
        id: 4,
        name: 'Dr. James Anderson',
        specialization: 'Orthopedics',
        experience: 18,
        rating: 4.7,
        reviews: 156,
        consultationFee: 1800,
        availability: 'Available Today',
        image: 'J',
        qualifications: 'MBBS, MS (Orthopedics)',
        languages: ['English'],
        about: 'Specialist in joint replacement and sports injuries'
      },
      {
        id: 5,
        name: 'Dr. Lisa Martinez',
        specialization: 'Neurology',
        experience: 14,
        rating: 4.8,
        reviews: 198,
        consultationFee: 2000,
        availability: 'Available Tomorrow',
        image: 'L',
        qualifications: 'MBBS, DM (Neurology)',
        languages: ['English', 'Spanish'],
        about: 'Expert in brain and nervous system disorders'
      },
      {
        id: 6,
        name: 'Dr. David Kim',
        specialization: 'Dentistry',
        experience: 8,
        rating: 4.9,
        reviews: 267,
        consultationFee: 800,
        availability: 'Available Today',
        image: 'D',
        qualifications: 'BDS, MDS',
        languages: ['English', 'Korean'],
        about: 'Comprehensive dental care and cosmetic dentistry'
      }
    ]);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                  doctor.specialization === selectedSpecialization;
    const matchesExperience = selectedExperience === 'all' ||
                             (selectedExperience === '5-10' && doctor.experience >= 5 && doctor.experience <= 10) ||
                             (selectedExperience === '10-15' && doctor.experience > 10 && doctor.experience <= 15) ||
                             (selectedExperience === '15+' && doctor.experience > 15);
    return matchesSearch && matchesSpecialization && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FaArrowLeft className="text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                HealthCare+
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="px-6 py-2 rounded-lg text-primary-600 font-medium">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Expert Doctors
            </h1>
            <p className="text-xl text-white/90">
              Connect with certified and experienced healthcare professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Specializations</option>
              {specializations.slice(1).map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Experience</option>
              <option value="5-10">5-10 years</option>
              <option value="10-15">10-15 years</option>
              <option value="15+">15+ years</option>
            </select>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found {filteredDoctors.length} doctors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {doctor.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {doctor.specialization}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {doctor.qualifications}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Experience</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {doctor.experience} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Rating</span>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {doctor.rating}
                      </span>
                      <span className="text-gray-500">({doctor.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Consultation Fee</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ₹{doctor.consultationFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Languages</span>
                    <span className="text-gray-900 dark:text-white">
                      {doctor.languages.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.about}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {doctor.availability}
                  </span>
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg"
                    >
                      <FaCalendarAlt />
                      <span>Book Now</span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <FaUserMd className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No doctors found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book an Appointment?
          </h2>
          <p className="text-xl text-white/90 mb-6">
            Create a free account to book appointments with our expert doctors
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-white text-primary-600 font-bold shadow-2xl"
            >
              Create Free Account
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ExpertDoctors;
