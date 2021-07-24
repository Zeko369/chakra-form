import React, { forwardRef } from 'react';
import { useFormContext, ValidationRule } from 'react-hook-form';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControlProps
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
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name: baseName = 'Input Field',
    label,
    placeholder,
    outerProps,
    noLabel,
    ...rest
  } = props;
  const name = baseName.split('_').join(' ');

  return (
    <InputLabelWrap {...props} baseName={baseName} name={name}>
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
  const { register, formState, errors } = useFormContext();
  const baseName = props.name || 'Unknown name';
  const name = baseName.split('_').join(' ');

  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name];

  const { children, label, ...rest } = props;

  return (
    <Input
      {...rest}
      label={label || children}
      name={baseName}
      outerProps={{ isDisabled: formState.isSubmitting }}
      error={error}
      ref={register({
        pattern: props.validationPattern,
        // valueAsNumber: true
        setValueAs: (val) => {
          if (props.type === 'number') {
            if (val.length === 0 && !props.isRequired) {
              return undefined;
            }

            return parseFloat(val);
          }

          return val;
        }
      })}
    />
  );
});
