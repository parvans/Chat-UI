import {useDisclosure } from '@chakra-ui/react'
import { ChatState } from 'context/ChatProvider'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { getUsers } from 'utilities/apiService'

export default function GroupChatModal({children}) {
    const {isOpen,onOpen,onClose}=useDisclosure()
    const [groupName,setGroupName]=useState('')
    const [selectedUsers,setSelectedUsers]=useState([])
    const [search,setSearch]=useState('')
    const [searchResult,setSearchResult]=useState([])
    const [loading,setLoading]=useState(false)
    const {user,chats,setChats}=ChatState()

    const handleSearch=async(value)=>{
        setSearch(value)
        if(!value){
            return;
        }
         try {
            setLoading(true)
            const res=await getUsers(value)
            if(res?.ok){
                console.log(res?.data?.data);
                setLoading(false)
            }
            // console.log(res?.data?.data);
         } catch (error) {
            console.log(error);
         }
    }
    const handleSubmit=()=>{

    }
  return (
    <>
    <span onClick={onOpen}>{children}</span>
    <Modal isOpen={isOpen} toggle={onClose} size="lg">
        <ModalHeader  toggle={onClose} >
            Create Group
            </ModalHeader>
        <ModalBody className="d-flex flex-column justify-content-center align-items-center">
            <input type="text" placeholder="Enter Group Name" value={groupName} onChange={(e)=>setGroupName(e.target.value)} className="form-control mb-2"/>
            <input type="text" placeholder="Search Users" onChange={(e)=>handleSearch(e.target.value)} className="form-control mb-2"/>
            {
                loading && <Spinner color="primary"/>
            }
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>Create Group</Button>{' '}
            <Button color="secondary" onClick={onClose}>Cancel</Button>
        </ModalFooter>
    </Modal>
    </>
  )
}
