import React, { useState, useEffect } from "react";
import "./userList.scss";

import axios from "axios"

import { UserCard } from "app/components";

function UserList() {

  // List of users from the database
  const [users, setUsers] = useState(null);

  // Get the list of users from the database upon page load
  useEffect(() => {
    getUserList();
  }, []);

  // Get the list of users through a GET request to the backend API
  async function getUserList() {
    let users = await axios.get("https://zothacks-2020-workshop.herokuapp.com/user");
    
    // If we get a valid response, set the state object, or print an error.
    if (users.status === 200) {
      setUsers(users.data.data);
    } else {
      console.log("Error retrieving users");
    }
  }

  return (
    <div className="user-list">
      {(users || []).map(function (user, index) {
        return <UserCard user={user} key={index} number={index}/>;
      })}
    </div>
  );
}

export default UserList;
