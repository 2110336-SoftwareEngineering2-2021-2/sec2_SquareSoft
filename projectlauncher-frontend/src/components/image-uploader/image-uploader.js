import Dropzone, { useDropzone } from 'react-dropzone'
import React, { useCallback, useState, useEffect } from 'react'
import { Image } from '@chakra-ui/react'
import uploadImage from '../../api/file-uploader/file-uploader';

function ImageUploader(){
    const [path, setPath] = useState("");
    const [drop, setDrop] = useState(false);
    const [newFile, setNewFile] = useState(false);
    const [file, setFile] = useState({});
    const [srcImg, setSrcImg] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles?.[0];
        if(file){
            uploadImage(file);
            setDrop(true);
            setFile(file);
            setSrcImg(URL.createObjectURL(file));
        }
    }, []);

    const {getRootProps, getInputProps, open} = useDropzone({ onDrop });

    return (
        <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </section>
            )}
      </Dropzone>
    );
}

export default ImageUploader