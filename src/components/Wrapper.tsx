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

interface SwapPropsProps {
  a: React.ReactNode;
  b: React.ReactNode;
  swap?: boolean;
}

const SwapProps: React.FC<SwapPropsProps> = ({ a, b, swap }) => {
  if (swap) {
    return (
      <>
        {b}
        {a}
      </>
    );
  }

  return (
    <>
      {a}
      {b}
    </>
  );
};

export const InputLabelWrap: React.FC<InputLabelWrapProps & { swapProps?: boolean }> = ({
  noLabel = false,
  swapProps = false,
  ...props
}) => {
  const { outerProps, baseName, label, name, error, isInvalid, isRequired, labelProps } = props;

  return (
    <FormControl isInvalid={isInvalid || !!error} isRequired={isRequired} {...outerProps}>
      <SwapProps
        swap={swapProps}
        a={
          !noLabel && (
            <FormLabel htmlFor={baseName} {...labelProps}>
              {label || capitalize(name)}
            </FormLabel>
          )
        }
        b={props.children}
      />

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
