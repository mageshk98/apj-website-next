/*
  ============================================================
  SITE CONTENT — edit this file to change what the website says.
  ============================================================
  - Phone numbers, address, hours, email, rating -> `business`
  - Founder / About section                      -> `founder`, `whyApj`
  - Battery categories                           -> `categories`
  - Brands                                       -> `brands`
  - Services                                     -> `services`
  - FAQ questions                                -> `faqs`
  To add an item, copy an existing entry in the list and change the text.
*/

export const business = {
  legalName: 'Anbu Power Junction',
  displayName: 'ANBU POWER JUNCTION',
  brandMark: 'APJ',
  tagline: 'Power Solutions You Can Trust',
  proprietor: 'A. Joseph, B.E.',
  establishedYear: 2019,
  experienceYears: '7+',
  email: 'anbupowerjunction@gmail.com',
  // Format: +91 followed by 10 digits, no spaces. The first one is the main number.
  phones: ['+919176969392', '+917200103710', '+918148113711'],
  primaryPhone: '+919176969392',
  // WhatsApp number: country code + number, no "+" or spaces.
  whatsappNumber: '919176969392',
  mapsUrl: 'https://maps.app.goo.gl/DCq2kWaBw1j8tuYWA',
  // Google Business rating shown on Home (Visit Us) and Reviews sections.
  rating: 4.9,
  reviewCount: 223,
  socials: {
    instagram: 'https://www.instagram.com/anbupowerjunction/',
    facebook: 'https://www.facebook.com/p/Anbu-Power-Junction-100067062307710/',
  },
  address: {
    line1: 'No. 3/218, Pandiyan Salai',
    line2: 'Near Sugan Hospital',
    locality: 'Neelankarai',
    city: 'Chennai',
    postalCode: '600115',
    region: 'Tamil Nadu',
  },
  openingHours: [
    { days: 'Monday – Saturday', hours: '9:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  serviceArea: ['Chennai', 'Tamil Nadu'],
};

// Founder section on the About page.
export const founder = {
  name: business.proprietor,
  title: 'Founder, ' + business.legalName,
  photo: '/founder.png',
  linkedin: 'https://www.linkedin.com/in/joseph-a-18b8b416a/',
  quote:
    "Every customer walks in with a specific power problem. My job is to understand it properly before I recommend anything — that's how you build a business people come back to.",
  bio: `Joseph started ${business.legalName} in ${business.establishedYear} as a small battery counter in Neelankarai. ${business.experienceYears} years later, he still handles customer requirements personally — from working out what a vehicle or household actually needs, to installation and after-sales support.`,
};

// Address split into display lines (used on Home, Contact and Footer).
export const addressLines = [
  business.displayName,
  `${business.address.line1},`,
  `${business.address.line2},`,
  `${business.address.locality},`,
  `${business.address.city} – ${business.address.postalCode},`,
  `${business.address.region}, India.`,
];

export const categories = [
  {
    slug: 'car-batteries',
    name: 'Car Batteries',
    shortName: 'Car',
    description:
      'Car batteries deliver the high burst of current needed to crank an engine, then recharge from the alternator. Choosing the right one depends on your car model, terminal layout, tray size and cranking requirement.',
    useCases: ['Petrol cars', 'Diesel cars', 'SUVs', 'Taxi and fleet use'],
  },
  {
    slug: 'bike-batteries',
    name: 'Bike Batteries',
    shortName: 'Bike',
    description:
      "Two-wheeler batteries are small, sealed and sensitive to correct sizing. The right unit depends on your model's voltage, capacity and terminal orientation.",
    useCases: ['Motorcycles', 'Scooters', 'Electric start models'],
  },
  {
    slug: 'inverter-batteries',
    name: 'Inverter Batteries',
    shortName: 'Inverter',
    description:
      'Inverter batteries are designed for long, slow discharge cycles rather than engine cranking. Backup time depends on your load, battery capacity and inverter rating.',
    useCases: ['Homes', 'Shops', 'Clinics', 'Small offices'],
  },
  {
    slug: 'tubular-batteries',
    name: 'Tubular Batteries',
    shortName: 'Tubular',
    description:
      'Tubular plate construction handles deeper discharge and longer service life than flat plate designs, which suits areas with frequent or extended power cuts.',
    useCases: ['Frequent power cuts', 'Long backup', 'Heavier loads'],
  },
  {
    slug: 'solar-batteries',
    name: 'Solar Batteries',
    shortName: 'Solar',
    description:
      'Solar batteries are built for daily cycling from panel charging. Correct sizing depends on panel wattage, daily consumption and the number of backup days you want.',
    useCases: ['Rooftop solar', 'Hybrid solar inverters', 'Off-grid setups'],
  },
  {
    slug: 'commercial-batteries',
    name: 'Commercial Batteries',
    shortName: 'Commercial',
    description:
      'Commercial installations need load assessment before battery selection. We survey the site, calculate the load and recommend a bank that matches the duty cycle.',
    useCases: ['Offices', 'Showrooms', 'Workshops', 'Industrial units'],
  },
];

// `logo` is optional — brands without a clean logo file fall back to a text card.
export const brands = [
  { slug: 'amaron', name: 'Amaron', note: 'Automotive and inverter batteries', logo: '/brands/amaron.png' },
  { slug: 'exide', name: 'Exide', note: 'Automotive, inverter and tubular batteries', logo: '/brands/exide.png' },
  { slug: 'sf-sonic', name: 'SF Sonic', note: 'Automotive batteries', logo: '/brands/sf-sonic.jpg' },
  { slug: 'luminous', name: 'Luminous', note: 'Inverters and inverter batteries' },
  { slug: 'microtek', name: 'Microtek', note: 'Inverters and home UPS', logo: '/brands/microtek.svg' },
  { slug: 'mtek-power', name: 'MTEK Power', note: 'Power backup products', logo: '/brands/mtek-power.webp' },
  { slug: 'hykon', name: 'Hykon', note: 'Inverters and stabilisers' },
  { slug: 'honda', name: 'Honda Generators', note: 'Portable generators', logo: '/brands/honda.svg' },
  { slug: 'blue-mount', name: 'Blue Mount', note: 'Home appliances and power products' },
];

export const services = [
  {
    slug: 'battery-replacement',
    name: 'Battery Replacement',
    summary: 'Correct replacement battery selected for your vehicle or inverter.',
    area: 'Chennai and nearby areas',
  },
  {
    slug: 'battery-testing',
    name: 'Battery Testing',
    summary: 'Find out whether the battery is the real problem before you replace it.',
    area: 'Chennai',
  },
  {
    slug: 'battery-service',
    name: 'Battery Service & Maintenance',
    summary: 'Cleaning, topping up, terminal care and health checks.',
    area: 'Chennai',
  },
  {
    slug: 'inverter-installation',
    name: 'Inverter Installation',
    summary: 'Home and shop inverter installation with safe wiring practice.',
    area: 'Chennai and Tamil Nadu, on request',
  },
  {
    slug: 'inverter-repair',
    name: 'Inverter Repair',
    summary: 'Diagnosis and repair for inverters and home UPS units.',
    area: 'Chennai',
  },
  {
    slug: 'solar-installation',
    name: 'Solar Installation',
    summary: 'Rooftop solar planning and installation for homes and small businesses.',
    area: 'Chennai and Tamil Nadu, on request',
  },
  {
    slug: 'solar-service',
    name: 'Solar Inverter Service',
    summary: 'Service and fault-finding for solar inverters and charge controllers.',
    area: 'Chennai',
  },
  {
    slug: 'battery-maintenance',
    name: 'Annual Maintenance Support',
    summary: 'Planned upkeep for homes, shops and commercial installations.',
    area: 'Chennai',
  },
];

export const faqs = [
  {
    q: 'How do I choose the right car battery?',
    a: "Start with your car's make, model, year and fuel type. These decide the battery group size, terminal layout and cranking requirement. Send us your vehicle details on WhatsApp and we will confirm the correct specification before you buy.",
  },
  {
    q: 'How long does a car battery usually last?',
    a: 'In Chennai conditions most car batteries give roughly three to five years, depending on driving pattern, heat exposure and charging-system health. Short daily trips and long idle periods shorten life.',
  },
  {
    q: 'How do I know when my battery needs replacement?',
    a: 'Slow cranking, dim headlights at idle, repeated jump starts, a swollen case or a dashboard battery warning are common signs. A load test confirms whether the battery or the charging system is at fault.',
  },
  {
    q: 'What is the difference between tubular and flat plate batteries?',
    a: 'Flat plate batteries are lighter and lower cost, and suit shorter, less frequent power cuts. Tubular plate batteries handle deeper discharge and generally last longer, which suits areas with frequent or long outages.',
  },
  {
    q: 'Can I order a battery online in Tamil Nadu?',
    a: 'Yes. You can browse categories and brands here and contact us by phone or WhatsApp with your requirement. We confirm availability, compatibility, price and delivery options for your location before any order is placed.',
  },
  {
    q: 'Do you provide battery installation?',
    a: 'Yes. We install car, bike, inverter and solar batteries, and we check the charging side during fitment so the new battery is not damaged by an existing fault.',
  },
  {
    q: 'Do you service batteries and inverters bought elsewhere?',
    a: 'Yes. We test and service batteries and inverters regardless of where they were purchased. Warranty claims still have to go through the original seller or brand.',
  },
  {
    q: 'Do you provide solar installation?',
    a: 'Yes. We handle rooftop solar planning, installation and service for homes and small businesses, including battery backup where required.',
  },
];

// "Why APJ" section on the Home page.
export const whyApj = [
  {
    title: 'Field-tested experience',
    body: 'Recommendations come from work done on real vehicles, inverters and rooftops — not from a price list.',
  },
  {
    title: 'Multi-brand knowledge',
    body: 'We work across several battery and inverter brands, so the advice fits your need rather than one supplier.',
  },
  {
    title: 'Correct product guidance',
    body: "We confirm specification, capacity and fitment before you buy, so you don't pay for the wrong unit.",
  },
  {
    title: 'Installation support',
    body: 'Proper fitment, terminal care and a check of the charging side during installation.',
  },
  {
    title: 'Service & repair',
    body: 'Testing, servicing and repair for batteries, inverters and solar systems, including units bought elsewhere.',
  },
  { title: 'Responsive support', body: 'Reachable by phone and WhatsApp when something stops working.' },
];

// Tamil Nadu delivery section steps (Home page).
export const deliverySteps = [
  {
    title: 'Share your requirement',
    body: 'Tell us your vehicle, inverter load or solar setup along with your pincode and district.',
  },
  {
    title: 'We confirm the details',
    body: 'Compatibility, current price, stock and what delivery to your area involves — confirmed before you commit.',
  },
  {
    title: 'Delivery and installation',
    body: 'Delivery timelines depend on product, weight and location. Installation support is arranged where available.',
  },
];

// Pincode ranges used by the "Check delivery" box. Anything outside = not Tamil Nadu.
export const pincodeAreas = [
  { from: 600001, to: 600130, area: 'Chennai' },
  { from: 600131, to: 601210, area: 'Chennai outskirts / Tiruvallur' },
  { from: 601211, to: 602110, area: 'Tiruvallur' },
  { from: 602111, to: 603999, area: 'Kancheepuram / Chengalpattu' },
  { from: 604001, to: 605999, area: 'Villupuram / Cuddalore' },
  { from: 606001, to: 607999, area: 'Cuddalore / Kallakurichi' },
  { from: 608001, to: 609999, area: 'Mayiladuthurai / Nagapattinam' },
  { from: 610001, to: 614999, area: 'Thiruvarur / Thanjavur / Pudukkottai' },
  { from: 615001, to: 616999, area: 'Thanjavur' },
  { from: 617001, to: 620999, area: 'Ariyalur / Perambalur / Tiruchirappalli' },
  { from: 621001, to: 622999, area: 'Tiruchirappalli / Pudukkottai' },
  { from: 623001, to: 624999, area: 'Ramanathapuram / Sivagangai / Dindigul' },
  { from: 625001, to: 626999, area: 'Madurai / Virudhunagar' },
  { from: 627001, to: 628999, area: 'Tirunelveli / Thoothukudi' },
  { from: 629001, to: 629999, area: 'Kanyakumari' },
  { from: 630001, to: 632999, area: 'Sivagangai / Vellore / Ranipet' },
  { from: 633001, to: 635999, area: 'Tiruvannamalai / Krishnagiri' },
  { from: 636001, to: 637999, area: 'Salem / Namakkal' },
  { from: 638001, to: 639999, area: 'Erode / Karur' },
  { from: 640001, to: 642999, area: 'Coimbatore / Tiruppur' },
  { from: 643001, to: 643253, area: 'The Nilgiris' },
];
