import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaVideo, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaClock, 
  FaShieldAlt,
  FaHeadset,
  FaLaptop,
  FaMobileAlt
} from 'react-icons/fa';

const OnlineConsultation = () => {
  const features = [
    {
      icon: FaVideo,
      title: 'HD Video Calls',
      description: 'Crystal clear video quality for better diagnosis'
    },
    {
      icon: FaClock,
      title: 'Instant Connect',
      description: 'Connect with doctors within minutes'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'End-to-end encrypted consultations'
    },
    {
      icon: FaHeadset,
      title: '24/7 Available',
      description: 'Get medical advice anytime, anywhere'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Choose a Doctor',
      description: 'Browse and select from our expert doctors'
    },
    {
      step: '2',
      title: 'Book Appointment',
      description: 'Select your preferred date and time slot'
    },
    {
      step: '3',
      title: 'Join Video Call',
      description: 'Connect via secure video consultation'
    },
    {
      step: '4',
      title: 'Get Prescription',
      description: 'Receive digital prescription instantly'
    }
  ];

  const benefits = [
    'No travel required - consult from home',
    'Save time and money',
    'Access to specialists nationwide',
    'Digital prescriptions',
    'Medical records stored securely',
    'Follow-up consultations made easy'
  ];

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

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Online Video
                <span className="block bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                  Consultation
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Get medical advice from the comfort of your home. Connect with certified doctors via secure video calls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-2xl"
                  >
                    Start Consultation
                  </motion.button>
                </Link>
                <Link to="/expert-doctors">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-primary-500 text-primary-600 font-semibold"
                  >
                    Browse Doctors
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-400 to-purple-600 p-12">
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center">
                  <FaVideo className="text-8xl text-white mx-auto mb-4" />
                  <p className="text-white text-xl font-semibold">
                    Secure Video Consultation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Online Consultation?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience healthcare reimagined with our advanced features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 mb-4">
                  <feature.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple steps to get started with online consultation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-white text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Benefits of Online Consultation
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-700 dark:text-gray-300">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="rounded-2xl bg-white dark:bg-gray-700 p-6 text-center shadow-lg">
                <FaLaptop className="text-5xl text-primary-500 mx-auto mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">Desktop</p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-gray-700 p-6 text-center shadow-lg">
                <FaMobileAlt className="text-5xl text-primary-500 mx-auto mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">Mobile</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-gradient-to-r from-primary-500 to-purple-600 p-8 text-center text-white shadow-lg">
                <h3 className="text-3xl font-bold mb-2">10,000+</h3>
                <p className="text-lg">Successful Consultations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Consultation?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of patients who trust us for their healthcare needs
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-xl bg-white text-primary-600 font-bold text-lg shadow-2xl"
            >
              Get Started Now
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OnlineConsultation;
