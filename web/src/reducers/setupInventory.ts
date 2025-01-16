import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { getItemData, itemDurability } from '../helpers';
import { Items } from '../store/items';
import { IClothingInventory, Inventory, InventoryType, State } from '../typings';

export const setupInventoryReducer: CaseReducer<
  State,
  PayloadAction<{
    leftInventory?: Inventory;
    rightInventory?: Inventory;
    backpackInventory?: Inventory;
    clothingItems?: IClothingInventory['items'];
  }>
> = (state, action) => {
  const { leftInventory, rightInventory, clothingItems, backpackInventory } = action.payload;
  const curTime = Math.floor(Date.now() / 1000);

  if (leftInventory)
    state.leftInventory = {
      ...leftInventory,
      items: Array.from(Array(leftInventory.slots), (_, index) => {
        const item = Object.values(leftInventory.items).find((item) => item?.slot === index + 1) || {
          slot: index + 1,
        };

        if (!item.name) return item;

        if (typeof Items[item.name] === 'undefined') {
          getItemData(item.name);
        }

        item.durability = itemDurability(item.metadata, curTime);
        return item;
      }),
    };
  if (backpackInventory) {
    state.backpackInventory = {
      ...backpackInventory,
      items: Array.from(Array(backpackInventory.slots), (_, index) => {
        const item = Object.values(backpackInventory.items).find((item) => item?.slot === index + 1) || {
          slot: index + 1,
        };

        if (!item.name) return item;

        if (typeof Items[item.name] === 'undefined') {
          getItemData(item.name);
        }

        item.durability = itemDurability(item.metadata, curTime);
        return item;
      }),
      type: InventoryType.BACKPACK,
    };
  } else {
    state.backpackInventory = null;
  }
  if (rightInventory)
    state.rightInventory = {
      ...rightInventory,
      items: Array.from(Array(rightInventory.slots), (_, index) => {
        const item = Object.values(rightInventory.items).find((item) => item?.slot === index + 1) || {
          slot: index + 1,
        };

        if (!item.name) return item;

        if (typeof Items[item.name] === 'undefined') {
          getItemData(item.name);
        }

        item.durability = itemDurability(item.metadata, curTime);
        return item;
      }),
    };
  if (clothingItems) {
    state.clothing = {
      ...state.clothing,
      items: Array.from(Array(25), (_, index) => {
        const item = Object.values(clothingItems).find((item) => item?.slot === index + 1) || {
          slot: index + 1,
        };

        if (!item.name) return item;
        if (typeof Items[item.name] === 'undefined') {
          getItemData(item.name);
        }

        item.durability = itemDurability(item.metadata, curTime);
        return item;
      }),
    };
  }
  state.shiftPressed = false;
  state.isBusy = false;
};
