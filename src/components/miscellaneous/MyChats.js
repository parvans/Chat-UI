import { AddIcon } from "@chakra-ui/icons";
import {Box, Stack, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Spinner } from "reactstrap";
import { getChats } from "utilities/apiService";
import jwtDecode from "jwt-decode";
import { getSender } from "config/ChatLogic";
import GroupChatModal from "./GroupChatModal";
import './styles.css'
import useSound from 'use-sound';
import message1 from '../../assets/audio/message1.mp3'
import Avatar from '@mui/material/Avatar';
import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function MyChats({fetchAgain,setFetchAgain}) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, user, setSelectedChat, chats, setChats ,windowWidth} = ChatState();
  const userId=jwtDecode(localStorage.getItem("auth-token"))
  const [play] = useSound(message1);

  
  const fetchChat = async () => {
    try {
      const res = await getChats();
      if (res?.ok) {
        setChats(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(userId);
    fetchChat();
  }, [fetchAgain]);

  return (
        <Col //md="4"
        // md="12" 
         style={ windowWidth <= 993 ? selectedChat ? {display:"none"} : {display:"block"} : {display:"block"}}
        md={windowWidth <= 993 ? "12" : "4"}
        >
          <Card className="card-user" id="mychat">
              <CardHeader className="d-flex justify-content-between">
                {/* <h5 className="title mt-1" style={{color:"white"}}>My Chats</h5> */}
                  <Avatar src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" sx={{ width: 40, height: 40 }} />
                <GroupChatModal>
                <Button className="btn btn-success btn-md  mt-1 ml-4 " >
                  Group Chat <AddIcon mr={2} mb={3} ml={5} />
                  </Button>       
                </GroupChatModal>

{/* <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
           <MoreVertIcon />
          </IconButton>
        </Tooltip> */}
              </CardHeader>
            <CardBody>
              <div>
                {
                  chats ?(
                    <Stack scrollBehavior={"smooth"}>
                      {
                        chats?.map((item,index) => (
                          <Box
                          onClick={() => setSelectedChat(item)}
                          cursor="pointer"
                          bg={selectedChat===item?"#6bd098":"#E8E8E8"}
                          color={selectedChat===item?"#fff":"#000"}
                          px={3}
                          py={2}
                          borderRadius={10}
                          key={item?._id}
                          >
                            <Text fontSize={17} fontWeight="bold" p={6}>
                              {!item?.isGroupChat
                              ? item?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ? item?.users[1]?.name:item?.users[0]?.name
                              :item.chatName}
                            </Text>
                            
                          </Box>
                          
                        ))}

                        
                    </Stack>
                  ):(
                    <Spinner color="primary" />
                  )
                }
              </div>
            </CardBody>
          </Card>
        </Col>
  );
}
