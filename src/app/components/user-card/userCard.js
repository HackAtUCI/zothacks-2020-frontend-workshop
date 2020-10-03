import React from "react";
import "./userCard.scss";

import { Link } from "react-router-dom";

function UserCard({ user, number }) {
  return (
    <Link to={"/stock/" + user.favoriteCompany}>
      <div className="user-card">
        <div className="tag">
          <h1>{number}</h1>
        </div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <h3>{user.email}</h3>
        <h4>{user.favoriteCompany}</h4>
      </div>
    </Link>
  );
}

export default UserCard;
