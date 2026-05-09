/** Firm contact — single source of truth for phone & WhatsApp links */
export const FIRM_PHONE_E164 = '+919940717742';
export const FIRM_PHONE_HREF = `tel:${FIRM_PHONE_E164}`;
export const FIRM_PHONE_DISPLAY = '99407 17742';
/** WhatsApp `wa.me` id without + prefix */
export const FIRM_WHATSAPP_WA_ID = '919940717742';
export const FIRM_WHATSAPP_HREF = `https://wa.me/${FIRM_WHATSAPP_WA_ID}`;

export const FIRM_EMAIL = 'adv.ipnathan@gmail.com';
export const FIRM_MAILTO_HREF = `mailto:${FIRM_EMAIL}`;

/** Office — M.P. Law firm */
export const OFFICE_CITY = 'Coimbatore';

export const OFFICE_LINE_1 = 'Second floor, 261/1, Nehru St';
export const OFFICE_LINE_2 = 'Peranaidu Layout, Ram Nagar';
export const OFFICE_PIN = 'Tamil Nadu 641009';

/** Single-line form for maps / sharing */
export const OFFICE_ADDRESS_FULL = `${OFFICE_LINE_1}, ${OFFICE_LINE_2}, ${OFFICE_CITY}, ${OFFICE_PIN}`;

export const OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS_FULL)}`;
