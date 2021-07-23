import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControlProps,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps
} from '@chakra-ui/react';

import { capitalize } from '../helpers/string';
import { InputLabelWrap } from './Wrapper';
import { resoleType } from '../helpers/type';

export interface TextAreaProps extends ChakraTextareaProps {
  label?: string | React.ReactNode;
  noLabel?: boolean;
  error?: string;
  name?: string;
  outerProps?: FormControlProps;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { name: baseName = 'TextAreaField Field', label, placeholder, outerProps, ...rest } = props;
  const name = baseName.split('_').join(' ');

  return (
    <InputLabelWrap {...props} baseName={baseName} name={name}>
      <ChakraTextarea
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

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { register, formState, errors } = useFormContext();
  const baseName = props.name || 'Unknown name';
  const name = baseName.split('_').join(' ');

  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name];

  return (
    <TextArea
      {...props}
      name={baseName}
      outerProps={{ isDisabled: formState.isSubmitting }}
      error={error}
      ref={register()}
    />
  );
});
