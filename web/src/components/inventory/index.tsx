import React, { useState } from 'react';
import useNuiEvent from '../../hooks/useNuiEvent';
import InventoryControl from './InventoryControl';
import InventoryHotbar from './InventoryHotbar';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  refreshSlots,
  selectShowClothing,
  setAdditionalMetadata,
  setShowClothing,
  setupInventory,
} from '../../store/inventory';
import { useExitListener } from '../../hooks/useExitListener';
import type { Inventory as InventoryProps } from '../../typings';
import RightInventory from './RightInventory';
import LeftInventory from './LeftInventory';
import Tooltip from '../utils/Tooltip';
import { closeTooltip } from '../../store/tooltip';
import InventoryContext from './InventoryContext';
import { closeContextMenu } from '../../store/contextMenu';
import Fade from '../utils/transitions/Fade';
import Header from '../Header';
import Footer from '../Footer';
import FastSlots from './FastSlots';
import { Button } from '@nextui-org/react';
import Clothing from './Clothing';

const Inventory: React.FC = () => {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const showClothing = useAppSelector(selectShowClothing);
  const dispatch = useAppDispatch();

  useNuiEvent<boolean>('setInventoryVisible', setInventoryVisible);
  useNuiEvent<false>('closeInventory', () => {
    setInventoryVisible(false);
    dispatch(closeContextMenu());
    dispatch(closeTooltip());
  });
  useExitListener(setInventoryVisible);

  useNuiEvent<{
    leftInventory?: InventoryProps;
    rightInventory?: InventoryProps;
  }>('setupInventory', (data) => {
    dispatch(setupInventory(data));
    !inventoryVisible && setInventoryVisible(true);
  });

  useNuiEvent('refreshSlots', (data) => dispatch(refreshSlots(data)));

  useNuiEvent('displayMetadata', (data: Array<{ metadata: string; value: string }>) => {
    dispatch(setAdditionalMetadata(data));
  });

  return (
    <>
      <Fade in={inventoryVisible}>
        <div className="app-content">
          <Header />
          <div className="inventory-wrapper px-10 py-5 gap-52">
            <div>
              <FastSlots />
            </div>
            <div className="flex w-full gap-[70px]">
              <LeftInventory />
              {/* <InventoryControl infoVisible={infoVisible} setInfoVisible={setInfoVisible} /> */}
              {!showClothing ? <RightInventory /> : <Clothing />}
              <Tooltip />
              <InventoryContext />
            </div>
          </div>
          <Button
            className="absolute right-10 bottom-32"
            color="warning"
            onPress={() => {
              dispatch(setShowClothing(!showClothing));
            }}
          >
            {showClothing ? 'KHO ĐỒ PHỤ' : 'QUẦN ÁO'}
          </Button>
          <Footer infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
        </div>
      </Fade>
      <InventoryHotbar />
    </>
  );
};

export default Inventory;
