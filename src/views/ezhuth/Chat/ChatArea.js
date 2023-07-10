import ChatBox from 'components/miscellaneous/ChatBox'
import MyChats from 'components/miscellaneous/MyChats'
import { ChatState } from 'context/ChatProvider'
import React from 'react'
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import { Row } from 'reactstrap';
export default function ChatArea() {
    const {user,selectedChat, setSelectedChat}=ChatState()
    const [fetchAgain,setFetchAgain]=React.useState(false)
  return (
    <>
    <div className="content">
        <div style={{width:"100%"}}>
              <DemoNavbar/>
              <Row style={{display:"flex",justifyContent:"center",width:"100%",height:"91.5vh",padding:"10px",marginLeft:"0px",marginTop:"90px"}}>
                {user&& <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user&& <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
              </Row>
           
        </div>
    </div>




    </>
  )
}
