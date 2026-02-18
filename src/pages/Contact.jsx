import { useState } from 'react'

const SERVICES = [
  'Plans & Approvals',
  'Construction & Consulting',
  '3D Elevations',
  'Estimations',
  'Structural Stability',
  'Valuation',
  'Soil & Materials Testing',
  'Real Estate & Surveying',
  'Other / General Inquiry',
]

const BUDGETS = [
  'Under ₹10 Lakhs',
  '₹10 – 25 Lakhs',
  '₹25 – 50 Lakhs',
  '₹50 Lakhs – 1 Crore',
  'Above ₹1 Crore',
  'Not Sure / To be discussed',
]

const INITIAL = {
  name: '', phone: '', email: '',
  serviceType: '', projectDetails: '',
  location: '', budgetRange: '',
}

const CONTACT_INFO = [
  {
    icon: '📍',
    title: 'Our Office',
    lines: [
      '20/120A, Mariamman Kovil Street,',
      'Machampalayam, Sundarapuram Post,',
      'Coimbatore – 641024, Tamil Nadu',
    ],
  },
  {
    icon: '📞',
    title: 'Phone',
    lines: ['+91 99944 38809'],
    link: 'tel:+919994438809',
  },
  {
    icon: '✉️',
    title: 'Email',
    lines: ['pk.karthikkeyan91@gmail.com'],
    link: 'mailto:pk.karthikkeyan91@gmail.com',
  },
  {
    icon: '📷',
    title: 'Instagram',
    lines: ['@ShreeBabaConstructions'],
    link: 'https://instagram.com/ShreeBabaConstructions',
  },
]

const HOURS = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday',        time: '9:00 AM – 2:00 PM' },
  { day: 'Sunday',          time: 'Closed' },
]

export default function Contact() {
  const [form,       setForm]       = useState(INITIAL)
  const [errors,     setErrors]     = useState({})
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Please enter your full name'
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = 'Please enter a valid 10-digit Indian mobile number'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address'
    if (!form.serviceType)
      e.serviceType = 'Please select a service'
    if (!form.projectDetails.trim() || form.projectDetails.trim().length < 10)
      e.projectDetails = 'Please describe your project (at least 10 characters)'
    if (!form.location.trim())
      e.location = 'Please enter your project location'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
  if (!validate()) return
  setSubmitting(true)
  try {
    const response = await fetch('https://shree-baba-backend.onrender.com/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:           form.name,
        phone:          form.phone,
        email:          form.email,
        serviceType:    form.serviceType,
        projectDetails: form.projectDetails,
        location:       form.location,
        budgetRange:    form.budgetRange,
      }),
    })
    const data = await response.json()
    if (data.success) {
      setSubmitted(true)
    } else {
      alert(data.message || 'Something went wrong')
    }
  } catch (err) {
    console.error('Submit error:', err)
    alert('Cannot connect to server. Make sure backend is running on port 5000.')
  } finally {
    setSubmitting(false)
  }
}

  // ── SUCCESS SCREEN ──────────────────────────────────────
  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Quote Request Submitted!
            </h2>
            <p className="text-gray-500 mb-2 leading-relaxed">
              Thank you, <strong>{form.name}</strong>! We have received your
              request and will get back to you within <strong>24 hours</strong>.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              A confirmation will be sent to{' '}
              <span className="text-gray-600 font-medium">{form.email}</span>
            </p>
            <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8 space-y-2">
              {[
                { label: 'Service',  value: form.serviceType },
                { label: 'Location', value: form.location },
                { label: 'Budget',   value: form.budgetRange || 'Not specified' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <button
                onClick={() => { setForm(INITIAL); setSubmitted(false) }}
                className="w-full py-3 bg-yellow-600 hover:bg-yellow-700
                           text-white font-semibold rounded-xl transition-colors"
              >
                Submit Another Request
              </button>
              <a
                href="tel:+919994438809"
                className="block w-full py-3 bg-gray-100 hover:bg-gray-200
                           text-gray-700 font-semibold rounded-xl transition-colors"
              >
                📞 Call Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── MAIN FORM ───────────────────────────────────────────
  return (
    <div className="pt-16">

      {/* HERO */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-yellow-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Request a Free Quote
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and our experts will get back to you
            within 24 hours with a detailed consultation.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT: Contact Info */}
            <div className="space-y-6">

              {CONTACT_INFO.map((info, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{info.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800 mb-1">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="text-sm text-yellow-700 hover:text-yellow-800 transition-colors break-all"
                        >
                          {info.lines[0]}
                        </a>
                      ) : (
                        info.lines.map((line, j) => (
                          <p key={j} className="text-gray-500 text-sm">{line}</p>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Business Hours */}
              <div className="bg-gray-900 text-white rounded-2xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span>🕒</span> Business Hours
                </h3>
                <div className="space-y-3">
                  {HOURS.map((h, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm pb-3 border-b border-gray-700 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-400">{h.day}</span>
                      <span className={`font-medium ${h.time === 'Closed' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Call CTA */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <p className="text-yellow-800 font-semibold mb-1">
                  Prefer to call directly?
                </p>
                <p className="text-yellow-700 text-sm mb-4">
                  Our team is available during business hours
                </p>
                <a
                  href="tel:+919994438809"
                  className="block w-full py-3 bg-yellow-600 hover:bg-yellow-700
                             text-white font-semibold rounded-xl transition-colors"
                >
                  📞 +91 99944 38809
                </a>
              </div>

            </div>

            {/* RIGHT: Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Fill in Your Details
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  All fields marked with * are required.
                </p>

                <div className="space-y-6">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="e.g. Karthik Kumar"
                        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                                   focus:outline-none focus:border-yellow-500 transition
                                   ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        placeholder="e.g. 9876543210"
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                                   focus:outline-none focus:border-yellow-500 transition
                                   ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                                 focus:outline-none focus:border-yellow-500 transition
                                 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Required *
                    </label>
                    <select
                      value={form.serviceType}
                      onChange={e => update('serviceType', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                                 focus:outline-none focus:border-yellow-500 transition bg-white
                                 ${errors.serviceType ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      value={form.projectDetails}
                      onChange={e => update('projectDetails', e.target.value)}
                      placeholder="Describe your project — type, size, location, special requirements, timeline, etc."
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                                 focus:outline-none focus:border-yellow-500 transition resize-none
                                 ${errors.projectDetails ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.projectDetails
                        ? <p className="text-red-500 text-xs">{errors.projectDetails}</p>
                        : <span />}
                      <p className="text-gray-400 text-xs">{form.projectDetails.length} chars</p>
                    </div>
                  </div>

                  {/* Location + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Location *
                      </label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={e => update('location', e.target.value)}
                        placeholder="e.g. Coimbatore, Chennai..."
                        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                                   focus:outline-none focus:border-yellow-500 transition
                                   ${errors.location ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Range{' '}
                        <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <select
                        value={form.budgetRange}
                        onChange={e => update('budgetRange', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                                   text-gray-800 focus:outline-none focus:border-yellow-500
                                   transition bg-white"
                      >
                        <option value="">Select budget range...</option>
                        {BUDGETS.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200
                               ${submitting
                                 ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                 : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
                  >
                    {submitting ? '⏳ Submitting...' : '🚀 Submit Quote Request'}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    By submitting this form, you agree to be contacted by our
                    team regarding your project inquiry.
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK CONTACT BANNER */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: '📞', label: 'Call Us',   value: '+91 99944 38809',             link: 'tel:+919994438809' },
              { icon: '✉️', label: 'Email Us',  value: 'pk.karthikkeyan91@gmail.com', link: 'mailto:pk.karthikkeyan91@gmail.com' },
              { icon: '📷', label: 'Follow Us', value: '@ShreeBabaConstructions',      link: 'https://instagram.com/ShreeBabaConstructions' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-white font-semibold mt-1 group-hover:text-yellow-400
                              transition-colors break-all text-sm">
                  {item.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}