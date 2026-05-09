import { motion as Motion } from 'framer-motion';
import { HiOutlinePhone, HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineBadgeCheck } from 'react-icons/hi';
import { FIRM_PHONE_DISPLAY, FIRM_PHONE_HREF } from '../constants/contact';
import { FIRM_NAME, LAWYER_NAME } from '../constants/branding';
import { useI18n } from '../i18n/useI18n';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const { t, ta } = useI18n();
  const heroStats = ta('hero.stats');
  const trustItems = [t('hero.trust1'), t('hero.trust2')];
  const panels = [
    {
      num: '01',
      title: t('hero.panel1Title'),
      desc: t('hero.panel1Desc', { phone: FIRM_PHONE_DISPLAY }),
    },
    {
      num: '02',
      title: t('hero.panel2Title'),
      desc: t('hero.panel2Desc'),
    },
    {
      num: '03',
      title: t('hero.panel3Title'),
      desc: t('hero.panel3Desc'),
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-navy-950">
      <picture className="absolute inset-0 block pointer-events-none" aria-hidden>
        <source srcSet="/hero-bg.webp" type="image/webp" />
        <img
          src="/hero-bg.png"
          alt=""
          width={2560}
          height={1707}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] select-none [image-rendering:auto]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-900/55" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/50" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,163,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,163,58,0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div className="absolute top-0 bottom-0 left-[calc(50%-1px)] hidden lg:block w-px bg-gradient-to-b from-transparent via-gold-500/45 to-transparent pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[88vh] items-center py-20">
          <div className="pr-0 lg:pr-16">
            <Motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 bg-navy-950/35 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[10px] uppercase tracking-[0.18em] font-medium text-slate-300"
              >
                {t('hero.badge')}
              </span>
            </Motion.div>

            <Motion.h1
              {...fadeUp(0.2)}
              style={{ fontFamily: 'var(--font-display)' }}
              className="tracking-tight text-white mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
            >
              <span className="block text-[38px] sm:text-[48px] lg:text-[54px] font-semibold leading-[1.1]">
                <span className="text-white">{FIRM_NAME.split('Law firm')[0]}</span>
                <span className="text-gold-400">Law firm</span>
              </span>
              <span
                className="mt-5 block max-w-xl border-t border-gold-500/35 pt-5 text-[22px] sm:text-[26px] lg:text-[28px] font-medium leading-snug text-gold-200"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {LAWYER_NAME}
              </span>
            </Motion.h1>

            <Motion.p
              {...fadeUp(0.3)}
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-slate-300 text-lg leading-relaxed mb-10 max-w-[440px]"
            >
              {t('hero.tagline')}
            </Motion.p>

            <Motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-3 mb-12">
              <a
                href="#contact"
                style={{ fontFamily: 'var(--font-display)' }}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gold-500 text-navy-950 text-[13px] font-semibold tracking-wide hover:bg-gold-400 transition-colors duration-200 shadow-lg shadow-black/25"
              >
                {t('hero.bookFree')}
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={FIRM_PHONE_HREF}
                style={{ fontFamily: 'var(--font-display)' }}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/70 text-white text-[13px] font-semibold tracking-wide hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
              >
                <HiOutlinePhone className="text-gold-400 text-base" />
                {t('hero.call')} {FIRM_PHONE_DISPLAY}
              </a>
            </Motion.div>

            <Motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-4">
              {[
                { icon: HiOutlineShieldCheck, text: trustItems[0] },
                { icon: HiOutlineBadgeCheck, text: trustItems[1] },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="text-gold-400 text-lg flex-shrink-0" />
                  <span style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] text-slate-300 font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </Motion.div>
          </div>

          <div className="flex items-center justify-center lg:justify-end mt-16 lg:mt-0">
            <Motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm backdrop-blur-[2px]"
            >
              <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/15 mb-6 shadow-xl shadow-black/30">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-navy-800/50 px-5 py-6 text-center">
                    <div style={{ fontFamily: 'var(--font-display)' }} className="text-[30px] font-semibold text-gold-400 leading-none mb-1">
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)' }} className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {panels.map((item) => (
                  <div
                    key={item.num}
                    className="flex gap-4 items-start p-4 bg-navy-800/40 border border-white/8 hover:bg-navy-700/40 transition-colors duration-200"
                  >
                    <span style={{ fontFamily: 'var(--font-display)' }} className="text-[11px] font-semibold text-gold-500 mt-0.5 flex-shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)' }} className="text-[13px] font-semibold text-white mb-0.5">
                        {item.title}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] text-slate-400 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
