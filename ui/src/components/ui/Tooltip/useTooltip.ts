import {
  FloatingContext,
  Side,
  arrow,
  autoUpdate,
  flip,
  limitShift,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { useMemo, useRef, useState } from 'react';

import { TooltipProps } from './Tooltip';
import styles from './Tooltip.module.scss';

interface ArrowStyles {
  fill: string;
  width: number;
  height: number;
  stroke: string;
  tipRadius: number;
  strokeWidth: number;
}

const arrowStyles: ArrowStyles = {
  fill: styles['tooltip-content-arrow-fill'],
  width: Number(styles['tooltip-content-arrow-width']),
  height: Number(styles['tooltip-content-arrow-height']),
  stroke: styles['tooltip-content-arrow-stroke'],
  tipRadius: Number(styles['tooltip-content-arrow-tip-radius']),
  strokeWidth: Number(styles['tooltip-content-arrow-stroke-width'])
};

const getTransformOrigin = (
  context: FloatingContext,
  side: Side,
  { width, height }: ArrowStyles
): string => {
  const arrowX = context.middlewareData.arrow?.x ?? 0;
  const arrowY = context.middlewareData.arrow?.y ?? 0;
  const transformX = arrowX + width / 2;
  const transformY = arrowY + height;

  switch (side) {
    case 'top':
      return `${transformX}px calc(100% + ${height}px)`;
    case 'bottom':
      return `${transformX}px ${-height}px`;
    case 'left':
      return `calc(100% + ${height}px) ${transformY}px`;
    case 'right':
      return `${-height}px ${transformY}px`;
  }
};

function useTooltip({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: TooltipProps) {
  const arrowRef = useRef<SVGSVGElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  // Floating hook setup
  const { context, ...data } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(arrowStyles.height + 2),
      shift({
        limiter: limitShift({
          offset: {
            mainAxis: arrowStyles.width * 2,
            crossAxis: arrowStyles.height * 2
          }
        }),
        padding: 20
      }),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 20
      }),
      // arrow padding depends on floating element border-radius for good looking
      arrow({ element: arrowRef, padding: 4 })
    ]
  });

  // Transition setup
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'scale(0)'
    },
    common: ({ side }) => ({
      transformOrigin: getTransformOrigin(context, side, arrowStyles)
    })
  });

  // Interactions setup
  const hover = useHover(context, {
    move: false,
    handleClose: safePolygon({ blockPointerEvents: true }),
    enabled: controlledOpen == null
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  // Memorize context
  return useMemo(
    () => ({
      ...data,
      ...interactions,
      context,
      open: isMounted,
      setOpen,
      arrowProps: { ref: arrowRef, ...arrowStyles },
      transitionStyles
    }),
    [
      data,
      interactions,
      context,
      isMounted,
      setOpen,
      arrowRef,
      transitionStyles
    ]
  );
}

export { useTooltip };
