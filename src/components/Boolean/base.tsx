import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const useBooleanForm = (
  name: string,
  rest: { defaultValue?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown }
) => {
  const { register, setValue, watch } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {
    if (value === undefined) {
      setValue(name, false);
    }
  }, [value, name, setValue]);

  return {
    defaultChecked: rest.defaultValue || false,
    isChecked: value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, e.target.checked);
      rest.onChange?.(e);
    }
  };
};
