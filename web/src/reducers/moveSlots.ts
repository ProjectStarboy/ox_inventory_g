import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { getTargetInventory, itemDurability } from '../helpers';
import { Inventory, InventoryType, Slot, SlotWithItem, State } from '../typings';

export const moveSlotsReducer: CaseReducer<
  State,
  PayloadAction<{
    fromSlot: SlotWithItem;
    fromType: Inventory['type'];
    toSlot: Slot;
    toType: Inventory['type'];
    count: number;
  }>
> = (state, action) => {
  console.log('moveSlotsReducer', action.payload);
  const { fromSlot, fromType, toSlot, toType, count } = action.payload;
  const { sourceInventory, targetInventory } = getTargetInventory(state, fromType, toType);
  const pieceWeight = fromSlot.weight / fromSlot.count;
  const curTime = Math.floor(Date.now() / 1000);
  const fromItem =
    fromType === InventoryType.CLOTHING
      ? sourceInventory.items[fromSlot.slot - 1]
      : sourceInventory.items[fromSlot.slot - 1];

  console.log(action.payload);
  console.log(targetInventory.id);
  if (fromType === InventoryType.PLAYER && toType === InventoryType.CLOTHING) {
    targetInventory.items[toSlot.slot - 1] = {
      ...fromItem,
      count: 1,
      weight: pieceWeight,
      slot: toSlot.slot,
      durability: itemDurability(fromItem.metadata, curTime),
    };
    sourceInventory.items[fromSlot.slot - 1] =
      fromSlot.count - count > 0
        ? {
            ...sourceInventory.items[fromSlot.slot - 1],
            count: fromSlot.count - count,
            weight: pieceWeight * (fromSlot.count - count),
          }
        : {
            slot: fromSlot.slot,
          };
    return;
  }
  if (fromType === InventoryType.CLOTHING && toType === InventoryType.PLAYER) {
    targetInventory.items[toSlot.slot - 1] = {
      ...fromItem,
      count: count,
      weight: pieceWeight * count,
      slot: toSlot.slot,
      durability: itemDurability(fromItem.metadata, curTime),
    };
    sourceInventory.items[fromSlot.slot - 1] =
      fromSlot.count - count > 0
        ? {
            ...sourceInventory.items[fromSlot.slot],
            count: fromSlot.count - count,
            weight: pieceWeight * (fromSlot.count - count),
          }
        : {
            slot: fromSlot.slot,
          };
    return;
  }
  targetInventory.items[toSlot.slot - 1] = {
    ...fromItem,
    count: count,
    weight: pieceWeight * count,
    slot: toSlot.slot,
    durability: itemDurability(fromItem.metadata, curTime),
  };

  if (fromType === InventoryType.SHOP || fromType === InventoryType.CRAFTING) return;
  sourceInventory.items[fromSlot.slot - 1] =
    fromSlot.count - count > 0
      ? {
          ...sourceInventory.items[fromSlot.slot - 1],
          count: fromSlot.count - count,
          weight: pieceWeight * (fromSlot.count - count),
        }
      : {
          slot: fromSlot.slot,
        };
};
