import ChatBox from "components/miscellaneous/ChatBox";
import MyChats from "components/miscellaneous/MyChats";
import { ChatState } from "context/ChatProvider";
import React, { useState } from "react";
import { Row } from "reactstrap";
import "./style.css";
export default function ChatArea() {
  const { user,isDarkMode} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="content">
      {/* <DemoNavbar /> */}
      <Row className={!isDarkMode ? "light-chat" : "chat"}>
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
