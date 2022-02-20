import React, { forwardRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { capitalize } from '../../helpers/string';
import { useReactSelectStyles } from './useStyles';

export interface ReactSelectFieldProps {
  name: string;
  label?: string;
  noLabel?: boolean;
  error?: string;
  options: { label: string; value: string }[];
  // FIXME: deprecate
  initialSelected?: string[];

  isRequired?: boolean;

  // TODO: Fix
  reactSelectProps?: any;
  // TODO: Somehow make this smarter (generic)
  isSingle?: boolean;
}

export const ReactSelectField = forwardRef<any, ReactSelectFieldProps>((props, ref) => {
  const { name, label, noLabel, options, isSingle, isRequired, reactSelectProps } = props;
  let { error } = props;

  const { register, setValue, watch, formState } = useFormContext();
  const value = watch(name) || [];

  useEffect(() => {
    register(name);
  }, [name, props.initialSelected, setValue, register]);

  if (!error) {
    const { errors } = formState;
    error = Array.isArray(errors[name])
      ? errors[name].join(', ')
      : errors[name]?.message || errors[name];
  }

  const styles = useReactSelectStyles(error);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {!noLabel && <FormLabel htmlFor={name}>{label || capitalize(name)}</FormLabel>}
      <ReactSelect
        id={name}
        {...styles}
        {...reactSelectProps}
        styles={{ ...styles.styles, ...reactSelectProps.styles }}
        isMulti={isSingle === true ? false : true} // by default is multi
        ref={ref}
        name={name}
        value={
          isSingle
            ? options.find((o) => o.value === value)
            : options.filter((o) => value.includes(o.value))
        }
        options={options}
        onChange={(val) => {
          if (isSingle) {
            setValue(name, val?.value);
          } else {
            // @ts-ignore
            // prettier-ignore
            setValue(name, val.map((v) => v.value));
          }
        }}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});
