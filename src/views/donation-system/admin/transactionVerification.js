import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import VerificcationBox from '../../../components/donation-system/admin/transaction-verification';
import React, { useEffect, useState } from 'react';
import Navigator from "../../../components/navigator";
import {basedURL, getToken} from "../../../api/index.js";
import axios from 'axios'
import Cookies from 'js-cookie'

// function TransactionVerification(){

//     const [load, setLoad] = useState(false);

//     //uncomment to edit loading API
//     /*
//     useEffect(()=>{
//         if (!load){
//             getData()
//             .then(res => {
//                     setData(res.data); 
//                     setLoad(true);
//             })
//             .error();
//         }
//     });
//     */

//     //uncomment to eding loading state views
//     /*if(!load)
//     return(
//         <div>
//             <Navigator />
//             <Text>loading data...</Text>
//         </div>
//     );*/

//     return(
//         <div>
//             <Navigator />
//             <Container maxW = "container.xl" p = {0}>
//                 <Flex px = {20} alignContent = "center">
//                     <Center w='full' py = {5}>
//                         <VStack>
//                             <Text fontSize='3xl' fontWeight="bold" >Transaction Verification</Text>
//                             <VerificcationBox/>
//                             <VerificcationBox/>
//                         </VStack>
//                     </Center>
//                 </Flex>
//             </Container>
//         </div>
//     );
// }

async function getUserTransaction(){
    try{let inp_data = await axios.get(basedURL.concat('transaction/adminGetUnfinishedUserTX'), {
        headers: { Authorization: "Bearer " + getToken() }
    })
    return inp_data.data}
    catch(err){
        console.log(err)
    }
}
class TransactionVerification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: []}
        console.log(this.state)
    }

    async componentDidMount() {
        // Check if logged in
        console.log(this.state)
        if (Cookies.get('token')) {
            let temp = await getUserTransaction()
            this.setState({data: temp})
            
        }
        else{
            this.setState({data: []})
        }
        
    }

    
    render(){
        return(
            <div>
                <Navigator />
                <Container maxW = "container.xl" p = {0}>
                    <Flex px = {20} alignContent = "center">
                        <Center w='full' py = {5}>
                            <VStack>
                                <Text fontSize='3xl' fontWeight="bold" >Transaction Verification</Text>
                                <VerificcationBox/>
                                <VerificcationBox/>
                            </VStack>
                        </Center>
                    </Flex>
                </Container>
                {/* {this.state.data} */}
            </div>
        );
    }
}

export default TransactionVerification;