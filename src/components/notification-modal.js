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

function NotificationBox({text}){
    const [ mouseOver, setmouseOver ] = useState(false);
    const [ appear, setApper ] = useState(true);
    return(
    appear&&<>
        <Grid   templateRows='repeat(1, 1fr)'
                templateColumns='repeat(7, 1fr)'
                gap={4}
                onMouseEnter={() => {setmouseOver(true);}}
                onMouseLeave={() => {setmouseOver(false);}}
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
                {mouseOver&&<Button size='xs' onClick={()=>{setApper(false)}}>X</Button>}
            </GridItem>
        </Grid>
    </>
    );
}

function NotificationModal({setNumberOfNotification, setNotificationIsOpen, notificationIsOpen}){
    const [ updated, setUpdated ] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ numberOfNotification, setNumberOfNotificationInSight ] = useState(0);
    
    useEffect(()=>{
        if(!updated){
            setNumberOfNotificationInSight(100);
            setNumberOfNotification(numberOfNotification);
            setUpdated(true);
        }
    }, [updated]);

    useEffect(()=>{
        setNumberOfNotification(numberOfNotification);
    }, [numberOfNotification]);

    useEffect(()=>{
        if(notificationIsOpen){
            setNotificationIsOpen(false);
            onOpen();
        }
    }, [notificationIsOpen]);

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Notification({numberOfNotification})</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <NotificationBox text = {"1234"}/>
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