import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ICategory, Inventory, InventoryType } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import { Button, Input } from '@nextui-org/react';
import { Box, Text } from 'lr-components';
import classNames from 'classnames';
import { selectItemAmount, setItemAmount } from '../../store/inventory';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory; playerInventory?: boolean }> = ({
  inventory,
  playerInventory,
}) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>('all');
  const [searching, setSearching] = useState('');
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };
  return (
    <>
      <Box className="inventory-grid-wrapper gap-4" pointerEvents={isBusy ? 'none' : 'all'}>
        {!playerInventory && (
          <div className="flex items-center justify-end gap-4 inventory-header">
            <Text fontFamily="Roboto" rFontSize={18} opacity={0.8} textTransform="uppercase">
              {inventory.label}
            </Text>

            <div className="flex  items-center gap-2">
              {inventory.maxWeight && (
                <Text textWrap="nowrap" fontFamily="Roboto" className="min-w-24 text-right">
                  <span className="text-xs">{(weight / 1000).toFixed(2)}/</span>{' '}
                  <span className="font-normal text-base text-nowrap">{inventory.maxWeight / 1000} Kg</span>
                </Text>
              )}
            </div>
          </div>
        )}
        {/* <div
          className={classNames('filter-wrapper', 'inventory-header', {
            'opacity-0': !playerInventory,
          })}
        >
          <Button
            className={classNames('rounded-md bg-black filter-btn', {
              'bg-orange-400': selectedCategory === 'all',
              'bg-opacity-30': selectedCategory !== 'all',
            })}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            Tất cả
          </Button>
          <Button
            className={classNames('rounded-md bg-black filter-btn', {
              'bg-orange-400': selectedCategory === 'weapon',
              'bg-opacity-30': selectedCategory !== 'weapon',
            })}
            size="sm"
            onClick={() => setSelectedCategory('weapon')}
          >
            Vũ khí
          </Button>
          <Button
            className={classNames('rounded-md bg-black filter-btn', {
              'bg-orange-400': selectedCategory === 'food',
              'bg-opacity-30': selectedCategory !== 'food',
            })}
            size="sm"
            onClick={() => setSelectedCategory('food')}
          >
            Thực phẩm
          </Button>
          <Button
            className={classNames('rounded-md bg-black filter-btn', {
              'bg-orange-400': selectedCategory === 'material',
              'bg-opacity-30': selectedCategory !== 'material',
            })}
            size="sm"
            onClick={() => setSelectedCategory('material')}
          >
            Nguyên liệu
          </Button>
          <Button
            className={classNames('rounded-md bg-black filter-btn', {
              'bg-orange-400': selectedCategory === 'clothing',
              'bg-opacity-30': selectedCategory !== 'clothing',
            })}
            size="sm"
            onClick={() => setSelectedCategory('clothing')}
          >
            Trang phục
          </Button>
        </div> */}
        {/* <div>
          <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
        </div> */}
        {inventory.type === InventoryType.PLAYER && (
          <>
            <div className="flex gap-4 items-center justify-between w-full">
              <Text fontFamily="Roboto" rFontSize={18} opacity={0.8} textWrap="nowrap">
                TÚI QUẦN
              </Text>
              <div className="flex gap-2 items-end">
                <p className="uppercase text-xs">Số lượng:</p>
                <input
                  type="number"
                  className="bg-success/30 px-2 py-1 rounded-lg border-1 border-white/30 focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-0"
                  value={String(itemAmount)}
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[22px]">
              <div className="flex gap-[22px] w-full">
                <InventorySlot
                  item={inventory.items[5]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[6]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[7]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[8]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[9]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[10]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              </div>
              <div className="flex gap-[22px] w-full">
                <InventorySlot
                  item={inventory.items[11]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[12]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[13]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[14]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[15]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[16]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              </div>
              <div className="flex gap-[22px] w-full">
                <InventorySlot
                  item={inventory.items[17]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[18]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[19]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[20]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[21]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[22]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              </div>
              <div className="flex gap-[22px] w-full">
                <InventorySlot
                  item={inventory.items[23]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[24]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[25]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[26]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[27]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
                <InventorySlot
                  item={inventory.items[28]}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              </div>
            </div>
            <Text fontFamily="Roboto" rFontSize={18} opacity={0.8}>
              BA LÔ
            </Text>
          </>
        )}
        <Box
          className="inventory-grid-container pr-2"
          ref={containerRef}
          rMaxHeight={playerInventory ? 220 : 730}
          rGridTemplateColumns={[6, 88]}
        >
          <>
            {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map(
              (item, index) =>
                (inventory.type !== InventoryType.PLAYER || item.slot > 29) && (
                  <InventorySlot
                    searching={searching}
                    //selectedCategory={selectedCategory}
                    key={`${inventory.type}-${inventory.id}-${item.slot}`}
                    item={item}
                    ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                    inventoryType={inventory.type}
                    inventoryGroups={inventory.groups}
                    inventoryId={inventory.id}
                    locked={false}
                  />
                )
            )}
          </>
        </Box>
      </Box>
    </>
  );
};

export default InventoryGrid;
