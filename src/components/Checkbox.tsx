import React, { useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export interface CheckboxFieldProps {
  name: string;
  label?: string | React.ReactNode;
  defaultValue?: boolean;
}

export { Checkbox };

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { name, label, children, defaultValue } = props;
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

  return (
    <Checkbox
      defaultChecked={defaultValue || false}
      isChecked={value}
      onChange={(e) => setValue(name, e.target.checked)}
    >
      {label || children || name}
    </Checkbox>
  );
};
