import { Avatar, background } from '@chakra-ui/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const ImagePicker = ({selectedImage,setSelectedImage}) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  //file upload ------------------

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
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

    //console.log(selectedImage);

    
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        
        <Avatar src={selectedImage} onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        sx={{ 
            width: 100, 
            height: 100,
            marginBottom:"10px",
            cursor:"pointer",
        }}
        >
            {
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
                            //borderRadius:"5%",
                        }}
                        onClick={handleClick}
                    >
                        <AddAPhotoIcon />
                    </Box>
                )

            }
        </Avatar>

    </Box>

    );
};

export default ImagePicker;
