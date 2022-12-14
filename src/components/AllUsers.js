import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api";

const AllUsers = ({ userDataObj }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const usersList = await getAllUsers();
    setUsers(usersList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {userDataObj.id === 5 ||
      userDataObj.id === 8 ||
      userDataObj.id === 9 ||
      userDataObj.id === 11 ? (
        <div className="all-users">
          <h1>All Users</h1>
          {users.map((user, index) => {
            return (
              <div>
                {user.name !== "guest" ? (
                  <div key={index} id="all-users">
                    <p>
                      <span id="users-span">Id:</span> {user.id}
                    </p>
                    <p>
                      <span id="users-span">Name:</span> {user.name}
                    </p>
                    <p>
                      <span id="users-span">Email: </span> {user.email}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <h1>nice try buddy</h1>
      )}
    </div>
  );
};

export default AllUsers;
