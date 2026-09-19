import { MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { business } from '../data/site';
import { telLink, whatsappLink } from '../lib/links';
import { external } from './Button';

// Round green WhatsApp button, bottom-right on every page.
// It sits above the mobile bottom bar on small screens (same as the live site).
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      {...external}
      aria-label="Chat with Anbu Power Junction on WhatsApp"
      className="fixed bottom-20 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}

// Call / WhatsApp / Shop bar fixed to the bottom on mobile and tablet.
export function MobileBottomBar() {
  const item = 'flex flex-col items-center gap-1 py-2.5 text-xs font-semibold';
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 shadow-bar backdrop-blur lg:hidden">
      <div className="grid grid-cols-3">
        <a href={telLink(business.primaryPhone)} className={item}>
          <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
          Call
        </a>
        <a href={whatsappLink()} {...external} className={`${item} border-x border-border`}>
          <MessageCircle className="h-5 w-5 text-whatsapp" aria-hidden="true" />
          WhatsApp
        </a>
        <a href="#batteries" className={item}>
          <ShoppingBag className="h-5 w-5 text-spark" aria-hidden="true" />
          Shop
        </a>
      </div>
    </div>
  );
}
