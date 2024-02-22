import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userProfile } from "utilities/apiService";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isRefresh, setIsRefresh] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "info",
    message: "",
    timeout: null,
    location: "",
  });
  const [loading, setLoading] = useState(false);

  //console.log(notifications);
  const fetchUserDetails = async () => {
    const res = await userProfile();
    if (res?.ok) {
      setUserDetails(res?.data?.data);
    }
  };

  const history = useHistory();

  useEffect(() => {
    const userInfo = localStorage.getItem("auth-token");
    setUser(userInfo);
    // console.log(userInfo);
    if (!userInfo) {
      history?.push("/");
    }
    // if(userInfo){
    //     fetchUserDetails()
    // }
  }, [history]);

  useEffect(() => {
    const userInfo = localStorage.getItem("auth-token");
    // if (userInfo) {
    //   fetchUserDetails();
    // }
  });
  // console.log(userDetails);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <ChatContext.Provider
      value={{
        user,setUser,
        selectedChat,setSelectedChat,
        chats,setChats,
        notifications,setNotifications,
        windowWidth,setWindowWidth,
        userDetails,
        isRefresh,setIsRefresh,
        loading, setLoading,
        alert, setAlert,
        isDarkMode, setIsDarkMode
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
