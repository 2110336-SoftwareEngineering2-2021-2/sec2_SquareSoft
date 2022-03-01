import Dropzone, { useDropzone } from 'react-dropzone'
import React, { useCallback, useState, useEffect } from 'react'
import { Image, Box, Button, Center, VStack, Text, Flex } from '@chakra-ui/react'
import { uploadImage } from '../../api/file-uploader/file-uploader';

function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0")
  }
function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function ImageUploader({ upload, setImageName, setUploaded, width = 500, height = 200}){
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
            uploadImage(temp_file).then((res)=>{
                if(res){
                    setUploaded(true);
                }
            });
        }
    },[upload]);

    const { open } = useDropzone({ onDrop });

    return (
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                <section className="container">
                    <Flex {...getRootProps({className: 'dropzone'})} w={width} h={height} borderWidth="2px" borderRadius="md" color='gray.500' justifyContent="space-around">
                        <Center>
                            <VStack>
                                {drop && <Image src = {srcImg} p = "2px" m = "2px" maxW={0.75*width} maxH={0.2*height}></Image>}
                                <input {...getInputProps()} />
                                {!drop &&  <Text p = "5px">Drag 'n' drop some files here, or click to select files</Text>}
                                <Button onClick = {open} p = "2px" h={0.02*height} colorScheme='teal' variant='outline'>
                                    <Text size={0.01*height}>Browse</Text>
                                </Button>
                            </VStack>
                        </Center>
                    </Flex>
                </section>
                )}
            </Dropzone>
    );
}

export default ImageUploader