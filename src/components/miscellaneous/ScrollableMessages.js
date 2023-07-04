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
                    {
                        message.sender._id===uId ? (
                            <div className="message-sender">
                                <p>{message.content}</p>
                            </div>
                        ):(
                            <div className="message-receiver">
                                <p>{message.content}</p>
                            </div>
                        )
                    }
                </div>
            ))
        }
    </ScrollableFeed>
  )
}
