// import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import { getChats } from "utilities/apiService";
import jwtDecode from "jwt-decode";
import { getSender } from "config/ChatLogic";
import GroupChatModal from "./GroupChatModal";
import "./styles.css";
import useSound from "use-sound";
import message1 from "../../assets/audio/message1.mp3";
import Avatar from "@mui/material/Avatar";
import {Divider,IconButton,Input,InputAdornment,ListItemIcon,Menu,MenuItem,TextField,Tooltip} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import Profile from "components/Profile";
import ChatUserItem from "./ChatUserItem";
import moment from "moment";
import ScrollableFeed from "react-scrollable-feed";
import { getUsers } from "utilities/apiService";
import { accessChat } from "utilities/apiService";
import Group from "components/Group";
import Confetti from 'react-confetti'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
export default function MyChats({ fetchAgain, setFetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat,user,setSelectedChat,chats,setChats,windowWidth,
  userDetails,isRefresh,setIsRefresh,notifications,setNotifications,isDarkMode, setIsDarkMode} = ChatState();

  const userId = jwtDecode(localStorage.getItem("auth-token"));
  const [play] = useSound(message1);
  const [searchMode, setSearchMode] = useState(false);
  const [profileMode, setProfileMode] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const open = Boolean(anchorEl);

  //console.log(userDetails);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchChat = async () => {
    try {
      const res = await getChats();
      if (res?.ok) {
        setChats(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear("ezuth-token");
    window.location.href = "/auth/login";
  };

  const handleSearch = async (value) => {
    // e.preventDefault()
    // if(!search){
    //   toast.error("please enter something to search")
    // }else{
    try {
      setLoading(true);
      const res = await getUsers(value);
      if (res?.ok) {
        console.log(res?.data?.data);
        setSearchResult(res?.data?.data);
      }
      if (res?.data?.data?.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
    handleSearch(searchText);
    },500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const accessUserChat = async (id) => {
    // console.log(id);
    try {
      // setLoadingChat(true)
      const chatRes = await accessChat(id);
      // console.log(chats);
      if (chatRes?.ok) {
        if (!chats?.find((item) => item?._id === chatRes?.data?.data?._id))
          setChats([chatRes?.data?.data, ...chats]);
        setSelectedChat(chatRes?.data?.data);
        // setLoadingChat(false)
        // onClose()
        setSearchMode(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(userId);
    fetchChat();
  }, [fetchAgain, isRefresh]);

    //console.log(newGroup);

  return (
    <Col
    className="scroll-vard"
      style={
        windowWidth <= 993
          ? selectedChat
            ? { display: "none"}
            : { display: "block"}
          : { display: "block"}
        
      }
      md={windowWidth <= 993 ? "12" : "4"}
    >
      <Card className="card-user" id="mychat">
        
        <CardHeader id={!isDarkMode ? "light-header" : "header"}>

        {/* <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={30}
    /> */}
          {
            newGroup ? (
              (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ArrowBackIcon
                    style={{
                      color: "#d1d7db",
                      cursor: "pointer",
                      marginTop: "4px",
                    }}
                    onClick={() => setNewGroup(!newGroup)}
                  />
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    color={"#d1d7db"}
                    ml={"2rem"}
                    fontFamily={"sans-serif"}
                  >
                    Add group participants
                  </Text>
                </div>
              )
            )
            :
          
          !profileMode ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Avatar
                  src={userDetails?.image}
                  sx={{
                    width: 40,
                    height: 40,
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setProfileMode(!profileMode)}
                />

                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, marginBottom: "10px" }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreVertIcon style={{ color: "#aebac1" }} />
                  </IconButton>
              </div>
              
              <Menu 
                anchorEl={anchorEl}
                //id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    color: "#aebac1",
                    backgroundColor: "#202c33",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}

              >
                
                <MenuItem onClick={()=>{
                   handleClose()
                  setNewGroup(!newGroup)
                  }}>
                  <ListItemIcon>
                    <GroupsIcon fontSize="small" style={{ color: "#aebac1" }} />
                  </ListItemIcon>
                  New group
                </MenuItem>
                
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "#aebac1" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu> 
              
            </>
          ) : 
          (
            <div style={{ display: "flex", flexDirection: "row" }}>
              
              <ArrowBackIcon
                style={{
                  color: "#d1d7db",
                  cursor: "pointer",
                  marginTop: "4px",
                }}
                onClick={() => setProfileMode(!profileMode)}
              />
              <Text
                fontSize={20}
                fontWeight="bold"
                color={"#d1d7db"}
                ml={"2rem"}
                fontFamily={"sans-serif"}
              >
                Profile
              </Text>
            </div>
          )
        }
        </CardHeader>
        
        <CardBody style={{padding:"4px"}}>
          
          {
            newGroup ? (
              <>
              <Group/>
              </>

            ):
          profileMode ? (
            <Profile />
          ) : (
            <>
              <Box mb={3} mt={2}>
                
                <TextField
                  id="outlined-size-small"
                  size="small"
                  variant="outlined"
                  placeholder="Search or start a new chat"
                  fullWidth
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    //  handleSearch(e.target.value);
                    setSearchMode(true);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {searchMode ? (
                          <ArrowBackIcon
                            onClick={(e) => {
                              setSearchText("");
                              setSearchMode(!searchMode);
                            }}
                            style={{ color: "#6bd098", cursor: "pointer" }}
                          />
                        ) : (
                          <SearchIcon
                            // onClick={() => setSearchMode(true)}
                            style={{ color: "#aebac1", cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchMode ? (
                          <CloseIcon
                            onClick={(e) => {
                              setSearchText("");
                              setSearchMode(!searchMode);
                            }}
                            style={{ color: "#aebac1", cursor: "pointer" }}
                          />
                        ) : (
                          <></>
                        )}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#202c33",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#111b21",
                      },

                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#111b21",
                      },

                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#111b21",
                      },

                    "& .MuiOutlinedInput-input": {
                      color: "#aebac1",
                    },
                  }}
                />
              </Box>
              <div className="scroll-vard"
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  overflowX: "hidden",
                  height: "80vh",
                }}
              >
                {chats ? (
                  <Stack scrollBehavior={"smooth"}>
                    {searchMode ? (
                      <>
                        {loading ? (
                          <Spinner color="primary" />
                        ) : (
                          <>
                            {noData ? (
                              <Text
                                fontSize={20}
                                fontWeight="bold"
                                color={"#d1d7db"}
                                ml={"2rem"}
                                fontFamily={"sans-serif"}
                                textAlign={"center"}
                              >
                                No data found
                              </Text>
                            ) : (
                              <>
                                {searchResult?.map((item, index) => (
                                  <ChatUserItem
                                    chat={item}
                                    key={item?._id}
                                    image={item?.image}
                                    name={item?.name}
                                    onClick={() => accessUserChat(item?._id)}
                                  />
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {chats?.map((item, index) => (
                          <ChatUserItem
                            chat={item}
                            key={item?._id}
                            image={
                              !item?.isGroupChat
                                ? item?.users[0]._id ===
                                  jwtDecode(localStorage.getItem("auth-token"))
                                    .id
                                  ? item?.users[1]?.image
                                  : item?.users[0]?.image
                                : item.image
                            }
                            name={
                              !item?.isGroupChat
                                ? item?.users[0]._id ===
                                  jwtDecode(localStorage.getItem("auth-token"))
                                    .id
                                  ? item?.users[1]?.name
                                  : item?.users[0]?.name
                                : item.chatName
                            }
                            date={item?.updatedAt}
                            onClick={() => {
                              setSelectedChat(item);
                              setNotifications(
                                notifications.filter(
                                  (items) => items.chat._id !== item._id
                                )
                              );
                            }}
                          />
                        ))}
                      </>
                    )}
                  </Stack>
                ) : (
                  <Spinner color="primary" />
                )}
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </Col>
  );
}
