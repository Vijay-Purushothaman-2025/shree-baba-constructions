import { useState, useEffect } from 'react'
import { useNavigate }         from 'react-router-dom'

const STATUS_COLORS = {
  pending:   'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const STATUS_OPTIONS = ['pending', 'contacted', 'completed', 'cancelled']

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 60)  return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  return `${days}d ago`
}

export default function AdminDashboard() {
  const [quotes,      setQuotes]      = useState([])
  const [stats,       setStats]       = useState({ total:0, pending:0, contacted:0, completed:0 })
  const [byService,   setByService]   = useState([])
  const [loading,     setLoading]     = useState(true)
  const [selected,    setSelected]    = useState(null)
  const [statusEdit,  setStatusEdit]  = useState('')
  const [notesEdit,   setNotesEdit]   = useState('')
  const [saving,      setSaving]      = useState(false)
  const [search,      setSearch]      = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [adminName,   setAdminName]   = useState('Admin')
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  // ── Auth check ─────────────────────────────────────────
  useEffect(() => {
    if (!token) { navigate('/admin/login'); return }
    setAdminName(localStorage.getItem('adminName') || 'Admin')
    fetchData()
  }, [])

  // ── Fetch all data ─────────────────────────────────────
  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch quotes
      const qRes = await fetch('https://shree-baba-backend.onrender.com/api/quotes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const qData  = await qRes.json()

      // Fetch dashboard stats
      const dRes = await fetch('https://shree-baba-backend.onrender.com/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const dData  = await dRes.json()

      if (qData.success)  setQuotes(qData.quotes)
      if (dData.success) {
        setStats(dData.stats)
        setByService(dData.byService || [])
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ─────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminName')
    navigate('/admin/login')
  }

  // ── Open quote detail ──────────────────────────────────
  const openQuote = (quote) => {
    setSelected(quote)
    setStatusEdit(quote.status)
    setNotesEdit(quote.notes || '')
  }

  // ── Save status update ─────────────────────────────────
  const saveUpdate = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const res = await fetch(`https://shree-baba-backend.onrender.com/api/quotes/${selected._id}`, {
        method:  'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ status: statusEdit, notes: notesEdit }),
      })
      const data = await res.json()
      if (data.success) {
        setQuotes(prev => prev.map(q => q._id === selected._id ? data.quote : q))
        setSelected(null)
        fetchData()
      }
    } catch (err) {
      alert('Failed to update quote')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete quote ───────────────────────────────────────
  const deleteQuote = async (id) => {
    if (!window.confirm('Delete this quote request?')) return
    try {
      await fetch(`https://shree-baba-backend.onrender.com/api/quotes/${id}`, {
        method:  'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setQuotes(prev => prev.filter(q => q._id !== id))
      if (selected?._id === id) setSelected(null)
      fetchData()
    } catch (err) {
      alert('Failed to delete quote')
    }
  }

  // ── Filtered quotes ────────────────────────────────────
  const filtered = quotes.filter(q => {
    const matchSearch = !search ||
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      q.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || q.status === filterStatus
    return matchSearch && matchStatus
  })

  // ── Loading ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⚙️</div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── TOP NAV ── */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center
                      justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-600 rounded-lg flex items-center
                          justify-center font-black text-sm">
            SB
          </div>
          <div>
            <p className="font-bold text-sm leading-none">Shree Baba Constructions</p>
            <p className="text-gray-500 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden sm:block">
            👤 {adminName}
          </span>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg
                       text-xs text-gray-300 transition"
          >
            🔄 Refresh
          </button>
          <button
            onClick={logout}
            className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800
                       text-red-400 rounded-lg text-xs transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Quotes',  value: stats.total,     icon: '📋', color: 'bg-gray-800 text-white' },
            { label: 'Pending',       value: stats.pending,   icon: '⏳', color: 'bg-yellow-50' },
            { label: 'Contacted',     value: stats.contacted, icon: '📞', color: 'bg-blue-50' },
            { label: 'Completed',     value: stats.completed, icon: '✅', color: 'bg-green-50' },
          ].map((stat, i) => (
            <div key={i}
                 className={`${stat.color} rounded-2xl p-5 shadow-sm`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-black
                              ${i === 0 ? 'text-white' : 'text-gray-800'}`}>
                {stat.value}
              </div>
              <div className={`text-sm mt-1
                              ${i === 0 ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── QUOTES TABLE ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

              {/* Table Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3 items-start
                                sm:items-center justify-between">
                  <h2 className="font-bold text-gray-800 text-lg">
                    Quote Requests
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      ({filtered.length})
                    </span>
                  </h2>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 sm:w-40 px-3 py-2 border border-gray-200
                                 rounded-lg text-sm focus:outline-none
                                 focus:border-yellow-500"
                    />
                    <select
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg
                                 text-sm bg-white focus:outline-none
                                 focus:border-yellow-500"
                    >
                      <option value="all">All</option>
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">
                    <div className="text-4xl mb-3">📭</div>
                    <p>No quotes found</p>
                  </div>
                ) : (
                  filtered.map(q => (
                    <div
                      key={q._id}
                      onClick={() => openQuote(q)}
                      className={`p-5 hover:bg-gray-50 cursor-pointer
                                 transition-colors
                                 ${selected?._id === q._id
                                   ? 'bg-yellow-50 border-l-4 border-yellow-500'
                                   : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-800 text-sm">
                              {q.name}
                            </p>
                            <span className={`px-2 py-0.5 rounded-full text-xs
                                            font-medium
                                            ${STATUS_COLORS[q.status]}`}>
                              {q.status}
                            </span>
                          </div>
                          <p className="text-yellow-700 text-xs font-medium mb-1">
                            {q.serviceType}
                          </p>
                          <p className="text-gray-400 text-xs truncate">
                            📞 {q.phone} · 📍 {q.location}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-gray-400 text-xs">
                            {timeAgo(q.createdAt)}
                          </p>
                          <button
                            onClick={e => { e.stopPropagation(); deleteQuote(q._id) }}
                            className="mt-2 text-red-400 hover:text-red-600
                                       text-xs transition"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="space-y-6">

            {/* Quote Detail / Edit */}
            {selected ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-800">Quote Details</h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { label: '👤 Name',     value: selected.name },
                    { label: '📞 Phone',    value: selected.phone },
                    { label: '✉️ Email',    value: selected.email },
                    { label: '🛠️ Service',  value: selected.serviceType },
                    { label: '📍 Location', value: selected.location },
                    { label: '💰 Budget',   value: selected.budgetRange },
                  ].map((item, i) => (
                    <div key={i}
                         className="flex justify-between text-sm pb-2
                                    border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-800 text-right
                                       max-w-32 truncate">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Project Details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Project Details
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selected.projectDetails}
                  </p>
                </div>

                {/* Status Update */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    value={statusEdit}
                    onChange={e => setStatusEdit(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200
                               rounded-xl text-sm bg-white focus:outline-none
                               focus:border-yellow-500"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={notesEdit}
                    onChange={e => setNotesEdit(e.target.value)}
                    placeholder="Add internal notes..."
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-gray-200
                               rounded-xl text-sm resize-none focus:outline-none
                               focus:border-yellow-500"
                  />
                </div>

                <button
                  onClick={saveUpdate}
                  disabled={saving}
                  className={`w-full py-3 rounded-xl font-bold text-sm
                             transition-colors
                             ${saving
                               ? 'bg-gray-300 text-gray-500'
                               : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
                >
                  {saving ? '⏳ Saving...' : '✅ Save Changes'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100
                              p-6 text-center">
                <div className="text-4xl mb-3">👈</div>
                <p className="text-gray-500 text-sm">
                  Click on any quote to view details and update status
                </p>
              </div>
            )}

            {/* Service Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                📊 By Service
              </h3>
              {byService.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">
                  No data yet
                </p>
              ) : (
                <div className="space-y-3">
                  {byService.map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 truncate max-w-40">
                          {s._id}
                        </span>
                        <span className="font-bold text-gray-800">
                          {s.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{
                            width: `${(s.count / stats.total) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}