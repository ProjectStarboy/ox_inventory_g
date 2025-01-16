import { flip, FloatingPortal, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../store';
import SlotTooltip from '../inventory/SlotTooltip';

const Tooltip: React.FC = () => {
  const hoverData = useAppSelector((state) => state.tooltip);

  const { refs, context, floatingStyles } = useFloating({
    middleware: [flip(), shift(), offset({ mainAxis: 10, crossAxis: 10 })],
    open: hoverData.open,
    placement: 'top',
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
  });

  const handleMouseMove = ({ clientX, clientY }: MouseEvent | React.MouseEvent<unknown, MouseEvent>) => {
    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          left: clientX,
          top: clientY,
          right: clientX,
          bottom: clientY,
        };
      },
    });
  };

  /* useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); */

  const position = useMemo(() => {
    if (!hoverData.domRect) {
      return null;
    }
    const centerPoint = window.innerWidth / 2;
    let side: 'left' | 'right' = 'left';
    const elementCenter = hoverData.domRect.x + hoverData.domRect.width / 2;
    if (elementCenter > centerPoint) {
      side = 'right';
    }
    return {
      left: hoverData.domRect.x + hoverData.domRect.width + 5,
      top: hoverData.domRect.y,
    };
  }, [hoverData.domRect]);
  if (!position) return null;

  return (
    <>
      {isMounted && hoverData.item && hoverData.inventoryType && (
        <FloatingPortal>
          <SlotTooltip
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              ...styles,

              minHeight: 200,
              ...position,
            }}
            item={hoverData.item!}
            inventoryType={hoverData.inventoryType!}
          />
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
