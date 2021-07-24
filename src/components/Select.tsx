import React, { forwardRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps
} from '@chakra-ui/react';

import { capitalize } from '../helpers/string';

export interface SelectProps extends Omit<ChakraSelectProps, 'type'> {
  label?: string;
  noLabel?: boolean;
  error?: string;
  name?: string;
  placeholder?: string;
  outerProps?: FormControlProps;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    name: baseName = 'Select field',
    isInvalid,
    isRequired,
    label,
    placeholder,
    outerProps,
    noLabel,
    ...rest
  } = props;

  const name = baseName.split('_').join(' ');

  return (
    <FormControl isInvalid={isInvalid || !!props.error} isRequired={isRequired} {...outerProps}>
      {!noLabel && <FormLabel htmlFor={baseName}>{label || capitalize(name)}</FormLabel>}
      <ChakraSelect id={baseName} name={baseName} ref={ref} placeholder={placeholder} {...rest} />
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
  );
});

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>((props, _ref) => {
  const { register, watch, setValue, formState } = useFormContext();
  const baseName = props.name || 'Unknown name';
  const name = baseName.split('_').join(' ');
  const { errors } = formState;

  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name];

  const { defaultValue, ...otherProps } = props;
  const value = watch(baseName) || defaultValue;

  useEffect(() => {
    register(baseName);
    if (defaultValue) {
      setValue(baseName, defaultValue);
    }
  }, [baseName, setValue, register, defaultValue]);

  return (
    <Select
      {...otherProps}
      name={baseName}
      outerProps={{ isDisabled: formState.isSubmitting }}
      error={error}
      value={value}
      onChange={(e) => setValue(baseName, e.target.value)}
    />
  );
});
