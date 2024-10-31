import { useMemo } from 'react';

export type Props = Record<PropertyKey, any> | null | undefined;

export function mergeProps(props: Props, extraProps: Props) {
  if (!props || !extraProps) {
    return props || extraProps;
  }

  // Create an object to hold the merged props where extraProps override props
  const overrideProps: Props = { ...extraProps };

  for (const propName in extraProps) {
    const propValue = props[propName];
    const extraPropValue = extraProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      // Merge event handlers if both parent and child have one
      if (extraPropValue && propValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          extraPropValue?.(...args);
          propValue?.(...args);
        };
      } else if (propValue) {
        overrideProps[propName] = propValue;
      }
    } else if (propName === 'style') {
      // Merge styles
      overrideProps.style = { ...propValue, ...extraPropValue };
    } else if (propName === 'className') {
      // Merge class names
      overrideProps.className = [propValue, extraPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...props, ...overrideProps };
}

export function mergePropsList(...propsList: Props[]) {
  return propsList.reduce(
    (mergedProps, currentProps) => mergeProps(mergedProps, currentProps),
    {}
  );
}

export function useMergeProps(...propsList: Props[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergePropsList(...propsList), propsList);
}
