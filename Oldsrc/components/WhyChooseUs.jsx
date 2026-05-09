import { motion } from 'framer-motion';
import { useInView } from './useInView';
import {
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineLightBulb,
} from 'react-icons/hi';

const reasons = [
  {
    icon: HiOutlineBadgeCheck,
    title: 'Former Prosecutors on Your Side',
    desc: 'Our attorneys include former prosecutors who know exactly how the other side builds a case — giving you a decisive strategic advantage.',
  },
  {
    icon: HiOutlineClock,
    title: '24/7 Emergency Availability',
    desc: "Criminal situations don't wait for business hours. Reach us anytime — day or night — for immediate legal counsel and support.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Aggressive Yet Strategic Defense',
    desc: 'We combine courtroom tenacity with meticulous preparation. Every motion, every argument, every detail is crafted for maximum impact.',
  },
  {
    icon: HiOutlineLightBulb,
    title: 'Transparent & Honest Guidance',
    desc: 'No sugarcoating. We give you a realistic assessment of your case, clear options, and honest advice so you can make informed decisions.',
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="why-us" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Decorative accent */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500 rounded-full blur-[200px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              We Don&apos;t Just Defend.{' '}
              <span className="text-gold-500">We Fight.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Choosing the right criminal defense attorney can mean the difference
              between freedom and incarceration. Here&apos;s why clients trust MP Law
              Firm with their most critical cases.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '500+', label: 'Cases Won' },
                { num: '20+', label: 'Years Experience' },
                { num: '5-Star', label: 'Client Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-2xl font-bold text-gold-500">{s.num}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group flex gap-5 p-5 rounded-xl bg-navy-950/50 border border-navy-700/30 hover:border-gold-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <reason.icon className="text-gold-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{reason.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
