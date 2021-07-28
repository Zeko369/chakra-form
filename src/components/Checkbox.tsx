import React, { useEffect } from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export interface CheckboxFieldProps extends Omit<CheckboxProps, 'defaultValue'> {
  name: string;
  label?: string | React.ReactNode;
  defaultValue?: boolean;
}

export { Checkbox };

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { name, label, children, defaultValue, ...rest } = props;
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

  // hack fix this
  return (
    <Checkbox
      defaultChecked={defaultValue || false}
      isChecked={value}
      {...rest}
      onChange={(e) => {
        setValue(name, e.target.checked);
        rest.onChange?.(e);
      }}
    >
      {label || children || name}
    </Checkbox>
  );
};
