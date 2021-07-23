import React, { forwardRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import {
  useToken,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { capitalize } from '../helpers/string';

export interface ReactSelectFieldProps {
  name: string;
  label?: string;
  noLabel?: boolean;
  error?: string;
  options: { label: string; value: string }[];
  initialSelected?: string[];

  // TODO: Fix
  reactSelectProps?: any;
}

const useColorModeToken = (light: string, dark: string) => {
  const token = useToken('colors', [light, dark]) as [string, string];
  return useColorModeValue(...token);
};

export const ReactSelectField = forwardRef<any, ReactSelectFieldProps>(
  ({ name, label, noLabel, error, options, initialSelected, reactSelectProps }, ref) => {
    const { register, setValue, watch, errors } = useFormContext();
    const value = watch(name) || [];

    useEffect(() => {
      register(name);
    }, [name, initialSelected, setValue, register]);

    const bg = useColorModeToken('white', 'gray.800');
    const itemBg = useColorModeToken('gray.200', 'gray.600');
    const color = useColorModeToken('gray.900', 'white');
    const highlightColor = useColorModeToken('blue.300', 'gray.900');
    const errorColor = useColorModeToken('red.500', 'gray.300');

    if (!error) {
      error = errors[name]?.join(', ');
    }

    return (
      <FormControl isInvalid={!!error}>
        {!noLabel && <FormLabel htmlFor={name}>{label || capitalize(name)}</FormLabel>}
        <ReactSelect
          id={name}
          {...reactSelectProps}
          isMulti // by default is multi
          ref={ref}
          name={name}
          value={options.filter((o) => value.includes(o.value))}
          options={options}
          styles={{
            container: (a) => ({ ...a, width: '100%' }),
            control: (s) => ({
              ...s,
              ...(error
                ? {
                    borderWidth: '2px',
                    borderRadius: '6px',
                    borderColor: error ? errorColor : s.borderColor,
                    '&:hover': {
                      borderColor: error ? errorColor : s.borderColor
                    }
                  }
                : {})
            })
          }}
          theme={(t) => ({
            ...t,
            colors: {
              ...t.colors,
              neutral0: bg,
              primary25: highlightColor,
              neutral10: itemBg,
              neutral80: color
            }
          })}
          onChange={(val) => {
            // @ts-ignore
            // prettier-ignore
            setValue(name, val.map((v) => v.value));
          }}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);
