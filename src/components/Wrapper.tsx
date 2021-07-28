import React from 'react';
import { FormControl, FormControlProps, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { capitalize } from '../helpers/string';

export type InputLabelWrapProps = {
  name: string;
  baseName: string;

  label?: string | React.ReactNode;
  outerProps?: FormControlProps;
  noLabel?: boolean;

  isInvalid?: boolean;
  isRequired?: boolean;
  error?: string;
};

export const InputLabelWrap: React.FC<InputLabelWrapProps> = ({ noLabel, ...props }) => {
  const { outerProps, baseName, label, name, error, isInvalid, isRequired } = props;

  return (
    <FormControl isInvalid={isInvalid || !!error} isRequired={isRequired} {...outerProps}>
      {!noLabel && <FormLabel htmlFor={baseName}>{label || capitalize(name)}</FormLabel>}
      {props.children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
