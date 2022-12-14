import React, { useEffect, useState } from "react";
import { getMyAddresses } from "../api";
import { AddAddress, DeleteAddress, UpdateEmail, UpdateName } from "./";

const UserForm = ({ userDataObj, setUserDataObj, token }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [myAddresses, setMyAddresses] = useState([]);
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showDeleteAddress, setShowDeleteAddress] = useState(false);
  const [clickId, setClickId] = useState("");

  const addressArray = async () => {
    const addyResponse = await getMyAddresses(userDataObj.id);
    const result = addyResponse.address;
    setMyAddresses(result);
  };

  useEffect(() => {
    addressArray();
  }, []);

  
  const mappedAddresses =
    myAddresses.length > 0
      ? myAddresses.map((address, index) => {
          return (
            <div key={index}>
              <div className="addressDisplay" key={index}>
                {address.address}{" "}
                <button
                  id="delete-address-button"
                  onClick={(event) => {
                    setShowDeleteAddress(true);
                    setClickId(`${address.id}`);
                  }}
                >
                  delete
                </button>
              </div>
              <div>
                {showDeleteAddress && clickId === `${address.id}` ? (
                  <DeleteAddress
                    setShowDeleteAddress={setShowDeleteAddress}
                    address={address}
                    myAddresses={myAddresses}
                    setMyAddresses={setMyAddresses}
                    clickId={clickId}
                  />
                ) : null}
              </div>
            </div>
          );
        })
      : null;

  return (
    <div id="userForm">
      <div className="compUserForm">
        <h1 className="userFormHeader">Hello {userDataObj.name}</h1>

        <fieldset>
          <legend>name</legend>
          <div>
            {userDataObj.name}{" "}
            <button
              id="userform-button"
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
                setUserDataObj={setUserDataObj}
                setShowUpdateName={setShowUpdateName}
                userDataObj={userDataObj}
                token={token}
              />
            ) : null}
          </div>
        </fieldset>
        <fieldset>
          <legend>email</legend>
          <div>
            {userDataObj.email}{" "}
            <button
              id="userform-button"
              onClick={(event) => {
                setShowUpdateEmail(true);
              }}
            >
              update
            </button>
          </div>
          <div>
            {showUpdateEmail ? (
              <UpdateEmail
                setUserDataObj={setUserDataObj}
                setShowUpdateEmail={setShowUpdateEmail}
                userDataObj={userDataObj}
                token={token}
              />
            ) : null}
          </div>
        </fieldset>
        <fieldset>
          <legend>addresses</legend>

          <div className="addressDisplay">{mappedAddresses}</div>
          <div>
            <button
              id="userform-button"
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
                myAddresses={myAddresses}
                setMyAddresses={setMyAddresses}
              />
            ) : null}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default UserForm;
