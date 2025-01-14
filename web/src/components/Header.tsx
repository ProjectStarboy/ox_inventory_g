import React, { useMemo } from 'react';
import { Box, Text } from 'lr-components';
import Line from './Line';
import PlayerWeightProgress from './inventory/PlayerWeightProgress';
import { useAppSelector } from '../store';
import { selectLeftInventory } from '../store/inventory';
import { getTotalWeight } from '../helpers';

function Header() {
  const leftInventory = useAppSelector(selectLeftInventory);
  const weight = useMemo(
    () => (leftInventory.maxWeight !== undefined ? Math.floor(getTotalWeight(leftInventory.items) * 1000) / 1000 : 0),
    [leftInventory.maxWeight, leftInventory.items]
  );
  console.log(leftInventory.maxWeight);
  if (!leftInventory.maxWeight) return null;
  return (
    <div className=" bg-opacity-20 flex justify-center items-center px-16 py-8 gap-11">
      <Box className="w-3/12">
        <Text
          rFontSize={14}
          fontFamily="Roboto"
          rLineHeight={18}
          textAlign="right"
          opacity={0.7}
          className="text-nowrap"
        >
          CLICK VÀO VẬT PHẨM
          <br />
          -THÔNG TIN VÀ TƯƠNG TÁC
        </Text>
      </Box>
      <Box className="w-full">
        <Line />
      </Box>
      <Box className="w-6/12 flex justify-center items-center gap-4">
        <Text
          fontFamily="Roboto"
          rFontSize={14}
          rLineHeight={18}
          textAlign="right"
          opacity={0.7}
          className="text-nowrap"
        >
          CÂN NẶNG BALO
        </Text>
        <PlayerWeightProgress />
        <Text fontFamily="Roboto" rFontSize={14} rLineHeight={18}>
          <span className="text-large text-white">{(weight / 1000).toFixed(2)}</span> /{' '}
          <span className="text-white text-sm text-nowrap text-opacity-70">{leftInventory.maxWeight / 1000} Kg</span>
        </Text>
      </Box>

      <Box className="w-full">
        <Line />
      </Box>
      <Box className="flex items-center gap-2 w-3/12 text-right justify-end uppercase">
        <Text rFontSize={14} rLineHeight={14} fontFamily="Roboto" opacity={0.7} className="text-nowrap">
          Thoát khỏi
          <br /> Kho đồ
        </Text>
        <Box className="rounded-md bg-primary  bg-opacity-70 flex justify-center items-center h-8 w-16">
          <Text rFontSize={14} fontFamily="Roboto">
            ESC
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default Header;
