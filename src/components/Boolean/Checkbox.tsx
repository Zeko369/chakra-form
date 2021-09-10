import React from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { useBooleanForm } from './base';

export interface CheckboxFieldProps extends Omit<CheckboxProps, 'defaultValue'> {
  name: string;
  label?: string | React.ReactNode;
  defaultValue?: boolean;
}

export { Checkbox };

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { name, label, children, defaultValue, onChange, ...rest } = props;
  const formProps = useBooleanForm(name, { defaultValue, onChange });

  return (
    <Checkbox d="flex" {...formProps} {...rest}>
      {label || children || name}
    </Checkbox>
  );
};
