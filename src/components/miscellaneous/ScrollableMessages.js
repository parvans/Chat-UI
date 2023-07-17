import { Avatar } from "@chakra-ui/react";
import Tooltip from '@mui/material/Tooltip';
import { isLastMessage } from "config/ChatLogic";
import { isSameSenderMargin } from "config/ChatLogic";
import { isSameUser } from "config/ChatLogic";
import { isSameSender } from "config/ChatLogic";
import jwtDecode from "jwt-decode";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";
import "./styles.css";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Spinner } from "reactstrap";
export default function ScrollableMessages({ messages }) {
  const userId = localStorage.getItem("auth-token");
  const uId = jwtDecode(userId)?.id;

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

  // console.log(groupedDays);
  const groupArrays = Object.keys(groupedDays).map((date) => {
    return {
      date,
      messages: groupedDays[date],
    };
  });
  //  console.log(groupArrays);
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
                      <Tooltip
                        title={message.sender.name}
                        arrow
                        placement="top-start"
                      >
                        <div className="user-avatar" style={{backgroundColor: `${message.sender._id === uId ? "#BEE3F8" : "#B9F5D0"}`}}>
                          {message.sender.name[0]?.toUpperCase()}
                        </div>
                      </Tooltip>
                    )}

                    <span
                      style={{
                        backgroundColor: `${
                          message.sender._id === uId ? "#BEE3F8" : "#B9F5D0"
                        }`,
                        borderRadius: `${   
                          message.sender._id === uId
                          ? "10px 0px 10px 10px"
                          : "0px 10px 10px 10px"
                        }`,
                        


                        padding: "5px 5px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(
                          group.messages,
                          message,
                          index,
                          uId
                        ),
                        marginTop: isSameUser(
                          group.messages,
                          message,
                          index,
                          uId
                        )
                          ? 3
                          : 10,
                      }}
                    >
                      {message.content}
                      <br />
                      <div className="time-stamp">

                      <small
                        style={{
                          color: "gray",
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
                            {message.status==="pending" && <AccessTimeIcon style={{fontSize: ".6879rem", color: "gray", marginLeft: "5px"}}/>  }

                            {/* For message send  */}
                             {message.status==="send" && <DoneIcon style={{fontSize: "15px", color: "gray", marginLeft: "5px"}}/>   }

                            {/* For message not seen   */}
                            {message.status==="received" && <DoneAllIcon style={{fontSize: "15px", color: "gray", marginLeft: "5px"}}/>   }

                            {/* For message seen  */}
                            { message.status==="seen" && <DoneAllIcon style={{fontSize: "15px", color: "#2cbae7", marginLeft: "5px"}}/> }
                        </>

                        
                      }


                      </div>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </>
    </ScrollableFeed>
  );
}
