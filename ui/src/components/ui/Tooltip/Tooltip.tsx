import { FC, PropsWithChildren } from 'react';

import {
  FloatingPortal,
  FloatingPortalProps,
  Placement
} from '@floating-ui/react';
import { TooltipContent } from './Content/Content';
import { TooltipContext } from './TooltipContext';
import { TooltipTrigger } from './Trigger/Trigger';
import { useTooltip } from './useTooltip';

interface TooltipExtensions {
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
  Portal: typeof TooltipPortal;
}

interface TooltipProps {
  initialOpen?: boolean;
  placement?: Exclude<
    Placement,
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
  >;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip: FC<TooltipProps & PropsWithChildren> & TooltipExtensions = ({
  children,
  ...rest
}) => {
  const tooltip = useTooltip(rest);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipPortal: FC<Omit<FloatingPortalProps, 'preserveTabOrder'>> = (
  props
) => <FloatingPortal {...props} />

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
Tooltip.Portal = TooltipPortal;

export { Tooltip, type TooltipProps, type TooltipExtensions };
