import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { HiOutlineStar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'Felony Defense Client',
    text: 'When I was facing felony charges that could have ended my career, MP Law Firm stepped in and fought for me like no one else would. Their strategy was brilliant, and the charges were dismissed. I owe them my freedom.',
    rating: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'DUI Defense Client',
    text: "I was terrified after my DUI arrest. The team at MP Law Firm was available immediately, explained everything clearly, and got my charges reduced significantly. They genuinely cared about my situation and it showed in the results.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'White Collar Defense Client',
    text: 'Facing federal fraud charges was the most stressful experience of my life. MP Law Firm brought in a former prosecutor who understood exactly how to dismantle the case against me. Fully acquitted. Absolutely outstanding.',
    rating: 5,
  },
  {
    name: 'Linda Rogers',
    role: 'Domestic Violence Defense Client',
    text: 'They handled my case with sensitivity and professionalism. False allegations were threatening to destroy my family, and MP Law Firm proved the truth. I am forever grateful for their dedication and compassion.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView(0.15);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
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
            Client Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            What Our <span className="text-gold-500">Clients</span> Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real results from real people. Our clients&apos; stories speak to
            the dedication and expertise we bring to every case.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-navy-900/50 border border-navy-700/50 rounded-2xl p-8 sm:p-12">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-gold-500/10 font-heading text-8xl leading-none select-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <HiOutlineStar key={i} className="text-gold-500 fill-gold-500 text-lg" />
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-300 rounded-full flex items-center justify-center text-navy-950 font-bold text-lg">
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonials[current].name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-navy-700/50">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-gold-500 w-8' : 'bg-navy-700 hover:bg-navy-600'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:border-gold-500/50 hover:text-gold-500 transition-all"
                  aria-label="Previous testimonial"
                >
                  <HiOutlineChevronLeft />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:border-gold-500/50 hover:text-gold-500 transition-all"
                  aria-label="Next testimonial"
                >
                  <HiOutlineChevronRight />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
