import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Spinner } from "reactstrap";
import { getChats } from "utilities/apiService";
import jwtDecode from "jwt-decode";
import { getSender } from "config/ChatLogic";
import GroupChatModal from "./GroupChatModal";
export default function MyChats({fetchAgain,setFetchAgain}) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, user, setSelectedChat, chats, setChats } = ChatState();
  const userId=jwtDecode(localStorage.getItem("auth-token"))
  // console.log(userId);
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
        <Col md="4">
          <Card className="card-user" style={{backgroundColor:"black",height:"100%"}}>
              <CardHeader className="d-flex justify-content-between">
                <h5 className="title mt-1" style={{color:"white"}}>My Chats</h5>
                <GroupChatModal>
                <Button className="btn btn-success btn-md  mt-1 ml-4 " >
                  Group Chat <AddIcon mr={2} mb={3} ml={5} />
                  </Button>       
                </GroupChatModal>
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
