import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaHeart, 
  FaAward, 
  FaUsers, 
  FaShieldAlt,
  FaCheckCircle,
  FaUserMd,
  FaHospital,
  FaGlobe
} from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: 'Patient-Centric Care',
      description: 'We put patients first in everything we do, ensuring compassionate and personalized healthcare.'
    },
    {
      icon: FaAward,
      title: 'Excellence',
      description: 'We maintain the highest standards of medical care and continuously strive for improvement.'
    },
    {
      icon: FaShieldAlt,
      title: 'Trust & Security',
      description: 'Your health data is protected with enterprise-grade security and complete privacy.'
    },
    {
      icon: FaUsers,
      title: 'Accessibility',
      description: 'Making quality healthcare accessible to everyone, anywhere, anytime.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Expert Doctors', icon: FaUserMd },
    { number: '50K+', label: 'Happy Patients', icon: FaUsers },
    { number: '100K+', label: 'Appointments', icon: FaHospital },
    { number: '50+', label: 'Cities', icon: FaGlobe }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'HealthCare+ was established with a vision to revolutionize healthcare' },
    { year: '2021', title: 'Expansion', description: 'Expanded to 20 cities with 100+ doctors on board' },
    { year: '2022', title: 'Innovation', description: 'Launched online consultation and digital prescription features' },
    { year: '2023', title: 'Growth', description: 'Reached 50,000+ patients and 500+ doctors nationwide' },
    { year: '2024', title: 'Excellence', description: 'Recognized as the leading healthcare platform in the region' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: 'S',
      description: 'Leading our medical team with 20+ years of experience'
    },
    {
      name: 'Michael Chen',
      role: 'CEO & Founder',
      image: 'M',
      description: 'Visionary leader transforming healthcare delivery'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Technology',
      image: 'E',
      description: 'Building cutting-edge healthcare technology solutions'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Medical Director',
      image: 'J',
      description: 'Ensuring quality care and patient safety'
    }
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
      <section className="py-20 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              About HealthCare+
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're on a mission to make quality healthcare accessible to everyone through technology and compassion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 mb-6">
                <FaHeart className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To revolutionize healthcare delivery by connecting patients with expert doctors through innovative technology, 
                making quality medical care accessible, affordable, and convenient for everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 mb-6">
                <FaAward className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the most trusted healthcare platform globally, where every individual has instant access to 
                world-class medical expertise, personalized care, and comprehensive health management tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-700 shadow-lg"
              >
                <stat.icon className="text-5xl text-primary-500 mx-auto mb-4" />
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 mb-4">
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Milestones that shaped our story
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-purple-600 hidden lg:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                    <div className="inline-block rounded-2xl bg-white dark:bg-gray-700 p-6 shadow-lg">
                      <div className="text-3xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block relative z-10">
                    <div className="h-4 w-4 rounded-full bg-primary-600 border-4 border-white dark:border-gray-900" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The team driving healthcare innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Us in Transforming Healthcare
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of our mission to make quality healthcare accessible to all
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-white text-primary-600 font-bold shadow-2xl"
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/expert-doctors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border-2 border-white text-white font-bold"
              >
                Find Doctors
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
