import { Menu,MenuButton } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { Button, DropdownMenu } from 'reactstrap'
import ProfileModal from './ProfileModal'
export default function SideDrawer() {
  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingChat,setLoadingChat]=useState()
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#4ec94e",width:"100%",padding:"5px 10px 5px 10px",borderWidth:"5px",borderRadius:"10px",borderColor:"#fff",borderStyle:"solid"}}>
      <Button onClick={()=>setLoadingChat(true)}>
        <i className="nc-icon nc-zoom-split"></i>{' '}
        <span>Search User</span>
        </Button>
        <h5 style={{margin:"0px", color:"#fff"}}>Ezhuth Chat</h5>
    <div>
      <Menu>
        <MenuButton p={1} bg={"#4ec94e"} border={"none"}>
          <BellIcon  w={25} h={50} />
        </MenuButton >

        </Menu>
        <ProfileModal/>
    </div>
    </div>
    </>
  )
}
