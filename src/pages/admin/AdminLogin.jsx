import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [error,      setError]      = useState('')
  const [loading,    setLoading]    = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://shree-baba-backend.onrender.com/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminName',  data.admin.name)
        navigate('/admin/dashboard')
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16
                          bg-yellow-600 rounded-2xl mb-4">
            <span className="text-white font-black text-2xl">SB</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Shree Baba Constructions</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h2 className="text-white font-bold text-xl mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400
                            rounded-xl p-4 mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="admin@example.com"
                className="w-full bg-gray-800 border border-gray-700 text-white
                           rounded-xl px-4 py-3 focus:outline-none
                           focus:border-yellow-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 text-white
                           rounded-xl px-4 py-3 focus:outline-none
                           focus:border-yellow-500 transition"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white
                         transition-all duration-200
                         ${loading
                           ? 'bg-gray-700 cursor-not-allowed'
                           : 'bg-yellow-600 hover:bg-yellow-500'}`}
            >
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-600 text-xs">
              This portal is restricted to authorized personnel only.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}