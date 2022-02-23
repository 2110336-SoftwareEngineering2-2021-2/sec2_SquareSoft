import Dropzone, { useDropzone } from 'react-dropzone'
import React, { useCallback, useState, useEffect } from 'react'
import { Image } from '@chakra-ui/react'

function ImageUploader(){
    const [path, setPath] = useState("");
    const [drop, setDrop] = useState(false);
    const [newFile, setNewFile] = useState(false);
    const [file, setFile] = useState({});
    const [srcImg, setSrcImg] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles?.[0];
        if(file){
            setDrop(true);
            setFile(file);
            setSrcImg(URL.createObjectURL(file));
        }
    }, []);

    const {getRootProps, getInputProps, open} = useDropzone({ onDrop });

    return (
        <>
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                { 
                    !drop ? 
                    (
                    <>
                        <input {...getInputProps()} type = {"file"}/>
                        <button type="button" onClick={open}> Open File Dialog </button>
                    </>
                    ) : 
                    (
                    <>
                        <Image src = {srcImg}></Image>
                        <button type="button" onClick={open}> Open File Dialog </button>
                    </>
                    )
                }
                </div>
            </section>
        </>
    );
}

export default ImageUploader