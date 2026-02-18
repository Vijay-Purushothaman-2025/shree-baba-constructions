import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { name: 'Home',          path: '/' },
  { name: 'About',         path: '/about' },
  { name: 'Services',      path: '/services' },
  { name: 'AI Estimation', path: '/ai-estimation' },
  { name: 'Contact',       path: '/contact' },
]

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,   setScrolled]    = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-900/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-yellow-600 rounded-sm flex items-center
                            justify-center font-bold text-white text-lg">
              SB
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold text-sm tracking-wide">
                SHREE BABA
              </p>
              <p className="text-yellow-500 text-xs tracking-widest">
                CONSTRUCTIONS
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-3 px-4 py-2 bg-yellow-600 hover:bg-yellow-700
                         text-white text-sm font-semibold rounded transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded text-sm font-medium transition-colors
                ${location.pathname === link.path
                  ? 'bg-yellow-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-2 px-4 py-2 bg-yellow-600 text-white
                       text-sm font-semibold rounded text-center"
          >
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  )
}