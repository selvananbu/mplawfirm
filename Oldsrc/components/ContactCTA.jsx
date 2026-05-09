import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from 'react-icons/hi';

const contactInfo = [
  { icon: HiOutlinePhone, label: 'Phone', value: '(123) 456-7890', href: 'tel:+1234567890' },
  { icon: HiOutlineMail, label: 'Email', value: 'info@mplawfirm.com', href: 'mailto:info@mplawfirm.com' },
  { icon: HiOutlineLocationMarker, label: 'Office', value: '123 Justice Ave, Suite 500' },
  { icon: HiOutlineClock, label: 'Hours', value: '24/7 Emergency Line' },
];

export default function ContactCTA() {
  const [ref, inView] = useInView(0.1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', caseType: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -left-40 top-1/3 w-80 h-80 bg-gold-500 rounded-full blur-[150px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Book Your <span className="text-gold-500">Free</span> Consultation
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take the first step toward protecting your rights. Fill out the form
            below and our team will respond within 1 hour.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-navy-950/50 border border-navy-700/50 rounded-2xl p-8 sm:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Case Type *
                  </label>
                  <select
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700/50 rounded-lg text-white focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all appearance-none"
                  >
                    <option value="" className="bg-navy-900">Select Case Type</option>
                    <option value="felony" className="bg-navy-900">Felony Defense</option>
                    <option value="dui" className="bg-navy-900">DUI / DWI</option>
                    <option value="drug" className="bg-navy-900">Drug Offenses</option>
                    <option value="whitecollar" className="bg-navy-900">White Collar Crime</option>
                    <option value="domestic" className="bg-navy-900">Domestic Violence</option>
                    <option value="juvenile" className="bg-navy-900">Juvenile Defense</option>
                    <option value="other" className="bg-navy-900">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Brief Description of Your Case
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us briefly about your situation..."
                  className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold-500 text-navy-950 font-bold rounded-lg hover:bg-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 text-lg"
              >
                {submitted ? '✓ Message Sent — We\'ll Call You Shortly!' : 'Request Free Consultation'}
              </button>

              <p className="text-center text-gray-600 text-xs">
                Your information is protected by attorney-client privilege.
              </p>
            </form>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 p-5 bg-navy-950/50 border border-navy-700/30 rounded-xl"
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="text-gold-500 text-xl" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white font-medium hover:text-gold-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-white font-medium">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="p-6 bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/20 rounded-xl">
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Urgent Matter?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                If you or a loved one has been arrested, call us immediately for
                emergency legal assistance.
              </p>
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gold-500 text-navy-950 font-bold rounded-lg hover:bg-gold-400 transition-all"
              >
                <HiOutlinePhone />
                Call Now — 24/7
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
