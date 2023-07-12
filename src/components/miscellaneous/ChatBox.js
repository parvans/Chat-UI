import { ChatState } from 'context/ChatProvider'
import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col } from 'reactstrap';
import SingleChat from './SingleChat';
import './styles.css'
export default function ChatBox({fetchAgain,setFetchAgain}) {
  const {selectedChat,windowWidth}=ChatState()
  return (
      <Col //md="8" 
      // md="12"
       style={ windowWidth <= 993 ? selectedChat ? {display:"block"} : {display:"none"} : {display:"block"}}
      md={windowWidth <= 993 ? "12" : "8"}
      st
      >
        <Card id='chatbox'>
          <CardBody>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </CardBody>
        </Card>
      </Col>
  )
}
