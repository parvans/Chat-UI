import { CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import { Badge } from 'reactstrap'

export default function UserBadgeItem({user,handleFunction,admin}) {
  return (
   
    <Badge color={admin?"warning":"success"} pill  onClick={handleFunction} cursor={"pointer"} style={{fontSize:"15px",marginLeft:"5px",marginRight:"5px",marginTop:"10px"}}>
        {user?.name}
        {admin && <span> (Admin)</span>}
        <CloseIcon pl={2} ml={2} />
        </Badge>
  )
}
