import React, { useState, useEffect } from "react";
import './createUserModal.scss';

import axios from "axios"

// stocks is dict with companyName, symbol, id
function CreateUserModal({stocks, onCreateUser}) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCancel(){
    onCreateUser();
  }

  async function handleSubmit(event){
    event.preventDefault();

    console.log(selectedStock);

    // Put together new user information
    const newUser = {
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      favoriteStockId: selectedStock._id
    }

    // Create new user by sending a POST request to the backend 
    const createdUser = await axios.post("https://zothacks-2020-workshop.herokuapp.com/user", newUser);

    if (createdUser.status === 200 && createdUser.data){
      // go back to main page and render updated userList 
      onCreateUser();
    }else{
      setErrorMessage("Failed to create user. Please try again.")
    }
  }

  function renderStockOptions(){
    const options = stocks.map(function (stock) {
      return <option key={stock._id} value={stock.id}>{stock.companyName + " (" + stock.symbol + ")"}</option>
    });
    return options;
  }

  return (
      <form className="myForm" onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="fname" value = {firstName} onChange = {(event) => setFirstName(event.target.value)} required></input>

          <label>Last Name:</label>
          <input type="text" name="lname" value = {lastName} onChange = {(event) => setLastName(event.target.value)} required></input>

          <label>Email:</label>
          <input type="email" name="email_address" value = {email} onChange = {(event) => setEmail(event.target.value)}></input>

          <label>Favorite Stock</label>
          <select
            id="fav-stock"
            name="fav-stock"
            value = {selectedStock} // might want to handle no selection better later
            onChange={(event) => {setSelectedStock(event.target.value)}}
          >
            {renderStockOptions()}
          </select>
          <input className="button" type="submit" value="Create User" />
          <button className="button" onClick={handleCancel}>Cancel</button>
          <p id = "error-message">{errorMessage}</p>
      </form>
      
  );
}

export default CreateUserModal;
