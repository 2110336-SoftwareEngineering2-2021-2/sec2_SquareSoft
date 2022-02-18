import './App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import MainRoutes from './routes/mainRoute';


function App() {

  
  return (
    <ChakraProvider>
      <MainRoutes/>
    </ChakraProvider>
  );
}

export default App;
