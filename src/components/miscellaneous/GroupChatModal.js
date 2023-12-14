// import {Box, useDisclosure } from '@chakra-ui/react'
// import { ChatState } from 'context/ChatProvider'
// import React, { useState } from 'react'
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
// import { getUsers } from 'utilities/apiService'
// import UserListItem from './UserListItem'
// import { Toaster, toast } from 'react-hot-toast'
// import UserBadgeItem from './UserBadgeItem'
// import { createGroup } from 'utilities/apiService'

// export default function GroupChatModal({children}) {
//     const {isOpen,onOpen,onClose}=useDisclosure()
//     const [groupName,setGroupName]=useState('')
//     const [selectedUsers,setSelectedUsers]=useState([])
//     const [search,setSearch]=useState('')
//     const [searchResult,setSearchResult]=useState([])
//     const [loading,setLoading]=useState(false)
//     const {user,chats,setChats}=ChatState()

//     const handleSearch=async(value)=>{
//         setSearch(value)
//         if(!value){
//             return;
//         }
//          try {
//             setLoading(true)
//             const res=await getUsers(value)
//             if(res?.ok){
//                 // console.log(res?.data?.data);
//                 setLoading(false)
//                 setSearchResult(res?.data?.data)
//             }
//             // console.log(res?.data?.data);
//          } catch (error) {
//             console.log(error);
//          }
//     }
//     const handleSubmit=async()=>{
//         if(!groupName|| !selectedUsers){
//             toast.error("Please fill all the fields");
//             return;
//         }
//         try {
//             const res=await createGroup({
//                 name:groupName,
//                 users:JSON.stringify(selectedUsers.map((item)=>item?._id))
//             })
//             if(res?.ok){
//                 setChats([res?.data?.data,...chats])
//                 onClose()
//                 toast.success("New Group Created Successfully")
//                 // window.location.reload()
//             }else{
//                 toast.error(res?.data?.message)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const handleGroup=(userToAdd)=>{
//         if(selectedUsers.includes(userToAdd)){
//             toast.error("user already added");
//             return;
//         }
//         setSelectedUsers([...selectedUsers,userToAdd])
//     }
//     const handleDelete=(userToDelete)=>{
//         setSelectedUsers(selectedUsers.filter((item)=>item?._id !== userToDelete?._id))
//     }
//   return (
//     <>
//     <span onClick={onOpen}>{children}</span>
//     <Modal isOpen={isOpen} toggle={onClose} size="lg">
//         <ModalHeader  toggle={onClose} >
//             Create Group
//             </ModalHeader>
//         <ModalBody className="d-flex flex-column justify-content-center align-items-center">
//             <input type="text" placeholder="Enter Group Name" value={groupName} onChange={(e)=>setGroupName(e.target.value)} className="form-control mb-2"/>
//             <input type="text" placeholder="Search Users" onChange={(e)=>handleSearch(e.target.value)} className="form-control mb-2"/>
//             <Box w="100%" d="flex" flexWrap="wrap" >

//             {
//                 selectedUsers.map((item)=>(
//                     <UserBadgeItem 
//                     key={item?._id} 
//                     user={item} 
//                     handleFunction={()=>handleDelete(item)}/>
//                 ))}
//             </Box>
//             {
//                 loading ?<Spinner color="primary"/>:(
//                     searchResult.slice(0,4).map((item)=>(
//                         <UserListItem 
//                         key={item?._id} 
//                         users={item}
//                         handleFunction={()=>handleGroup(item)}/>
//                 )))
//             }
//         </ModalBody>
//         <ModalFooter>
//             <Button color="primary" onClick={handleSubmit}>Create Group</Button>{' '}
//             {/* <Button color="secondary" onClick={onClose}>Cancel</Button> */}
//         </ModalFooter>
//     </Modal>
//     <Toaster
//         position='top-center'
//         reverseOrder={false}
//     />
//     </>
//   )
// }
