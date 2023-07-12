import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats,setChats]=useState([])
  const [notifications,setNotifications]=useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const history=useHistory()

  useEffect(()=>{
    const userInfo=localStorage.getItem('auth-token')
    setUser(userInfo)
    // console.log(userInfo);
    if(!userInfo){
        history?.push('/')
    }
  },[history])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <ChatContext.Provider value={{ user, setUser,selectedChat,setSelectedChat,chats,setChats,notifications,setNotifications,windowWidth, setWindowWidth}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
