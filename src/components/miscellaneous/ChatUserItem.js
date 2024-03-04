import { Avatar, Box, Divider } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ChatState } from "context/ChatProvider";
import moment from "moment";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import "./styles.css"
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledBadge1 = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#00a884',
    color: 'white',
    // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  //   '&::after': {
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     width: '100%',
  //     height: '100%',

  //     borderRadius: '50%',
  //     animation: 'ripple 1.2s infinite ease-in-out',
  //     border: '1px solid currentColor',
  //     content: '""',
  //   },
  // },
  // '@keyframes ripple': {
  //   '0%': {
  //     transform: 'scale(.8)',
  //     opacity: 1,
  //   },
  //   '100%': {
  //     transform: 'scale(2.4)',
  //     opacity: 0,
  //   },
  },
}));

export default function ChatUserItem({type=false, name, image, onClick,chat}) {
  const userId = localStorage.getItem("auth-token");
  const uId = jwtDecode(userId)?.id;
  const {notifications,setNotifications}=ChatState()
  // const [single,setSingle]=useState([])

  

  // useEffect(()=>{
  //   const singleUser=notifications?.filter((item)=>item.chat._id===chat._id)
  //   setSingle(singleUser)
  //   document.title=`${notifications?.length>0 ? `(${notifications?.length})` : ""} Chatbot`
  // },[notifications])
  
  // console.log(single);
  return (
    <div className="chat-user-item" style={{height:`${type ? "5vh" : "7vh"}`}}>
    <Box onClick={onClick} style={{ cursor: "pointer" }} className="chat-user-item">
      <div style={{ display: "flex", flexDirection: "row" }}>
      {/* <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      > */}
        <Avatar src={image} sx={{width: 50,height: 50,borderRadius: "50%",marginRight: "1rem"}} />
      {/* </StyledBadge> */}
        
        <div style={{display: "flex",flexDirection: "column",marginLeft: "1rem",overflow: "hidden",textOverflow: "ellipsis",whiteSpace: "nowrap",width: "100%"}}>
          <span style={{fontSize: "1.2rem",fontWeight: "bold",color: "white",overflow: "hidden",textOverflow: "ellipsis"}}>
            {name}
          </span>

          {!type && <div style={{display: "flex",flexDirection: "row"}}>
            {
              chat?.latestMessage?.sender._id === uId &&(
                <>
                {/* For message not sent  */}
                {chat?.latestMessage?.status==="pending" && <AccessTimeIcon style={{fontSize: ".6879rem", color: "gray",marginRight:"0.2rem",marginTop:"1px"}}/>  }

                {/* For message send  */}
                {chat?.latestMessage?.status==="send" && <DoneIcon style={{fontSize: "17px", color: "gray",marginRight:"0.2rem",marginTop:"1px"}}/>  }

                {/* For message not seen   */}
                {chat?.latestMessage?.status==="received" && <DoneAllIcon style={{fontSize: "17px", color: "gray",marginRight:"0.2rem",marginTop:"1px"}}/>   }

                {/* For message seen  */}
                { chat?.latestMessage?.status==="seen" && <DoneAllIcon style={{fontSize: "17px", color: "#2cbae7",marginRight:"0.2rem",marginTop:"1px"}}/> }
                </>
              )
            }
            {
              chat?.isGroupChat &&(
                <span style={{ fontSize: "0.8rem", color: "#aebac1",marginRight:"1rem" }}>
                  {
                    chat?.latestMessage?.sender._id === uId ? "You: " : chat?.latestMessage?.sender?.name + ": "
                  }
                </span>
              )
            }
            <span style={{ fontSize: "0.8rem", color: "#aebac1" }}>
              {
                chat?.latestMessage?.content
              }
            </span>
            {/* <span style={{ fontSize: "0.8rem", color: "#00a884" }}>
              typing . . .
            </span> */}
          </div>}
        </div>
        <div style={{display: "flex",flexDirection: "column",marginLeft: "auto",marginRight: "1rem",alignItems: "center",justifyContent: "center"}}>
          <span style={{ fontSize: "0.8rem", color: `${chat?.unReadMsgCount>0 ? "#00a884" : "#aebac1"}`
          ,
          whiteSpace: "nowrap"}}>
            { chat?.latestMessage?.createdAt &&
            moment(chat?.latestMessage?.createdAt).format("hh:mm A")
            }
            </span>
            { chat?.unReadMsgCount>0 &&
              <StyledBadge1 
              badgeContent={chat?.unReadMsgCount>99 ? "99+" : chat?.unReadMsgCount}
              style={{backgroundColor: "#00a884"}}
              color="success"
               sx={{marginTop: "1rem",whiteSpace: "nowrap"}}>
            </StyledBadge1>}

          
        </div>
        
      </div>
    </Box>
      <Divider style={{ marginTop: "1rem", backgroundColor: "rgb(55 55 56)" }} />
    </div>
  );
}
