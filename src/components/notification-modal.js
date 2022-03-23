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
    Button
  } from '@chakra-ui/react'

function NotificationModal({setNumberOfNotification, setNotificationIsOpen, notificationIsOpen}){
    const [ updated, setUpdated ] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useEffect(()=>{
        if(!updated){
            setNumberOfNotification(100);
            setUpdated(true);
        }
        if(notificationIsOpen){
            setNotificationIsOpen(false);
            onOpen();
        }
    }, [notificationIsOpen, updated]);
    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Notification({})</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                ABC
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