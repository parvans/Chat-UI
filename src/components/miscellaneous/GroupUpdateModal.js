import { ViewIcon } from "@chakra-ui/icons";
import { Box, useDisclosure } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import UserBadgeItem from "./UserBadgeItem";

export default function GroupUpdateModal({ fetchAgain, setFetchAgain }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat,setSelectedChat } = ChatState();

  const handleRemoveUser=(id)=>{

  }
  const handleRename=async()=>{

  }
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
                        handleFunction={handleRemoveUser(user)}
                         />

                    ))
                }
            </Box>
            <hr/>
            <h5 style={{margin:"5px"}}>Group Name :</h5>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <input type="text" placeholder="Chat Name"  className="form-control" value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)}/>
            <Button className="btn-round ml-2" color="success" onClick={handleRename}>Update</Button>
            </div>
            {/* <input type="text" placeholder="Chat Name"  className="form-control mb-2" value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)}/>
            <Button className="btn-round" color="success" onClick={handleRename}>Update</Button> */}
        </ModalBody>
        <ModalFooter>
            <Button className="btn-round" color="danger">Leave Group</Button>{' '}
            <Button className="btn-round" color="secondary" onClick={onClose}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>

    </>
  );
}
