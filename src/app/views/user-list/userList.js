import React from "react";
import "./userList.scss";

import { UserCard } from "app/components";

function UserList() {
  return (
    <div className="user-list">
      {[1, 2, 3].map(function (user, index) {
        return <UserCard user={user} key={index}/>;
      })}
    </div>
  );
}

export default UserList;
