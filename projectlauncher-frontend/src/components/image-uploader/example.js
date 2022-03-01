import './App.css';
import ImageUploader from './components/image-uploader/image-uploader';
import { Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getFileURL } from './api/file-uploader/file-uploader'

import MainRoutes from './routes/mainRoute';

function App() {
  const [ upload, SetUpload ] = useState(false);
  const [ imgName, setImgName ] = useState(null);
  const [ url, setURL] = useState(null);
  const handleClick = () => {
    SetUpload(true);
  }

  useEffect(()=>{
    if(imgName) 
    {
        getFileURL(imgName).then((res)=>{
          console.log(res.data);
          setURL(res.data)
      });
    } 
  }, []);

  return (
    <div className="App">
      <ImageUploader upload = {upload} setImageName = {setImgName}/>
      <Button onClick={handleClick}> Submit </Button>
      {url && <Image src = {url}></Image>}
    </div>
  );
}

export default App;
