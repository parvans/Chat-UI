import { ViewIcon } from "@chakra-ui/icons";
import { Box, useDisclosure } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import UserBadgeItem from "./UserBadgeItem";
import { renameGroup } from "utilities/apiService";
import { getUsers } from "utilities/apiService";
import UserListItem from "./UserListItem";
import { Toaster, toast } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { groupAddMember } from "utilities/apiService";
import { groupRemoveMember } from "utilities/apiService";

export default function GroupUpdateModal({ fetchAgain, setFetchAgain,fetcheMessages }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat,setSelectedChat } = ChatState();

  const userId=jwtDecode(localStorage.getItem("auth-token"))?.id;
  // console.log(userId);
  // console.log(selectedChat);

  const handleRename=async()=>{
    if(!groupChatName) return;
    try {
      setRenameLoading(true);
      const res=await renameGroup({chatId:selectedChat._id,chatName:groupChatName});
      if(res?.ok){
        setSelectedChat(res?.data?.data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
      }
    } catch (error) {
      console.log(error);
      setRenameLoading(false);
    }
  }

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const res=await getUsers(search);
      if(res?.ok){
        // const finteredUsers=res?.data?.data?.filter((user)=>{
        //   return !selectedChat?.users.some((exist)=>{
        //     return exist._id===user._id;
        //   })
        // })
        // console.log(finteredUsers);
        setSearchResult(res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddUser=async(userToAdd)=>{
    // if(selectedChat.users.find((user)=>user._id===userToAdd._id)){
    //   toast.error("User already in the group");
    //   return;
    // }
    if(selectedChat.groupAdmin._id!==userId){
      toast.error("Only Admin can add users");
      return;
    }
    try {
      setLoading(true);
      const res=await groupAddMember({chatId:selectedChat._id,userId:userToAdd._id});
      if(res?.ok){
        setSelectedChat(res?.data?.data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      }else{
        toast.error(res?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveUser=async(user1)=>{
    if(selectedChat.groupAdmin._id!==userId && user1._id!==userId){
      toast.error("Only Admin can remove users");
      return;
    }

    try {
      setLoading(true);
      const res=await groupRemoveMember({chatId:selectedChat._id,userId:user1._id});
      if(res?.ok){
        user1._id===userId ? setSelectedChat():setSelectedChat(res?.data?.data);
        setFetchAgain(!fetchAgain);
        fetcheMessages();
        setLoading(false);
      }else{
        toast.error(res?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setGroupChatName(selectedChat?.chatName);
  }, [selectedChat]);

  return (
    <>
    <Button
      onClick={onOpen}
      className="btn-icon btn-round"
      color="dark"
      outline
    >
      <ViewIcon w={17} h={20} mb={1} />
    </Button>
    <Modal isOpen={isOpen} toggle={onClose} className="modal-dialog-centered">
        <ModalHeader toggle={onClose} style={{justifyContent:"center", fontSize:"20px",display:"flex",alignItems:"center"}}
        >Group Update</ModalHeader>
        <ModalBody>
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                {
                    selectedChat?.users.map((user,index)=>(
                        <UserBadgeItem 
                        key={user._id}
                        user={user}
                        admin={selectedChat?.groupAdmin._id===user._id}
                        handleFunction={()=>handleRemoveUser(user)}
                         />

                    ))
                }
            </Box>
            <hr/>
            <h5 style={{margin:"5px"}}>Group Name :</h5>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <input type="text" placeholder="Chat Name"  className="form-control" value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)}/>
            <Button className="btn-round ml-2" color="success" onClick={handleRename}>
              {renameLoading?<Spinner size="sm" color="light"/>:"Update"}
              </Button>
            </div>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <input type="text" placeholder="Add Users to Group"  className="form-control" onChange={(e)=>handleSearch(e.target.value)}/>
            </div>
            <hr/>
            <Box w="100%"  className="d-flex flex-column justify-content-center align-items-center">
            {
              loading ?(
                <Spinner size="lg" color="success"/>
              ) :(
                <>
                {
                  
                    searchResult?.map((user,index)=>(
                        <UserListItem
                        key={user._id + index}
                        users={user}
                        handleFunction={()=>handleAddUser(user)}
                        />
                    ))
                }
                </>
                )
              }
              </Box>
        </ModalBody>
        <ModalFooter>
            <Button className="btn-round" color="danger" onClick={()=>handleRemoveUser(userId)}>Leave Group</Button>{' '}
            <Button className="btn-round" color="secondary" onClick={onClose}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
    <Toaster
                position='top-center'
                reverseOrder={false}
            />

    </>
  );
}
