import {Menu,MenuButton, MenuList } from '@chakra-ui/react'
import {useDisclosure } from '@chakra-ui/hooks'
import { BellIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import ProfileModal from './ProfileModal'
import { getUsers } from 'utilities/apiService'
import { Toaster, toast } from 'react-hot-toast'
import UserListItem from './UserListItem'
import { accessChat } from 'utilities/apiService'
import { ChatState } from 'context/ChatProvider'
        
export default function SideDrawer() {
  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingChat,setLoadingChat]=useState(false)

  const {user,setSelectedChat,chats,setChats,notifications,setNotifications}=ChatState()
  const {isOpen,onOpen,onClose}=useDisclosure()
  const [noData,setNoData]=useState(false)

  const [userChat,setUserChat]=useState(false)
  const handleSearch=async(value)=>{
    // e.preventDefault()
    // if(!search){
    //   toast.error("please enter something to search")
    // }else{
      try {
        setLoading(true)
      const res=await getUsers(value)
      if(res?.ok){
        setSearchResult(res?.data?.data)
      } 
      if(res?.data?.data?.length === 0){
        setNoData(true)
      }else{
        setNoData(false)
      }  
      setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    
    
  }

  const accessUserChat=async(id)=>{
    console.log(id);
    try {
      setLoadingChat(true)
      const chatRes=await accessChat(id)
      console.log(chats);
      if(chatRes?.ok){
        if(!chats?.find((item)=>item?._id === chatRes?.data?.data?._id)) setChats([chatRes?.data?.data,...chats])
        setSelectedChat(chatRes?.data?.data)
        setLoadingChat(false)
        onClose()
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function toggle(){
    setSearchResult([])
    setNoData(false)
    setSearch('')
    onClose()
  }

  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#4ec94e",width:"100%",padding:"5px 10px 5px 10px",borderWidth:"5px",borderRadius:"10px",borderColor:"#fff",borderStyle:"solid"}}>
      <Button className="btn-icon btn-round" color="dark" outline 
       onClick={onOpen}>
        <i className="nc-icon nc-zoom-split"></i>{' '}
        {/* <span>Search User</span> */}
        </Button>
        <h5 style={{margin:"0px", color:"#fff"}}>Chatbot</h5>
    <div>
      {/* <Menu>
        <MenuButton p={1} bg={"#4ec94e"} border={"none"}>
          <BellIcon  w={25} h={50} />
        </MenuButton >
        <MenuList bg={"#4ec94e"} border={"none"} color={"#fff"}>
             {
              !notifications?.length && "No Notifications"
             }
             {
              !notifications?.length && "No Notifications"
             }
             {
              !notifications?.length && "No Notifications"
             }
             {
              !notifications?.length && "No Notifications"
             }
        </MenuList>

        </Menu> */}
    </div>
    </div>
    <Modal isOpen={isOpen} toggle={onClose} className="modal-dialog-centered" scrollable={true}>
                
                <ModalHeader toggle={toggle}>Search User</ModalHeader>
                <ModalBody>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <input type="text" placeholder="search user" onChange={(e)=>handleSearch(e.target.value)} style={{width:"80%",padding:"10px",borderRadius:"10px",borderWidth:"1px",borderColor:"#4ec94e",margin:"10px"}}/>
                            {/* <Button color="success" onClick={handleSearch}>Search</Button> */}
                        </div>
                            
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            {loading? <Spinner color="success" style={{margin:"10px"}}/>:(

                              searchResult.map((user,index)=>(
                                  <UserListItem key={index} index={index} users={user} handleFunction={()=>accessUserChat(user?._id)}/>
                              ))
                            )}
                            {
                              loadingChat && <Spinner color="success" style={{margin:"10px"}}/>
                            }
                            {
                              searchResult?.length === 0 && noData && <h5>No Data Found</h5>
                            }
                        </div>
                </ModalBody>

            </Modal>

            <Toaster
                position='top-center'
                reverseOrder={false}
            />

    </>
  )
}
