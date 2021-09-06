import React from 'react';
import {
  FormControl,
  FormLabelProps,
  FormControlProps,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react';
import { capitalize } from '../helpers/string';

export type InputLabelWrapProps = {
  name: string;
  baseName: string;

  label?: string | React.ReactNode;
  outerProps?: FormControlProps;
  noLabel?: boolean;

  labelProps?: FormLabelProps;
  isInvalid?: boolean;
  isRequired?: boolean;
  error?: string;
};

export const InputLabelWrap: React.FC<InputLabelWrapProps> = ({ noLabel = false, ...props }) => {
  const { outerProps, baseName, label, name, error, isInvalid, isRequired, labelProps } = props;

  return (
    <FormControl isInvalid={isInvalid || !!error} isRequired={isRequired} {...outerProps}>
      {!noLabel && (
        <FormLabel htmlFor={baseName} {...labelProps}>
          {label || capitalize(name)}
        </FormLabel>
      )}
      {props.children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
