import { Avatar, Text } from "@chakra-ui/react";
import { Label } from "@mui/icons-material";
import {Box, InputAdornment, TextField } from "@mui/material";
import { ChatState } from "context/ChatProvider";
import React, { useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DoneIcon from '@mui/icons-material/Done';
import { userEdit } from "utilities/apiService";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImagePicker from "./ImagePicker";
import CropEasy from "./crop/CropEasy";

export default function Profile() {
  const { userDetails } = ChatState();
  const [nameEdit, setNameEdit] =useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  const [name, setName] =useState(userDetails?.name);
  const [image, setImage] =useState(userDetails?.image);
  const [isHovering, setIsHovering] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);  
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        setImage(reader.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    }

}

const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', handleImageChange);
    fileInput.click();    
};


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
        setIsEmoji(false)
    }
  return (
    <Box mb={3} mt={2}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        
        <Avatar src={image} 
        // onMouseOver={handleMouseOver}
        //   onMouseOut={handleMouseOut}
        onClick={() => setOpenCrop(!openCrop)}
        sx={{ 
            width: 150, 
            height: 150,
            marginBottom:"10px",
            cursor:"pointer",
            borderRadius:"50%",
        }}
        >
            {/* {
                isHovering && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,.5)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20,
                            cursor:"pointer",
                            //borderRadius:"50%",
                        }}
                        onClick={handleClick}
                    >
                        <AddAPhotoIcon />
                    </Box>
                )

            } */}
        </Avatar>
        {
            openCrop&&(
                <CropEasy
                photoURL={image}
                setOpenCrop={setOpenCrop}
                setPhotoURL={setImage}
                setFile={setImage}
                />
            )
        }
    </Box>       
      <div style={{display: "flex",flexDirection: "column"
      //,backgroundColor: "#202c33"
      ,marginTop: "1rem",padding: "1rem",borderRadius: "10px", }}>
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
                    <div style={{ position: 'absolute', bottom: '50px', right: '50px',left: '50px',zIndex: '1000' }}>
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
