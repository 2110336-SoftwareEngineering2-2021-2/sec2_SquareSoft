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

function NotificationModal({setNumberOfNotification, setNotificationIsOpen, notificationIsOpen}){
    const [ updated, setUpdated ] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ numberOfNotification, setNumberOfNotificationInSight ] = useState(0);
    const [ appear, setAppear ] = useState(false);
    
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
                <Grid   templateRows='repeat(1, 1fr)'
                        templateColumns='repeat(7, 1fr)'
                        gap={4}
                        onMouseEnter={() => {setAppear(true);}}
                        onMouseLeave={() => {setAppear(false);}}
                >
                    <GridItem colSpan={6}>
                    {
                        !appear && 
                        <Box borderWidth='1px' borderRadius='xs' overflow='hidden'>
                        <Text p = "9px">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.1111112dafgmklsdjfgljdlsfgjl;ksdfjgl;jsdlfgjklsdfjgljsdfgljsldkfjgl;sdjfgkljsdflg;jls;dkfjgkl;sdjfgkl;jsdfl;gjs;dlfg
                        </Text>
                        </Box>
                    }
                    {
                        appear && 
                        <Box borderWidth='3px' borderRadius='lg' overflow='hidden'>
                        <Text p = "7px">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.1111112dafgmklsdjfgljdlsfgjl;ksdfjgl;jsdlfgjklsdfjgljsdfgljsldkfjgl;sdjfgkljsdflg;jls;dkfjgkl;sdjfgkl;jsdfl;gjs;dlfg
                        </Text>
                        </Box>
                    }
                    </GridItem>
                    <GridItem colSpan={1}>
                        {appear&&<Button size='xs' >X</Button>}
                    </GridItem>
                </Grid>
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