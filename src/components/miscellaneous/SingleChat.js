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
import { io } from "socket.io-client";
import EmojiPicker from 'emoji-picker-react';
import Lottie from 'react-lottie';
import typing from '../../../src/animations/typing.json'
const ENDPOINT = "http://localhost:6060";
var socket,selectedChatCompare;
export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const {selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestMessage, setLatestMessage] = useState();
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData:typing,
    rendererSettings:{
      preserveAspectRatio:"xMidYMid slice"
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', jwtDecode(localStorage.getItem("auth-token")));
    socket.on('connected',()=>setSocketConnection(true))
    socket.on('typing', () =>setIsTyping(true));
    socket.on('stop typing', () =>setIsTyping(false));
  },[])

  const getMessages = async () => {
    if(!selectedChat) return;
    try {
      setLoading(true);
      const res = await fetcheMessages(selectedChat?._id);
      if(res.ok){
        setMessages(res?.data?.data);
        setLoading(false);
        socket.emit('join room', selectedChat?._id);
      }
      console.log(messages);
    } catch (error) {
      console.log(error);
    }
  }
  const sendMessage = async (event) => {
    if(event.key === "Enter" && latestMessage){
      socket.emit('stop typing', selectedChat?._id);
      try {
        console.log(selectedChat);
        const res=await sendUserMessage({
          chatId:selectedChat?._id,
          cotent:latestMessage
        })
        // console.log(res?.data?.data);
        setLatestMessage("")
        if(res.ok){
          socket.emit('new message', res?.data?.data);
          setMessages([...messages,res?.data?.data])
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTyping = (e) => {
    setLatestMessage(e.target.value);

    if(!socketConnection) return;
    if(!typing){
      setTyping(true);
      socket.emit('typing', selectedChat?._id);
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit('stop typing', selectedChat?._id);
          setTyping(false);
        }
      }, timerLength);
    }
  };



  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessage) => {
      if(!selectedChatCompare||selectedChatCompare._id!==newMessage.chat._id){
        //notification
      }else{
        setMessages([...messages,newMessage])
      }
    })
  });

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
              {/* {selectedChat?.users[1]?.name.toUpperCase()} */}
              {
                selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ? selectedChat?.users[1]?.name.toUpperCase():selectedChat?.users[0]?.name.toUpperCase()
              }
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
                    {
                      isTyping ? (
                        <div>
                          {/* <Lottie
                          options={defaultOptions}
                          width={50}
                          height={50}
                          style={{
                            marginBottom: 15,
                            marginLeft: 0
                          }}
                          /> */}
                          typing ...
                        </div>
                          
                      ) : (
                        <></>
                      )
                    }
                    <input type="text" className="form-control" placeholder="Type a message" value={latestMessage} onChange={handleTyping} />
                    {/* <EmojiPicker /> */}
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
