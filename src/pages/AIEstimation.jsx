import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Rate Tables ───────────────────────────────────────────
const BASE_RATES = {
  Metro: { residential: 2200, commercial: 2800, industrial: 2000 },
  Tier1: { residential: 1800, commercial: 2300, industrial: 1700 },
  Tier2: { residential: 1400, commercial: 1900, industrial: 1300 },
  Rural: { residential: 1100, commercial: 1500, industrial: 1000 },
}

const LOCATION_MAP = {
  mumbai: 'Metro', delhi: 'Metro', bangalore: 'Metro', chennai: 'Metro',
  hyderabad: 'Metro', kolkata: 'Metro', pune: 'Metro', ahmedabad: 'Metro',
  coimbatore: 'Tier1', surat: 'Tier1', jaipur: 'Tier1', lucknow: 'Tier1',
  nagpur: 'Tier1', indore: 'Tier1', madurai: 'Tier1', salem: 'Tier1',
  trichy: 'Tier1', erode: 'Tier1', vellore: 'Tier1', tirunelveli: 'Tier1',
  mysore: 'Tier2', mangalore: 'Tier2', tiruppur: 'Tier2', thanjavur: 'Tier2',
  kumbakonam: 'Tier2', hubli: 'Tier2',
}

const MATERIAL_MULTIPLIER     = { Standard: 1.0, Premium: 1.3, Luxury: 1.6 }
const CONSTRUCTION_MULTIPLIER = { 'New Construction': 1.0, 'Renovation': 0.65 }
const FLOOR_MULTIPLIER        = 0.08
const TIMELINE_FACTOR         = 0.045

// ── Helpers ───────────────────────────────────────────────
function getLocationType(city) {
  return LOCATION_MAP[city.trim().toLowerCase()] || 'Tier2'
}

function formatINR(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(2)} Lakh`
  return `₹${amount.toLocaleString('en-IN')}`
}

function calculate(form) {
  const locType  = getLocationType(form.location)
  const baseRate = BASE_RATES[locType][form.projectType]
  const area     = parseFloat(form.area)
  const floors   = parseInt(form.floors)
  const floorAdj = 1 + (floors - 1) * FLOOR_MULTIPLIER
  const rate     = baseRate
    * MATERIAL_MULTIPLIER[form.materials]
    * CONSTRUCTION_MULTIPLIER[form.constructionType]
    * floorAdj
  const total    = Math.round(rate * area)
  return {
    locType,
    ratePerSqFt:      Math.round(rate),
    totalCost:        total,
    materialCost:     Math.round(total * 0.55),
    labourCost:       Math.round(total * 0.30),
    overheadCost:     Math.round(total * 0.15),
    timeline:         Math.ceil(area * TIMELINE_FACTOR * floorAdj),
  }
}

const INITIAL = {
  projectType: 'residential', area: '', floors: '1',
  constructionType: 'New Construction', materials: 'Standard', location: '',
}

const STEPS = [
  { id: 1, label: 'Project Type',  icon: '🏠' },
  { id: 2, label: 'Area & Floors', icon: '📐' },
  { id: 3, label: 'Construction',  icon: '🏗️' },
  { id: 4, label: 'Location',      icon: '📍' },
]

// ── Main Component ────────────────────────────────────────
export default function AIEstimation() {
  const [step,   setStep]   = useState(1)
  const [form,   setForm]   = useState(INITIAL)
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (step === 2) {
      if (!form.area || isNaN(form.area) || parseFloat(form.area) <= 0)
        e.area = 'Please enter a valid area in sq.ft'
      if (!form.floors || parseInt(form.floors) < 1)
        e.floors = 'Please enter a valid number of floors'
    }
    if (step === 4 && !form.location.trim())
      e.location = 'Please enter your city or location'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (!validate()) return
    if (step < 4) { setStep(s => s + 1); return }
    setResult(calculate(form))
  }

  const reset = () => {
    setForm(INITIAL)
    setResult(null)
    setStep(1)
    setErrors({})
  }

  // ── RESULT PAGE ───────────────────────────────────────
  if (result) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">

        {/* Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Estimation Complete!
            </h1>
            <p className="text-gray-400">
              Here is your AI-powered project cost estimate
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">

          {/* Total Cost Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100
                          overflow-hidden mb-6">
            <div className="bg-gray-900 text-white p-8 text-center">
              <p className="text-gray-400 text-sm mb-2">Total Estimated Cost</p>
              <p className="text-5xl font-black text-yellow-400">
                {formatINR(result.totalCost)}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                ₹{result.ratePerSqFt.toLocaleString('en-IN')} per sq.ft
                · {result.locType} city rates
              </p>
            </div>

            {/* Breakdown */}
            <div className="p-8">
              <h3 className="font-bold text-gray-800 mb-5 text-lg">
                Cost Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Materials Cost (~55%)',   value: result.materialCost,  icon: '🧱', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Labour Cost (~30%)',      value: result.labourCost,    icon: '👷', color: 'bg-green-100 text-green-700' },
                  { label: 'Overhead & Other (~15%)', value: result.overheadCost,  icon: '📋', color: 'bg-purple-100 text-purple-700' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between
                                          p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-lg ${item.color}
                                       flex items-center justify-center text-lg`}>
                        {item.icon}
                      </span>
                      <span className="text-gray-700 text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">
                      {formatINR(item.value)}
                    </span>
                  </div>
                ))}
                <div className="border-t-2 border-gray-200 pt-4 flex
                                items-center justify-between">
                  <span className="font-bold text-gray-800 text-lg">
                    Total Estimate
                  </span>
                  <span className="font-black text-2xl text-yellow-700">
                    {formatINR(result.totalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details + Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

            {/* Project Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">📋 Project Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Project Type',     value: form.projectType.charAt(0).toUpperCase() + form.projectType.slice(1) },
                  { label: 'Total Area',        value: `${parseFloat(form.area).toLocaleString('en-IN')} sq.ft` },
                  { label: 'No. of Floors',     value: form.floors },
                  { label: 'Construction Type', value: form.constructionType },
                  { label: 'Material Grade',    value: form.materials },
                  { label: 'Location',          value: form.location },
                  { label: 'City Category',     value: result.locType },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm pb-2
                                          border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">⏱️ Estimated Timeline</h3>
              <div className="text-center py-6">
                <div className="text-6xl font-black text-gray-800 mb-1">
                  {result.timeline}
                </div>
                <p className="text-gray-500 text-sm">Working Days</p>
                <p className="text-gray-400 text-xs mt-1">
                  (~{Math.ceil(result.timeline / 30)} months)
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200
                              rounded-xl p-4">
                <p className="text-yellow-800 text-xs leading-relaxed text-center">
                  Timeline varies based on site conditions,
                  weather, and contractor availability.
                </p>
              </div>
            </div>

          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="font-bold text-amber-800 mb-1">Important Disclaimer</p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  This is an <strong>approximate estimate</strong> generated by our
                  AI rule-based engine using standard market rates. Actual costs may
                  vary based on site conditions, design complexity, material price
                  fluctuations, and contractor rates. We recommend requesting a
                  detailed quote from our experts for accurate pricing.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="flex-1 py-4 bg-yellow-600 hover:bg-yellow-700
                         text-white font-semibold rounded-xl text-center
                         transition-colors text-lg"
            >
              Get Detailed Quote →
            </Link>
            <button
              onClick={reset}
              className="flex-1 py-4 bg-white hover:bg-gray-50 text-gray-700
                         font-semibold rounded-xl border-2 border-gray-200
                         transition-colors text-lg"
            >
              🔄 New Estimate
            </button>
          </div>

        </div>
      </div>
    )
  }

  // ── FORM PAGE ─────────────────────────────────────────
  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🤖</div>
          <p className="text-yellow-500 font-semibold text-sm tracking-widest
                        uppercase mb-3">
            AI-Powered Tool
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Construction Cost Estimator
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Get an instant estimate for your construction project in under
            a minute — completely free.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center
                                justify-center font-bold text-sm transition-all
                                ${step > s.id
                                  ? 'bg-yellow-600 text-white'
                                  : step === s.id
                                    ? 'bg-gray-900 text-white ring-4 ring-yellow-400'
                                    : 'bg-gray-200 text-gray-400'}`}>
                  {step > s.id ? '✓' : s.icon}
                </div>
                <p className={`text-xs mt-1 font-medium hidden sm:block
                              ${step === s.id ? 'text-gray-800' : 'text-gray-400'}`}>
                  {s.label}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-all
                                ${step > s.id ? 'bg-yellow-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Step 1 — Project Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                What type of project?
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Select the type of construction project you are planning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 'residential', icon: '🏠', label: 'Residential', desc: 'Houses, villas, apartments' },
                  { value: 'commercial',  icon: '🏢', label: 'Commercial',  desc: 'Shops, offices, malls' },
                  { value: 'industrial',  icon: '🏭', label: 'Industrial',  desc: 'Factories, warehouses' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => update('projectType', opt.value)}
                    className={`p-6 rounded-xl border-2 text-center transition-all
                               ${form.projectType === opt.value
                                 ? 'border-yellow-500 bg-yellow-50'
                                 : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="text-4xl mb-2">{opt.icon}</div>
                    <p className="font-bold text-gray-800">{opt.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Area & Floors */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Area & Floors
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Enter the total built-up area and number of floors.
              </p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Built-up Area (sq.ft) *
                  </label>
                  <input
                    type="number"
                    value={form.area}
                    onChange={e => update('area', e.target.value)}
                    placeholder="e.g. 1200"
                    min="100"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                               focus:outline-none focus:border-yellow-500 transition
                               ${errors.area ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.area && (
                    <p className="text-red-500 text-xs mt-1">{errors.area}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Enter total area including all floors combined
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Floors *
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {['1', '2', '3', '4', '5+'].map(f => (
                      <button
                        key={f}
                        onClick={() => update('floors', f === '5+' ? '5' : f)}
                        className={`py-3 rounded-xl border-2 font-bold transition-all
                                   ${form.floors === (f === '5+' ? '5' : f)
                                     ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                     : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  {errors.floors && (
                    <p className="text-red-500 text-xs mt-1">{errors.floors}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Construction & Materials */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Construction Details
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Tell us about construction type and material grade.
              </p>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Construction Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'New Construction', icon: '🏗️', desc: 'Build from ground up' },
                      { value: 'Renovation',       icon: '🔨', desc: 'Modify existing structure' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => update('constructionType', opt.value)}
                        className={`p-5 rounded-xl border-2 text-center transition-all
                                   ${form.constructionType === opt.value
                                     ? 'border-yellow-500 bg-yellow-50'
                                     : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="text-3xl mb-2">{opt.icon}</div>
                        <p className="font-bold text-gray-800 text-sm">{opt.value}</p>
                        <p className="text-gray-500 text-xs mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Material Grade
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'Standard', icon: '⭐',     desc: 'Good quality, cost-effective',    rate: 'Base rate' },
                      { value: 'Premium',  icon: '⭐⭐',   desc: 'High quality, branded materials',  rate: '+30%' },
                      { value: 'Luxury',   icon: '⭐⭐⭐', desc: 'Top-of-line, imported materials',  rate: '+60%' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => update('materials', opt.value)}
                        className={`p-4 rounded-xl border-2 text-center transition-all
                                   ${form.materials === opt.value
                                     ? 'border-yellow-500 bg-yellow-50'
                                     : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="text-2xl mb-1">{opt.icon}</div>
                        <p className="font-bold text-gray-800 text-sm">{opt.value}</p>
                        <p className="text-gray-500 text-xs mt-1">{opt.desc}</p>
                        <span className={`inline-block mt-2 text-xs px-2 py-0.5
                                         rounded-full font-medium
                                         ${form.materials === opt.value
                                           ? 'bg-yellow-200 text-yellow-800'
                                           : 'bg-gray-100 text-gray-500'}`}>
                          {opt.rate}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Location */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Project Location
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Enter the city where your project will be built.
              </p>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City / Location *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => update('location', e.target.value)}
                  placeholder="e.g. Coimbatore, Chennai, Mumbai..."
                  className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800
                             focus:outline-none focus:border-yellow-500 transition
                             ${errors.location
                               ? 'border-red-400 bg-red-50'
                               : 'border-gray-200'}`}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>

              {/* City Category Reference */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { type: 'Metro',  cities: 'Mumbai, Delhi, Chennai', rate: '₹2200+/sqft' },
                  { type: 'Tier 1', cities: 'Coimbatore, Madurai',    rate: '₹1800+/sqft' },
                  { type: 'Tier 2', cities: 'Mysore, Tiruppur',       rate: '₹1400+/sqft' },
                  { type: 'Rural',  cities: 'Smaller towns',           rate: '₹1100+/sqft' },
                ].map(item => (
                  <div key={item.type}
                       className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-bold text-gray-800 text-sm">{item.type}</p>
                    <p className="text-yellow-700 text-xs font-semibold mt-1">{item.rate}</p>
                    <p className="text-gray-400 text-xs mt-1 leading-tight">{item.cities}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="font-semibold text-gray-800 mb-3 text-sm">
                  📋 Your Project Summary
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'Type',         value: form.projectType },
                    { label: 'Area',         value: `${form.area} sq.ft` },
                    { label: 'Floors',       value: form.floors },
                    { label: 'Construction', value: form.constructionType },
                    { label: 'Materials',    value: form.materials },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between gap-2">
                      <span className="text-gray-500">{item.label}:</span>
                      <span className="font-medium text-gray-800 capitalize">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep(s => s - 1)}
              className={`px-6 py-3 rounded-xl font-semibold border-2
                         border-gray-200 text-gray-600 hover:bg-gray-50
                         transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              ← Back
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700
                         text-white font-semibold rounded-xl transition-colors"
            >
              {step === 4 ? '🤖 Calculate Estimate' : 'Next →'}
            </button>
          </div>

        </div>

        {/* How It Works */}
        <div className="mt-12">
          <h3 className="text-center font-bold text-gray-800 mb-6">
            How It Works
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '📝', label: 'Enter Details',  desc: 'Fill in project parameters' },
              { icon: '⚙️', label: 'AI Calculates',  desc: 'Rule-based engine processes' },
              { icon: '📊', label: 'Get Estimate',   desc: 'Instant cost breakdown' },
              { icon: '📞', label: 'Contact Us',     desc: 'Get detailed official quote' },
            ].map((item, i) => (
              <div key={i}
                   className="bg-white rounded-xl p-5 text-center shadow-sm
                              border border-gray-100">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-bold text-gray-800 text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}