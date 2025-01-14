import React, { useMemo } from 'react';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { getTotalWeight } from '../../helpers';
import { Box, Text } from 'lr-components';

const getProgressColor = (progress: number) => {
  /* if (progress < 0.3) return 'white';
  if (progress < 0.9) return '#FF8932';
  return '#ef233c'; */
  return 'white';
};

interface Props {
  className?: string;
}

function PlayerWeightProgress({ className }: Props) {
  const leftInventory = useAppSelector(selectLeftInventory);
  const weight = useMemo(
    () => (leftInventory.maxWeight !== undefined ? Math.floor(getTotalWeight(leftInventory.items) * 1000) / 1000 : 0),
    [leftInventory.maxWeight, leftInventory.items]
  );

  if (!leftInventory.maxWeight) return null;
  const progress = (weight / leftInventory.maxWeight) * 100 > 100 ? 100 : (weight / leftInventory.maxWeight) * 100;
  return (
    <Box
      rWidth={100}
      rHeight={100}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      className={className}
    >
      <svg width="100%" height="100%" viewBox="0 0 143 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M138 72C138 63.2014 136.28 54.489 132.938 46.3602C129.596 38.2314 124.698 30.8454 118.523 24.6238C112.348 18.4023 105.017 13.4671 96.9484 10.1001C88.8803 6.73301 80.2329 5 71.5 5C62.7671 5 54.1197 6.73301 46.0515 10.1001C37.9834 13.4671 30.6525 18.4023 24.4774 24.6238C18.3023 30.8454 13.4039 38.2314 10.062 46.3602C6.72007 54.489 5 63.2014 5 72"
          stroke="white"
          opacity={0.4}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M5 72C5 63.2014 6.72007 54.489 10.062 46.3602C13.4039 38.2314 18.3023 30.8454 24.4774 24.6238C30.6525 18.4023 37.9834 13.4671 46.0516 10.1001C54.1197 6.73301 62.7671 5 71.5 5C80.2329 5 88.8803 6.73301 96.9485 10.1001C105.017 13.4671 112.348 18.4023 118.523 24.6238C124.698 30.8454 129.596 38.2314 132.938 46.3602C136.28 54.489 138 63.2014 138 72"
          stroke={getProgressColor(progress / 100)}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 - progress}
        />
      </svg>
      <svg
        width="20%"
        height="20%"
        viewBox="0 0 30 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '60%',
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 0C13 0 8.7 1.2 7.5 6C5.5 6.5 1.4 8.9 1 14.5L0.5 26C0.333333 27.8333 1.2 31.6 6 32H24C28.8 31.6 29.6667 27.8333 29.5 26L29 14.5C28.6 8.9 24.5 6.5 22.5 6C21.3 1.2 17 0 15 0ZM15 3C13.8333 3 11.4 3.6 11 6H19C18.6 3.6 16.1667 3 15 3ZM15 16.5C13.8902 16.5 12.8133 16.1944 11.9059 15.6325C10.9994 15.0711 10.3098 14.2843 9.90637 13.3845C9.56746 12.6286 8.67992 12.2905 7.92399 12.6294C7.16805 12.9683 6.82999 13.8559 7.16889 14.6118C7.82804 16.0821 8.93288 17.3201 10.3265 18.1831C11.7192 19.0455 13.3451 19.5 15 19.5C16.6549 19.5 18.2808 19.0455 19.6735 18.1831C21.0671 17.3201 22.172 16.0821 22.8311 14.6118C23.17 13.8559 22.8319 12.9683 22.076 12.6294C21.3201 12.2905 20.4325 12.6286 20.0936 13.3845C19.6902 14.2843 19.0006 15.0711 18.0941 15.6325C17.1867 16.1944 16.1098 16.5 15 16.5Z"
          fill="white"
        />
      </svg>
      {/* <Text position="absolute" rBottom={0} fontFamily="Roboto">
        <span>{(weight / 1000).toFixed(2)}</span> /{' '}
        <span className=" text-lg text-nowrap">{leftInventory.maxWeight / 1000} Kg</span>
      </Text> */}
    </Box>
  );
}

export default PlayerWeightProgress;
