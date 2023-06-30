import {Menu,MenuButton } from '@chakra-ui/react'
import {useDisclosure } from '@chakra-ui/hooks'
import { BellIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import ProfileModal from './ProfileModal'
import { getUsers } from 'utilities/apiService'
        
export default function SideDrawer() {
  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingChat,setLoadingChat]=useState()
  const {isOpen,onOpen,onClose}=useDisclosure()
  const [noData,setNoData]=useState(false)

  const handleSearch=async(e)=>{
    e.preventDefault()
    if(search === ''){
      return setSearchResult([])
    }
    try {
      setLoading(true)
    const res=await getUsers(search)
    // console.log(res.data);
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

  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#4ec94e",width:"100%",padding:"5px 10px 5px 10px",borderWidth:"5px",borderRadius:"10px",borderColor:"#fff",borderStyle:"solid"}}>
      <Button onClick={onOpen}>
        <i className="nc-icon nc-zoom-split"></i>{' '}
        {/* <span>Search User</span> */}
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
    <Modal isOpen={isOpen} toggle={onClose} className="modal-dialog-centered">
                
                <ModalHeader toggle={onClose}>Search User</ModalHeader>
                <ModalBody>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <input type="text" placeholder="search user" value={search} onChange={(e)=>setSearch(e.target.value)} style={{width:"80%",padding:"10px",borderRadius:"10px",borderWidth:"1px",borderColor:"#4ec94e",margin:"10px"}}/>
                            <Button color="success" onClick={handleSearch}>Search</Button>
                        </div>
                            
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            {loading&& <Spinner color="success" />}
                            {
                              noData&& <h5 style={{color:"grey"}}>No Data Found</h5>
                            }
                            {searchResult.length>0&&searchResult.map((user,index)=>(
                                <div key={index} style={{display:"flex",color:'#fff',flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-between",backgroundColor:'rgb(45 40 40)',padding:"10px",borderRadius:"10px",borderWidth:"1px",borderColor:"#4ec94e",margin:"10px"}}>
                                    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                        <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <h5 style={{margin:"5px"}}>{user&&user.name}</h5>
                                        </div>
                                    </div>
                                    <Button color="success" onClick={()=>setLoadingChat(true)}>Chat</Button>
                                </div>
                            ))}
                        </div>
                </ModalBody>

                {/* <div style={{display:"flex",flexDirection:"row",color:'#fff',alignItems:"center",justifyContent:"space-between",backgroundColor:'rgb(45 40 40)',padding:"10px",borderRadius:"10px",borderWidth:"1px",borderColor:"#4ec94e",margin:"10px"}}>
                                    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                        <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <h5 style={{margin:"5px"}}>Parvan S</h5>
                                        </div>
                                    </div>
                                    <Button color="success" onClick={()=>setLoadingChat(true)}><i className="nc-icon nc-chat-33"/> Chat</Button>
                                </div> */}
            </Modal>

    </>
  )
}
