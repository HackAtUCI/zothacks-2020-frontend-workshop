import React, { useState, useEffect } from "react";
import './createUserModal.scss';

import axios from "axios"

// stocks is dict with companyName, symbol, id
function CreateUserModal({stocks, onCreateUser}) {

  const [selectedStock, setSelectedStock] = useState(null);

  function handleSubmit(event){
    event.preventDefault();
    onCreateUser();
  }

  function handleCancel(){
    onCreateUser();
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
          <input type="text" name="fname" required></input>

          <label>Last Name:</label>
          <input type="text" name="lname" required></input>

          <label>Email:</label>
          <input type="email" name="email_address"></input>

          <label>Favorite Stock</label>
          <select
            id="fav-stock"
            name="fav-stock"
            onChange={(event) => {
              setSelectedStock(event.target.value)}}
          >
            {renderStockOptions()}
          </select>
          <input className="button" type="submit" value="Create User" />
          <button className="button" onClick={handleCancel}>Cancel</button>
      </form>
  );
}

export default CreateUserModal;
