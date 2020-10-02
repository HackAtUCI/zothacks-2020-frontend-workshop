import React from "react";
import './userStock.scss';

import { useParams } from "react-router-dom";

function UserStock() {

  let { userId } = useParams();

  return (
    <div className="user-stock">
      <div className="selected-stock">
        hehe {userId}
      </div>
    </div>
  );
}

export default UserStock;
