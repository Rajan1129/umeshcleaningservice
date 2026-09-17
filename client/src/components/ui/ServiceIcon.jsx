import {
  Home, Sparkles, ShowerHead, CookingPot, Sofa, BedDouble, Grid2x2,
  PanelsTopLeft, Layers, Fan, Building2, HardHat, Waves, Brush, Droplets
} from 'lucide-react';

/**
 * Icons are mapped explicitly rather than imported as a namespace, so the
 * bundle only carries the icons the site actually uses.
 * Adding a new service icon means adding one line here.
 */
const ICONS = {
  Home, Sparkles, ShowerHead, CookingPot, Sofa, BedDouble, Grid2x2,
  PanelsTopLeft, Layers, Fan, Building2, HardHat, Waves, Brush, Droplets
};

export default function ServiceIcon({ name = 'Sparkles', className = 'h-6 w-6' }) {
  const Icon = ICONS[name] || Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
