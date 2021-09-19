import { Props } from 'react-select';
import { useColorModeValue, useToken } from '@chakra-ui/react';

const useColorModeToken = (light: string, dark: string) => {
  const token = useToken('colors', [light, dark]) as [string, string];
  return useColorModeValue(...token);
};

export const useReactSelectStyles = (error?: string): Pick<Props, 'theme' | 'styles'> => {
  const bg = useColorModeToken('white', 'gray.800');
  const itemBg = useColorModeToken('gray.200', 'gray.600');
  const color = useColorModeToken('gray.900', 'white');
  const highlightColor = useColorModeToken('blue.300', 'gray.900');
  const errorColor = useColorModeToken('red.500', 'gray.300');

  return {
    styles: {
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
    },
    theme: (t) => ({
      ...t,
      colors: {
        ...t.colors,
        neutral0: bg,
        primary25: highlightColor,
        neutral10: itemBg,
        neutral80: color
      }
    })
  };
};
