import { FIRM_NAME } from './branding';
import { OFFICE_CITY } from './contact';

/**
 * Shown when Google reviews are unavailable (API not configured, error, or empty).
 * Copy is anonymised and appropriate for Indian criminal practice — not impersonating Google users.
 */
export const FALLBACK_CLIENT_STORIES = [
  {
    id: 'fallback-1',
    name: 'Family member',
    role: `Client · FIR & police station · ${OFFICE_CITY}`,
    initials: 'FM',
    text: `When an FIR was registered, we did not know whether to approach the station or court first. ${FIRM_NAME} walked us through bail, the chargesheet timeline and what to expect at the Magistrate court — in plain language our parents could follow.`,
    rating: 5,
    badge: 'Clarity at every step',
    source: 'fallback',
  },
  {
    id: 'fallback-2',
    name: 'Accused person',
    role: 'Sessions Court · Tamil Nadu',
    initials: 'AP',
    text: `The Sessions listing felt overwhelming. Our advocate explained witness strategy, documents we needed from home, and how arguments are framed under IPC / BNS. We always knew the next date and the purpose — not guessing in the corridor.`,
    rating: 5,
    badge: 'Trial-ready preparation',
    source: 'fallback',
  },
  {
    id: 'fallback-3',
    name: 'Client',
    role: `Bail & revision · ${OFFICE_CITY} / Madras HC`,
    initials: 'C',
    text: `Urgent custody situation — we needed someone who picks up the phone. Fees were discussed upfront without surprises. The office in Ram Nagar was easy to find; appointments ran on time and documents were explained before we signed.`,
    rating: 5,
    badge: 'Responsive & transparent',
    source: 'fallback',
  },
];
