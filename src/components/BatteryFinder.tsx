'use client';

import { useMemo, useState } from 'react';
import { Bike, Building2, Car, House, Minus, Plus, Sun, Zap } from 'lucide-react';
import { business } from '../data/site';
import { telLink, whatsappLink } from '../lib/links';
import { button, external } from './Button';

/* ---------- Finder data (copied from the live site) ---------- */

// Appliances for home / solar / commercial backup sizing.
const appliances = [
  { id: 'led-light', label: 'LED light', watts: 12 },
  { id: 'tube-light', label: 'Tube light', watts: 40 },
  { id: 'ceiling-fan', label: 'Ceiling fan', watts: 75 },
  { id: 'tv', label: 'TV (LED)', watts: 100 },
  { id: 'router', label: 'Wi-Fi router', watts: 15 },
  { id: 'laptop', label: 'Laptop', watts: 65 },
  { id: 'fridge', label: 'Refrigerator', watts: 200 },
  { id: 'mixer', label: 'Mixer grinder', watts: 500 },
  { id: 'water-pump', label: 'Water pump (0.5 HP)', watts: 450 },
  { id: 'desktop', label: 'Desktop computer', watts: 250 },
  { id: 'cctv', label: 'CCTV setup', watts: 60 },
  { id: 'billing-counter', label: 'Billing counter / POS', watts: 150 },
];

// Typical battery capacity by vehicle type.
const vehicleRanges = {
  car: [
    { label: 'Small hatchback (petrol)', range: '35Ah – 45Ah' },
    { label: 'Hatchback / sedan (petrol)', range: '45Ah – 55Ah' },
    { label: 'Sedan / compact SUV (diesel)', range: '55Ah – 65Ah' },
    { label: 'Large SUV / MUV (diesel)', range: '65Ah – 90Ah' },
  ],
  bike: [
    { label: 'Scooter / commuter bike', range: '3Ah – 5Ah (12V)' },
    { label: '150cc – 250cc motorcycle', range: '5Ah – 9Ah (12V)' },
    { label: 'Above 250cc / electric start', range: '9Ah – 12Ah (12V)' },
  ],
};

const kinds = [
  { id: 'car', label: 'Car', icon: Car, vehicle: true },
  { id: 'bike', label: 'Bike / Scooter', icon: Bike, vehicle: true },
  { id: 'inverter', label: 'Home Inverter', icon: House, vehicle: false },
  { id: 'solar', label: 'Solar System', icon: Sun, vehicle: false },
  { id: 'commercial', label: 'Commercial', icon: Building2, vehicle: false },
] as const;
type KindId = (typeof kinds)[number]['id'];

const CALC = { powerFactor: 0.8, depthOfDischarge: 0.6, efficiency: 0.8, systemVoltage: 12 };
const INVERTER_VA = [600, 900, 1100, 1500, 2000, 2500, 3500, 5000, 7500, 10000];
const BATTERY_AH = [80, 100, 120, 135, 150, 165, 180, 200, 220];

/* ---------- Backup sizing maths ---------- */

const nextSize = (value: number, sizes: number[]) => sizes.find((s) => s >= value) ?? Math.ceil(value / 500) * 500;

function calculateBackup(counts: Record<string, number>, hours: number, kind: KindId) {
  const totalWatts = appliances.reduce((sum, a) => sum + a.watts * (counts[a.id] ?? 0), 0);
  if (totalWatts <= 0 || hours <= 0) return null;

  const inverterVa = nextSize(totalWatts / CALC.powerFactor, INVERTER_VA);
  const neededAh = (totalWatts * hours) / (CALC.systemVoltage * CALC.depthOfDischarge * CALC.efficiency);
  const batteryCount = Math.max(1, Math.ceil(neededAh / 220));
  const perBatteryAh = nextSize(neededAh / batteryCount, BATTERY_AH);

  let batteryType = 'Tubular (deep-discharge)';
  let reason = 'Long backup hours mean deep, repeated discharge — tubular plates handle that best.';
  if (kind === 'solar') {
    batteryType = 'Solar tubular';
    reason = 'Solar charging cycles daily, so a solar-grade tubular battery is the right match.';
  } else if (hours <= 2 && totalWatts <= 400) {
    batteryType = 'Flat plate / short-backup tubular';
    reason = 'Light load with short backup — a flat plate battery is usually enough and costs less.';
  } else if (kind === 'commercial') {
    batteryType = 'Tubular (heavy duty)';
    reason = 'Commercial loads run longer and restart often, so a heavy-duty tubular bank is recommended.';
  }

  const batteryText = batteryCount > 1 ? `${batteryCount} × ${perBatteryAh}Ah` : `${perBatteryAh}Ah`;
  return {
    totalWatts,
    inverterVa,
    batteryText,
    batteryType,
    reason,
    summary: `${inverterVa}VA inverter with ${batteryText} ${batteryType.toLowerCase()} battery`,
  };
}

/* ---------- Component ---------- */

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:border-ring outline-none';
const chip = (active: boolean) =>
  active
    ? 'border-primary bg-primary/8 text-primary'
    : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground';

export function BatteryFinder() {
  const [kindId, setKindId] = useState<KindId>('car');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pincode, setPincode] = useState('');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [hours, setHours] = useState(4);

  const kind = kinds.find((k) => k.id === kindId)!;
  const ranges = kind.vehicle ? vehicleRanges[kindId === 'bike' ? 'bike' : 'car'] : [];
  const selectedRange = ranges.find((r) => r.label === vehicleType);
  const backup = useMemo(() => (kind.vehicle ? null : calculateBackup(counts, hours, kindId)), [kind.vehicle, counts, hours, kindId]);

  const changeCount = (id: string, delta: number) =>
    setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));

  const vehicleName = [brand, model, year, fuel].filter(Boolean).join(' ') || `a ${kind.label.toLowerCase()}`;
  const applianceList = appliances
    .filter((a) => (counts[a.id] ?? 0) > 0)
    .map((a) => `${counts[a.id]} × ${a.label}`)
    .join(', ');

  const waHref = kind.vehicle
    ? whatsappLink({
        kind: 'quote',
        enquiry: `${kind.label} battery`,
        requirement: vehicleName + (vehicleType ? ` (${vehicleType})` : ''),
        estimate: selectedRange ? `${selectedRange.range} starting battery` : undefined,
        pincode: pincode || undefined,
      })
    : whatsappLink({
        kind: 'quote',
        enquiry: `${kind.label} battery and backup`,
        requirement: `${applianceList || 'backup setup'} — ${hours} hour(s) backup`,
        estimate: backup?.summary,
        pincode: pincode || undefined,
      });

  return (
    <section id="finder" className="section-y bg-surface">
      <div className="container-apj">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Battery Finder</p>
          <h2 className="heading-lg mt-2">
            Find the Right Battery.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us what you&apos;re powering and we will work out the capacity you need. Our team then confirms the exact
            product, price and availability before you buy.
          </p>
        </div>

        <div className="card-surface mx-auto mt-10 max-w-4xl p-5 md:p-8">
          <fieldset>
            <legend className="text-sm font-semibold">What are you powering?</legend>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {kinds.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={kindId === k.id}
                  onClick={() => {
                    setKindId(k.id);
                    setVehicleType('');
                  }}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-xs font-semibold transition-colors ${chip(kindId === k.id)}`}
                >
                  <k.icon className="h-5 w-5" aria-hidden="true" />
                  {k.label}
                </button>
              ))}
            </div>
          </fieldset>

          {kind.vehicle ? (
            <>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <label className="text-sm">
                  <span className="mb-1.5 block font-medium">Brand</span>
                  <input className={inputClass} value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Maruti Suzuki" />
                </label>
                <label className="text-sm">
                  <span className="mb-1.5 block font-medium">Model</span>
                  <input className={inputClass} value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Swift" />
                </label>
                <label className="text-sm">
                  <span className="mb-1.5 block font-medium">Year</span>
                  <input className={inputClass} value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2018" inputMode="numeric" />
                </label>
                <label className="text-sm">
                  <span className="mb-1.5 block font-medium">Fuel type</span>
                  <select className={inputClass} value={fuel} onChange={(e) => setFuel(e.target.value)}>
                    <option value="">Select</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric start</option>
                  </select>
                </label>
              </div>
              <fieldset className="mt-6">
                <legend className="text-sm font-medium">Vehicle type</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ranges.map((r) => (
                    <button
                      key={r.label}
                      type="button"
                      aria-pressed={vehicleType === r.label}
                      onClick={() => setVehicleType(r.label)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${chip(vehicleType === r.label)}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          ) : (
            <>
              <fieldset className="mt-6">
                <legend className="text-sm font-medium">What should run during a power cut?</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {appliances.map((a) => {
                    const count = counts[a.id] ?? 0;
                    return (
                      <div
                        key={a.id}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${count > 0 ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{a.label}</p>
                          <p className="text-xs text-muted-foreground">{a.watts} W each</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            aria-label={`Remove one ${a.label}`}
                            onClick={() => changeCount(a.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold tabular-nums">{count}</span>
                          <button
                            type="button"
                            aria-label={`Add one ${a.label}`}
                            onClick={() => changeCount(a.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <label className="mt-6 block text-sm">
                <span className="mb-1.5 block font-medium">
                  Backup needed: {hours} hour{hours > 1 ? 's' : ''}
                </span>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </label>
            </>
          )}

          <label className="mt-6 block max-w-xs text-sm">
            <span className="mb-1.5 block font-medium">Your pincode (optional)</span>
            <input
              className={inputClass}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="600115"
              inputMode="numeric"
            />
          </label>

          <div className="mt-7 rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="font-display text-base font-bold">Our recommendation</p>
            </div>

            {kind.vehicle ? (
              selectedRange ? (
                <>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-muted-foreground">Vehicle</dt>
                      <dd className="font-display text-lg font-bold">{vehicleName}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Typical battery capacity</dt>
                      <dd className="font-display text-lg font-bold text-primary">{selectedRange.range}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Exact fitment also depends on terminal layout and tray size, so we confirm the final battery against your
                    vehicle before fitting.
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">Pick your vehicle type above to see the typical battery capacity range.</p>
              )
            ) : backup ? (
              <>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs text-muted-foreground">Total load</dt>
                    <dd className="font-display text-lg font-bold">{backup.totalWatts} W</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Inverter rating</dt>
                    <dd className="font-display text-lg font-bold text-primary">{backup.inverterVa} VA</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Battery capacity</dt>
                    <dd className="font-display text-lg font-bold text-primary">{backup.batteryText}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Battery type</dt>
                    <dd className="font-display text-base font-bold">{backup.batteryType}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-muted-foreground">{backup.reason}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Calculated at {CALC.systemVoltage}V using {Math.round(CALC.depthOfDischarge * 100)}% usable capacity,{' '}
                  {Math.round(CALC.efficiency * 100)}% system efficiency and a {CALC.powerFactor} power factor. Appliance
                  wattages are shown next to each item above.
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Add the appliances you want to run and we will calculate the inverter and battery size you need.
              </p>
            )}

            <p className="mt-4 rounded-lg bg-background/70 px-3 py-2 text-xs text-muted-foreground">
              This is a planning estimate. Availability, price and warranty are confirmed by our team before any purchase —
              we never quote stock we have not checked.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={waHref} {...external} className={button('whatsapp')}>
                Send this to us on WhatsApp
              </a>
              <a href={telLink(business.primaryPhone)} className={button('outline')}>
                Call instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
