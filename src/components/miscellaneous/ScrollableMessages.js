import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { isLastMessage } from "config/ChatLogic";
import { isSameSenderMargin } from "config/ChatLogic";
import { isSameUser } from "config/ChatLogic";
import { isSameSender } from "config/ChatLogic";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import { Spinner } from "reactstrap";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
// import { position } from '@chakra-ui/react';
import ReadMore from './ReadMore';
import "./styles.css";

export default function ScrollableMessages({ messages }) {

  const uId = jwtDecode(localStorage.getItem("auth-token"))?.id;
  // const [isHovering, setIsHovering] = useState(-1);
  const [scrollUp, setScrollUp] = useState(false);
  const EndMessage = useRef(null);

  // const handleMouseOver = (i) => {
  //   setIsHovering(i);
  // };

  // const handleMouseOut = () => {
  //   setIsHovering(-1);
  // };

  const groupedDays = messages.reduce((groups, message) => {
    const isSameorAfter = moment(message.createdAt).calendar({
      sameDay: "[Today] ",
      nextDay: "[Tomorrow] ",
      nextWeek: "dddd",
      lastDay: "[Yesterday] ",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });
    const date = isSameorAfter;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const groupArrays = Object.keys(groupedDays).map((date) => {
    return {
      date,
      messages: groupedDays[date],
    };
  });

  //To scroll to bottom on new message
  const doClick = () => EndMessage.current?.scrollIntoView({behavior: 'smooth'});

  const handleScrollToFindTop = async () => {
    let endMessage = EndMessage.current?.getBoundingClientRect(); 
    // 70 is footer height
    let spaceBelow = Math.floor(window.innerHeight - endMessage?.bottom - 70);
    setScrollUp(spaceBelow < -100); // btn go down showing condition in chat message page
 
  }

  return (
    <ScrollableFeed className="scroll-vard" onScroll={handleScrollToFindTop}>
      <>
        {groupArrays.map((group, index) => (
          <div key={index}>
            <div className=" date">
              <span className="date-span">{group.date}</span>
            </div>
            <div className="messages">
              {group.messages && group.messages.map((message, index) => (
                <div style={{ 
                  display: "flex",
                  position: "relative",
                  marginTop: isSameUser(group.messages,message,index,uId) ? 10 : 15,

                   }} key={message._id}>
                  {(isSameSender(group.messages, message, index, uId) ||isLastMessage(group.messages, index, uId)) && (message.chat.isGroupChat && 
                    <Tooltip title={message.sender.name} arrow placement="top-start">
                      <Avatar src={message.sender?.image} sx={{ width: 40, height: 40 ,marginBottom:"10px",marginRight:"10px"}}/>
                    </Tooltip>
                  )}


                  <div className={message.sender._id === uId ? "userMessage" : "recieverMessage"}
                    style={{
                      marginLeft: isSameSenderMargin(group.messages,message,index,uId),
                      position:"relative",                     
                    }}>
                    <div className="messageContent" style={{wordBreak: "break-word"}}>

                      {/* This is for croping the large text messages */}
                      <ReadMore item={message} user={uId}>
                        {message.content}
                      </ReadMore>

                      <div className="time-stamp">

                        <small>
                          {moment(message.createdAt).format("LT")}
                        </small>
                        {
                          // Message Status
                          message.sender._id === uId && 
                          <>
                            {/* For message not sent  */}
                            {message.status==="pending" && <AccessTimeIcon style={{fontSize: ".6879rem", color: "rgb(223 205 205)", marginLeft: "5px"}}/>  }

                            {/* For message send  */}
                            {message.status==="send" && <DoneIcon style={{fontSize: "15px", color: "rgb(223 205 205)", marginLeft: "5px"}}/>   }

                            {/* For message not seen   */}
                            {message.status==="received" && <DoneAllIcon style={{fontSize: "15px", color: "rgb(223 205 205)", marginLeft: "5px"}}/>   }

                            {/* For message seen  */}
                            { message.status==="seen" && <DoneAllIcon style={{fontSize: "15px", color: "rgb(0 230 255)", marginLeft: "5px"}}/> }
                          </>
                        }

                      </div>
                    </div>
                  </div>

                  <div className={message.sender._id === uId ?"cornerRigth":"cornerLeft"}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
        { scrollUp &&  
          <IconButton id='scrollBB' onClick={doClick}>
            <KeyboardDoubleArrowDownIcon style={{fontSize:"1.4rem",color:"rgb(174, 186, 193)"}}/>
          </IconButton>
        }
        <div ref={EndMessage}></div>
      </>
    </ScrollableFeed>
  );
}
