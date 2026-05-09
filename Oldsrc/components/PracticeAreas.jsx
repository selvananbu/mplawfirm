import { motion } from 'framer-motion';
import { useInView } from './useInView';
import {
  HiOutlineShieldCheck,
  HiOutlineScale,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

const areas = [
  {
    icon: HiOutlineShieldCheck,
    title: 'Felony Defense',
    desc: 'Aggressive representation for serious charges including assault, robbery, and weapons offenses.',
  },
  {
    icon: HiOutlineExclamationCircle,
    title: 'DUI / DWI',
    desc: 'Strategic defense against drunk driving charges. Protecting your license and your record.',
  },
  {
    icon: HiOutlineScale,
    title: 'Drug Offenses',
    desc: 'Defense for possession, distribution, and trafficking charges at state and federal levels.',
  },
  {
    icon: HiOutlineDocumentText,
    title: 'White Collar Crime',
    desc: 'Expert defense for fraud, embezzlement, money laundering, and corporate crime cases.',
  },
  {
    icon: HiOutlineHome,
    title: 'Domestic Violence',
    desc: 'Sensitive and effective defense strategies for domestic allegations and restraining orders.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Juvenile Defense',
    desc: 'Protecting the futures of young people facing criminal charges in juvenile court.',
  },
];

export default function PracticeAreas() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="practice" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">
            Our Expertise
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Practice <span className="text-gold-500">Areas</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            With deep expertise across all areas of criminal law, we provide
            comprehensive defense strategies tailored to each unique case.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-navy-900/50 border border-navy-700/50 hover:border-gold-500/30 transition-all duration-500 hover:bg-navy-800/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors duration-300">
                  <area.icon className="text-gold-500 text-2xl" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {area.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <span>&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
