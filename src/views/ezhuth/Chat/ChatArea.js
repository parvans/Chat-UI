import ChatBox from 'components/miscellaneous/ChatBox'
import MyChats from 'components/miscellaneous/MyChats'
import SideDrawer from 'components/miscellaneous/SideDrawer'
import { ChatState } from 'context/ChatProvider'
import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import DemoNavbar from "components/Navbars/DemoNavbar.js";

export default function ChatArea() {
    const {user}=ChatState()
  return (
    <>
    <DemoNavbar/>
    <div className="content" style={{marginTop:"70px"}}>
        <div style={{width:"100%"}}>
            {user&& <SideDrawer/>}
            <div style={{display:"flex",justifyContent:"space-between",width:"100%",height:"91.5vh",padding:"10px"}}>
                {user&& <MyChats/>}
                {user&& <ChatBox/>}
            </div>
           
        </div>
    </div>
    </>
  )
}
