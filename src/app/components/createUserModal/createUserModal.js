import React, { useState, useEffect } from "react";
import './createUserModal.scss';

import axios from "axios"

// stocks is dict with companyName, symbol, id
function CreateUserModal({stocks}) {

  const [selectedStock, setSelectedStock] = useState(null);

  return (
      <form
        className="myForm"
        onSubmit={
          (event)=> {
            event.preventDefault();
            // todo
            // only submit form if selected stock is not null
          }
        }>
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
            {
              (stocks || []).map(function (stock) {
                console.log(stock)
                return <option key={stock.symbol} value={stock}>{stock.symbol}</option>
              })
            }
          </select>
          <input className="button" type="submit" value="Create User" />
      </form>
  );
}

export default CreateUserModal;
