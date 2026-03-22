import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { GoLaw } from 'react-icons/go';
import { HiOutlineShieldCheck, HiOutlineUserGroup } from 'react-icons/hi';

export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - image/visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-800">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center">
                <GoLaw className="text-gold-500/10 text-[200px]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 p-4 bg-navy-900/80 backdrop-blur-sm rounded-xl border border-gold-500/10">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="text-gold-500 text-xl" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Award-Winning Defense</div>
                    <div className="text-gray-400 text-xs">Recognized by National Trial Lawyers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold-500/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Right column - content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">
              About Our Firm
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              Two Decades of{' '}
              <span className="text-gold-500">Relentless</span> Advocacy
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              At MP Law Firm, we believe every person deserves a vigorous defense.
              Founded in 2005, our firm has built a reputation for taking on the
              toughest criminal cases and achieving exceptional results.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our team of seasoned trial lawyers combines meticulous preparation
              with courtroom tenacity. We understand that behind every case is a
              person whose life and liberty are at stake — and we treat every
              client with the urgency and respect they deserve.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: HiOutlineShieldCheck, title: 'Proven Track Record', desc: '98% success rate across all case types' },
                { icon: HiOutlineUserGroup, title: 'Client-First Approach', desc: '24/7 availability for urgent matters' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <item.icon className="text-gold-500 text-lg" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.title}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:text-gold-400 transition-colors group"
            >
              Schedule a Meeting
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
