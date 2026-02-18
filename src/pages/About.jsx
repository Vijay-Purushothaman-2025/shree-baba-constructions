import { Link } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────
const stats = [
  { value: '10+',    label: 'Years in Business',     icon: '📅' },
  { value: '500+',   label: 'Projects Completed',    icon: '🏗️' },
  { value: '1000+',  label: 'Happy Clients',         icon: '🤝' },
  { value: 'Pan',    label: 'India Operations',      icon: '🌐' },
]

const timeline = [
  {
    year: '2016',
    title: 'Foundation',
    desc: 'Shree Baba Constructions was established on June 6th, 2016 in Coimbatore with a vision to deliver quality construction services.',
  },
  {
    year: '2018',
    title: 'Service Expansion',
    desc: 'Expanded service portfolio to include 3D elevations, virtual reality walkthroughs, and advanced structural analysis.',
  },
  {
    year: '2020',
    title: 'ISO Certification',
    desc: 'Achieved ISO/IEC 17025:2017 certification for our Soil & Materials Testing Laboratory — a milestone in quality assurance.',
  },
  {
    year: '2022',
    title: 'Pan-India Reach',
    desc: 'Extended operations across India, bringing world-class construction expertise to clients nationwide.',
  },
  {
    year: '2024',
    title: 'Digital Innovation',
    desc: 'Launched AI-powered estimation tools and digital project management to enhance client experience.',
  },
  {
    year: '2026',
    title: 'A Decade of Excellence',
    desc: 'Celebrating 10 years of trust, quality, and innovation in the construction industry.',
  },
]

const values = [
  {
    icon: '🎯',
    title: 'Precision',
    desc: 'Every project is executed with meticulous attention to detail, from planning to final delivery.',
  },
  {
    icon: '💎',
    title: 'Quality',
    desc: 'We never compromise on quality — using the best materials and construction practices available.',
  },
  {
    icon: '🤝',
    title: 'Integrity',
    desc: 'Transparent communication and honest dealings with every client, every time.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    desc: 'We embrace technology and modern methods to deliver better results faster.',
  },
  {
    icon: '⏱️',
    title: 'Timeliness',
    desc: 'We respect your time — projects are planned and executed to meet deadlines.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    desc: 'Building responsibly with an eye on environmental impact and sustainable practices.',
  },
]

const services_brief = [
  'Plans & Approvals',
  'Construction & Consulting',
  '3D Elevations & VR',
  'Estimations',
  'Structural Stability',
  'Valuation',
  'Soil & Materials Testing',
  'Real Estate & Surveying',
]

// ── Component ─────────────────────────────────────────────
export default function About() {
  return (
    <div className="pt-16">

      {/* ── HERO BANNER ── */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-yellow-500 font-semibold text-sm tracking-widest
                        uppercase mb-3">
            Who We Are
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About Shree Baba Constructions
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A decade of excellence in construction, consulting, and innovation.
            Building trust one project at a time — across India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-yellow-600/20 border border-yellow-600/40
                             text-yellow-400 text-sm rounded-full">
              Est. June 6, 2016
            </span>
            <span className="px-4 py-2 bg-yellow-600/20 border border-yellow-600/40
                             text-yellow-400 text-sm rounded-full">
              ISO/IEC 17025:2017 Certified
            </span>
            <span className="px-4 py-2 bg-yellow-600/20 border border-yellow-600/40
                             text-yellow-400 text-sm rounded-full">
              Pan-India Operations
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-yellow-600 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-3xl font-bold">{s.value}</span>
                <span className="text-yellow-100 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY STORY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left – Text */}
            <div>
              <p className="text-yellow-600 font-semibold text-sm tracking-widest
                            uppercase mb-2">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                A Journey Built on Trust & Quality
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded on <strong className="text-gray-800">June 6th, 2016</strong>,
                  Shree Baba Constructions began with a simple but powerful mission —
                  to deliver construction services that combine technical excellence
                  with genuine client care.
                </p>
                <p>
                  Based in <strong className="text-gray-800">Coimbatore, Tamil Nadu</strong>,
                  we have grown from a local construction firm into a pan-India
                  operation, serving clients across the country with a comprehensive
                  range of construction and consulting services.
                </p>
                <p>
                  Over the past decade, we have built a reputation for reliability,
                  precision, and innovation. Our team of experienced engineers,
                  architects, and consultants work together to ensure every project
                  meets the highest standards of quality and safety.
                </p>
                <p>
                  Today, with our
                  <strong className="text-gray-800"> ISO/IEC 17025:2017 certified</strong>
                  {' '}testing laboratory and AI-powered estimation tools, we continue
                  to push the boundaries of what modern construction services can offer.
                </p>
              </div>

              {/* Services list */}
              <div className="mt-8">
                <p className="font-semibold text-gray-800 mb-3">
                  Our Services Include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services_brief.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-yellow-100 text-yellow-700
                                       rounded-full flex items-center justify-center
                                       text-xs font-bold flex-shrink-0">
                        ✓
                      </span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Info Card */}
            <div className="space-y-6">
              {/* Main card */}
              <div className="bg-gray-900 text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-yellow-400">
                  Company Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Company Name',   value: 'Shree Baba Constructions' },
                    { label: 'Established',    value: 'June 6, 2016' },
                    { label: 'Headquarters',   value: 'Coimbatore, Tamil Nadu' },
                    { label: 'Operations',     value: 'All Over India' },
                    { label: 'Certification',  value: 'ISO/IEC 17025:2017' },
                    { label: 'Email',          value: 'pk.karthikkeyan91@gmail.com' },
                    { label: 'Phone',          value: '+91 99944 38809' },
                  ].map((item, i) => (
                    <div key={i}
                         className="flex justify-between gap-4 pb-3
                                    border-b border-gray-700 last:border-0 last:pb-0">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="text-white text-sm font-medium text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address card */}
              <div className="bg-yellow-50 border border-yellow-200
                              rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📍</span> Our Location
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  20/120A, Mariamman Kovil Street,<br />
                  Machampalayam, Sundarapuram Post,<br />
                  Coimbatore – 641024,<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ISO CERTIFICATION ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left – Content */}
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-yellow-600/20
                                border border-yellow-600/40 rounded-full px-4 py-1.5
                                text-yellow-400 text-sm font-medium mb-6 w-fit">
                  🏅 Internationally Accredited
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  ISO/IEC 17025:2017
                  <span className="block text-yellow-500">Certified Laboratory</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Our Soil & Materials Testing Laboratory holds the prestigious
                  ISO/IEC 17025:2017 accreditation — the highest international
                  standard for testing and calibration laboratories. This certification
                  demonstrates our commitment to technical competence, accuracy,
                  and reliability in every test we perform.
                </p>
                <ul className="space-y-3">
                  {[
                    'Internationally recognized testing standards',
                    'Rigorous quality control procedures',
                    'Accurate and reliable test results',
                    'Trusted by banks and government bodies',
                    'Regular audits and continuous improvement',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="text-yellow-500 mt-0.5 flex-shrink-0">✔</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right – Badge */}
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-800
                              flex items-center justify-center p-10 lg:p-16">
                <div className="text-center">
                  <div className="w-40 h-40 bg-white/10 rounded-full
                                  flex items-center justify-center mx-auto mb-6
                                  border-4 border-white/30">
                    <div className="text-center">
                      <p className="text-white text-4xl font-black">ISO</p>
                      <p className="text-yellow-200 text-xs font-semibold
                                    tracking-widest mt-1">
                        CERTIFIED
                      </p>
                    </div>
                  </div>
                  <p className="text-white text-2xl font-bold">IEC 17025:2017</p>
                  <p className="text-yellow-200 text-sm mt-2">
                    Testing & Calibration Laboratory
                  </p>
                  <div className="mt-6 border-t border-white/20 pt-6">
                    <p className="text-white/80 text-xs leading-relaxed">
                      Accredited for Soil Testing<br />
                      & Construction Materials Testing
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-yellow-600 font-semibold text-sm tracking-widest
                          uppercase mb-2">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              A Decade of Growth
            </h2>
            <div className="mt-4 w-16 h-1 bg-yellow-600 mx-auto rounded" />
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5
                            bg-gray-200 hidden sm:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 sm:gap-10">
                  {/* Year bubble */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-900
                                  rounded-full flex items-center justify-center
                                  z-10 shadow-lg">
                    <span className="text-yellow-400 font-bold text-xs text-center
                                     leading-tight px-1">
                      {item.year}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="bg-gray-50 rounded-xl p-6 flex-grow
                                  border border-gray-100 hover:border-yellow-200
                                  transition-colors">
                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-yellow-600 font-semibold text-sm tracking-widest
                          uppercase mb-2">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Our Core Values
            </h2>
            <div className="mt-4 w-16 h-1 bg-yellow-600 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i}
                   className="bg-white rounded-xl p-6 shadow-sm
                              border border-gray-100 hover:border-yellow-200
                              hover:shadow-md transition-all duration-200 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-400 mb-8">
            Let's discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700
                         text-white font-semibold rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/services"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white
                         font-semibold rounded-lg border border-gray-600
                         transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}