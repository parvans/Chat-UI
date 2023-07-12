import { Avatar, Tooltip } from '@chakra-ui/react';
import { isLastMessage } from 'config/ChatLogic';
import { isSameSenderMargin } from 'config/ChatLogic';
import { isSameUser } from 'config/ChatLogic';
import { isSameSender } from 'config/ChatLogic';
import jwtDecode from 'jwt-decode';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import moment from 'moment';
import "./styles.css"
export default function ScrollableMessages({messages}) {
    const userId=localStorage.getItem('auth-token')
    const uId=jwtDecode(userId)?.id;

    const groupedDays = messages.reduce((groups, message) => {
        //const date = moment(message.createdAt).format('DD/MM/YYYY')
        const isSameorAfter= moment(message.createdAt).calendar({
            sameDay: '[Today] ',
            nextDay: '[Tomorrow] ',
            nextWeek: 'dddd',
            lastDay: '[Yesterday] ',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY'
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
            messages: groupedDays[date]
        };
    });
    // console.log(groupArrays);
  return (
     <ScrollableFeed className='scroll-vard'>
        <>
        
        {
            groupArrays.map((group,index)=>(
                <div key={index}>
                    <div className=" date" style={{textAlign:"center",marginTop:"10px",marginBottom:"10px",color:"#adadad", fontWeight:"bold",fontSize:"15px"}}>
                        <span style={{backgroundColor:"#454242",padding:"5px 10px",borderRadius:"10px"}}>
                        
                        {group.date}
                        </span>
                    </div>
                    <div className="messages">
                        {
           group.messages && group.messages.map((message,index)=>(
            <div style={{display:'flex'}} key={message._id}>

                {( isSameSender(group.messages,message,index,uId)|| 
                    isLastMessage(group.messages,index,uId)) &&(
                    <Tooltip
                    label={message.sender.name}
                    placement='bottom-start'
                    color={"white"}
                    borderRadius={"10px"}
                    backgroundColor={"black"}
                    hasArrow>

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
                            {message.sender.name[0]?.toUpperCase()}
                        </div>
                        
                    </Tooltip>
                    
                )}

                <span style={{
                    backgroundColor:`${message.sender._id===uId ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius:"10px",
                padding:"5px 5px",
                maxWidth:"75%",
                marginLeft:isSameSenderMargin(group.messages,message,index,uId),
                marginTop:isSameUser(group.messages,message,index,uId)? 3 : 10,
            }}>{
                message.content
            }
            < br/>
            <small style={{color:"gray",fontSize:"10px", marginLeft:"5px"}}>
                {moment(message.createdAt).format('LT')}
            </small>
            </span>
            
            </div>
            
        ))

        }
                    </div>
                </div>
            ))
        }
        </>
     </ScrollableFeed> 
  )
}
