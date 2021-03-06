import React, { forwardRef, useEffect, useRef } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  FormLabelProps
} from '@chakra-ui/react';

import { capitalize } from '../helpers/string';

export interface SelectProps extends Omit<ChakraSelectProps, 'type'> {
  label?: string;
  noLabel?: boolean;
  error?: string;
  name?: string;
  placeholder?: string;
  outerProps?: FormControlProps;
  labelProps?: FormLabelProps;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ noLabel, ...props }, ref) => {
  const {
    name: baseName = 'Select field',
    isInvalid,
    isRequired,
    label,
    placeholder,
    outerProps,
    labelProps,
    ...rest
  } = props;

  const name = baseName.split('_').join(' ');

  return (
    <FormControl isInvalid={isInvalid || !!props.error} isRequired={isRequired} {...outerProps}>
      {!noLabel && (
        <FormLabel htmlFor={baseName} {...labelProps}>
          {label || capitalize(name)}
        </FormLabel>
      )}
      <ChakraSelect id={baseName} name={baseName} ref={ref} placeholder={placeholder} {...rest} />
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
  );
});

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>((props, _ref) => {
  const { register, watch, setValue, trigger, formState } = useFormContext();
  const baseName = props.name || 'Unknown name';
  const name = baseName.split('_').join(' ');
  const { errors } = formState;

  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name];

  const { defaultValue, ...otherProps } = props;
  const value = watch(baseName) || defaultValue;

  const ref = useRef<UseFormRegisterReturn>();
  useEffect(() => {
    ref.current = register(baseName);
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
      onBlur={ref.current?.onBlur}
      onChange={(e) => {
        otherProps.onChange?.(e);
        setValue(baseName, e.target.value);
        trigger(baseName);
      }}
    />
  );
});
