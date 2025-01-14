import { Box, Text } from 'lr-components';
import React, { Fragment, useMemo } from 'react';
import Line from './Line';
import { useAppSelector } from '../store';
import { getItemUrl } from '../helpers';
import { DragSource, SlotWithItem } from '../typings';
import { Items } from '../store/items';
import ClockIcon from './utils/icons/ClockIcon';
import ReactMarkdown from 'react-markdown';
import { Locale } from '../store/locale';
import { useDrop } from 'react-dnd';
import { onGive } from '../dnd/onGive';
import { Button } from '@nextui-org/react';

interface Props {
  infoVisible: boolean;
  setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer({ infoVisible, setInfoVisible }: Props) {
  const hoverData = useAppSelector((state) => state.tooltip);
  const itemData = useMemo(() => {
    if (!hoverData.item) return null;
    return Items[hoverData.item.name];
  }, [hoverData]);
  const description = hoverData.item?.metadata?.description || itemData?.description;
  const ammoName = itemData?.ammoName && Items[itemData?.ammoName]?.label;
  const additionalMetadata = useAppSelector((state) => state.inventory.additionalMetadata);
  const ingredients = useMemo(() => {
    if (!hoverData.item?.ingredients) return null;
    return Object.entries(hoverData.item.ingredients).sort((a, b) => a[1] - b[1]);
  }, [hoverData]);
  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));
  return (
    <div style={{ height: '100%' }}>
      <div
        className="flex  h-full items-center justify-center bg-white bg-opacity-5 gap-4 hover:bg-lime-500 hover:bg-opacity-30"
        ref={give}
      >
        <svg width="47" height="23" viewBox="0 0 47 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M46 5C46 7.21912 44.5544 9.10046 42.5536 9.75391C42.6185 10.2316 42.7512 10.7512 43 11H45C46.6 11 47 12 47 12.5V22.5C47 22.9 46.6667 23 46.5 23H41H35.5C35.3333 23 35 22.9 35 22.5V12.5C35 12 35.4 11 37 11H39C39.2488 10.7512 39.3815 10.2316 39.4464 9.75391C37.4456 9.10046 36 7.21912 36 5C36 2.23853 38.2386 0 41 0C43.7614 0 46 2.23853 46 5ZM0.5 7.5V4.5H4.5V7.5C4.5 10.2615 6.73859 12.5 9.5 12.5H21V9L29 14.5L21 20V16.5H9.5C4.52942 16.5 0.5 12.4706 0.5 7.5Z"
            fill="white"
            opacity={0.3}
          />
        </svg>
        <Text className="text-white text-nowrap text-sm" fontFamily="Roboto" textTransform="uppercase" opacity={0.3}>
          KÉO VẬT PHẨM VÀO ĐÂY
          <br />
          ĐỂ CHUYỂN NÓ CHO NGƯỜI CHƠI KHÁC
        </Text>
      </div>
    </div>
  );
}

export default Footer;
