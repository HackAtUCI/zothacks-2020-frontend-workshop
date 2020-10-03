import React, { useState, useEffect } from "react";
import "./userList.scss";

import axios from "axios"

import { UserCard } from "app/components";

function UserList() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUserList();
  }, []);

  async function getUserList() {
    let users = await axios.get("http://127.0.0.1:5000/user");
    
    if (users.status === 200) {
      setUsers(users.data);
    } else {
      console.log("Error retrieving users");
    }
  }

  return (
    <div className="user-list">
      {(users || []).map(function (user, index) {
        return <UserCard user={user} key={index}/>;
      })}
    </div>
  );
}

export default UserList;
