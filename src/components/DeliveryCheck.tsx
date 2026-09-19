'use client';

import { useState } from 'react';
import { CircleCheck, Info, Search } from 'lucide-react';
import { deliverySteps, pincodeAreas } from '../data/site';
import { whatsappLink } from '../lib/links';
import { button, external } from './Button';

type Result = { status: 'served'; pincode: string; area: string } | { status: 'error'; message: string };

function checkPincode(input: string): Result {
  const pin = input.trim();
  if (!/^\d{6}$/.test(pin)) return { status: 'error', message: 'Please enter a valid 6-digit pincode.' };
  const n = Number(pin);
  const match = pincodeAreas.find((r) => n >= r.from && n <= r.to);
  if (match) return { status: 'served', pincode: pin, area: match.area };
  return {
    status: 'error',
    message:
      'That pincode is outside Tamil Nadu. We currently serve Tamil Nadu — message us and we will check whether we can help.',
  };
}

// "Order Batteries Online Across Tamil Nadu" section on the Home page.
export function DeliveryCheck() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  return (
    <section aria-labelledby="delivery-heading" className="section-y bg-surface">
      <div className="container-apj grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow">Tamil Nadu Delivery</p>
          <h2 id="delivery-heading" className="heading-lg mt-2">
            Order Batteries Online Across Tamil Nadu.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We deliver to all main areas across Tamil Nadu. Enter your pincode to check your area — timelines vary by
            district, product weight and stock, so we confirm them for your pincode rather than promising the same schedule
            everywhere.
          </p>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              setResult(checkPincode(pincode));
            }}
          >
            <label htmlFor="delivery-pincode" className="mb-1.5 block text-sm font-medium">
              Check delivery for my area
            </label>
            <div className="flex flex-wrap gap-3">
              <input
                id="delivery-pincode"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setResult(null);
                }}
                placeholder="Enter 6-digit pincode"
                className="h-11 w-48 rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
              />
              <button type="submit" className={button('primary')}>
                <Search className="h-4 w-4" aria-hidden="true" />
                Check
              </button>
            </div>
          </form>

          <div aria-live="polite" className="mt-4">
            {result?.status === 'served' && (
              <div className="rounded-xl border border-energy/40 bg-energy/10 p-4">
                <p className="flex items-center gap-2 font-display text-sm font-bold">
                  <CircleCheck className="h-4 w-4 text-energy" aria-hidden="true" />
                  Yes — we deliver to {result.pincode} ({result.area}).
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Message us with the product you need and we will confirm the delivery timeline, charges and installation
                  support for your area.
                </p>
                <a
                  href={whatsappLink({ kind: 'delivery', pincode: result.pincode, area: result.area })}
                  {...external}
                  className={button('whatsapp', 'sm', 'mt-3')}
                >
                  Confirm delivery on WhatsApp
                </a>
              </div>
            )}
            {result?.status === 'error' && (
              <p className="flex items-start gap-2 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {result.message}
              </p>
            )}
          </div>
        </div>

        <ol className="space-y-4">
          {deliverySteps.map((step, i) => (
            <li key={step.title} className="card-surface flex gap-4 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
