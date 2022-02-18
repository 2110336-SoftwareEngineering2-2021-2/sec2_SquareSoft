import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

import MainRoutes from './routes/mainRoute';


function App() {
  return (
    <ChakraProvider>
      <MainRoutes/>
    </ChakraProvider>
  );
}

export default App;
