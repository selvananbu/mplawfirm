import { GoLaw } from 'react-icons/go';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';

const footerLinks = {
  'Practice Areas': [
    'Felony Defense',
    'DUI / DWI',
    'Drug Offenses',
    'White Collar Crime',
    'Domestic Violence',
    'Juvenile Defense',
  ],
  'Quick Links': [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#practice' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-5">
              <GoLaw className="text-gold-500 text-2xl" />
              <div>
                <div className="font-heading text-lg font-bold text-white">MP Law Firm</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-gold-500/60">
                  Criminal Defense
                </div>
              </div>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premier criminal defense attorneys dedicated to protecting your
              rights, freedom, and future. Available 24/7 for emergency
              consultations.
            </p>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm">
                <HiOutlinePhone className="text-gold-500" /> (123) 456-7890
              </a>
              <a href="mailto:info@mplawfirm.com" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm">
                <HiOutlineMail className="text-gold-500" /> info@mplawfirm.com
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <HiOutlineLocationMarker className="text-gold-500" /> 123 Justice Ave, Suite 500
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Practice Areas</h4>
            <ul className="space-y-3">
              {footerLinks['Practice Areas'].map((area) => (
                <li key={area}>
                  <a href="#practice" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks['Quick Links'].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-gold-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Free Consultation</h4>
            <p className="text-gray-500 text-sm mb-5">
              Don&apos;t face criminal charges alone. Get expert legal advice today.
            </p>
            <a
              href="#contact"
              className="inline-block w-full text-center px-6 py-3 bg-gold-500 text-navy-950 font-bold rounded-lg hover:bg-gold-400 transition-all duration-300 text-sm"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} MP Law Firm. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gold-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gold-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-gold-400 transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
