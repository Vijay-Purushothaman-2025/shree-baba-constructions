import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 – Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-yellow-600 rounded-sm flex items-center
                              justify-center font-bold text-white text-lg">
                SB
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide">SHREE BABA</p>
                <p className="text-yellow-500 text-xs tracking-widest">CONSTRUCTIONS</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              A trusted name in construction since 2016. Serving clients across
              India with quality, integrity, and innovation.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block bg-yellow-700/30 border border-yellow-600/40
                               text-yellow-400 text-xs px-2 py-1 rounded">
                ISO/IEC 17025:2017 Certified
              </span>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home',          path: '/' },
                { name: 'About Us',      path: '/about' },
                { name: 'Our Services',  path: '/services' },
                { name: 'AI Estimation', path: '/ai-estimation' },
                { name: 'Contact Us',    path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="mt-0.5">📍</span>
                <span>
                  20/120A, Mariamman Kovil Street,<br />
                  Machampalayam, Sundarapuram Post,<br />
                  Coimbatore – 641024
                </span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href="tel:+919994438809"
                   className="hover:text-yellow-400 transition-colors">
                  +91 99944 38809
                </a>
              </li>
              <li className="flex gap-2">
                <span>✉️</span>
                <a href="mailto:pk.karthikkeyan91@gmail.com"
                   className="hover:text-yellow-400 transition-colors break-all">
                  pk.karthikkeyan91@gmail.com
                </a>
              </li>
              <li className="flex gap-2">
                <span>📷</span>
                <a href="https://instagram.com/ShreeBabaConstructions"
                   target="_blank" rel="noreferrer"
                   className="hover:text-yellow-400 transition-colors">
                  @ShreeBabaConstructions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row
                        items-center justify-between text-xs text-gray-500 gap-2">
          <p>© {year} Shree Baba Constructions. All rights reserved.</p>
          <p>Est. June 2016 · Serving All Over India</p>
        </div>
      </div>
    </footer>
  )
}