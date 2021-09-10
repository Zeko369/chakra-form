import React from 'react';
import { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { ConfirmContextProvider } from 'chakra-confirm';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <ConfirmContextProvider>
        <Box pb="10">
          <Component {...pageProps} />
        </Box>
      </ConfirmContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
