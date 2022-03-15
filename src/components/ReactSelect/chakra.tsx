import React, { forwardRef } from 'react';
import ReactSelect from 'react-select';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

import { capitalize } from '../../helpers/string';
import { useReactSelectStyles } from './useStyles';

export interface StyledReactSelectProps {
  name: string;
  label?: string;
  noLabel?: boolean;
  error?: string;

  // TODO: This is a shit api
  forceValue?: any;

  value: string | string[];
  setValue: (value: string | string[]) => void;

  options: { label: string; value: string }[];
  // FIXME: deprecate
  initialSelected?: string[];
  isRequired?: boolean;

  // TODO: Fix
  reactSelectProps?: any;
  // TODO: Somehow make this smarter (generic)
  isSingle?: boolean;
}

export const StyledReactSelect = forwardRef<any, StyledReactSelectProps>((props, ref) => {
  const {
    name,
    label,
    noLabel,
    options,
    isSingle,
    isRequired,
    reactSelectProps,
    error,
    value,
    forceValue,
    setValue
  } = props;
  const styles = useReactSelectStyles(error);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {!noLabel && <FormLabel htmlFor={name}>{label || capitalize(name)}</FormLabel>}
      <ReactSelect
        id={name}
        {...styles}
        {...reactSelectProps}
        styles={{ ...styles.styles, ...reactSelectProps?.styles }}
        isMulti={isSingle === true ? false : true} // by default is multi
        ref={ref}
        name={name}
        value={
          forceValue || isSingle
            ? options.find((o) => o.value === value)
            : options.filter((o) => Array.isArray(value) && value.includes(o.value))
        }
        options={options}
        onChange={(val) => {
          if (isSingle) {
            setValue(val?.value as any);
          } else {
            // @ts-ignore
            setValue(val?.map((v) => v.value));
          }
        }}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});
