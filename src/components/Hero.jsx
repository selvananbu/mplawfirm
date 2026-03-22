import { motion } from 'framer-motion';
import { HiOutlinePhone, HiOutlineArrowDown } from 'react-icons/hi';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8a951\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Gold gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold-500 rounded-full blur-[100px]"
      />

      {/* Vertical gold line accent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 120 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute left-8 top-1/3 w-[1px] bg-gradient-to-b from-transparent via-gold-500/40 to-transparent hidden lg:block"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-5 py-2 border border-gold-500/30 rounded-full mb-8 backdrop-blur-sm bg-gold-500/5"
        >
          <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
          <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">
            Defending Your Rights Since 2005
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
        >
          Fierce Criminal{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-300">
            Defense
          </span>
          <br />
          When It Matters Most
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Facing criminal charges can be life-altering. Our seasoned attorneys
          fight relentlessly to protect your freedom, reputation, and future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group w-full sm:w-auto px-8 py-4 bg-gold-500 text-navy-950 font-bold rounded-lg hover:bg-gold-400 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 flex items-center justify-center gap-2"
          >
            Book Free Consultation
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </a>
          <a
            href="tel:+1234567890"
            className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <HiOutlinePhone className="text-gold-500" />
            (123) 456-7890
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '500+', label: 'Cases Won' },
            { value: '20+', label: 'Years Exp.' },
            { value: '98%', label: 'Success Rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-gold-500">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <HiOutlineArrowDown className="text-gold-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
