import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { FloatingArrow } from '@floating-ui/react';

import styles from './Content.module.scss';
import { useMergeRefs } from '@/utils/useMergeRefs';
import { useTooltipContext } from '../TooltipContext';
import classNames from 'classnames/bind';

interface TooltipContentProps extends ComponentPropsWithoutRef<'div'> {}

const cx = classNames.bind(styles);

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, style, ...rest }, forwardedRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs(context.refs.setFloating, forwardedRef);

    if (!context.open) return null;

    const { children, floatingProps } = context.getFloatingProps(rest) as any;

    return (
      <div ref={ref} style={context.floatingStyles}>
        <div
          className={cx('tooltip-content', className)}
          style={{ ...context.transitionStyles, ...style }}
          {...rest}
          {...floatingProps}
        >
          {children}
          {/* 
            Requires 'translateY(-1.2px)' to remove the gap between 
            the arrow and the content. See in docs:
            https://floating-ui.com/docs/floatingarrow#stroke 
          */}
          <FloatingArrow
            style={{ transform: 'translateY(-1.2px)' }}
            context={context.context}
            {...context.arrowProps}
          />
        </div>
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';
export { TooltipContent, type TooltipContentProps };
