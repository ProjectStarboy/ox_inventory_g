import React from 'react';
import { RarityColors, SlotWithItem } from '../../typings';
import { Items } from '../../store/items';

interface Props {
  item: SlotWithItem;
}

function ItemRarity({ item }: Props) {
  const itemData = Items[item.name];
  if (!itemData) return null;
  if (!itemData.rarity) return null;
  if (itemData.rarity === 'common') return null;
  return (
    <div
      className="item-rarity rounded-sm"
      style={{
        backgroundColor: RarityColors[itemData.rarity],
        boxShadow: `0 0 10px 0.5px ${RarityColors[itemData.rarity]}`,
      }}
    ></div>
  );
}

export default ItemRarity;
