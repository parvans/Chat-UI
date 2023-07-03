import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React from "react";
import { Button } from "reactstrap";
import selcetchat from "../../assets/img/selectchat.png";
import { getSender } from "config/ChatLogic";
import jwtDecode from "jwt-decode";
import ProfileModal from "./ProfileModal";
import GroupUpdateModal from "./GroupUpdateModal";
export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
            <Text
            fontSize={28}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"monospace"}
            d="flex"
            justifyContent="space-between"
            alignItems={"center"}>
                <Button className="btn btn-success btn-round mt-1 ml-4" outline onClick={() => setSelectedChat("")}>
                <i className="fas fa-arrow-left"/> 
                </Button>
                {
                    !selectedChat?.isGroupChat ? (
                        <>
                        {selectedChat?.users[1]?.name.toUpperCase()}
                        <ProfileModal user={selectedChat?.users[1]}/>
                        </>
                    ):(
                        <>
                        {selectedChat?.chatName.toUpperCase()}
                        <GroupUpdateModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                        </>
                    )
                }
            </Text>
            <Box 
            d="flex"
            flexDir={"column"}
            justifyContent="flex-end"
            p={3}
            bg={"#fff"}
            w={"100%"}
            borderRadius={10}
            overflow={"hidden"}
            h={"80vh"}
            >
            </Box>
        </>
      ) : (
        <div className="text-center mt-5">
            <img src={selcetchat} alt="chat"/>
          <h3 style={{ color: "grey", marginTop: "5%" }}>
            Select a chat to start messaging
          </h3>
        </div>
      )}
    </>
  );
}
