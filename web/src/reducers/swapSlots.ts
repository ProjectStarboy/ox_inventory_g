import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { getTargetInventory, itemDurability } from '../helpers';
import { Inventory, InventoryType, SlotWithItem, State } from '../typings';

export const swapSlotsReducer: CaseReducer<
  State,
  PayloadAction<{
    fromSlot: SlotWithItem;
    fromType: Inventory['type'];
    toSlot: SlotWithItem;
    toType: Inventory['type'];
  }>
> = (state, action) => {
  const { fromSlot, fromType, toSlot, toType } = action.payload;
  const { sourceInventory, targetInventory } = getTargetInventory(state, fromType, toType);
  const curTime = Math.floor(Date.now() / 1000);

  if (fromType === InventoryType.PLAYER && toType === InventoryType.CLOTHING) {
    [targetInventory.items[toSlot.slot - 1], sourceInventory.items[fromSlot.slot - 1]] = [
      {
        ...sourceInventory.items[fromSlot.slot - 1],
        count: 1,
        weight: fromSlot.weight / fromSlot.count,
        slot: toSlot.slot,
        durability: itemDurability(fromSlot.metadata, curTime),
      },
      {
        ...targetInventory.items[toSlot.slot - 1],
        slot: fromSlot.slot,
        durability: itemDurability(toSlot.metadata, curTime),
      },
    ];
    return;
  }

  if (fromType === InventoryType.CLOTHING && toType === InventoryType.PLAYER) {
    [targetInventory.items[toSlot.slot - 1], sourceInventory.items[fromSlot.slot - 1]] = [
      {
        ...sourceInventory.items[fromSlot.slot - 1],
        slot: toSlot.slot,
        durability: itemDurability(fromSlot.metadata, curTime),
      },
      {
        ...targetInventory.items[toSlot.slot - 1],
        slot: fromSlot.slot,
        durability: itemDurability(toSlot.metadata, curTime),
      },
    ];
    return;
  }

  [sourceInventory.items[fromSlot.slot - 1], targetInventory.items[toSlot.slot - 1]] = [
    {
      ...targetInventory.items[toSlot.slot - 1],
      slot: fromSlot.slot,
      durability: itemDurability(toSlot.metadata, curTime),
    },
    {
      ...sourceInventory.items[fromSlot.slot - 1],
      slot: toSlot.slot,
      durability: itemDurability(fromSlot.metadata, curTime),
    },
  ];
};
