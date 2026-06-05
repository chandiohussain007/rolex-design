import { WatchModel, SpecFeature } from './types';

// ===== Watch Images =====
import watchHero from './assets/images/rolex_green_gold_1780609215908.png';
import watchBrown from './assets/images/rolex_brown_leather_1780609237098.png';
import watchBlack from './assets/images/rolex_gold_champagne_1780609263981.png';

// ===== Macro Images =====
import dial from './assets/images/dial.png';
import watchMacro from './assets/images/4.png'; // Fallback macro

// ===== Components =====
import pillow from './assets/images/rolex_cushion_1780609286304.png';
import box from './assets/images/box.png';
import bezel from './assets/images/bezel.png';
import mechanical from './assets/images/machine.png';
import logo from './assets/images/rolex-logo.png';

export const assets = {
  watchHero,
  watchBrown,
  watchBlack,
  dial,
  watchMacro,
  pillow,
  box,
  bezel,
  mechanical,
  logo
};

// ===== Watch Models for Carousel =====
export const watchModels: WatchModel[] = [
  {
    id: 'green-gold',
    name: 'Day-Date 40',
    subtitle: 'Olive Green Dial',
    price: '$38,900',
    image: watchHero,
    macroImage: dial, // The specific dial image provided by user
  },
  {
    id: 'leather-diamonds',
    name: 'Leather & Diamonds',
    subtitle: 'Everose Gold',
    price: '$44,650',
    image: watchBrown,
    macroImage: watchMacro,
  },
  {
    id: 'yellow-gold',
    name: 'Yellow Gold & Diamonds',
    subtitle: 'Day-Date 36',
    price: '$34,450',
    image: watchBlack,
    macroImage: watchMacro,
  },
];

// ===== Spec Features for Hotspot Section =====
export const specFeatures: SpecFeature[] = [
  {
    id: 'fluted-bezel',
    label: 'Fluted bezel',
    dotX: 66,
    dotY: 22,
    labelX: 85,
    labelY: 15,
    side: 'right',
  },
  {
    id: 'president-bracelet',
    label: 'The President bracelet',
    dotX: 72,
    dotY: 12,
    labelX: 85,
    labelY: 5,
    side: 'right',
  },
  {
    id: 'day-date',
    label: 'Day date',
    dotX: 68,
    dotY: 42,
    labelX: 88,
    labelY: 40,
    side: 'right',
  },
  {
    id: 'green-dial',
    label: 'Green Dial',
    dotX: 35,
    dotY: 35,
    labelX: 10,
    labelY: 30,
    side: 'left',
  },
  {
    id: 'calibre-3255',
    label: 'Calibre 3255',
    dotX: 38,
    dotY: 65,
    labelX: 10,
    labelY: 62,
    side: 'left',
  },
];
