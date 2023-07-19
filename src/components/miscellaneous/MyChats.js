// import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {Box, Stack, Text } from "@chakra-ui/react";
import { ChatState } from "context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Spinner } from "reactstrap";
import { getChats } from "utilities/apiService";
import jwtDecode from "jwt-decode";
import { getSender } from "config/ChatLogic";
import GroupChatModal from "./GroupChatModal";
import './styles.css'
import useSound from 'use-sound';
import message1 from '../../assets/audio/message1.mp3'
import Avatar from '@mui/material/Avatar';
import { Divider, IconButton, Input, InputAdornment, ListItemIcon, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';
export default function MyChats({fetchAgain,setFetchAgain}) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, user, setSelectedChat, chats, setChats ,windowWidth} = ChatState();
  const userId=jwtDecode(localStorage.getItem("auth-token"))
  const [play] = useSound(message1);
  const [searchMode,setSearchMode] = useState(false);
  const [search,setSearch] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchMode(true);
  }

  const clearSearch = () => {
    setSearch("");
    setSearchMode(false);
  }


  
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

  useEffect(() => {
    setLoggedUser(userId);
    fetchChat();
  }, [fetchAgain]);

  return (
        <Col style={ windowWidth <= 993 ? selectedChat ? {display:"none"} : {display:"block"} : {display:"block"}} md={windowWidth <= 993 ? "12" : "4"}>
          <Card className="card-user" id="mychat">
              <CardHeader style={{backgroundColor:"#202c33"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <Avatar src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" sx={{ width: 40, height: 40 ,marginBottom:"10px"}}/>
                  {/* <GroupChatModal>
                  <Button className="btn btn-success btn-md  mt-1 ml-4 " >
                    Group Chat <AddIcon mr={2} mb={3} ml={5} />
                    </Button>       
                  </GroupChatModal> */}

                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 ,marginBottom:"10px"}}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}>
                      <MoreVertIcon style={{color:"#aebac1"}}/>
                    </IconButton>
                  </Tooltip>
                </div>

                <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                  {/* <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider /> */}
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <GroupsIcon fontSize="small" />
                    </ListItemIcon>
                    New group
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem> */}
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>

              </CardHeader>
              
            <CardBody>
              <Box mb={3} mt={2} >
                <TextField id="outlined-size-small" size="small" variant="outlined"  placeholder="Search or start a new chat" fullWidth 
                onChange={handleSearch}
                value={search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">

                      {
                        searchMode ? (
                          <ArrowBackIcon onClick={() => {
                            setSearchMode(!searchMode)
                           setSearch("")
                          }
                          } style={{color:"#6bd098",cursor:"pointer"}}/>
                        ) : (
                          <SearchIcon onClick={() => setSearchMode(true)} style={{color:"#aebac1",cursor:"pointer"}}/>
                        )
                      }
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {
                        search ? (
                          <CloseIcon onClick={clearSearch} style={{color:"#aebac1",cursor:"pointer"}}/>
                        ) : (
                          <></>
                        )
                      }
                    </InputAdornment>
                  ),
                }}

                  sx={{
                    borderRadius:3,
                    backgroundColor:"#202c33",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#111b21",
                    },

                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#111b21",
                    },

                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#111b21",
                    },

                    "& .MuiOutlinedInput-input": {
                      color: "#aebac1",
                    },

                  }}

                  
                />

              </Box>
              <div>
                {
                  chats ?(
                    <Stack scrollBehavior={"smooth"}>
                      {
                        chats?.map((item,index) => (
                          <Box
                          onClick={() => setSelectedChat(item)}
                          cursor="pointer"
                          bg={selectedChat===item?"#6bd098":"#E8E8E8"}
                          color={selectedChat===item?"#fff":"#000"}
                          px={3}
                          py={2}
                          borderRadius={10}
                          key={item?._id}
                          >
                            <Text fontSize={17} fontWeight="bold" p={6}>
                              {!item?.isGroupChat
                              ? item?.users[0]._id===jwtDecode(localStorage.getItem("auth-token")).id ? item?.users[1]?.name:item?.users[0]?.name
                              :item.chatName}
                            </Text>
                            
                          </Box>
                          
                        ))}

                        
                    </Stack>
                  ):(
                    <Spinner color="primary" />
                  )
                }
              </div>
            </CardBody>
          </Card>
        </Col>
  );
}
