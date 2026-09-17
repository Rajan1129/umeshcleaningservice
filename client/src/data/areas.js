// Towns the business serves. Each area page carries its own useful content —
// no thin duplicate pages, no invented landmarks.
export const AREAS = [
  {
    slug: 'jalandhar', name: 'Jalandhar', isBase: true,
    blurb: 'Our home base. We cover homes, flats, kothis, shops and offices across the city.',
    context: 'Jalandhar is where most of our work happens, so scheduling here is usually the quickest. We handle everything from a single-bathroom flat to a full kothi deep clean, and take office and showroom work in the commercial areas of the city.',
    highlights: ['Same-city team, so short-notice slots are often possible', 'Homes, flats, kothis, shops and offices', 'Regular weekly or monthly schedules available']
  },
  {
    slug: 'phagwara', name: 'Phagwara',
    blurb: 'Home and office cleaning across Phagwara, on scheduled visit days.',
    context: 'We travel to Phagwara on planned visit days. Booking a day or two ahead helps us group the visit properly and reach you at the time promised.',
    highlights: ['Home cleaning and deep cleaning', 'Sofa, mattress and carpet cleaning at your home', 'Office and shop cleaning']
  },
  {
    slug: 'kartarpur', name: 'Kartarpur',
    blurb: 'Deep cleaning, sofa cleaning and post-construction cleaning in Kartarpur.',
    context: 'Kartarpur is close enough to Jalandhar that we can usually fit visits in without a long wait. Post-construction and pre-function deep cleans are the most common bookings here.',
    highlights: ['Deep cleaning before functions', 'Post-construction and after-renovation cleaning', 'Furniture and upholstery cleaning']
  },
  {
    slug: 'adampur',
    name: 'Adampur',
    blurb: 'Household and commercial cleaning for Adampur and the surrounding area.',
    context: 'We take home and commercial cleaning work in Adampur on scheduled days. Tell us the property size when you call so we can send the right size team.',
    highlights: ['Home and kitchen cleaning', 'Bathroom deep cleaning', 'Floor scrubbing and jet washing']
  },
  {
    slug: 'nakodar', name: 'Nakodar',
    blurb: 'Deep cleaning and upholstery cleaning for homes in Nakodar.',
    context: 'Visits to Nakodar are planned in advance. Deep cleaning and sofa or mattress cleaning are the services people here book most often.',
    highlights: ['Full home deep cleaning', 'Sofa, mattress and carpet cleaning', 'Kitchen and chimney cleaning']
  },
  {
    slug: 'kapurthala', name: 'Kapurthala',
    blurb: 'Home, office and post-construction cleaning across Kapurthala.',
    context: 'We serve Kapurthala on scheduled visit days, including larger jobs such as post-construction cleaning where the team stays for a full day.',
    highlights: ['Home and office cleaning', 'Post-construction cleaning', 'Window and floor cleaning']
  },
  {
    slug: 'goraya', name: 'Goraya',
    blurb: 'Cleaning for homes, shops and small offices in Goraya.',
    context: 'Goraya sits on our route between Jalandhar and Phillaur, so we combine visits there with nearby bookings. Let us know your preferred day when you enquire.',
    highlights: ['Home cleaning and deep cleaning', 'Shop and small office cleaning', 'Floor scrubbing and jet washing']
  },
  {
    slug: 'shahkot', name: 'Shahkot',
    blurb: 'Home deep cleaning and furniture cleaning in Shahkot.',
    context: 'We plan Shahkot visits ahead of time. Deep cleaning, kitchen cleaning and upholstery work are the usual bookings.',
    highlights: ['Home deep cleaning', 'Kitchen and bathroom cleaning', 'Sofa and mattress cleaning']
  },
  {
    slug: 'phillaur', name: 'Phillaur',
    blurb: 'Household and commercial cleaning services for Phillaur.',
    context: 'Phillaur bookings are scheduled in advance so we can send a full team with the equipment the job needs.',
    highlights: ['Home and office cleaning', 'Post-construction cleaning', 'Carpet, sofa and mattress cleaning']
  }
];

export const getArea = (slug) => AREAS.find((a) => a.slug === slug);
export const AREA_NAMES = AREAS.map((a) => a.name);
