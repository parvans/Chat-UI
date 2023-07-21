import { Avatar } from '@chakra-ui/react'
import { Box, Divider } from '@mui/material'
import React from 'react'

export default function ChatUserItem() {
  return (
    <Box mb={3} mt={2}>
        <div style={{display: "flex",flexDirection: "row"}}>
          <Avatar src="https://www.w3schools.com/howto/img_avatar.png"
          sx={{ width: 50, height: 50 }} />
        </div>
      <Divider />
      </Box>
  )
}
