import { FormControl, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import selcetchat from "../../assets/img/selectchat.png";
import jwtDecode from "jwt-decode";
import ProfileModal from "./ProfileModal";
import GroupUpdateModal from "./GroupUpdateModal";
import { sendUserMessage } from "utilities/apiService";
import { fetcheMessages } from "utilities/apiService";
import "./styles.css"
import ScrollableMessages from "./ScrollableMessages";
import { io } from "socket.io-client";
import Lottie from 'react-lottie';
import typings from '../../../src/animations/typing.json'
import { IconButton, TextField } from "@material-ui/core";
import { InputAdornment } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
//==================================================================>>

const ENDPOINT = "http://192.168.1.41:9000";
var socket,selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const {selectedChat, setSelectedChat,notifications,setNotifications} = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestMessage, setLatestMessage] = useState();
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  // var pp=navigator.onLine;
  // console.log(pp);
  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData:typings,
    rendererSettings:{
      preserveAspectRatio:"xMidYMid slice"
    }
  }

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
      // console.log(messages);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (event) => {
    if(event.key === "Enter" && latestMessage){
      socket.emit('stop typing', selectedChat?._id);
      try {
        // console.log(selectedChat);
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

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', jwtDecode(localStorage.getItem("auth-token")));
    socket.on('connected',()=>setSocketConnection(true))
    socket.on('typing', () =>setIsTyping(true));
    socket.on('stop typing', () =>setIsTyping(false));

  },[])

  // console.log(datas);


  useEffect(() => {
    getMessages();
    // handleUserStatus();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);


  useEffect(() => {
    socket.on('message received', (newMessage) => {
      // console.log(newMessage );
      if(!selectedChatCompare||selectedChatCompare._id!==newMessage.chat._id){
        //notification
        if(!notifications.includes(newMessage)){
          setNotifications([newMessage,...notifications])
          setFetchAgain(!fetchAgain);
        }
      }else{
        setMessages([...messages,newMessage])
      }
    })
  });

  console.log(notifications);
  console.log(selectedChat);

  const handleTyping = (e) => {
    setLatestMessage(e.target.value);

    if(!socketConnection) return;
    if(!typing){
      setTyping(true);
      socket.emit('typing', selectedChat?._id);
    }
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
  };



  
  const onEmojiClick = (e) => {
    const sym=e.unified.split('_'); 
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    if(latestMessage){
      setLatestMessage(latestMessage+emoji);
    }else{
      setLatestMessage(emoji);
    }
  }

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

            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Text fontSize={28} > 
              {/* {selectedChat?.users[1]?.name.toUpperCase()} */}
              {
                selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ? selectedChat?.users[1]?.name.toUpperCase():selectedChat?.users[0]?.name.toUpperCase()
              }
            </Text>
            </div>
            
            
          ) : (
            <Text fontSize={28}>
              {selectedChat?.chatName.toUpperCase()}
            </Text>
          )

          
          
        }
        {
          !selectedChat?.isGroupChat ? (
            <ProfileModal user={selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ? selectedChat?.users[1]:selectedChat?.users[0]}/>
          ) : (
            <GroupUpdateModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetcheMessages={fetcheMessages}/>
          )
        }
        </div>
           
        <div style={{
          display:"flex",flexDirection:"column",justifyContent:"flex-end",
          width:"100%",height:"80vh",overflow:"hidden",
          padding:10,borderRadius:10,backgroundImage:"url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')",
          
        }}>
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
                          
                          <Lottie
                          options={defaultOptions}
                          width={50}
                          height={50}
                          style={{
                            marginBottom: 15,
                            marginLeft: 0
                          }}
                          />
                        </div>
                          
                      ) : (
                        <></>
                      )
                    }
                    {/* <input type="text" className="form-control" placeholder="Type a message" value={latestMessage} onChange={handleTyping} /> */}
                    <TextField  fullWidth id="outlined-basic" variant="outlined"  placeholder="Type a message..." value={latestMessage} onChange={handleTyping}
                    style={{
                      backgroundColor:"#fff",
                      borderRadius:10,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setIsEmoji(!isEmoji)}>
                            {/* <SentimentSatisfiedAltIcon/> */}
                            {
                              isEmoji ? (
                                <EmojiEmotionsIcon/>
                              ):(
                                <SentimentSatisfiedAltIcon/>
                              )
                            }
                          </IconButton>
                          <IconButton onClick={() => sendMessage({key:"Enter"})}>
                            <SendIcon/>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}

                     />
                     {
                        isEmoji &&(
                          <div style={{position:"absolute",bottom:100,right:10}}>
                            <Picker 
                            data={data} 
                            onEmojiSelect={onEmojiClick} />
                          </div>
                        )
                     }
                    {/* <EmojiPicker /> */}
                    
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
