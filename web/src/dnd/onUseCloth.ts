import { isSlotWithItem } from '../helpers';
import { store } from '../store';
import { moveSlots, swapSlots } from '../store/inventory';
import { validateMove } from '../thunks/validateItems';
import { DragSource, DropTarget, IClothingSlot, SlotWithItem } from '../typings';

export const onUseCloth = (source: DragSource, target: DropTarget) => {
  const { inventory: state } = store.getState();
  const sourceInventory = state.leftInventory;
  const targetInventory = state.clothing;
  console.log(target.item);
  console.log(targetInventory.items);
  const sourceSlot = sourceInventory.items[source.item.slot - 1] as SlotWithItem;
  const targetSlot = targetInventory.items[(target.item.slot - 1) as IClothingSlot];
  const data = {
    fromSlot: sourceSlot,
    toSlot: targetSlot,
    fromType: sourceInventory.type,
    toType: 'clothing',
    count: 1,
  };

  console.log(data);

  store.dispatch(
    validateMove({
      ...data,
      fromSlot: sourceSlot.slot,
      toSlot: targetSlot.slot,
    })
  );
  isSlotWithItem(targetSlot, true)
    ? store.dispatch(
        swapSlots({
          ...data,
          toSlot: targetSlot,
        })
      )
    : store.dispatch(moveSlots(data));
};
