import {
  ComponentProps,
  ComponentPropsWithoutRef,
  JSX,
  JSXElementConstructor,
  forwardRef
} from 'react';

import { Button } from '@/components/ui/Button';
import { Slot } from '@/components/ui/Slot';
import { useMergeRefs } from '@/utils/useMergeRefs';
import { useTooltipContext } from '../TooltipContext';

interface InitComp<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> {
  Element: typeof Slot | T;
  props: ComponentProps<T>;
}

interface TooltipTriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ children, asChild = false, ...rest }, forwardedRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs(context.refs.setReference, forwardedRef);

    const Comp: InitComp<typeof Button> = asChild
      ? {
          Element: Slot,
          props: {}
        }
      : {
          Element: Button,
          props: { isIcon: true, size: 'sm', variant: 'secondary-outline' }
        };

    return (
      <Comp.Element
        ref={ref}
        data-state={context.open ? 'open' : 'closed'}
        {...Comp.props}
        {...context.getReferenceProps(rest)}
      >
        {children}
      </Comp.Element>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';
export { TooltipTrigger };
