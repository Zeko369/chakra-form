import React from 'react';
import { Checkbox as ChakraCheckbox, CheckboxProps, FormLabelProps } from '@chakra-ui/react';
import { useBooleanForm } from './base';
import { InputLabelWrap } from '../Wrapper';

export interface CheckboxFieldProps extends Omit<CheckboxProps, 'defaultValue'> {
  name: string;
  label?: string | React.ReactNode;
  labelProps?: FormLabelProps;
  defaultValue?: boolean;
  swap?: boolean;
}

export const Checkbox: React.FC<CheckboxFieldProps> = (props) => {
  let { name, label, children, defaultValue, labelProps, swap, ...rest } = props;

  const baseName = props.name || 'Unknown name';
  name = baseName.split('_').join(' ');

  return (
    <InputLabelWrap
      baseName={baseName}
      name={name}
      label={label}
      outerProps={{ d: 'flex', alignItems: 'center' }}
      labelProps={{
        d: 'inline-block',
        mb: 0,
        mr: swap ? 0 : SWAP_MARGIN,
        marginLeft: swap ? SWAP_MARGIN : 0,
        ...labelProps
      }}
      swapProps={swap}
    >
      <ChakraCheckbox id={baseName} name={baseName} d="flex" {...rest} />
    </InputLabelWrap>
  );
};

const SWAP_MARGIN = 2;

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const formProps = useBooleanForm(props.name, {
    defaultValue: props.defaultValue,
    onChange: props.onChange
  });

  return <Checkbox {...props} {...formProps} />;
};
