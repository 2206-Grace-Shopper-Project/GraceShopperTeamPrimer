import React, { useEffect, useState } from "react";
import { getMyAddresses } from "../api";
import { AddAddress, UpdateName, UpdateEmail, DeleteAddress } from "./";

const UserForm = ({ userDataObj, setUserDataObj, token }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [myAddresses, setMyAddresses] = useState([]);
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showDeleteAddress, setShowDeleteAddress] = useState(false);
  const [clickId, setClickId] = useState("")
  

  const addressArray = async () => {
    const addyResponse = await getMyAddresses(userDataObj.id);
    const result = addyResponse.address;
    setMyAddresses(result);
  };

  useEffect(() => {
    addressArray();
  }, []);

console.log(myAddresses, "this is the myAddresses State")
  const mappedAddresses =
    myAddresses.length > 0
      ? myAddresses.map((address, index) => {
          return (
            <div>
            <div className="addressDisplay" key={index}>
              {address.address}{" "}
              <button
                onClick={(event) => {
                  setShowDeleteAddress(true);
                  setClickId(`${address.id}`);
                }}
              >
                delete
              </button>
            </div>
            <div>
              {showDeleteAddress && clickId === `${address.id}`?
              (<DeleteAddress 
                setShowDeleteAddress={setShowDeleteAddress}
                address={address}
                myAddresses={myAddresses}
                setMyAddresses={setMyAddresses}
                clickId={clickId}
              />) : null}
            </div>
            </div>
          );
        })
      : null;

// return for component starts here
return (
    <div className="compUserForm">
      <h1 className="userFormHeader">Hello {userDataObj.name}</h1>

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
  );
};

export default UserForm;
