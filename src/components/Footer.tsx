import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Function to scroll to top when link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About Us' },
    { to: '/news', label: 'Insights & News' },
    { to: '/careers', label: 'Career' },
  ];

  const services = [
    { to: '/products', label: 'Buying' },
    { to: '/services/fabrication', label: 'Fabrication' },
    { to: '/services/fabrication', label: 'E - Factory' },
    { to: '/services/recycling', label: 'Recycling' },
    { to: '/services/carbon-accounting', label: 'Carbon Accounting' },
  ];

  const legalLinks = [
    { to: '/terms', label: 'Terms of Service' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/shipping', label: 'Shipping Policy' },
    { to: '/returns', label: 'Returns & Refunds' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="Lohakart Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="space-y-4 text-slate-400 text-sm">
              {/* Address with Icon */}
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-[#be1800] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  INDIIUM VENTURES PRIVATE LIMITED<br />
                  Levana Cyber Heights 10th Floor, TCG 2/2 & 5/5, Vibhuti Khand, Gomti Nagar, Lucknow (U.P.) 226010
                </p>
              </div>

              {/* Phone Numbers with Icon */}
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-[#be1800] flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <a
                    href="tel:+919580002078"
                    className="block hover:text-[#be1800] transition-colors"
                  >
                    +91-9580002078
                  </a>
                  <a
                    href="tel:+919897947864"
                    className="block hover:text-[#be1800] transition-colors"
                  >
                    +91-9897947864
                  </a>
                </div>
              </div>

              {/* Email with Icon */}
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-[#be1800] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:business@lohakart.com"
                  className="hover:text-[#be1800] transition-colors"
                >
                  business@lohakart.com
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    onClick={scrollToTop}
                    className="text-slate-400 hover:text-[#be1800] transition-colors inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={scrollToTop}
                    className="text-slate-400 hover:text-[#be1800] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-[#be1800] transition-colors inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect with Lohakart */}
          <div className="bg-[#be1800] p-6 rounded-lg -mt-2">
            <h4 className="text-white font-semibold text-lg mb-4">Connect with Lohakart</h4>
            <p className="text-white text-sm leading-relaxed mb-6">
              Explore how LohaKart can simplify your business processes, allowing you to concentrate solely on growth and success.
            </p>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="inline-block bg-[#005081] hover:bg-[#003d63] text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-400 text-sm text-center md:text-left">
              © 2025 Lohakart. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#005081] flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/sitemap"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#be1800] transition-colors"
              >
                Terms & Condition
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                to="/help"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#be1800] transition-colors"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}