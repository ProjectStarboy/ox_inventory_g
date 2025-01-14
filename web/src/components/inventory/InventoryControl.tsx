import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';
import PlayerWeightProgress from './PlayerWeightProgress';
import Line from '../Line';
import { Button } from '@nextui-org/react';

interface Props {
  infoVisible: boolean;
  setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const showClothing = false;

const InventoryControl: React.FC<Props> = ({ infoVisible, setInfoVisible }) => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
      <div className="inventory-control">
        <div className="inventory-control-wrapper py-5">
          <div className="flex justify-center flex-col items-center gap-6">
            <PlayerWeightProgress />
            <div className="w-2/3">
              <Line />
            </div>
          </div>
          {!showClothing && (
            <div className="flex flex-col gap-2 h-2/3">
              <input
                className="inventory-control-input rounded-lg mt-16 w-40 "
                type="number"
                defaultValue={itemAmount}
                onChange={inputHandler}
                min={0}
              />
              <Button
                className="w-40 h-12 mt-8 rounded-lg text-black  text-1xl uppercase outline-none border-none use-slot-drop  cursor-pointer  bg-zinc-300 shadow-inner flex items-center justify-center ui-droppable"
                ref={use}
              >
                {Locale.ui_use || 'SỬ DỤNG'}
              </Button>
              <Button
                className="bg-orange-400 w-40 h-12 rounded-lg text-black  text-1xl uppercase outline-none border-none"
                ref={give}
              >
                {Locale.ui_give || 'ĐƯA'}
              </Button>
            </div>
          )}
          <div className="flex justify-center flex-col items-center gap-6">
            <div className="w-2/3">
              <Line />
            </div>
            {!showClothing ? (
              <Button
                className="bg-white w-52 h-16 rounded-lg text-black  text-1xl uppercase outline-none border-none"
                onClick={() => {
                  fetchNui('openClothing');
                }}
              >
                {Locale.ui_cloth || 'QUẦN ÁO'}
              </Button>
            ) : (
              <Button
                className="bg-white w-52 h-16 rounded-lg text-black  text-1xl uppercase outline-none border-none"
                onClick={() => {
                  fetchNui('closeClothing');
                }}
              >
                {Locale.ui_cloth || 'KHO ĐỒ'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* <button className="useful-controls-button" onClick={() => setInfoVisible(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 524 524">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </button> */}
    </>
  );
};

export default InventoryControl;
