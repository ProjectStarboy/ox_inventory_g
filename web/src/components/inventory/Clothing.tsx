import { Box } from 'lr-components';
import { useAppSelector } from '../../store';
import { selectClothing } from '../../store/inventory';
import { ClothingSlots } from '../../typings';
import ClothingSlot from './ClothingSlot';

const Clothing: React.FC = () => {
  const clothing = useAppSelector(selectClothing);
  return (
    <div className="w-1/2 flex  relative">
      {/* <div className="clothing-slot-wrapper">
        {ClothingSlots.map((slot) => (
          <ClothingSlot key={slot} slot={slot} item={clothing.items[slot]} inventoryType="clothing" />
        ))}
      </div> */}
      <Box className="flex flex-col gap-[22px]" /* rTop={130} rLeft={230} */ rMargin={[100, 130, 50, 0]}>
        <div className="flex gap-[22px]">
          <ClothingSlot slot={1} inventoryType="clothing" />
        </div>
        <div className="flex gap-[22px]">
          <ClothingSlot slot={13} inventoryType="clothing" />
          <ClothingSlot slot={12} inventoryType="clothing" />
          <ClothingSlot slot={14} inventoryType="clothing" />
        </div>
        <div className="flex gap-[22px]">
          <ClothingSlot slot={11} inventoryType="clothing" />
          <ClothingSlot slot={8} inventoryType="clothing" />
          <ClothingSlot slot={9} inventoryType="clothing" />
        </div>
        <div className="flex gap-[22px]">
          <ClothingSlot slot={7} inventoryType="clothing" />
          {/* <ClothingSlot slot={1} item={clothing.items[1]} inventoryType="clothing" />
          <ClothingSlot slot={1} item={clothing.items[1]} inventoryType="clothing" /> */}
          <ClothingSlot slot={3} inventoryType="clothing" />
        </div>
        <div className="flex gap-[22px]">
          <ClothingSlot slot={19} inventoryType="clothing" />
          <ClothingSlot slot={18} inventoryType="clothing" />
          <ClothingSlot slot={4} inventoryType="clothing" />
        </div>
        <div className="flex gap-[22px]">
          <ClothingSlot slot={5} inventoryType="clothing" />
          <ClothingSlot slot={6} inventoryType="clothing" />
          {/* <ClothingSlot slot={1} item={clothing.items[1]} inventoryType="clothing" /> */}
        </div>
      </Box>

      <Box rHeight={680} rMargin={[0, 0, 0, -240]}>
        <svg height="100%" viewBox="0 0 313 770" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_171_17)">
            <path
              d="M172 346.5C173.667 339.833 177.1 324.6 177.5 317C178.5 310.5 181.2 295.8 184 289L190.5 323.5C192.333 329.833 195.9 344.3 195.5 351.5C195.1 358.7 198.667 366.167 200.5 369M200 178C208.667 180.667 226.7 193.3 229.5 222.5C230.667 234 232.3 260.6 229.5 275C229.667 278.833 230.2 287.3 231 290.5C232.167 297.167 234.4 314.5 234 330.5C240.667 342.833 254.1 376.9 254.5 414.5C255.333 426.5 259.3 452.8 268.5 462C271.833 465.833 279 473.7 281 474.5C284.333 478.333 291.4 486.9 293 490.5C295.667 493.667 302.9 500.8 310.5 504C312.167 504.833 314.5 507.3 310.5 510.5C308.667 511 303.7 511.2 298.5 508C296.333 505.833 291.5 502.8 289.5 508C289 509.833 288.3 514.5 289.5 518.5L297.5 543C298.5 545.833 299.9 551.6 297.5 552C296.5 552.667 293.8 552.8 291 548L282.5 529.5C281 526.833 278.3 523.4 279.5 531L284 552C284.167 553.833 283.8 557.9 281 559.5C280 559.667 277.6 558.6 276 553L269.5 532.5C268.333 530 266 526.5 266 532.5V555C264.667 559 261.1 564.6 257.5 555L254.5 534C253.333 529.667 250.9 524.4 250.5 538V552C248.833 555 244.9 559.2 242.5 552C241.833 545.667 240.5 530.1 240.5 518.5V473M0 178.5C2.5 175.5 18.3 164.8 61.5 146C65.8333 144.666 73.9 135.6 71.5 110C71 108.166 69.6 103 68 96.9998C65.8333 97.9998 61.5 98.9998 61.5 94.9998C61.1667 91.3331 59.8 83.1998 57 79.9998C56.3333 76.8331 55.4 69.4998 57 65.4998C57.8333 64.8331 59.9 63.6998 61.5 64.4998C59.3333 53.8332 57.6 29.1 68 15.5C71.3179 10.3573 82.3966 0.0957367 100.25 0.000665238M100.25 0.000665238C100.333 0.000222261 100.417 0 100.5 0M100.25 0.000665238C118.103 0.0957367 129.182 10.3573 132.5 15.5C142.9 29.1 141.167 53.8332 139 64.4998C140.6 63.6998 142.667 64.8331 143.5 65.4998C145.1 69.4998 144.167 76.8331 143.5 79.9998C140.7 83.1998 139.333 91.3331 139 94.9998C139 98.9998 134.667 97.9998 132.5 96.9998C130.9 103 129.5 108.166 129 110C126.6 135.6 134.667 144.666 139 146C182.2 164.8 198 175.5 200.5 178.5M100.25 0.000665238C100.167 0.000222261 100.083 0 100 0M200.5 647.5L213.5 695.5C214.667 701.333 216.9 714.7 216.5 721.5V768M138 660C139.833 669.333 146.4 693.4 158 715C159 716.167 161 720.6 161 729C161 741.833 161.2 768 162 770"
              stroke="white"
              strokeWidth="3"
              opacity={0.3}
            />
          </g>
        </svg>
      </Box>
    </div>
  );
};

export default Clothing;
