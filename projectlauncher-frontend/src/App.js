import './App.css';

import MainRoutes from './routes/mainRoute';
import { ChakraProvider } from '@chakra-ui/react'
import ImageUploader from './components/image-uploader/image-uploader';

function App() {

  return (
    <div className="App">
      <ChakraProvider>
        <ChakraProvider/>
      </ChakraProvider>
    </div>
  );
}

export default App;
