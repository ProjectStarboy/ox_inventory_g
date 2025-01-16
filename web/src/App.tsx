import InventoryComponent from './components/inventory';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory, Slot } from './typings';
import { useAppDispatch } from './store';
import { debugData } from './utils/debugData';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';

debugData([
  {
    action: 'setupInventory',
    data: {
      leftInventory: {
        weight: 6451,
        type: 'player',
        items: [
          {
            weight: 0,
            name: 'money',
            stack: true,
            metadata: [],
            count: 123119623,
            slot: 1,
            close: true,
            label: 'Money',
          },
          { weight: 190, name: 'phone', stack: false, metadata: [], count: 1, slot: 2, close: true, label: 'Phone' },
          {
            weight: 4500,
            name: 'WEAPON_ASSAULTRIFLE',
            stack: false,
            metadata: { ammo: 0, registered: 'Test Test', durability: 100, components: [], serial: '251994EPN249752' },
            count: 1,
            slot: 3,
            close: false,
            label: 'Assault Rifle',
          },
          { weight: 1320, name: 'burger', stack: true, metadata: [], count: 6, slot: 4, close: true, label: 'Burger' },
          null,
          {
            weight: 221,
            name: 'paperbag',
            stack: false,
            metadata: { container: 'KVY1736849741', weight: 220, size: [5, 1000] },
            count: 1,
            slot: 6,
            close: false,
            label: 'Paper Bag',
          },
          { weight: 220, name: 'burger', stack: true, metadata: [], count: 1, slot: 7, close: true, label: 'Burger' },
        ],
        label: 'Test Test',
        id: 2,
        slots: 17,
        groups: [],
        clothing: [
          null,
          null,
          null,
          null,
          {
            weight: 6451,
            name: 'clothing',
            stack: true,
            metadata: {
              weight: 6451,
              textureId: 0,
              componentType: 'component',
              container: 'TJG1736850965',
              drawableId: 44,
              componentId: 5,
              gender: 'male',
              imageurl: 'https://sp.lorraxs.dev/storage/v1/object/public/test_bucket/male_component_5_44_0.png',
              size: [5, 5000],
            },
            count: 1,
            slot: 5,
            close: true,
            label: 'Clothing',
          },
        ],
        maxWeight: 85000,
      },
      rightInventory: {
        id: 'shop',
        type: 'crafting',
        slots: 10,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'lockpick',
            weight: 500,
            price: 300,
            ingredients: {
              iron: 5,
              copper: 12,
              powersaw: 0.1,
            },
            metadata: {
              description: 'Simple lockpick that breaks easily and can pick basic door locks',
            },
          },
        ],
      },
      clothingItems: {
        '3': {
          weight: 0,
          count: 1,
          close: true,
          slot: 3,
          metadata: {
            componentType: 'component',
            gender: 'female',
            componentId: 3,
            textureId: 0,
            drawableId: 24,
            imageurl: 'https://sp.lorraxs.dev/storage/v1/object/public/test_bucket/female_component_3_24_0.png',
          },
          stack: true,
          label: 'Clothing',
          name: 'clothing',
        },
        '4': {
          weight: 0,
          count: 1,
          close: true,
          slot: 4,
          metadata: {
            componentType: 'component',
            gender: 'female',
            componentId: 4,
            textureId: 0,
            drawableId: 7,
            imageurl: 'https://sp.lorraxs.dev/storage/v1/object/public/test_bucket/female_component_4_7_0.png',
          },
          stack: true,
          label: 'Clothing',
          name: 'clothing',
        },
        '11': {
          weight: 0,
          count: 1,
          close: true,
          slot: 11,
          metadata: {
            componentType: 'component',
            gender: 'female',
            componentId: 11,
            textureId: 0,
            drawableId: 558,
            imageurl: 'https://sp.lorraxs.dev/storage/v1/object/public/test_bucket/female_component_11_558_0.png',
          },
          stack: true,
          label: 'Clothing',
          name: 'clothing',
        },
      },
      /* backpackInventory: {
        items: [
          { weight: 440, name: 'burger', stack: true, metadata: [], count: 2, slot: 1, close: true, label: 'Burger' },
          {
            weight: 0,
            name: 'clothing',
            stack: true,
            metadata: {
              drawableId: 44,
              textureId: 0,
              componentId: 5,
              gender: 'male',
              imageurl: 'https://sp.lorraxs.dev/storage/v1/object/public/test_bucket/male_component_5_44_0.png',
              componentType: 'component',
            },
            count: 1,
            slot: 2,
            close: true,
            label: 'Clothing',
          },
        ],
        weight: 440,
        slots: 105,
        maxWeight: 5000,
      }, */
    },
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();

  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
    clothingItems: Slot[];
  }>('init', ({ locale, items, leftInventory, imagepath, clothingItems }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory, clothingItems: clothingItems }));
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  return (
    <div className="app-wrapper">
      <InventoryComponent />
      <DragPreview />
      <KeyPress />
    </div>
  );
};

addEventListener('dragstart', function (event) {
  event.preventDefault();
});

export default App;
