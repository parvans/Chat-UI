import { Avatar, Box, Chip, IconButton, TextField,Autocomplete } from "@mui/material";
import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import { getUsers } from "utilities/apiService";
import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import ChatUserItem from "./miscellaneous/ChatUserItem";
import "./miscellaneous/styles.css";
import ChipInput from 'material-ui-chip-input';
import { styled } from '@mui/material/styles';
import Confetti from 'react-confetti'
const StyledChipInput = styled(ChipInput)(({ theme }) => ({
    '& .MuiChip-root': {  
        backgroundColor: '#00a884',
        color: 'white',
        margin: '2px',
        height: '30px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        '& .MuiChip-deleteIcon': {
            color: 'white',
        },
    },
  }));

export default function Group() {
    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const getTheUsers = async () => {
        try {
            const res = await getUsers("");
            if (res?.ok) {
                //setUsers(res?.data?.data);

                res?.data?.data.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                let data = res?.data?.data.reduce((r, e) => {
                    // get first letter of name of current element
                    let group = e.name[0];
                    // if there is no property in accumulator with this letter create it
                    if(!r[group]) r[group] = {group, children: [e]}
                    // if there is push current element to children array for that letter
                    else r[group].children.push(e);
                    // return accumulator
                    return r;
                  }, {})
                  
                  // since data at this point is an object, to get array of values
                  // we use Object.values method
                  let result = Object.values(data)
                     setUsers(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTheUsers()
    }, [])

    // useEffect(() => {

    //   users?.map((item, index) => (
    //     item.children.map((userss, index) => {
    //       selectUser.map((itemss, index) => {
    //         if (itemss.name === userss.name) {
    //         console.log(itemss);
    //         }
    //       })          
    //     })
    //   ))
    // })

  return (
    <Box mb={3} mt={2}>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
            <StyledChipInput
            className="scroll-vard" 
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: 3,
                backgroundColor: "#202c33",
                 overflowY: `${
                    selectUser.length > 0 ? "scroll" : "hidden"
                  }`,
                 
                maxHeight: "11vh",
                
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#111b21",
                      },

                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#111b21",
                      },

                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#111b21",
                      },

                    "& .MuiOutlinedInput-input": {
                      color: "#aebac1",
                                            
                    },
              }}
              placeholder="Search"
              value={selectUser.map((user) => user.name)}
              onAdd={(chip) => {
                setSelectUser([...selectUser, chip]);
              }}
              onDelete={(chip, index) => {
                const filteredItems = selectUser.filter(
                  (user) => user.name !== chip
                );
                setSelectUser(filteredItems);
              }}
              // onChange={(chips) => {
              //   setSelectUser(chips);
              // }}

              
            />

                     
      </Box>
      <Box className="scroll-vard" sx={{ display: 'flex', flexDirection: 'column',overflowY: "scroll",
                  scrollbarWidth: "none",
                  overflowX: "hidden",
                  height: `${
                    selectUser.length > 0 ? "70vh" : "80vh"
                  }`,
                  marginTop:"10px",
                }}>
        {users?.map((item, index) => (
            <Stack scrollBehavior={"smooth"}>
                <Box sx={{ display: 'flex', flexDirection: 'column',color:"white"}}>
                    <strong style={{color:"#008069",fontSize:"20px",marginLeft:"18px"}}>
                        {item.group}
                        </strong>
                    <br/>
                    {item.children.map((user, index) => (
                        <ChatUserItem key={index} name={user.name} image={user.image} onClick={() => {
                            setSelectUser([...selectUser, user])
                        }}
                        />
                    ))}
                </Box>
            </Stack>
        ))}
        </Box>
        { selectUser.length > 0 &&
        <Box
      
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {/* <Confetti 
          style={{position:"absolute",top:"60px",width:"100%",height:"100%"}}
          /> */}

          <IconButton aria-label="delete" style={{backgroundColor:"#008069",color:"white",width:"50px",height:"50px",borderRadius:"50%",marginTop:"10px"}}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        } 
    </Box>
  );
}
