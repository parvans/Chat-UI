import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Text, Textarea } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import selcetchat from "../../assets/img/selectchat.png";
import { getSender } from "config/ChatLogic";
import jwtDecode from "jwt-decode";
import ProfileModal from "./ProfileModal";
import GroupUpdateModal from "./GroupUpdateModal";
import { event } from "jquery";
import { sendUserMessage } from "utilities/apiService";
import { fetcheMessages } from "utilities/apiService";
import "./styles.css"
import ScrollableMessages from "./ScrollableMessages";
export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const {selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestMessage, setLatestMessage] = useState();

  const getMessages = async () => {
    if(!selectedChat) return;
    try {
      setLoading(true);
      const res = await fetcheMessages(selectedChat?._id);
      if(res.ok){
        setMessages(res?.data?.data);
        setLoading(false);
      }
      console.log(messages);
    } catch (error) {
      console.log(error);
    }
  }
  const sendMessage = async (event) => {
    if(event.key === "Enter" && latestMessage){
      try {
        console.log(selectedChat);
        const res=await sendUserMessage({
          chatId:selectedChat?._id,
          cotent:latestMessage
        })
        // console.log(res?.data?.data);
        setLatestMessage("")
        if(res.ok){
          setMessages([...messages,res?.data?.data])
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleMessage = async (e) => {
    setLatestMessage(e.target.value);
  };

  useEffect(() => {
    getMessages();
  }, [selectedChat]);
  return (
    <>
      {selectedChat ? (
        <>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Button className="btn btn-success btn-round" outline onClick={() => setSelectedChat("")}>
          <i className="fas fa-arrow-left"/> 
        </Button>
        {
          !selectedChat?.isGroupChat ? (
            <Text fontSize={28} > 
              {selectedChat?.users[1]?.name.toUpperCase()}
            </Text>
          ) : (
            <Text fontSize={28}>
              {selectedChat?.chatName.toUpperCase()}
            </Text>
          )

          
          
        }
        {
          !selectedChat?.isGroupChat ? (
            <ProfileModal user={selectedChat?.users[1]}/>
          ) : (
            <GroupUpdateModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetcheMessages={fetcheMessages}/>
          )
        }
        </div>
           
        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",width:"100%",height:"80vh",overflow:"hidden",backgroundColor:"#fff",padding:10,borderRadius:10}}>
        {
                loading ? (
                  <Spinner color="primary"/>

                ):(
                  <div className="messages">
                    <ScrollableMessages messages={messages}/>
                    </div>
                )}
                  <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                    <input type="text" className="form-control" placeholder="Type a message" value={latestMessage} onChange={handleMessage} />
                    {/* <Textarea placeholder="Type a message" value={latestMessage} onChange={handleMessage} /> */}
                 </FormControl>
        </div>
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
