import React, { forwardRef } from 'react';
import { useFormContext, ValidationRule } from 'react-hook-form';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControlProps,
  FormLabelProps
} from '@chakra-ui/react';
import { InputLabelWrap } from './Wrapper';
import { capitalize } from '../helpers/string';
import { AllowedTypes, resoleType } from '../helpers/type';

export interface InputProps extends Omit<ChakraInputProps, 'type'> {
  label?: string | React.ReactNode;
  noLabel?: boolean;
  error?: string;
  name?: string;
  type?: AllowedTypes | string;
  outerProps?: FormControlProps;
  labelProps?: FormLabelProps;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ noLabel, ...props }, ref) => {
  const {
    name: baseName = 'Input Field',
    label,
    placeholder,
    outerProps,
    labelProps,
    ...rest
  } = props;
  const name = baseName.split('_').join(' ');

  return (
    <InputLabelWrap
      {...props}
      labelProps={labelProps}
      noLabel={noLabel}
      baseName={baseName}
      name={name}
    >
      <ChakraInput
        type={resoleType(baseName)}
        id={baseName}
        name={baseName}
        ref={ref}
        placeholder={placeholder || (typeof label === 'string' && label) || capitalize(name)}
        {...rest}
      />
    </InputLabelWrap>
  );
});

export type InputFieldProps = InputProps & { validationPattern?: ValidationRule<RegExp> };

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, _ref) => {
  const { register, formState } = useFormContext();
  const baseName = props.name || 'Unknown name';
  const name = baseName.split('_').join(' ');
  const { errors } = formState;

  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name];

  const { children, label, ...rest } = props;

  // TODO: Handle this better
  const hfProps = register(baseName, {
    pattern: props.validationPattern,
    // valueAsNumber: true
    setValueAs: (val) => {
      if (!val) {
        return undefined;
      }

      if (props.type === 'number') {
        if (val.length === 0 && !props.isRequired) {
          return undefined;
        }

        return parseFloat(val);
      }

      if (props.type === 'date') {
        return new Date(val);
      }

      return val;
    }
  });

  return (
    <Input
      {...rest}
      label={label || children}
      outerProps={{ isDisabled: formState.isSubmitting }}
      error={error}
      {...hfProps}
      {...(rest.onChange
        ? {
            onChange: (e) => {
              rest.onChange?.(e);
              hfProps.onChange(e);
            }
          }
        : {})}
    />
  );
});
