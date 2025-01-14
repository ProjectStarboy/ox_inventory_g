import { Slot } from './slot';

export enum InventoryType {
  PLAYER = 'player',
  SHOP = 'shop',
  CONTAINER = 'container',
  CRAFTING = 'crafting',
  CLOTHING = 'clothing',
}

export type Inventory = {
  id: string;
  type: string;
  slots: number;
  items: Slot[];
  maxWeight?: number;
  label?: string;
  groups?: Record<string, number>;
};

export enum EPedComponent {
  PV_COMP_INVALID = 0xffffffff,
  PV_COMP_HEAD = 0, // "HEAD"
  PV_COMP_BERD = 1, // "BEARD"
  PV_COMP_HAIR = 2, // "HAIR"
  PV_COMP_UPPR = 3, // "UPPER"
  PV_COMP_LOWR = 4, // "LOWER"
  PV_COMP_HAND = 5, // "HAND"
  PV_COMP_FEET = 6, // "FEET"
  PV_COMP_TEEF = 7, // "TEETH"
  PV_COMP_ACCS = 8, // "ACCESSORIES"
  PV_COMP_TASK = 9, // "TASK"
  PV_COMP_DECL = 10, // "DECL"
  PV_COMP_JBIB = 11, // "JBIB"
  PV_COMP_MAX = 12,
}

export enum EAnchorPoints {
  ANCHOR_HEAD = 0, // "p_head"
  ANCHOR_EYES = 1, // "p_eyes"
  ANCHOR_EARS = 2, // "p_ears"
  ANCHOR_MOUTH = 3, // "p_mouth"
  ANCHOR_LEFT_HAND = 4, // "p_lhand"
  ANCHOR_RIGHT_HAND = 5, // "p_rhand"
  ANCHOR_LEFT_WRIST = 6, // "p_lwrist"
  ANCHOR_RIGHT_WRIST = 7, // "p_rwrist"
  ANCHOR_HIP = 8, // "p_lhip"
  ANCHOR_LEFT_FOOT = 9, // "p_lfoot"
  ANCHOR_RIGHT_FOOT = 10, // "p_rfoot"
  ANCHOR_PH_L_HAND = 11, // "ph_lhand"
  ANCHOR_PH_R_HAND = 12, // "ph_rhand"
  NUM_ANCHORS = 13,
}

export const ClothingSlots = [
  1, //'mask',
  3, //'torso',
  4, //'leg',
  5, //'bag',
  6, //'shoes',
  7, //'accessory',
  8, //'undershirt',
  9, //'kevlar',
  10, //'badge',
  11, //'top',
  12, //'hat',
  13, //'glasses',
  14, //'ear',
  18, //'watch',
  19, //'bracelet',
] as const;

export type IClothingSlot = (typeof ClothingSlots)[number];

export const ClothingSlotLabels: { [key in IClothingSlot]: string } = {
  1: 'Mặt nạ',
  3: 'Áo',
  4: 'Quần',
  5: 'Túi',
  6: 'Giày',
  7: 'Phụ kiện',
  8: 'Áo lót',
  9: 'Kevlar',
  10: 'Huy hiệu',
  11: 'Áo ngoài',
  12: 'Mũ',
  13: 'Kính',
  14: 'Tai',
  18: 'Đồng hồ',
  19: 'Vòng tay',
};

export type IClothingInventory = {
  id: 'clothing';
  type: InventoryType.CLOTHING;
  slots: 12;
  items: Slot[];
};

export const Categories = ['all', 'weapon', 'food', 'material', 'clothing'] as const;

export type ICategory = (typeof Categories)[number];
