import React, { useState, useEffect } from "react";
import "./mainPage.scss";

import axios from "axios"

import {UserList} from "app/components";
import {CreateUserModal} from 'app/components';

function MainPage() {

  const [showModal, setShowModal] = useState(false);

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
    <div>
      <div className={showModal ? "blur" : ""}>
        <UserList users={(users || [])}/>
        <button className="button" onClick={() => setShowModal(true)}>Create User</button>
      </div>

    {showModal ?
      <CreateUserModal
        stocks={
        // todo change this to fetch from backend
        [{
          id: 2,
          companyName : "Google",
          symbol : "GOOGL"
        },
        {
          id: 1,
          companyName : "Apple",
          symbol : "AAPL"
        },
        {
          id: 3,
          companyName : "Facebook",
          symbol : "FB"
        }]
        }
        onCreateUser={
          () => {
            setShowModal(false)
            // refresh users
            getUserList()
          }
        }
      /> : null}
    </div>
  );
}

export default MainPage;
