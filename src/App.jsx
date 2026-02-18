import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import Home            from './pages/Home'
import About           from './pages/About'
import Services        from './pages/Services'
import AIEstimation    from './pages/AIEstimation'
import Contact         from './pages/Contact'
import AdminLogin      from './pages/admin/AdminLogin'
import AdminDashboard  from './pages/admin/AdminDashboard'

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')
  return token ? children : <Navigate to="/admin/login" replace />
}

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes with Navbar + Footer */}
        <Route path="/" element={
          <MainLayout><Home /></MainLayout>
        } />
        <Route path="/about" element={
          <MainLayout><About /></MainLayout>
        } />
        <Route path="/services" element={
          <MainLayout><Services /></MainLayout>
        } />
        <Route path="/ai-estimation" element={
          <MainLayout><AIEstimation /></MainLayout>
        } />
        <Route path="/contact" element={
          <MainLayout><Contact /></MainLayout>
        } />

        {/* Admin routes - no Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Redirect /admin to login */}
        <Route path="/admin" element={
          <Navigate to="/admin/login" replace />
        } />

      </Routes>
    </Router>
  )
}