import React, { useEffect, useState } from "react";
import { getMyAddresses } from "../api";
import { AddAddress, UpdateName } from "./";

const UserForm = ({ userDataObj, token }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [myAddresses, setMyAddresses] = useState([]);
  const [showUpdateName, setShowUpdateName] = useState(false);

  const addressArray = async () => {
    const addyResponse = await getMyAddresses(userDataObj.id);
    const result = addyResponse.address;
    setMyAddresses(result);
  };

  useEffect(() => {
    addressArray();
  }, []);

  const MappedAddresses =
    myAddresses.length > 0
      ? myAddresses.map((address, index) => {
          return <div className="addressDisplay" key={index}>{address.address}</div>;
        })
      : null;

  return (
    <div className="compUserForm">
      <h1 className="userFormHeader">Hello {userDataObj.name}</h1>
      <div>Change Password</div>
      <fieldset>
          <legend>name</legend>
      <div>
        
       {userDataObj.name}{" "}
        <button
          onClick={(event) => {
            setShowUpdateName(true);
          }}
        >
          update
        </button>
      </div>
      <div>
        {showUpdateName ? (
          <UpdateName
            setShowUpdateName={setShowUpdateName}
            userDataObj={userDataObj}
            token={token}
          />
        ) : null}
      </div>
      </fieldset>
      <fieldset>
        <legend>email</legend>
          <div>{userDataObj.email}</div>
      </fieldset>
     <fieldset>
      <legend>addresses</legend>
     
      <div className="addressDisplay">{MappedAddresses}</div>
      <div>
        <button
          onClick={(event) => {
            setShowAddAddress(true);
          }}
          >
          Add A New Address
        </button>
      </div>
          <div>
            {showAddAddress ? (
              <AddAddress
                setShowAddAddress={setShowAddAddress}
                userDataObj={userDataObj}
                token={token}
              />
            ) : null}
          </div>
     </fieldset>
      
    </div>
  );
};

export default UserForm;
