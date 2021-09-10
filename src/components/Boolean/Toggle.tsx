import React from 'react';
import { Switch as Toggle, SwitchProps } from '@chakra-ui/react';
import { useBooleanForm } from './base';

export interface ToggleFieldProps extends Omit<SwitchProps, 'defaultValue'> {
  name: string;
  label?: string | React.ReactNode;
  defaultValue?: boolean;
}

export { Toggle };

export const ToggleField: React.FC<ToggleFieldProps> = (props) => {
  const { name, label, children, defaultValue, onChange, ...rest } = props;
  const formProps = useBooleanForm(name, { defaultValue, onChange });

  return (
    <Toggle d="flex" {...formProps} {...rest}>
      {label || children || name}
    </Toggle>
  );
};
