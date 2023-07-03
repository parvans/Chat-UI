import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { Badge } from 'reactstrap'

export default function UserBadgeItem({user,handleFunction}) {
  return (
    // <Box
    // px={2}
    // py={1}
    // borderRadius={5}
    // m={1}
    // mb={2}
    // varient="solid"
    // fontSize={12}
    // backgroundColor="#51cbce"
    // color={"white"}
    // cursor={"pointer"}
    // onClick={handleFunction}
    // >
    //     {user?.name}
    //     <CloseIcon pl={2} ml={2} />
    // </Box>
    <Badge color="success" pill  onClick={handleFunction} cursor={"pointer"} style={{fontSize:"15px",marginLeft:"5px",marginRight:"5px",marginTop:"10px"}}>
        {user?.name}
        <CloseIcon pl={2} ml={2} />
        </Badge>
  )
}
