import React, { forwardRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { StyledReactSelect } from './chakra';

export interface ReactSelectFieldProps {
  name: string;
  label?: string;
  noLabel?: boolean;
  error?: string;
  options: { label: string; value: string }[];
  // FIXME: deprecate
  initialSelected?: string[];

  isRequired?: boolean;

  // TODO: Fix
  reactSelectProps?: any;
  // TODO: Somehow make this smarter (generic)
  isSingle?: boolean;
}

export const ReactSelectField = forwardRef<any, ReactSelectFieldProps>((props, ref) => {
  let { error, name } = props;

  const { register, setValue, watch, formState } = useFormContext();
  const value = watch(name) || [];

  useEffect(() => {
    register(name);
  }, [name, props.initialSelected, setValue, register]);

  if (!error) {
    const { errors } = formState;
    error = Array.isArray(errors[name])
      ? errors[name].join(', ')
      : errors[name]?.message || errors[name];
  }

  return (
    <StyledReactSelect
      ref={ref}
      {...{ ...props, error, value, setValue: (v) => setValue(name, v) }}
    />
  );
});
