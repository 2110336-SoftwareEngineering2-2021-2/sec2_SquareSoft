import Dropzone, { useDropzone } from 'react-dropzone'
import React, { useCallback, useState, useEffect } from 'react'
import { Image } from '@chakra-ui/react'
import { uploadImage } from '../../api/file-uploader/file-uploader';

function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0")
  }
function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function ImageUploader({ upload, setImageName }){
    const [drop, setDrop] = useState(false);
    const [file, setFile] = useState(null);
    const [srcImg, setSrcImg] = useState(null);
    const [isImg, setIsImg] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const temp_file = acceptedFiles?.[0];
        if(temp_file){
            setDrop(true);
            setFile(temp_file);
            setSrcImg(URL.createObjectURL(temp_file));
            setIsImg(temp_file.type.split("/")[0] === "image")
        }
    }, []);

    useEffect(() => {
        if(upload && isImg){
            const temp_file = new File([file], generateId() + "." + file.type.split("/")[1]);
            setImageName(temp_file.name);
            uploadImage(temp_file);
        }
    },[upload]);

    const { open } = useDropzone({ onDrop });

    return (
        <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                    {drop && <Image src = {srcImg}></Image>}
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </section>
            )}
      </Dropzone>
    );
}

export default ImageUploader