import { ChatState } from 'context/ChatProvider'
import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col } from 'reactstrap';
import SingleChat from './SingleChat';

export default function ChatBox({fetchAgain,setFetchAgain}) {
  const {selectedChat}=ChatState()
  console.log(selectedChat);
  return (
      <Col md="8">
        <Card style={{backgroundColor:"#dee0df",height:"100%"}}>
          {/* <CardHeader style={{backgroundColor:"#6bd098"}}>
            <CardTitle tag="h4"style={{color:'white'}}>Chat Box</CardTitle>
          </CardHeader> */}
          <CardBody>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </CardBody>
        </Card>
      </Col>
  )
}
