import { Link } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────
const highlights = [
  { value: '10+',    label: 'Years of Experience' },
  { value: 'ISO',    label: 'IEC 17025:2017 Certified' },
  { value: 'Pan',    label: 'India Operations' },
  { value: '8+',     label: 'Services Offered' },
]

const services = [
  {
    icon: '📋',
    title: 'Plans & Approvals',
    desc: 'Complete planning and approval services for all corporations and panchayats across Tamil Nadu and India.',
  },
  {
    icon: '🏗️',
    title: 'Construction & Consulting',
    desc: 'End-to-end construction management and consulting including project planning and Vaastu compliance.',
  },
  {
    icon: '🏛️',
    title: '3D Elevations',
    desc: 'Stunning 3D walkthroughs and virtual reality experiences to visualize your project before construction.',
  },
  {
    icon: '🧮',
    title: 'Estimations',
    desc: 'Accurate cost estimations for banks and contractors to ensure transparent and reliable budgeting.',
  },
  {
    icon: '🔩',
    title: 'Structural Stability',
    desc: 'In-depth structural analysis and detailing to ensure safety, durability, and code compliance.',
  },
  {
    icon: '💰',
    title: 'Valuation',
    desc: 'Professional property valuation services for banks and client solvency assessment purposes.',
  },
  {
    icon: '🧪',
    title: 'Soil & Materials Testing',
    desc: 'ISO/IEC 17025:2017 certified lab offering comprehensive soil testing and construction materials testing.',
  },
  {
    icon: '🗺️',
    title: 'Real Estate & Surveying',
    desc: 'Expert real estate services and precision surveying using Total Station and GIS technologies.',
  },
]

const whyUs = [
  {
    icon: '🏅',
    title: 'ISO Certified Lab',
    desc: 'Our testing lab is ISO/IEC 17025:2017 certified, guaranteeing internationally recognized quality standards.',
  },
  {
    icon: '📅',
    title: '10 Years of Trust',
    desc: 'Established in June 2016, we have a proven track record of delivering quality projects on time.',
  },
  {
    icon: '🌐',
    title: 'Pan-India Reach',
    desc: 'We operate across India, bringing world-class construction expertise to every corner of the country.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Estimation',
    desc: 'Get instant, accurate project cost estimates using our innovative AI estimation tool — available 24/7.',
  },
  {
    icon: '📐',
    title: 'End-to-End Services',
    desc: 'From soil testing to 3D walkthroughs, we cover every phase of your construction journey.',
  },
  {
    icon: '🤝',
    title: 'Client-First Approach',
    desc: 'We prioritize your vision, budget, and timeline to deliver results that exceed expectations.',
  },
]

// ── Component ─────────────────────────────────────────────
export default function Home() {
  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white min-h-screen
                          flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `repeating-linear-gradient(
                 45deg,
                 #ffffff 0px, #ffffff 1px,
                 transparent 1px, transparent 60px
               )`,
             }} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br
                        from-gray-900 via-gray-800 to-gray-900 opacity-90" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-600/20
                          border border-yellow-600/40 rounded-full px-4 py-1.5
                          text-yellow-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            ISO/IEC 17025:2017 Certified · Est. 2016
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            Building Your
            <span className="block text-yellow-500">Dreams Into</span>
            Reality
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Shree Baba Constructions — a trusted name in construction for over
            10 years. From planning to handover, we deliver excellence across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white
                         font-semibold rounded-lg transition-all duration-200
                         shadow-lg hover:shadow-yellow-600/30 text-lg"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/ai-estimation"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white
                         font-semibold rounded-lg border border-white/20
                         transition-all duration-200 text-lg backdrop-blur-sm"
            >
              🤖 Try AI Estimation
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 animate-bounce text-gray-500 text-sm">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full
                            mx-auto flex items-start justify-center pt-2">
              <div className="w-1 h-2 bg-gray-500 rounded-full" />
            </div>
            <p className="mt-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS BAR ── */}
      <section className="bg-yellow-600 text-white py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {highlights.map((h, i) => (
              <div key={i}>
                <p className="text-3xl font-bold">{h.value}</p>
                <p className="text-yellow-100 text-sm mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-yellow-600 font-semibold text-sm tracking-widest
                          uppercase mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Our Services
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Comprehensive construction solutions tailored to meet every need —
              from foundation to finishing.
            </p>
            <div className="mt-4 w-16 h-1 bg-yellow-600 mx-auto rounded" />
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md
                           border border-gray-100 hover:border-yellow-200
                           transition-all duration-200 group"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-yellow-700
                               transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* View all services button */}
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-block px-8 py-3 border-2 border-yellow-600
                         text-yellow-700 font-semibold rounded-lg
                         hover:bg-yellow-600 hover:text-white transition-all duration-200"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-yellow-600 font-semibold text-sm tracking-widest
                          uppercase mb-2">
              Why Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Why Choose Shree Baba Constructions?
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              We combine experience, technology, and dedication to deliver
              exceptional results on every project.
            </p>
            <div className="mt-4 w-16 h-1 bg-yellow-600 mx-auto rounded" />
          </div>

          {/* Why Us Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((w, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{w.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{w.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Get a free consultation or try our AI estimation tool to get an
            instant cost estimate for your construction project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700
                         text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Request a Free Quote
            </Link>
            <Link
              to="/ai-estimation"
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white
                         font-semibold rounded-lg border border-gray-600
                         transition-colors text-lg"
            >
              🤖 AI Cost Estimator
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}