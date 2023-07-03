import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React from "react";
import { Button } from "reactstrap";
import selcetchat from "../../assets/img/selectchat.png";
export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
            <Text
            fontSize={{ base: "28px", md: "30px"}}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"monospace"}
            d="flex"
            justifyContent="space-between"
            alignItems={"center"}>
                {/* <IconButton 
                d={{ base: "flex", md: "none" }}
                icon={<i className="fas fa-arrow-left"></i>}
                onClick={() => setSelectedChat("")}
                /> */}
                <Button className="btn btn-success btn-md  mt-1 ml-4" onClick={() => setSelectedChat("")}>
                <i className="fas fa-arrow-left mr-2"/> 
                Back
                </Button>

            </Text>
        </>
      ) : (
        <div className="text-center">
            <img src={selcetchat} alt="chat"/>
          <h3 style={{ color: "grey", marginTop: "5%" }}>
            Select a chat to start messaging
          </h3>
        </div>
      )}
    </>
  );
}
