import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────
const services = [
  {
    id: 1,
    icon: '📋',
    title: 'Plans & Approvals',
    subtitle: 'All Corporations & Panchayats',
    shortDesc: 'Complete planning and government approval services across all corporations and panchayats in Tamil Nadu and India.',
    fullDesc: 'Our Plans & Approvals service handles the entire process of obtaining necessary permits and approvals for your construction project. We work with all corporations and panchayats across India, ensuring your project is fully compliant with local regulations and building codes.',
    features: [
      'Building plan preparation as per local body regulations',
      'Submission and follow-up with all corporations and panchayats',
      'Residential, commercial, and industrial plan approvals',
      'CMDA, DTCP, and local body approvals',
      'Layout approval and sub-division approvals',
      'Regularization of unauthorized constructions',
      'Online and offline submission handling',
      'Complete documentation support',
    ],
    color: 'blue',
  },
  {
    id: 2,
    icon: '🏗️',
    title: 'Construction & Consulting',
    subtitle: 'Project Management & Vaastu',
    shortDesc: 'End-to-end construction management and expert consulting services including project planning and Vaastu compliance.',
    fullDesc: 'We provide comprehensive construction and consulting services covering every phase of your project — from initial concept to final handover. Our experienced team ensures quality construction with Vaastu compliance for harmony and prosperity.',
    features: [
      'Complete project management from start to finish',
      'Vaastu Shastra consultation and compliance',
      'Residential and commercial construction',
      'Renovation and interior construction',
      'Contractor management and supervision',
      'Quality control and site inspection',
      'Material procurement and management',
      'Progress reporting and client updates',
    ],
    color: 'green',
  },
  {
    id: 3,
    icon: '🏛️',
    title: '3D Elevations',
    subtitle: 'Walkthrough & Virtual Reality',
    shortDesc: 'Stunning 3D visualizations, architectural walkthroughs, and virtual reality experiences for your project.',
    fullDesc: 'Visualize your dream project before a single brick is laid. Our 3D elevation and virtual reality services provide photorealistic renderings and immersive walkthroughs, allowing you to experience your building exactly as it will look upon completion.',
    features: [
      'Photorealistic 3D exterior elevations',
      'Interior 3D visualization and rendering',
      'Animated walkthrough videos',
      'Virtual reality (VR) immersive experience',
      '360-degree panoramic views',
      'Day and night lighting simulations',
      'Material and color selection visualization',
      'Revisions and modifications as needed',
    ],
    color: 'purple',
  },
  {
    id: 4,
    icon: '🧮',
    title: 'Estimations',
    subtitle: 'Bank & Contractor Estimates',
    shortDesc: 'Accurate and detailed cost estimations for banks, contractors, and project planning purposes.',
    fullDesc: 'Our estimation services provide precise, detailed cost breakdowns for your construction project. Whether you need a bank-approved estimate for a loan or a detailed contractor estimate for budgeting, our experts deliver accurate figures you can rely on.',
    features: [
      'Detailed quantity surveying and take-off',
      'Bank-approved cost estimation reports',
      'Contractor billing and payment schedules',
      'Material quantity calculations',
      'Labour cost estimation',
      'Project budget planning and management',
      'Revised estimates for design changes',
      'Cost comparison and value engineering',
    ],
    color: 'orange',
  },
  {
    id: 5,
    icon: '🔩',
    title: 'Structural Stability',
    subtitle: 'Analysis & Detailing',
    shortDesc: 'Comprehensive structural analysis and detailed engineering to ensure safety, durability, and code compliance.',
    fullDesc: 'Our structural stability services ensure your building is designed and built to withstand all loads and forces it will encounter. From foundation analysis to roof structure, our qualified structural engineers provide complete analysis and detailed drawings.',
    features: [
      'Structural design for residential and commercial buildings',
      'Foundation design and soil-structure interaction analysis',
      'RCC structural analysis and design',
      'Structural stability certificates for existing buildings',
      'Retrofit and strengthening of existing structures',
      'Earthquake-resistant design',
      'Steel structure design and detailing',
      'Structural drawings and bar bending schedules',
    ],
    color: 'red',
  },
  {
    id: 6,
    icon: '💰',
    title: 'Valuation',
    subtitle: 'Bank & Client Solvency',
    shortDesc: 'Professional property valuation services for banks, financial institutions, and client solvency assessments.',
    fullDesc: 'Our certified valuation services provide accurate, legally recognized assessments of property value. Whether for bank loans, legal disputes, insurance, or personal financial planning, our valuations are trusted by leading banks and financial institutions across India.',
    features: [
      'Property valuation for bank loan purposes',
      'Client solvency and net worth assessment',
      'Residential and commercial property valuation',
      'Land and plot valuation',
      'Valuation for legal and court purposes',
      'Insurance valuation reports',
      'Distress sale and forced sale valuation',
      'Valuation certificates accepted by all major banks',
    ],
    color: 'yellow',
  },
  {
    id: 7,
    icon: '🧪',
    title: 'Soil & Materials Testing',
    subtitle: 'ISO/IEC 17025:2017 Certified Lab',
    shortDesc: 'Accredited laboratory offering comprehensive soil testing and construction materials testing with ISO certification.',
    fullDesc: 'Our ISO/IEC 17025:2017 certified laboratory offers the highest standard of soil and construction materials testing. Our internationally accredited test results are accepted by government bodies, banks, and construction authorities across India.',
    features: [
      'Soil bearing capacity and classification tests',
      'Concrete cube compressive strength testing',
      'Steel and TMT bar tensile strength testing',
      'Sand, aggregate, and brick quality testing',
      'Water quality analysis for construction',
      'Core cutting and testing for existing structures',
      'NDT (Non-Destructive Testing) services',
      'ISO/IEC 17025:2017 accredited test reports',
    ],
    color: 'teal',
  },
  {
    id: 8,
    icon: '🗺️',
    title: 'Real Estate & Surveying',
    subtitle: 'Total Station & GIS',
    shortDesc: 'Expert real estate services and precision land surveying using Total Station and GIS technologies.',
    fullDesc: 'Our real estate and surveying services combine traditional expertise with modern technology. Using Total Station equipment and GIS software, we provide highly accurate surveys for land measurement, boundary demarcation, and real estate transactions.',
    features: [
      'Land survey and boundary demarcation',
      'Total Station survey for accurate measurements',
      'GIS mapping and spatial data analysis',
      'Topographic and contour surveys',
      'Sub-division and layout planning surveys',
      'Property registration support and documentation',
      'Encroachment detection and dispute resolution',
      'Digital survey maps and reports',
    ],
    color: 'indigo',
  },
]

// Color config
const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'bg-blue-100',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'bg-green-100',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'bg-red-100',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'bg-yellow-100', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   icon: 'bg-teal-100',   text: 'text-teal-700',   badge: 'bg-teal-100 text-teal-700' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'bg-indigo-100', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700' },
}

// ── Component ─────────────────────────────────────────────
export default function Services() {
  const [activeService, setActiveService] = useState(null)

  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-yellow-500 font-semibold text-sm tracking-widest
                        uppercase mb-3">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From ground-breaking to final handover — we offer 8 comprehensive
            construction and consulting services tailored to your every need.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveService(s.id)
                  document.getElementById(`service-${s.id}`)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className="px-3 py-1.5 bg-white/10 hover:bg-yellow-600/30
                           border border-white/20 hover:border-yellow-500
                           text-white text-xs rounded-full transition-all"
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID (Quick Overview) ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">
              All Services at a Glance
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Click on any service to learn more
            </p>
            <div className="mt-3 w-16 h-1 bg-yellow-600 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {services.map(s => {
              const c = colorMap[s.color]
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveService(s.id)
                    document.getElementById(`service-${s.id}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className={`${c.bg} ${c.border} border rounded-xl p-5
                             text-left hover:shadow-md transition-all duration-200
                             group`}
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <p className={`font-semibold text-sm ${c.text}
                                group-hover:underline`}>
                    {s.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{s.subtitle}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DETAILED SERVICE SECTIONS ── */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 pt-12">
            <p className="text-yellow-600 font-semibold text-sm tracking-widest
                          uppercase mb-2">
              In Detail
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Service Details
            </h2>
            <div className="mt-4 w-16 h-1 bg-yellow-600 mx-auto rounded" />
          </div>

          <div className="space-y-10">
            {services.map((s, i) => {
              const c = colorMap[s.color]
              const isActive = activeService === s.id
              const isEven = i % 2 === 0

              return (
                <div
                  key={s.id}
                  id={`service-${s.id}`}
                  className={`rounded-2xl border-2 transition-all duration-300
                    ${isActive
                      ? `${c.border} shadow-lg`
                      : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2
                                   ${isEven ? '' : 'lg:grid-flow-dense'}`}>

                    {/* Info Panel */}
                    <div className={`${c.bg} p-8 lg:p-12 rounded-t-2xl
                                     lg:rounded-2xl flex flex-col justify-center
                                     ${isEven
                                       ? 'lg:rounded-r-none'
                                       : 'lg:rounded-l-none lg:col-start-2'}`}>
                      <div className={`inline-flex items-center gap-2 ${c.badge}
                                       rounded-full px-3 py-1 text-xs font-semibold
                                       w-fit mb-4`}>
                        Service {String(s.id).padStart(2, '0')}
                      </div>
                      <div className="text-5xl mb-4">{s.icon}</div>
                      <h3 className={`text-2xl font-bold ${c.text} mb-1`}>
                        {s.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium mb-4">
                        {s.subtitle}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {s.fullDesc}
                      </p>
                      <Link
                        to="/contact"
                        className={`inline-block px-6 py-2.5 rounded-lg text-sm
                                   font-semibold w-fit transition-all duration-200
                                   text-white bg-gray-800 hover:bg-gray-700`}
                      >
                        Enquire About This Service →
                      </Link>
                    </div>

                    {/* Features Panel */}
                    <div className={`bg-white p-8 lg:p-12 rounded-b-2xl
                                     lg:rounded-2xl flex flex-col justify-center
                                     ${isEven
                                       ? 'lg:rounded-l-none'
                                       : 'lg:rounded-r-none lg:col-start-1 lg:row-start-1'}`}>
                      <h4 className="font-bold text-gray-800 mb-6 text-lg">
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {s.features.map((feature, fi) => (
                          <li key={fi}
                              className="flex items-start gap-3 text-gray-600">
                            <span className={`mt-0.5 w-5 h-5 rounded-full
                                            ${c.icon} ${c.text} flex items-center
                                            justify-center text-xs font-bold
                                            flex-shrink-0`}>
                              ✓
                            </span>
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* ISO badge for service 7 */}
                      {s.id === 7 && (
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200
                                        rounded-xl flex items-center gap-3">
                          <span className="text-2xl">🏅</span>
                          <div>
                            <p className="font-bold text-yellow-800 text-sm">
                              ISO/IEC 17025:2017 Certified
                            </p>
                            <p className="text-yellow-700 text-xs">
                              Internationally accredited test results
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 text-white py-20 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Need a Specific Service?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Not sure which service is right for you? Contact us and our experts
            will guide you through the best options for your project.
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
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white
                         font-semibold rounded-lg border border-gray-600
                         transition-colors text-lg"
            >
              🤖 Try AI Estimator
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}