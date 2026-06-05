export interface WatchModel {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  macroImage: string;
}

export interface SpecFeature {
  id: string;
  label: string;
  dotX: number;
  dotY: number;
  labelX: number;
  labelY: number;
  side: 'left' | 'right';
}
