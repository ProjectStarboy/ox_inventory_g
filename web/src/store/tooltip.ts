import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory, SlotWithItem } from '../typings';

interface DomRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

interface TooltipState {
  open: boolean;
  item: SlotWithItem | null;
  inventoryType: Inventory['type'] | null;
  domRect: DomRect | null;
}

const initialState: TooltipState = {
  open: false,
  item: null,
  inventoryType: null,
  domRect: null,
};

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    openTooltip(
      state,
      action: PayloadAction<{ item: SlotWithItem; inventoryType: Inventory['type']; domRect: DomRect }>
    ) {
      state.open = true;
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType;
      state.domRect = action.payload.domRect;
    },
    closeTooltip(state) {
      state.open = false;
    },
  },
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
