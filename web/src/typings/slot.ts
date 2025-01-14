export type Slot = {
  slot: number;
  name?: string;
  count?: number;
  weight?: number;
  metadata?: {
    [key: string]: any;
  };
  durability?: number;
};

export type SlotWithItem = Slot & {
  name: string;
  count: number;
  weight: number;
  durability?: number;
  price?: number;
  currency?: string;
  ingredients?: { [key: string]: number };
  duration?: number;
  image?: string;
  grade?: number | number[];
};

export const Rarites = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical', 'godlike', 'unique'] as const;

export type Rarity = (typeof Rarites)[number];

export const RarityColors: { [key in Rarity]: string } = {
  common: '#FFFFFF',
  uncommon: 'rgb(30, 255, 0)',
  rare: 'rgb(0, 112, 221)',
  epic: 'rgb(163, 53, 238)',
  legendary: 'rgb(255, 128, 0)',
  mythical: '#rgb(249, 182, 34)',
  godlike: '#D35400',
  unique: 'rgb(228, 53, 51)',
};

export const RarityLabels: { [key in Rarity]: string } = {
  common: 'Phổ biến',
  uncommon: 'Không phổ biến',
  rare: 'Hiếm',
  epic: 'Sử thi',
  legendary: 'Huyền thoại',
  mythical: 'Thần thoại',
  godlike: 'Thần thánh',
  unique: 'Độc nhất',
};
