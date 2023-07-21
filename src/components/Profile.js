import { Text } from "@chakra-ui/react";
import { Label } from "@mui/icons-material";
import { Avatar, Box, InputAdornment, TextField } from "@mui/material";
import { ChatState } from "context/ChatProvider";
import React, { useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DoneIcon from '@mui/icons-material/Done';
import { userEdit } from "utilities/apiService";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Profile() {
  const { userDetails } = ChatState();
  const [nameEdit, setNameEdit] =useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  const [name, setName] =useState(userDetails?.name);

    const handleNameEdit = async() => {
        try {
            const res = await userEdit({name:name})
            if (res?.ok) {
                setNameEdit(!nameEdit)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onEmojiClick = (e) => {
        const sym=e.unified.split('_'); 
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        setName(name+emoji)
    }
    
  return (
    <Box mb={3} mt={2}>
        <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center",}}>
          <Avatar src={userDetails?.image} sx={{ width: 150, height: 150 }} />
       </div>
      <div style={{display: "flex",flexDirection: "column",backgroundColor: "#202c33",marginTop: "1rem",padding: "1rem",borderRadius: "10px", }}>
        <label style={{color: "#aebac1",fontSize: "1.2rem",fontWeight: "bold",}}>Name</label>
        <div style={{display: "flex",justifyContent: "space-between"}}>
            {nameEdit ?(
                <>
            <TextField
            id="outlined-size-small"
            size="small"
            variant="outlined"
            placeholder="Search or start a new chat"
            fullWidth
            value={name}
            onChange={(e)=>setName(e.target.value)}
            InputProps={{
                endAdornment: (
                <InputAdornment position="start">
                    <InsertEmoticonIcon style={{ color: "#aebac1", cursor: "pointer" }} onClick={()=>setIsEmoji(!isEmoji)}/>
                    <DoneIcon style={{ color: "#aebac1", cursor: "pointer",marginLeft:"10px" }} onClick={handleNameEdit}/>
                </InputAdornment>
                ),
            }}


            sx={{
                borderRadius: 3,
                backgroundColor: "#202c33",
                marginBottom: "1rem",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#202c33",
                },

                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#202c33",
                  },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#202c33",
                  },

                "& .MuiOutlinedInput-input": {
                  color: "#aebac1",
                },
              }}

            />

            {
                isEmoji&&(
                    <div style={{position:"absolute",bottom:"50px",right:"50px"}}>
                        <Picker onEmojiSelect={onEmojiClick} data={data} />
                    </div>
                )
            }
            </>
            ):<Text fontSize={20} fontWeight="bold" color={"#d1d7db"} ml={"2rem"} fontFamily={"sans-serif"}>{userDetails?.name}</Text>
        }
        {!nameEdit&&<EditIcon style={{ color: "#d1d7db",cursor:"pointer",marginTop:"4px" }} onClick={() => setNameEdit(!nameEdit)} />}
        </div>
        <label style={{color: "#aebac1",fontSize: "1.2rem",fontWeight: "bold",marginTop: "1rem",}}>Email</label>
        <Text fontSize={20} fontWeight="bold" color={"#d1d7db"} ml={"2rem"} fontFamily={"sans-serif"}>{userDetails?.email}</Text>

      </div>
    </Box>
  );
}
