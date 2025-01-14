import React from 'react';
import { useSelector } from 'react-redux';
import { selectLeftInventory } from '../../store/inventory';
import InventorySlot from './InventorySlot';
import { Box, Text } from 'lr-components';

function FastSlots() {
  const leftInventory = useSelector(selectLeftInventory);

  return (
    <div className="flex  h-full items-center relative">
      <div className="fastslot-grid-container">
        {Array.from({ length: 5 }, (_, i) => i).map((i) => {
          return (
            <div className="w-full h-full flex items-end gap-3 relative justify-center items-center" key={i}>
              <InventorySlot
                searching=""
                key={i}
                item={leftInventory.items[i]}
                inventoryType={leftInventory.type}
                inventoryGroups={leftInventory.groups}
                inventoryId={leftInventory.id}
              />
              <Box className=" flex items-center justify-center absolute left-[-35px] px-2 py-2">
                <Text
                  fontFamily="Roboto"
                  color="rgba(255, 255, 255, 0.7)"
                  fontStyle=""
                  fontWeight={'bold'}
                  rFontSize={25}
                  rLineHeight={25}
                >
                  {i + 1}
                </Text>
                <div className="w-1 h-full absolute bg-success left-[-5px] rounded-r-md"></div>
              </Box>
            </div>
          );
        })}
      </div>
      <Text
        className="text-white text-xs text-center text-nowrap "
        fontFamily="Roboto"
        textTransform="uppercase"
        opacity={0.3}
        rFontSize={18}
        position="absolute"
        writingMode="vertical-rl"
        rRight={-40}
      >
        PHÍM NHANH
      </Text>
    </div>
  );
}

export default FastSlots;
