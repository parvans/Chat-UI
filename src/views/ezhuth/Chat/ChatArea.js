import ChatBox from "components/miscellaneous/ChatBox";
import MyChats from "components/miscellaneous/MyChats";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import { Row } from "reactstrap";
import "./style.css";
export default function ChatArea() {
  const { user, selectedChat, setSelectedChat, windowWidth } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="content">
      {/* <DemoNavbar /> */}
      <Row className="chat">
        {user && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Row>
    </div>
  );
}
