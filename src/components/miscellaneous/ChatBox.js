import { Box } from '@chakra-ui/react';
import { ChatState } from 'context/ChatProvider'
import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

export default function ChatBox() {
  const {selectedChat}=ChatState()
  console.log(selectedChat);
  return (
    // <div>
    //   {selectedChat?.messages?.map((item)=>(
    //     <div key={item?._id}>
    //       <p>{item?.message}</p>
    //     </div>
    //   ))}
    // </div>
      <Col md="8">
        <Card style={{backgroundColor:"#dee0df",height:"100%"}}>
          <CardHeader>
            <CardTitle tag="h4">Chat Box</CardTitle>
          </CardHeader>
          <CardBody>
          </CardBody>
        </Card>
      </Col>
  )
}
