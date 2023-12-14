import { ChatState } from "context/ChatProvider";
import jwtDecode from "jwt-decode";
import React from "react";

export default function Notify({ notification, handleFunction }) {
    const {setSelectedChat,notifications,setNotifications}=ChatState()

  return (
    <div
      key={notification._id}
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#E5E5E5",
        marginTop: "10px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={() => {
        setSelectedChat(notification.chat)
        setNotifications(notifications.filter((item)=>item!==notification))
      }
    }
    >
        <div style={{display:"flex",flexDirection:"column",padding:10}}>
            {notification?.chat?.isGroupChat ? 
            (<div style={{
                backgroundSize:"cover",
                backgroundPosition:"center",
                width:"40px",
                height:"40px",
                borderRadius:"50%",
                marginRight:"5px",
                cursor:"pointer",
                backgroundColor:"#BEE3F8",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontWeight:"bold"}}>
                {notification?.chat?.chatName[0]}
            </div>):(
            <div style={{
                backgroundSize:"cover",
                backgroundPosition:"center",
                width:"40px",
                height:"40px",
                borderRadius:"50%",
                marginRight:"5px",
                cursor:"pointer",
                backgroundColor:"#B9F5D0",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontWeight:"bold"}}>
                {
                notification?.chat?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ?
                notification?.chat?.users[1]?.name[0]:notification.chat?.users[0]?.name[0]
                }
            </div>)}
        </div>
        <div style={{display: "flex",flexDirection: "column",padding:10}}>
            <h6 style={{ margin: "0px" }}>
                {notification?.chat?.isGroupChat
                ? notification?.chat?.chatName
                : notification.chat?.users[0]._id ===
                jwtDecode(localStorage.getItem("auth-token")).id
                ? notification.chat?.users[1]?.name
                : notification.chat?.users[0]?.name}
            </h6>
            <p style={{ margin: "0px" }}>{ notification?.content?.length>20 ? notification?.content?.slice(0,20)+"..." : notification?.content}</p>
      </div>
    </div>
  );
}
