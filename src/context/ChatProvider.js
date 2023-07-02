import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats,setChats]=useState([])
  const history=useHistory()
  useEffect(()=>{
    const userInfo=localStorage.getItem('auth-token')
    setUser(userInfo)
    console.log(userInfo);
    if(!userInfo){
        history?.push('/')
    }
  },[history])
  return (
    <ChatContext.Provider value={{ user, setUser,selectedChat,setSelectedChat,chats,setChats}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
