import { business } from '../data/site';

/*
  WhatsApp messages. Edit the wording here — every WhatsApp button on the
  site builds its message through `whatsappLink(...)`.
*/
export type WhatsAppContext =
  | { kind: 'general' }
  | { kind: 'product'; product: string }
  | { kind: 'service'; service: string }
  | { kind: 'delivery'; pincode: string; area?: string }
  | { kind: 'quote'; enquiry: string; requirement?: string; estimate?: string; pincode?: string };

function whatsappMessage(ctx: WhatsAppContext): string {
  const hello = `Hello ${business.legalName},`;
  switch (ctx.kind) {
    case 'product':
      return `${hello} I am interested in ${ctx.product}. Please confirm price, availability and delivery.`;
    case 'service':
      return `${hello} I need ${ctx.service}.`;
    case 'delivery':
      return [
        hello,
        `I want to check delivery for pincode ${ctx.pincode}${ctx.area ? ` (${ctx.area})` : ''}.`,
        'Please confirm delivery timeline, charges and installation support for my area.',
      ].join('\n');
    case 'quote':
      return [
        hello,
        `Enquiry: ${ctx.enquiry}`,
        ctx.requirement ? `Requirement: ${ctx.requirement}` : null,
        ctx.estimate ? `Estimated need: ${ctx.estimate}` : null,
        `Location / Pincode: ${ctx.pincode ?? '---'}`,
        'Please share price, availability and warranty.',
      ]
        .filter(Boolean)
        .join('\n');
    default:
      return `${hello} I would like help choosing a battery, inverter or solar solution.`;
  }
}

export function whatsappLink(ctx: WhatsAppContext = { kind: 'general' }) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(ctx))}`;
}

export const telLink = (phone: string) => `tel:${phone}`;

// "+919176969392" -> "+91 91769 69392"
export const formatPhone = (phone: string) => phone.replace(/^(\+91)(\d{5})(\d{5})$/, '$1 $2 $3');
