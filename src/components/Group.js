import { Avatar, Box, Chip, IconButton, TextField } from "@mui/material";
import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import { getUsers } from "utilities/apiService";
import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import ChatUserItem from "./miscellaneous/ChatUserItem";
import "./miscellaneous/styles.css";
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

     //console.log(selectUser);
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
        <TextField id="outlined-basic" label="Search" variant="outlined" />
        {
            selectUser.length > 0 &&
            <Stack direction="row" spacing={1}>
            {selectUser?.map((item, index) => (
                <Chip
                avatar={<Avatar alt="Natacha" src={item.image} />}
                label={item.name}
                variant="outlined"
                 onDelete={()=>console.log("hii")}
              />
            ))}
        </Stack>   }     
      </Box>
      <Box className="scroll-vard" sx={{ display: 'flex', flexDirection: 'column',overflowY: "scroll",
                  scrollbarWidth: "none",
                  overflowX: "hidden",
                  height: `${
                    selectUser.length > 0 ? "70vh" : "80vh"
                  }`
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
          }}
        //   mt={80}
        >
                <IconButton aria-label="delete" sx={{color:"white",backgroundColor:"#00a884",alighItems:"center",justifyContent:"center",borderRadius:"50%",width:"50px",height:"50px"}}>
                <ArrowForwardIcon />
            </IconButton>
        </Box>
            } 
    </Box>
  );
}
