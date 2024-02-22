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
import "./styles.css";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Spinner } from "reactstrap";
import { useEffect } from "react";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, IconButton } from '@mui/material';
import { useRef } from 'react';
import { position } from '@chakra-ui/react';
import ReadMore from './ReadMore';

export default function ScrollableMessages({ messages }) {
  const userId = localStorage.getItem("auth-token");
  const uId = jwtDecode(userId)?.id;
  const [readMore,setReadMore]=useState(false);
  const [isHovering, setIsHovering] = useState(-1);
  const [scrollUp, setScrollUp] = useState();
  const ref = useRef(null);
  const myRef = useRef();
  const handleMouseOver = (i) => {
    setIsHovering(i);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  

  const groupedDays = messages.reduce((groups, message) => {
    //const date = moment(message.createdAt).format('DD/MM/YYYY')
    const isSameorAfter = moment(message.createdAt).calendar({
      sameDay: "[Today] ",
      nextDay: "[Tomorrow] ",
      nextWeek: "dddd",
      lastDay: "[Yesterday] ",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });
    //console.log(isSameorAfter);
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
  const doClick = () => ref.current?.scrollIntoView({behavior: 'smooth'});

  useEffect(() => {
    const observer=new IntersectionObserver((entries)=>{
      const entry=entries[0];
      setScrollUp(entry.isIntersecting)
      //console.log("entry",entry);
    })
    observer.observe(myRef.current);
  },[])
  //console.log("scrollUp",scrollUp);
  return (
    <ScrollableFeed className="scroll-vard">
      <>
        {groupArrays.map((group, index) => (
          <div key={index}>
            <div className=" date">
              <span className="date-span">{group.date}</span>
            </div>
            <div className="messages">
              {group.messages &&
                group.messages.map((message, index) => (
                  <div style={{ display: "flex" }} key={message._id}>
                    
                    {(isSameSender(group.messages, message, index, uId) ||
                      isLastMessage(group.messages, index, uId)) && (
                        message.chat.isGroupChat && 
                      <Tooltip
                        title={message.sender.name}
                        arrow
                        placement="top-start"
                      >
                        <Avatar src={message.sender?.image} sx={{ width: 40, height: 40 ,marginBottom:"10px",marginRight:"10px"}}/>

                      </Tooltip>
                    )}

                    <div 
                      // onMouseOver={()=>handleMouseOver(message._id)}
                      // onMouseOut={handleMouseOut}
                      className={message.sender._id === uId ? "userMessage" : "recieverMessage"}
                      style={{
                        marginLeft: isSameSenderMargin(group.messages,message,index,uId),
                        marginTop: isSameUser(group.messages,message,index,uId) ? 10 : 15,
                        position:"relative",                     
                      }}
                      >
                      {/* This is for croping the large text messages */}
                      {/* {message.content?.length > 1000 ? (
                        <>
                          {readMore ? (
                            <>
                              {message.content}
                              <span 
                              onClick={()=>setReadMore(false)}
                              style={{color:"#2cbae7",cursor:"pointer",fontSize:"0.8rem",marginLeft:"5px"}}>Read Less</span>
                            </>
                          ) : (
                            <>
                              {message.content.slice(0, 1000)}
                              <span
                              onClick={()=>setReadMore(true)}
                              style={{color:"#2cbae7",cursor:"pointer",fontSize:"0.8rem",marginLeft:"5px"}}>Read More</span>
                            </>
                          )}
                        </>
                      ) : (
                        message.content
                      )} */}

                      <ReadMore item={message} user={uId}>
                        {message.content}
                      </ReadMore>


                      {/* <span key={index}>
                      {
                          isHovering === message._id &&
                           (

                            <KeyboardArrowDownIcon style={{fontSize:"1.5rem",color:"rgb(223 205 205)",cursor:"pointer"}}/>
                            // </div>
                          )
                        }
                      </span> */}
                     
                      
                      <div className="time-stamp">

                      <small
                        style={{
                          color: "rgb(223 205 205)",
                          fontSize: ".6875rem",
                          marginLeft: "5px"
                        }}
                      >
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
                  
                ))}
            </div>
          </div>
        ))}
          { !scrollUp &&  
            <IconButton 
        style={{
          backgroundColor:"#202c33",
          color:"white",width:"40px",
          height:"40px",borderRadius:"50%",
          marginTop:"10px", marginLeft:"auto",
          position:"fixed",bottom:"100px",
          right:"30px",
          zIndex:"1000"

          }}
          onClick={doClick}
           >
          <KeyboardDoubleArrowDownIcon style={{fontSize:"1.4rem",color:"rgb(174, 186, 193)"}}/>
        </IconButton>}
        <div ref={myRef}></div>
        <div ref={ref}></div>
      </>
    </ScrollableFeed>
  );
}
