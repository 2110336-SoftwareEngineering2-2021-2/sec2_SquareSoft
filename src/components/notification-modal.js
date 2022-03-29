import { useState, useEffect } from 'react';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Grid,
    GridItem,
    Box
  } from '@chakra-ui/react'

import { getNotification, deleteNotification } from './../api/notification/notification-api';

function NotificationBox({text, closeNotification, _id}){
    const [ mouseOver, setmouseOver ] = useState(false);
    const [ appear, setApper ] = useState(true);
    return(
    appear&&<>
        <Grid   templateRows='repeat(1, 1fr)'
                templateColumns='repeat(7, 1fr)'
                gap={4}
                onMouseOver={() => {setmouseOver(true);}}
                onMouseLeave={() => {setmouseOver(false);}}
                marginBottom = "8px"
        >
            <GridItem colSpan={6}>
            {
                !mouseOver && 
                <Box borderWidth='1px' borderRadius='xs' overflow='hidden'>
                <Text p = "9px">{text}</Text>
                </Box>
            }
            {
                mouseOver && 
                <Box borderWidth='3px' borderRadius='lg' overflow='hidden'>
                <Text p = "7px">{text}</Text>
                </Box>
            }
            </GridItem>
            <GridItem colSpan={1}>
                {mouseOver&&<Button size='xs' onClick={()=>{setApper(false); closeNotification(); deleteNotification(_id);}}>X</Button>}
            </GridItem>
        </Grid>
    </>
    );
}

function NotificationModal({setNumberOfNotification, setNotificationIsOpen, notificationIsOpen}){
    const [ updated, setUpdated ] = useState(false);
    const [ data, setData ] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ numberOfNotification, setNumberOfNotificationInSight ] = useState(0);
    const closeNotification = () => {
        setNumberOfNotification(numberOfNotification-1);
        setNumberOfNotificationInSight(numberOfNotification-1);
    };

    useEffect(() => {
        if(!data){
            getNotification()
            .then(res => {
                setData(res.data);
                setNumberOfNotificationInSight(res.data[0]);
                setNumberOfNotification(res.data[0]);
            })
            .catch(() => {
                setNumberOfNotificationInSight(0);
                setNumberOfNotification(0);
            });
        }
    },[data]);

    useEffect(()=>{
        if(notificationIsOpen){
            setNotificationIsOpen(false);
            onOpen();
        }
    }, [notificationIsOpen]);

    if(!data){
        return <></>
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Notification({numberOfNotification})</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {
                    Array
                    .from({ length: data[0] })
                    .map((_, idx) => (
                        <NotificationBox 
                            _id = {data[1][idx]._id}  
                            text = {data[1][idx].text} 
                            closeNotification ={closeNotification}
                            key={idx.toString()}
                        />
                    ))
                }
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='purple' mr={3} onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default NotificationModal;