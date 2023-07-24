import { Avatar, Badge, Box, Divider } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ChatState } from "context/ChatProvider";
import moment from "moment";

export default function ChatUserItem({ name, image, date, onClick,chat}) {
  //  console.log(chat);
  const userId = localStorage.getItem("auth-token");
  const uId = jwtDecode(userId)?.id;
  const {notifications,setNotifications}=ChatState()
  const [singleNotification,setSingleNotification]=React.useState([])

  // useEffect(()=>{
  //   const singleNotification=notifications?.filter((item)=>item?.chatId===chat?._id)
  //   setSingleNotification(singleNotification)
  //   console.log(singleNotification);
  // })
  return (
    <>
    <Box onClick={onClick} style={{ cursor: "pointer" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Avatar src={image} sx={{width: 50,height: 50,borderRadius: "50%",marginRight: "1rem"}} />
        
        <div style={{display: "flex",flexDirection: "column",marginLeft: "1rem",overflow: "hidden",textOverflow: "ellipsis",whiteSpace: "nowrap",width: "100%"}}>
          <span style={{fontSize: "1.2rem",fontWeight: "bold",color: "white",overflow: "hidden",textOverflow: "ellipsis"}}>
            {name}
          </span>
          <div style={{display: "flex",flexDirection: "row"}}>
            {
              chat.latestMessage?.sender._id === uId &&(
                <>
                {/* For message not sent  */}
                {chat.latestMessage?.status==="pending" && <AccessTimeIcon style={{fontSize: ".6879rem", color: "gray",marginRight:"0.2rem",marginTop:"1px"}}/>  }

                {/* For message send  */}
                {chat.latestMessage?.status==="send" && <DoneIcon style={{fontSize: "17px", color: "gray",marginRight:"0.2rem",marginTop:"1px"}}/>  }

                {/* For message not seen   */}
                {chat.latestMessage?.status==="received" && <DoneAllIcon style={{fontSize: "17px", color: "gray",marginRight:"0.2rem",marginTop:"1px"}}/>   }

                {/* For message seen  */}
                { chat.latestMessage?.status==="seen" && <DoneAllIcon style={{fontSize: "17px", color: "#2cbae7",marginRight:"0.2rem",marginTop:"1px"}}/> }
                </>
              )
            }
          {
            chat.isGroupChat &&(
              <span style={{ fontSize: "0.8rem", color: "#aebac1",marginRight:"1rem" }}>
                {
                  chat.latestMessage?.sender._id === uId ? "You: " : chat.latestMessage?.sender.name + ": "
                }
              </span>
            )
            }
          <span style={{ fontSize: "0.8rem", color: "#aebac1" }}>
            {
              chat.latestMessage?.content
            }
          </span>
          </div>
        </div>
        <div style={{display: "flex",flexDirection: "column",marginLeft: "auto",marginRight: "1rem",alignItems: "center",justifyContent: "center"}}>
          <span style={{ fontSize: "0.8rem", color: "#aebac1",whiteSpace: "nowrap"}}>
            { chat?.latestMessage?.createdAt &&
            moment(chat?.latestMessage?.createdAt).format("hh:mm A")
            }
            </span>
            { notifications?.length>0 &&
              <Badge 
              badgeContent={notifications?.length}
              color="success" sx={{marginTop: "1rem",whiteSpace: "nowrap"}}>
            </Badge>}

          
        </div>
        
      </div>
    </Box>
      <Divider style={{ marginTop: "1rem", backgroundColor: "#aebac1" }} />
    </>
  );
}
