import { Avatar, Tooltip } from '@chakra-ui/react';
import { isLastMessage } from 'config/ChatLogic';
import { isSameSenderMargin } from 'config/ChatLogic';
import { isSameUser } from 'config/ChatLogic';
import { isSameSender } from 'config/ChatLogic';
import jwtDecode from 'jwt-decode';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

export default function ScrollableMessages({messages}) {
    const userId=localStorage.getItem('auth-token')
    const uId=jwtDecode(userId)?.id;
  return (
    <ScrollableFeed>
        {
            messages && messages.map((message,index)=>(
                <div style={{display:'flex'}} key={message._id}>
                    {/* {
                        message.sender._id===uId ? (
                            <div className="message-sender">
                                <p>{message.content}</p>
                            </div>
                        ):(
                            <div className="message-receiver">
                                <p>{message.content}</p>
                            </div>
                        )

                    } */}

                    {( isSameSender(messages,message,index,uId)|| 
                        isLastMessage(messages,index,uId)) &&(
                        <Tooltip
                        label={message.sender.name}
                        placement='bottom-start'
                        color={"white"}
                        borderRadius={"10px"}
                        backgroundColor={"black"}
                        hasArrow>
                            {/* <Avatar
                            mt="7px"
                            mr={1}
                            size="sm"
                            cursor="pointer"
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            width="30px"
                            height="30px"
                            name={message.sender.name}
                            /> */}

                            <div style={{
                                backgroundSize:"cover",
                                backgroundPosition:"center",
                                width:"30px",
                                height:"30px",
                                borderRadius:"50%",
                                marginTop:"10px",
                                marginRight:"5px",
                                cursor:"pointer",
                                backgroundColor:`${message.sender._id===uId ? "#BEE3F8" : "#B9F5D0"}`,
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                fontWeight:"bold",
                            }}>
                                {message.sender.name[0]}
                            </div>
                            
                        </Tooltip>
                        
                    )}

                    <span style={{
                        backgroundColor:`${message.sender._id===uId ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    borderRadius:"10px",
                    padding:"5px 5px",
                    maxWidth:"75%",
                    marginLeft:isSameSenderMargin(messages,message,index,uId),
                    marginTop:isSameUser(messages,message,index,uId)? 3 : 10,
                }}>{
                    message.content
                }
                < br/>
                <small style={{color:"gray",fontSize:"10px", marginLeft:"5px"}}>
                    {new Date(message.createdAt).toLocaleTimeString()}
                </small>
                </span>
                </div>
            ))
        }
    </ScrollableFeed>
  )
}
