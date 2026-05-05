import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import ExpertDoctors from './pages/ExpertDoctors';
import OnlineConsultation from './pages/OnlineConsultation';
import Support from './pages/Support';
import About from './pages/About';
import Contact from './pages/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Layouts
import PatientLayout from './layouts/PatientLayout';
import DoctorLayout from './layouts/DoctorLayout';
import AdminLayout from './layouts/AdminLayout';

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

// Role-based redirect after login
const RoleRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/patient/dashboard" replace />;
};

// Guard: only allow specific role
const RoleGuard = ({ role, children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/unauthorized" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ─── PUBLIC ROUTES (no login needed) ─── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/expert-doctors" element={<ExpertDoctors />} />
          <Route path="/online-consultation" element={<OnlineConsultation />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Auto redirect after login based on role */}
          <Route path="/redirect" element={<RoleRedirect />} />

          {/* ─── PATIENT ROUTES ─── */}
          <Route path="/patient" element={
            <RoleGuard role="patient"><PatientLayout /></RoleGuard>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="doctors" element={<BookAppointment />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="prescriptions" element={<Prescription />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ─── DOCTOR ROUTES ─── */}
          <Route path="/doctor" element={
            <RoleGuard role="doctor"><DoctorLayout /></RoleGuard>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="prescription" element={<AddPrescription />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ─── ADMIN ROUTES ─── */}
          <Route path="/admin" element={
            <RoleGuard role="admin"><AdminLayout /></RoleGuard>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="appointments" element={<ManageAppointments />} />
            <Route path="analytics" element={<SystemAnalytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="/doctors" element={<Navigate to="/patient/doctors" replace />} />
          <Route path="/appointments" element={<Navigate to="/patient/appointments" replace />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
                <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">Access Denied</p>
                <a href="/" className="px-6 py-3 bg-primary-500 text-white rounded-lg">Go Home</a>
              </div>
            </div>
          } />

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
                <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">Page Not Found</p>
                <a href="/" className="px-6 py-3 bg-primary-500 text-white rounded-lg">Go Home</a>
              </div>
            </div>
          } />

        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#1F2937', color: '#fff', borderRadius: '12px' },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />
    </AuthProvider>
  );
}

export default App;
