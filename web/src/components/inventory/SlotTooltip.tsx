import { Inventory, RarityColors, RarityLabels, SlotWithItem } from '../../typings';
import React, { Fragment, useMemo } from 'react';
import { Items } from '../../store/items';
import { Locale } from '../../store/locale';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../store';
import ClockIcon from '../utils/icons/ClockIcon';
import { getItemUrl } from '../../helpers';
import Divider from '../utils/Divider';
import ItemRarity from './ItemRarity';
import { Text } from 'lr-components';

const SlotTooltip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  { item: SlotWithItem; inventoryType: Inventory['type']; style: React.CSSProperties }
> = ({ item, inventoryType, style }, ref) => {
  const additionalMetadata = useAppSelector((state) => state.inventory.additionalMetadata);
  const itemData = useMemo(() => Items[item.name], [item]);
  const ingredients = useMemo(() => {
    if (!item.ingredients) return null;
    return Object.entries(item.ingredients).sort((a, b) => a[1] - b[1]);
  }, [item]);
  const description = item.metadata?.description || itemData?.description;
  const ammoName = itemData?.ammoName && Items[itemData?.ammoName]?.label;

  return (
    <div>
      {!itemData ? (
        <div className="bg-secondary rounded-md p-2 min-w-[200px]  border-1 border-white/50 " ref={ref} style={style}>
          <Text fontFamily="Roboto" rFontSize={16} color="white" textTransform="uppercase">
            {item.name}
          </Text>
          <Divider />
        </div>
      ) : (
        <div
          style={{ ...style }}
          className="bg-secondary rounded-md p-2 min-w-[200px]  border-1 border-white/50 text-white"
          ref={ref}
        >
          <div className="tooltip-header-wrapper text-white">
            {itemData.rarity ? (
              <Text fontFamily="Roboto" rFontSize={16} color={RarityColors[itemData.rarity]} textTransform="uppercase">
                {item.metadata?.label || itemData.label || item.name}
              </Text>
            ) : (
              <Text fontFamily="Roboto" rFontSize={16} color="white">
                {item.metadata?.label || itemData.label || item.name}
              </Text>
            )}
            {inventoryType === 'crafting' ? (
              <div className="tooltip-crafting-duration">
                <ClockIcon />
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {(item.duration !== undefined ? item.duration : 3000) / 1000}s
                </Text>
              </div>
            ) : (
              <Text fontFamily="Roboto" rFontSize={12} color="white">
                {item.metadata?.type}
              </Text>
            )}
          </div>

          <Divider />
          {description && (
            <div className="tooltip-description">
              <ReactMarkdown className="tooltip-markdown">{description}</ReactMarkdown>
            </div>
          )}
          {inventoryType !== 'crafting' ? (
            <>
              {item.durability !== undefined && (
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {Locale.ui_durability}: {Math.trunc(item.durability)}
                </Text>
              )}
              {item.metadata?.ammo !== undefined && (
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {Locale.ui_ammo}: {item.metadata.ammo}
                </Text>
              )}
              {ammoName && (
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {Locale.ammo_type}: {ammoName}
                </Text>
              )}
              {item.metadata?.serial && (
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {Locale.ui_serial}: {item.metadata.serial}
                </Text>
              )}
              {item.metadata?.components && item.metadata?.components[0] && (
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {Locale.ui_components}:{' '}
                  {(item.metadata?.components).map((component: string, index: number, array: []) =>
                    index + 1 === array.length ? Items[component]?.label : Items[component]?.label + ', '
                  )}
                </Text>
              )}
              {item.metadata?.weapontint && (
                <Text fontFamily="Roboto" rFontSize={12} color="white">
                  {Locale.ui_tint}: {item.metadata.weapontint}
                </Text>
              )}
              {additionalMetadata.map((data: { metadata: string; value: string }, index: number) => (
                <Fragment key={`metadata-${index}`}>
                  {item.metadata && item.metadata[data.metadata] && (
                    <Text fontFamily="Roboto" rFontSize={12} color="white">
                      {data.value}: {item.metadata[data.metadata]}
                    </Text>
                  )}
                </Fragment>
              ))}
            </>
          ) : (
            <div className="tooltip-ingredients">
              {ingredients &&
                ingredients.map((ingredient) => {
                  const [item, count] = [ingredient[0], ingredient[1]];
                  return (
                    <div className="tooltip-ingredient" key={`ingredient-${item}`}>
                      <img src={item ? getItemUrl(item) : 'none'} alt="item-image" />
                      <Text fontFamily="Roboto" rFontSize={12} color="white">
                        {count >= 1
                          ? `${count}x ${Items[item]?.label || item}`
                          : count === 0
                          ? `${Items[item]?.label || item}`
                          : count < 1 && `${count * 100}% ${Items[item]?.label || item}`}
                      </Text>
                    </div>
                  );
                })}
            </div>
          )}
          <Divider />
          {itemData.rarity && (
            <div className="flex items-center justify-between">
              <Text
                fontFamily="Roboto"
                rFontSize={12}
                color={RarityColors[itemData.rarity]}
                textTransform="uppercase"
                className="mt-2"
              >
                {RarityLabels[itemData.rarity]}
              </Text>
              <div className="w-5 relative h-2">
                <ItemRarity item={item} />
              </div>
            </div>
          )}
          <Text fontFamily="Roboto" rFontSize={12} color="white">
            Trọng lượng: {item.weight}g
          </Text>
          {item.metadata?.fishSize && <p>Kích cỡ: {item.metadata.fishSize} inch</p>}
          {/* {item.metadata?.fishQuality !== undefined && (
            <p>Chất lượng: {FishQualityLabels[item.metadata.fishQuality as IFishQuality]}</p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(SlotTooltip);
