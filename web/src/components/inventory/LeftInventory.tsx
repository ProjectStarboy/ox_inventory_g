import InventoryGrid from './InventoryGrid';
import { useAppSelector } from '../../store';
import { selectBackpackInventory, selectLeftInventory } from '../../store/inventory';
import { Text } from 'lr-components';

const LeftInventory: React.FC = () => {
  const leftInventory = useAppSelector(selectLeftInventory);
  const backpackInventory = useAppSelector(selectBackpackInventory);
  return (
    <div className="flex flex-col min-h-[70vh] ">
      <InventoryGrid inventory={leftInventory} type="POCKET" />
      {backpackInventory ? (
        <InventoryGrid inventory={backpackInventory} maxHeight={450} type="BACKPACK" />
      ) : (
        <div className="h-full flex justify-center items-center opacity-80 bg-danger/50 rounded-md">
          <i className="icon icon-backpack text-danger text-[48px]"></i>
          <Text fontFamily="Roboto" rFontSize={18} rLineHeight={18} textWrap="nowrap">
            KHÔNG CÓ <br />
            BA LÔ
          </Text>
        </div>
      )}
    </div>
  );
};

export default LeftInventory;
