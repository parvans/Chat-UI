import React from "react";
import { Button } from "reactstrap";

export default function UserListItem({index,user,setLoadingChat}) {
  return (
    <div
      key={index}
      style={{
        display: "flex",
        color: "#fff",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(45 40 40)",
        padding: "10px",
        borderRadius: "10px",
        borderWidth: "1px",
        borderColor: "#4ec94e",
        margin: "10px",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5 style={{ margin: "5px" }}>{user && user.name}</h5>
        </div>
      </div>
      <Button color="success" onClick={() => setLoadingChat(true)}>
        Chat
      </Button>
    </div>
  );
}
