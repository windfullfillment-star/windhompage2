import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronsRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_ITEMS = [
  { name: '홈', path: '/' },
  { name: '회사소개', path: '/company' },
  { name: '서비스소개', path: '/service' },
  { name: '고객문의', path: '/inquiry' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled ? 'bg-[#1a1a1a] py-3 border-transparent shadow-lg' : 'bg-white py-6 border-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img
            src="/windhompage2/WINDLOGO.png"
            alt="WIND"
            className={cn(
              "h-10 md:h-12 w-auto transition-all duration-500 object-contain",
              isScrolled ? "brightness-0 invert" : ""
            )}
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-[13px] tracking-widest uppercase transition-all duration-500 relative py-1',
                location.pathname === item.path
                  ? (isScrolled ? 'text-white' : 'text-black') + ' after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue'
                  : (isScrolled ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-black')
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors duration-500",
            isScrolled ? "text-white" : "text-black"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "absolute top-full left-0 right-0 border-b md:hidden transition-colors duration-500",
              isScrolled ? "bg-[#1a1a1a] border-white/5" : "bg-white border-gray-100"
            )}
          >
            <nav className="flex flex-col p-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-lg transition-colors',
                    location.pathname === item.path
                      ? (isScrolled ? 'text-white' : 'text-black')
                      : (isScrolled ? 'text-white/40' : 'text-gray-400')
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
