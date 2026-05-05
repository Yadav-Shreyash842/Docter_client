# Doctor Appointment System - Frontend

A modern, production-ready React.js frontend for the Doctor Appointment and Online Consultation System with beautiful SaaS-style UI, smooth animations, and complete API integration.

## Features

- 🎨 Modern SaaS-style UI (Stripe/Notion/Linear inspired)
- ✨ Smooth animations with Framer Motion
- 🌓 Dark mode support
- 📱 Fully responsive design
- 🔐 JWT authentication
- 👥 Role-based dashboards (Patient, Doctor, Admin)
- 📊 Interactive charts and analytics
- 🎯 Real-time notifications
- ♿ Accessible components with Headless UI

## Tech Stack

- React.js 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router v6
- Axios
- React Hook Form
- Recharts
- Headless UI
- React Hot Toast
- React Icons

## Installation

1. Install dependencies:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── DoctorCard.jsx
│   ├── AppointmentCard.jsx
│   ├── StatsCard.jsx
│   ├── Modal.jsx
│   └── Loader.jsx
├── pages/
│   ├── auth/           # Authentication pages
│   ├── patient/        # Patient dashboard & features
│   ├── doctor/         # Doctor dashboard & features
│   └── admin/          # Admin dashboard & management
├── layouts/            # Layout components
├── services/           # API services
├── context/            # React Context (Auth)
├── App.jsx
└── main.jsx
```

## Features by Role

### Patient
- View dashboard with health overview
- Browse and search doctors
- Book appointments with time slot selection
- View and manage appointments
- Access prescriptions
- Interactive charts

### Doctor
- Professional clinic-style dashboard
- View and manage appointments
- Mark appointments as completed
- Create prescriptions for patients
- Update profile and availability
- Analytics and statistics

### Admin
- System overview dashboard
- Manage doctors (CRUD operations)
- View all appointments
- User management
- Revenue analytics
- Activity monitoring

## API Integration

The frontend connects to the backend API running on `http://localhost:5000`

All API calls are handled through Axios with:
- Automatic token injection
- Error handling
- Request/response interceptors

## Design Features

- **Glassmorphism cards** with backdrop blur
- **Gradient buttons** with hover effects
- **Smooth page transitions** using Framer Motion
- **Animated counters** and statistics
- **Skeleton loading** states
- **Toast notifications** for user feedback
- **Modal animations** for dialogs
- **Responsive sidebar** with mobile support

## Dark Mode

Toggle dark mode using the moon/sun icon in the navbar. Preference is saved to localStorage.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
