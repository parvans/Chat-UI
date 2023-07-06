/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { BellIcon } from "@chakra-ui/icons";
import { Avatar, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import Notify from "components/miscellaneous/Notify";
import UserListItem from "components/miscellaneous/UserListItem";
import { ChatState } from "context/ChatProvider";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner
} from "reactstrap";

import routes from "routes.js";
import { getUsers } from "utilities/apiService";
import { accessChat } from "utilities/apiService";
import NotificationBadge from 'react-notification-badge'
import Effect from 'react-notification-badge'
import tc from 'thousands-counter'
function Header(props) {
  const [isOpens, setIsOpens] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();

  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingChat,setLoadingChat]=useState(false)

  const {user,setSelectedChat,chats,setChats,notifications,setNotifications}=ChatState()
  const {isOpen,onOpen,onClose}=useDisclosure()
  const [noData,setNoData]=useState(false)

  const [notifOpen,setNotifOpen]=useState(false)

    const handleSearch=async(value)=>{
    // e.preventDefault()
    // if(!search){
    //   toast.error("please enter something to search")
    // }else{
      try {
        setLoading(true)
      const res=await getUsers(value)
      if(res?.ok){
        setSearchResult(res?.data?.data)
      } 
      if(res?.data?.data?.length === 0){
        setNoData(true)
      }else{
        setNoData(false)
      }  
      setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    
    
  }

  const accessUserChat=async(id)=>{
    console.log(id);
    try {
      setLoadingChat(true)
      const chatRes=await accessChat(id)
      console.log(chats);
      if(chatRes?.ok){
        if(!chats?.find((item)=>item?._id === chatRes?.data?.data?._id)) setChats([chatRes?.data?.data,...chats])
        setSelectedChat(chatRes?.data?.data)
        setLoadingChat(false)
        onClose()
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function toggle(){
    setSearchResult([])
    setNoData(false)
    setSearch('')
    onClose()
  }


  const toggles = () => {
    if (isOpens) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpens(!isOpens);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const notifToggle = (e) => {
    setNotifOpen(!notifOpen);
  };
  const getBrand = () => {
    let brandName = "Not Found";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpens) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };

  const handleLogout = () => {
    localStorage.clear('ezuth-token')
    window.location.href = '/auth/login'
  }
  const handleProfile = () => {
    window.location.href = '/ezhuth/user-profile'
  }
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color="success"
      expand="lg"
      className="navbar-absolute fixed-top">

        <Modal isOpen={isOpen} toggle={onClose} className="modal-dialog-centered" scrollable={true}>
                
                <ModalHeader toggle={toggle}>Search User</ModalHeader>
                <ModalBody>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <input type="text" placeholder="search user" onChange={(e)=>handleSearch(e.target.value)} style={{width:"80%",padding:"10px",borderRadius:"10px",borderWidth:"1px",borderColor:"#4ec94e",margin:"10px"}}/>
                            {/* <Button color="success" onClick={handleSearch}>Search</Button> */}
                        </div>
                            
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            {loading? <Spinner color="success" style={{margin:"10px"}}/>:(

                              searchResult.map((user,index)=>(
                                  <UserListItem key={index} index={index} users={user} handleFunction={()=>accessUserChat(user?._id)}/>
                              ))
                            )}
                            {
                              loadingChat && <Spinner color="success" style={{margin:"10px"}}/>
                            }
                            {
                              searchResult?.length === 0 && noData && <h5>No Data Found</h5>
                            }
                        </div>
                </ModalBody>

            </Modal>

      <Container fluid >
        <div className="navbar-wrapper" >
          {/* <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div> */}
          <NavbarBrand href="/chatbot/chat">
            Chatbot <Badge color="dark">Beta</Badge>
            </NavbarBrand>
        </div>
        <NavbarToggler onClick={toggles}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpens} navbar className="justify-content-end">

        <Button className="btn-icon btn-round" color="dark" outline onClick={onOpen}>
        <i className="nc-icon nc-zoom-split"></i>
        </Button>
      
        <Menu>
          <MenuButton p={1} bg={"#74cf89"} border={"none"}>
            <NotificationBadge
            count={notifications?.length}
            effect={Effect.SCALE}
            />
            <BellIcon  w={25} h={50} />
          </MenuButton >
          <MenuList pl={2} pr={2} pt={2} pb={2} border={"none"} bg={"#fff"} borderRadius={"10px"}  width={"300px"}>
            <div style={{display:"flex",flexDirection:"column",margin:"10px",marginTop:"10px"}}>
              {notifications?.length === 0 && <h5>No Notifications</h5>}

              {
                notifications?.map((notification)=>(<Notify notification={notification}/>))
              }
            </div>
          </MenuList>

        </Menu>

          <Nav navbar>
           

            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-circle-10" style={{ fontSize: "1.5rem" }} />
                <p>
                  <span className="d-lg-none d-md-block">User</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="mt-2" tag="a" onClick={handleProfile} disabled>
                  <i className="nc-icon nc-single-02" style={{ fontSize: "1.1rem" }} /> Profile
                  </DropdownItem>
                <DropdownItem tag="a" onClick={handleLogout}>
                  <i className="nc-icon nc-button-power mr-1" style={{ fontSize: "1.1rem" }} />
                  
                  Logout
                  </DropdownItem>
                {/* <DropdownItem tag="a" >
                  Profile</DropdownItem> */}
                {/* <DropdownItem tag="a">Something else here</DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
             <NavItem>
              {/* <Link to="#pablo" className="nav-link btn-rotate">
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link> */}
              {/* <Badge color="danger" pill style={{ position: "absolute", top: "0px", right: "0px" }} >
                1000
              </Badge> */}

            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      <Toaster
                position='top-center'
                reverseOrder={false}
            />
    </Navbar>
  );
}

export default Header;
