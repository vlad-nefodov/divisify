import { ComponentPropsWithoutRef, forwardRef, useEffect, useRef } from 'react';

interface ScrollableContainerProps extends ComponentPropsWithoutRef<'div'> {
  id?: string;
  outer: {
    width: number;
    height: number;
  };
  inner: {
    width: number;
    height: number;
  };
}

const ScrollableContainer = forwardRef<
  HTMLDivElement,
  ScrollableContainerProps
>(({ id, outer, inner, children }, innerDivRef) => {
  const outerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outerDivRef.current) {
      const element = outerDivRef.current;
      const scrollX = (element.scrollWidth - element.clientWidth) / 2;
      const scrollY = (element.scrollHeight - element.clientHeight) / 2;

      element.scrollTo(scrollX, scrollY);
    }
  }, []);

  return (
    <div
      ref={outerDivRef}
      style={{
        ...outer,
        overflow: 'auto',
        borderRadius: '4px',
        position: 'relative',
        boxShadow: 'rgba(0, 0, 0, 0.10) 0 1px 3px 0',
        border: '1px solid hsla(203, 50%, 30%, 0.15)'
      }}
    >
      <div
        ref={innerDivRef}
        id={id}
        style={{
          ...inner,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
});

ScrollableContainer.displayName = 'ScrollableContainer';
export { ScrollableContainer, type ScrollableContainerProps };
