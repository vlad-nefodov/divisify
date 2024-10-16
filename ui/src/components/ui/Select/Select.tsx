import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import {
  SelectExtensions,
  SelectProps,
  SelectState,
  SelectValue
} from './Select.types';

import Content from './Content/Content';
import { SelectContext } from './SelectContext';
import Trigger from './Trigger/Trigger';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { useOnClickOutside } from 'usehooks-ts';

const cx = classNames.bind(styles);

const Select: FC<SelectProps> & SelectExtensions = (props) => {
  const {
    value,
    isOpen,
    onValueChange,
    onOpenChange,
    className,
    children,
    ...rest
  } = props;

  const isOpenControlled = isOpen !== undefined;
  const isValueControlled = value !== undefined;

  const ref = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<SelectState>({
    valueNode: null,
    value,
    isOpen: Boolean(isOpen)
  });

  useEffect(() => {
    if (isOpenControlled && isOpen !== state.isOpen) {
      setState((prev) => ({ ...prev, isOpen }));
    }
    if (isValueControlled && value !== state.value) {
      setState((prev) => ({ ...prev, value }));
    }
  }, [
    isOpenControlled,
    isValueControlled,
    state.isOpen,
    state.value,
    isOpen,
    value
  ]);

  const onControlledValueChangeHandler = (
    value: SelectValue,
    valueNode: ReactNode
  ) => {
    if (isValueControlled && value === state.value) {
      setState((prev) => ({ ...prev, valueNode }));
    }
  };

  const onOpenChangeHandler = (isOpen: boolean) => {
    onOpenChange?.(isOpen);

    if (!isOpenControlled) {
      setState((prev) => ({ ...prev, isOpen }));
    }
  };

  const onValueChangeHandler = (value: SelectValue, valueNode: ReactNode) => {
    onOpenChangeHandler(false);

    if (value !== state.value) {
      onValueChange?.(value);

      if (!isValueControlled) {
        setState((prev) => ({ ...prev, valueNode, value }));
      }
    }
  };

  useOnClickOutside(ref, () => {
    if (state.isOpen) {
      onOpenChangeHandler(false);
    }
  });

  return (
    <button className={cx('select', className)} ref={ref} {...rest}>
      <SelectContext.Provider
        value={{
          ...state,
          onControlledValueChange: onControlledValueChangeHandler,
          onOpenChange: onOpenChangeHandler,
          onValueChange: onValueChangeHandler
        }}
      >
        {children}
      </SelectContext.Provider>
    </button>
  );
};

Select.Trigger = Trigger;
Select.Content = Content;
export default Select;
