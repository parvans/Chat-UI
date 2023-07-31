import { FormControl, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "reactstrap";
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
import { IconButton } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { Avatar, InputAdornment } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import message1 from '../../assets/audio/message1.mp3'
import useSound from 'use-sound';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//==================================================================>>

const ENDPOINT = "http://192.168.1.66:9000";
var socket,selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const {selectedChat, setSelectedChat,notifications,setNotifications,isRefresh,setIsRefresh} = ChatState();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestMessage, setLatestMessage] = useState();
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  const [play] = useSound(message1);

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

  const handleMessageSend = (messageId) => {
    socket.emit('messageSend',messageId);
  }

  const handleMessageSeen = (messageId) => {
    socket.emit('messageSeen',messageId);
  }

  const handleMessageReceived = (messageId) => {
    socket.emit('messageReceived',messageId);
  }

  const handleAllMessagesSeen = () => {
    socket.emit('allMessageSeen',selectedChat?._id);
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
        socket.on('message received',(newMessage) => {
          if(newMessage){
             play();
             setIsRefresh(!isRefresh);
          }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }


  const sendMessage = async (event) => {
    // if(event.key === "Enter" && latestMessage){
      socket.emit('stop typing', selectedChat?._id);
      
      try {
        const res=await sendUserMessage({
          chatId:selectedChat?._id,
          cotent:latestMessage
        })
        setLatestMessage("")
        if(res.ok){
          setIsRefresh(!isRefresh);
          handleMessageSend(res?.data?.data?._id); 
          socket.emit('new message', res?.data?.data);
          setMessages([...messages,res?.data?.data])
        }
        
      } catch (error) {
        console.log(error);
      }
    // }
  };



  const handleOnlineStatus = (chat) => {
    if(!chat) return;
    const chatMembers=chat?.users.find((user)=>user._id!==jwtDecode(localStorage.getItem("auth-token")).id);
    const online=onlineUsers.find((user)=>user.userId===chatMembers._id);
    return online? true:false;
  }
  


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', jwtDecode(localStorage.getItem("auth-token")));
    socket.on('get-users', (users) => {
      setOnlineUsers(users);
    });
    socket.on('connected',()=>setSocketConnection(true))
    socket.on('typing', () =>setIsTyping(true));
    socket.on('stop typing', () =>setIsTyping(false));

  },[])

  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
    handleOnlineStatus();

  }, [selectedChat]);

  
  useEffect(() => {
    socket.on('message received',(newMessage) => {
      if(newMessage){
        setIsRefresh(!isRefresh);
      }
      if(!selectedChatCompare||selectedChatCompare._id!==newMessage.chat._id){
        //notification
        if(!notifications.includes(newMessage)){
          setIsRefresh(!isRefresh);
          setNotifications([newMessage,...notifications]);
          setFetchAgain(!fetchAgain);

        }
        handleMessageSend(newMessage?._id);
        setTimeout(() => {
        handleMessageReceived(newMessage?._id);
        }, 1000);
      }else{
        setMessages([...messages,newMessage])
        handleMessageSeen(newMessage?._id);
        handleAllMessagesSeen();
      }
    })
    
    socket.on('messageStatusUpdated',(updatedMessage) => {
      setMessages(prevMessages=>prevMessages.map(message=>message?._id===updatedMessage?._id?updatedMessage:message))
    })


  });

 //console.log(notifications);

  


  

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
    <div style={{width:"100%",height:"100%"}}>
      {selectedChat ? (
        <>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",height:"12vh",color:"white"}}>
          <ArrowBackIcon  style={{ color: "#d1d7db",cursor:"pointer",marginTop:"3px" }} onClick={() => setSelectedChat("")}/>
          {/* {
            !selectedChat?.isGroupChat ? (

            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Text fontSize={28} > 
              {
                selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ?
                 selectedChat?.users[1]?.name.toUpperCase():selectedChat?.users[0]?.name.toUpperCase()
              }
            </Text>
            <Text fontSize={12} color="gray.500">
            {
              handleOnlineStatus(selectedChat) ? (
                <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <div style={{width:10,height:10,borderRadius:10,backgroundColor:"green",marginRight:5}}/>
                Online
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <div style={{width:10,height:10,borderRadius:10,backgroundColor:"red",marginRight:5}}/>
                Offline
                </div>
              )
            }
              </Text>
              </div>
              
              
            ) : (
            <Text fontSize={28}>
              {selectedChat?.chatName.toUpperCase()}
            </Text>
          )} */}
          <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Avatar src={
              selectedChat?.isGroupChat ? (
                selectedChat?.chatImage
              ) : (
                selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ?
                selectedChat?.users[1]?.image:selectedChat?.users[0]?.image
              )

              } sx={{width: 50,height: 50,marginRight: "1rem"}} />
            <div style={{display:"flex",flexDirection:"column"}}>
            <Text fontSize={20} mt={30}>
              {
                selectedChat?.isGroupChat ? (
                  selectedChat?.chatName.toUpperCase()
                ) : (
                  selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ?
                  selectedChat?.users[1]?.name.toUpperCase():selectedChat?.users[0]?.name.toUpperCase()
                )
              }
            <p style={{fontSize:12,color:"gray"}}>
            {
              !isTyping? handleOnlineStatus(selectedChat) && "Online" : "typing..."
            }
            </p>
            </Text>
              </div>
          </div>

          {/* {
            !selectedChat?.isGroupChat ? (
              <ProfileModal user={selectedChat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ? selectedChat?.users[1]:selectedChat?.users[0]}/>
            ) : (
              <GroupUpdateModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetcheMessages={fetcheMessages}/>
            )
          } */}
        </div>
           
        <div style={{
          display:"flex",flexDirection:"column",justifyContent:"flex-end",
          width:"100%",height:"87vh",overflow:"hidden",
          padding:10,borderRadius:10,
          // backgroundImage:"url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')"
        }}
          >
        {
            <>
            <div className="messages">
              {
                loading ?(
                  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
               <CircularProgress color="inherit" />
                </Backdrop>
                ):(
                  <ScrollableMessages messages={messages}/>
                )
              }
            </div>
                  <FormControl 
                 // onKeyDown={sendMessage} 
                  isRequired mt={3}>
                    {/* { 
                      isTyping ? (<div><Lottie options={defaultOptions} width={50} height={50} style={{marginBottom: 15,marginLeft: 0}}/></div>
                      ) : (
                        <></>
                      )
                    } */}
                    <TextField  fullWidth id="outlined-basic" variant="outlined"  placeholder="Type a message..." value={latestMessage} onChange={handleTyping}
                     multiline
                     maxRows={4}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#202c33",
                      marginBottom: "1rem",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#182329",
                      },
      
                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#182329",
                        },
      
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#182329",
                        },
      
                      "& .MuiOutlinedInput-input": {
                        color: "#aebac1",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* <AttachFileIcon style={{color:"#aebac1"}}/> */}
                          <IconButton onClick={() => {
                            // play()
                            setIsEmoji(!isEmoji)}}>
                            {/* <SentimentSatisfiedAltIcon/> */}
                            {
                              isEmoji ? (
                                <EmojiEmotionsIcon style={{color:"#aebac1"}} />
                              ):(
                                <SentimentSatisfiedAltIcon style={{color:"#aebac1"}}/>
                              )
                            }
                          </IconButton>
                          {
                            latestMessage?.length>0 && (
                            <IconButton onClick={() => sendMessage()}>
                            <SendIcon style={{color:"#aebac1"}}/>
                          </IconButton>
                            )
                          }
                        </InputAdornment>
                      ),
                    }}

                     />
                     {
                        isEmoji &&(
                          <div style={{position:"absolute",bottom:300,right:16}}>
                            <Picker 
                            data={data} 
                            onEmojiSelect={onEmojiClick}
                            width={300}
                             />
                          </div>
                        )
                     }
                    
                 </FormControl>
                 </>
                 
        }
        </div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "15%" }}>
            <img src={selcetchat} alt="chat" width={400} height={400} />
          <h1 style={{ color: "grey"}}>
            Chatbot <Badge color="dark">Beta</Badge>
          </h1>
          <p style={{ color: "grey" }}>
          Send and receive messages without keeping your phone online.
          <br />
          Chat with your friends with ease and convenience.
          </p>
        </div>
      )}
    </div>
  );
}
