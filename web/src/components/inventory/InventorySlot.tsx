import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DragSource, Inventory, InventoryType, Slot, SlotWithItem } from '../../typings';
import { useDrag, useDragDropManager, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../store';
import WeightBar from '../utils/WeightBar';
import { onDrop } from '../../dnd/onDrop';
import { onBuy } from '../../dnd/onBuy';
import { Items } from '../../store/items';
import { canCraftItem, canPurchaseItem, getItemUrl, isSlotWithItem } from '../../helpers';
import { onUse } from '../../dnd/onUse';
import { Locale } from '../../store/locale';
import { onCraft } from '../../dnd/onCraft';
import useNuiEvent from '../../hooks/useNuiEvent';
import { ItemsPayload } from '../../reducers/refreshSlots';
import { closeTooltip, openTooltip } from '../../store/tooltip';
import { openContextMenu } from '../../store/contextMenu';
import { useMergeRefs } from '@floating-ui/react';
import { useHover } from '@mantine/hooks';
import classNames from 'classnames';
import ItemRarity from './ItemRarity';
import { Box } from 'lr-components';

interface SlotProps {
  inventoryId: Inventory['id'];
  inventoryType: Inventory['type'];
  inventoryGroups: Inventory['groups'];
  item: Slot;
  searching?: string;
  locked?: boolean;
}

const InventorySlot: React.ForwardRefRenderFunction<HTMLDivElement, SlotProps> = (
  { item, inventoryId, inventoryType, inventoryGroups, searching, locked },
  ref
) => {
  const { hovered, ref: hoverRef } = useHover();
  const manager = useDragDropManager();
  const dispatch = useAppDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const canDrag = useCallback(() => {
    return canPurchaseItem(item, { type: inventoryType, groups: inventoryGroups }) && canCraftItem(item, inventoryType);
  }, [item, inventoryType, inventoryGroups]);

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
              metadata: item.metadata,
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
        if (locked) return;
        switch (source.inventory) {
          case InventoryType.SHOP:
            onBuy(source, { inventory: inventoryType, item: { slot: item.slot } });
            break;
          case InventoryType.CRAFTING:
            onCraft(source, { inventory: inventoryType, item: { slot: item.slot } });
            break;
          default:
            onDrop(source, { inventory: inventoryType, item: { slot: item.slot } });
            break;
        }
      },
      canDrop: (source) =>
        (source.item.slot !== item.slot || source.inventory !== inventoryType) &&
        inventoryType !== InventoryType.SHOP &&
        inventoryType !== InventoryType.CRAFTING,
    }),
    [inventoryType, item, locked]
  );

  useNuiEvent('refreshSlots', (data: { items?: ItemsPayload | ItemsPayload[] }) => {
    if (!isDragging && !data.items) return;
    if (!Array.isArray(data.items)) return;

    const itemSlot = data.items.find(
      (dataItem) => dataItem.item.slot === item.slot && dataItem.inventory === inventoryId
    );

    if (!itemSlot) return;

    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  const connectRef = (element: HTMLDivElement) => drag(drop(element));

  const handleContext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (inventoryType !== 'player' || !isSlotWithItem(item)) return;

    dispatch(openContextMenu({ item, coords: { x: event.clientX, y: event.clientY } }));
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(closeTooltip());
    if (timerRef.current) clearTimeout(timerRef.current);
    if (event.ctrlKey && isSlotWithItem(item) && inventoryType !== 'shop' && inventoryType !== 'crafting') {
      onDrop({ item: item, inventory: inventoryType });
    } else if (event.altKey && isSlotWithItem(item) && inventoryType === 'player') {
      onUse(item);
    }
  };

  const refs = useMergeRefs([connectRef, ref, hoverRef]);
  const shouldRenderItem = useMemo(() => {
    if (!item.name) return false;
    if (searching) {
      if (!item.name.toLowerCase().includes(searching.toLowerCase())) return false;
    }
    return true;
  }, [item.name, Items, searching]);

  const componentData:
    | {
        componentId: number;
        drawableId: number;
        textureId: number;
        name: string;
        gender: 'male' | 'female';
      }
    | undefined = useMemo(() => {
    if (item.name) {
      //male_component_11_12_0
      const arg = item.name.split('_');
      if (arg.length < 5) return;
      return {
        gender: arg[0] as 'male' | 'female',
        componentId: Number(arg[2]),
        drawableId: Number(arg[3]),
        textureId: Number(arg[4]),
        name: item.name,
      };
    }
  }, [item]);

  return (
    <Box
      ref={refs}
      onContextMenu={handleContext}
      onClick={handleClick}
      className="inventory-slot"
      rWidth={88}
      rHeight={88}
    >
      {componentData ? (
        <div className="absolute w-full h-full flex items-center justify-center"></div>
      ) : (
        <div className="absolute w-full h-full p-[10px] flex justify-center items-center">
          <div
            className=" w-full h-full "
            style={{
              backgroundImage: `url(${shouldRenderItem && item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          >
            {item.metadata?.fishQuality !== undefined && item.metadata?.fishQuality > 0 && (
              <img
                src={`https://supabase.lorraxs.dev/storage/v1/object/public/items/${
                  item.metadata.fishQuality === 1 ? 'silver' : item.metadata.fishQuality === 2 ? 'gold' : 'iridium'
                }_quality_icon.png`}
                className="absolute left-[10%] bottom-[20%] w-[50%] h-[50%]"
              />
            )}
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full flex inventory-slot-border">
        <div
          className={classNames('w-2/12 border-t border-l border-b border-white rounded-tl-md rounded-bl-md', {
            'border-opacity-30': !hovered,
          })}
        ></div>
        <div
          className={classNames('w-4/12 border-b border-white relative flex justify-center items-center', {
            'border-opacity-30': !hovered,
          })}
        >
          <div className="item-slot-info ">
            {locked ? (
              <i
                className={classNames('icon icon-lock', {
                  'opacity-30': !hovered,
                })}
              />
            ) : (
              <p>{item.count}</p>
            )}
          </div>
          {isSlotWithItem(item) && <ItemRarity item={item} />}
        </div>
        <div
          className={classNames('w-6/12 border-b border-r border-t border-white rounded-tr-md rounded-br-md', {
            'border-opacity-30': !hovered,
          })}
        ></div>
      </div>
      {isSlotWithItem(item) && shouldRenderItem && (
        <div
          className="item-slot-wrapper relative"
          onMouseEnter={(e) => {
            const domRect = (e.target as HTMLDivElement).getBoundingClientRect();
            timerRef.current = setTimeout(() => {
              dispatch(
                openTooltip({
                  item,
                  inventoryType,
                  domRect: {
                    x: domRect.x,
                    y: domRect.y,
                    width: domRect.width,
                    height: domRect.height,
                    top: domRect.top,
                    right: domRect.right,
                    bottom: domRect.bottom,
                    left: domRect.left,
                  },
                })
              );
            }, 200);
          }}
          onMouseLeave={() => {
            dispatch(closeTooltip());
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }}
        >
          <div
            className={
              inventoryType === 'player' && item.slot <= 5 ? 'item-hotslot-header-wrapper' : 'item-slot-header-wrapper'
            }
          ></div>
          <div>
            {inventoryType !== 'shop' && item?.durability !== undefined && (
              <WeightBar percent={item.durability} durability />
            )}
            {inventoryType === 'shop' && item?.price !== undefined && (
              <>
                {item?.currency !== 'money' && item.currency !== 'black_money' && item.price > 0 && item.currency ? (
                  <div className="item-slot-currency-wrapper">
                    <img
                      src={item.currency ? getItemUrl(item.currency) : 'none'}
                      alt="item-image"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        height: 'auto',
                        width: '2vh',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                    />
                    <p>{item.price.toLocaleString('en-us')}</p>
                  </div>
                ) : (
                  <>
                    {item.price > 0 && (
                      <div
                        className="item-slot-price-wrapper"
                        style={{ color: item.currency === 'money' || !item.currency ? '#2ECC71' : '#E74C3C' }}
                      >
                        <p>
                          {Locale.$ || '$'}
                          {item.price.toLocaleString('en-us')}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default React.memo(React.forwardRef(InventorySlot));
