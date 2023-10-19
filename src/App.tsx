import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Box, Flex , Text , Spacer, Heading } from '@chakra-ui/react';
import MainComponent from './component/Main-Compoent';
import { QueryClientProvider , QueryClient   } from 'react-query';
 

function App() {

  const queryClientt = new QueryClient();

  return (
    <>

    <QueryClientProvider client={queryClientt}>
    <Box color={'white'} p={10} bg={ 'black' } >

<MainComponent/>

</Box>
    </QueryClientProvider>

    

    </>
  );
}

export default App;
