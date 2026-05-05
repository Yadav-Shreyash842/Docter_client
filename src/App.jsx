import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Landing Page
import LandingPage from './pages/LandingPage';
import ExpertDoctors from './pages/ExpertDoctors';
import OnlineConsultation from './pages/OnlineConsultation';
import Support from './pages/Support';
import About from './pages/About';
import Contact from './pages/Contact';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';
import Prescription from './pages/patient/Prescription';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import AddPrescription from './pages/doctor/AddPrescription';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAppointments from './pages/admin/ManageAppointments';
import SystemAnalytics from './pages/admin/SystemAnalytics';

// Settings
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/expert-doctors" element={<ExpertDoctors />} />
          <Route path="/online-consultation" element={<OnlineConsultation />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            {/* Patient Routes */}
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/doctors" element={<BookAppointment />} />
            <Route path="/appointments" element={<MyAppointments />} />
            <Route path="/prescriptions" element={<Prescription />} />
            
            {/* Doctor Routes */}
            <Route path="doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="doctor/appointments" element={<DoctorAppointments />} />
            <Route path="doctor/prescription" element={<AddPrescription />} />
            <Route path="doctor/profile" element={<DoctorProfile />} />
            
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/doctors" element={<ManageDoctors />} />
            <Route path="admin/users" element={<ManageUsers />} />
            <Route path="admin/appointments" element={<ManageAppointments />} />
            <Route path="admin/analytics" element={<SystemAnalytics />} />
            
            {/* Settings */}
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
