import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import {
  ClothingSlotLabels,
  DragSource,
  IClothingSlot,
  Inventory,
  InventoryType,
  Slot,
  SlotWithItem,
} from '../../typings';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeTooltip, openTooltip } from '../../store/tooltip';
import { useMergeRefs } from '@floating-ui/react';
import WeightBar from '../utils/WeightBar';
import { onDrop } from '../../dnd/onDrop';
import classNames from 'classnames';
import { useHover } from '@mantine/hooks';
import ItemRarity from './ItemRarity';
import { Box, Text } from 'lr-components';
import { onUseCloth } from '../../dnd/onUseCloth';
import { selectClothing } from '../../store/inventory';

interface Props {
  slot: IClothingSlot;
  inventoryType: Inventory['type'];
}

interface DragLayerProps {
  data: DragSource;
}

const getComponentData = (metadata: any) => {
  if (!metadata) return;
  if (
    metadata.componentType === undefined ||
    metadata.componentId === undefined ||
    metadata.textureId === undefined ||
    metadata.gender === undefined ||
    metadata.drawableId === undefined
  )
    return undefined;
  const componentSlot = metadata.componentType === 'component' ? metadata.componentId : metadata.componentId + 12;
  return {
    componentId: metadata.componentId,
    textureId: metadata.textureId,
    drawableId: metadata.drawableId,
    gender: metadata.gender,
    componentType: metadata.componentType,
    componentSlot,
  };
};

const ClothingSlot: React.FC<Props> = ({ slot, inventoryType }, ref) => {
  const clothing = useAppSelector(selectClothing);
  const { data } = useDragLayer<DragLayerProps>((monitor) => ({
    data: monitor.getItem(),
  }));
  const item = clothing.items[slot - 1];
  //console.log(data);
  const draggingComponent = useMemo(() => getComponentData(data?.metadata), [data?.metadata]);
  const { hovered, ref: hoverRef } = useHover();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  const canDrag = useCallback(() => {
    return true;
  }, [item, inventoryType]);

  const [{ isDragging }, drag] = useDrag<DragSource, void, { isDragging: boolean }>(
    () => ({
      type: 'SLOT',
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: () =>
        isSlotWithItem(item, inventoryType !== InventoryType.SHOP)
          ? {
              inventory: inventoryType,
              item: {
                name: item.name,
                slot: item.slot,
              },
              image: item?.name && `url(${getItemUrl(item) || 'none'}`,
            }
          : null,
      canDrag,
    }),
    [inventoryType, item]
  );

  const [{ isOver }, drop] = useDrop<DragSource, void, { isOver: boolean }>(
    () => ({
      accept: 'SLOT',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (source) => {
        dispatch(closeTooltip());
        console.log('drop to clothing', slot, source);
        onUseCloth(source, { inventory: inventoryType, item: { slot: item.slot } });
      },
      canDrop: (source) => {
        console.log('canDrop to clothing', slot, source);
        if (source.inventory !== InventoryType.PLAYER) return false;
        return true;
      },
    }),
    [inventoryType, item]
  );

  const connectRef = (element: HTMLDivElement) => drag(drop(element));
  const refs = useMergeRefs([connectRef, hoverRef]);

  const icon = useMemo(() => {
    if (slot < 12) {
      return `icon-ped-component-${slot}`;
    }
    return `icon-ped-prop-${slot - 12}`;
  }, [slot]);

  return (
    <Box ref={refs} className="clothing-slot " rWidth={88} rHeight={88}>
      {!isSlotWithItem(item) && (
        <div className="flex flex-col justify-center items-center">
          <i
            className={`icon ${icon} slot-icon ${isSlotWithItem(item) ? 'opacity-5' : 'opacity-50'} ${
              draggingComponent?.componentSlot === slot ? 'text-cyan-500' : 'text-white'
            }`}
          />
          <Text
            className={classNames(
              'text-white text-xs text-center',
              draggingComponent?.componentSlot === slot ? 'text-cyan-500' : 'text-white'
            )}
            fontFamily="Roboto"
            textTransform="uppercase"
            opacity={0.7}
          >
            {ClothingSlotLabels[slot]}
          </Text>
        </div>
      )}
      <div
        className="absolute w-full h-full flex justify-center items-center"
        style={{
          backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '70% 70%',
          backgroundPosition: 'center',
        }}
      ></div>
      {isSlotWithItem(item) && (
        <div
          className="item-slot-wrapper absolute z-10 w-full h-full"
          onMouseEnter={() => {
            timerRef.current = setTimeout(() => {
              dispatch(openTooltip({ item, inventoryType }));
            }, 300);
          }}
          onMouseLeave={() => {
            dispatch(closeTooltip());
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }}
        >
          <div>
            {inventoryType !== 'shop' && item?.durability !== undefined && (
              <WeightBar percent={item.durability} durability />
            )}
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full flex ">
        <div
          className={classNames('w-2/12 border-t border-l border-b border-white rounded-tl-md rounded-bl-md', {
            'border-opacity-30': !hovered,
            '!border-cyan-500 border-opacity-100': draggingComponent?.componentSlot === slot,
          })}
        ></div>
        <div
          className={classNames('w-4/12 border-b border-white relative flex justify-center items-center', {
            'border-opacity-30': !hovered,
            '!border-cyan-500 border-opacity-100': draggingComponent?.componentSlot === slot,
          })}
        >
          <div className="item-slot-info ">
            <p>{item.count}</p>
          </div>
          {isSlotWithItem(item) && <ItemRarity item={item} />}
        </div>
        <div
          className={classNames('w-6/12 border-b border-r border-t border-white rounded-tr-md rounded-br-md', {
            'border-opacity-30': !hovered,
            '!border-cyan-500 border-opacity-100': draggingComponent?.componentSlot === slot,
          })}
        ></div>
      </div>
    </Box>
  );
};

export default ClothingSlot;
