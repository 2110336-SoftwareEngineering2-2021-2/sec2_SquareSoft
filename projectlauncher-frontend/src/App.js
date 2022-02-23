import './App.css';

import MainRoutes from './routes/mainRoute';
import { ChakraProvider } from '@chakra-ui/react'


function App() {

  
  return (
    <div className="App">
      <ChakraProvider>
        <MainRoutes/>
      </ChakraProvider>
    </div>
  );
}

export default App;
