// import { ChatState } from "context/ChatProvider";
import React from "react";
// import { Button } from "reactstrap";

export default function UserListItem({index,users,handleFunction}) {
  // const {user}=ChatState()
  return (
    <div  onClick={handleFunction} key={index} style={{display: "flex",cursor:"pointer",flexDirection: "row",width: "100%",alignItems: "center",justifyContent: "space-between",backgroundColor: "rgb(187 187 187)",padding: "10px",borderRadius: "10px",borderWidth: "1px",borderColor: "#4ec94e",margin: "10px"}}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}alt="profile"style={{ width: "50px", height: "50px", borderRadius: "50%" }}/>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5 style={{ margin: "5px" }}>{users && users.name}</h5>
        </div>
      </div>
      {/* <Button type="button" color="success" onClick={()=>handleFunction}>
        Chat
      </Button> */}
    </div>
  );
}
