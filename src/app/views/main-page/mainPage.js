import React, { useState, useEffect } from "react";
import "./mainPage.scss";

import axios from "axios"

import {UserList} from "app/components";
import {CreateUserModal} from 'app/components';

function MainPage() {

  const [showModal, setShowModal] = useState(false);

  // List of users from the database
  const [users, setUsers] = useState(null);

  /// List of stocks from database
  const [stocks, setStocks] = useState(null);

  // Get the list of users from the database upon page load
  useEffect(() => {
    getUserList();
    getStockList();
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

  // Get the list of stocks through a GET request to the backend API
  async function getStockList(){
    let stocks = await axios.get("https://zothacks-2020-workshop.herokuapp.com/stock");
    if (stocks.status == 200){
      setStocks(stocks.data.data);
    }
    else{
      console.log("Error retrieving stocks");
    }
  }

  function handleCreateButtonClick(){
    setShowModal(true);
  }

  function refreshPage(){
    setShowModal(false);
    getUserList();
  }

  return (
    <div>
      <div className={showModal ? "blur" : ""}>
        <UserList users={(users || [])}/>
        <button className="button" onClick={handleCreateButtonClick}>Create User</button>
      </div>

    {showModal ?
      <CreateUserModal
        stocks = {stocks || []}
        onCreateUser={refreshPage}
      /> : null}
    </div>
  );
}

export default MainPage;
