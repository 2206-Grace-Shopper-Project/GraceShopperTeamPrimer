import React from "react";
import { NewAddress } from "../api";
import "./extra.css"

const AddAddress = ({ token, userDataObj, setShowAddAddress, myAddresses, setMyAddresses }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id;
    const address = event.target.address.value;
    const result = await NewAddress(token, userId, address);
    const updatedAddresses = [...myAddresses]
    const newAddressObj = {}
    newAddressObj.address = result.address
    newAddressObj.id = result.id
    const response = updatedAddresses.concat(newAddressObj)
    setMyAddresses(response)
    setShowAddAddress(false);
  };


// begin return for component
  return (
    <div>
      <div>Add Address Below</div>
      <form onSubmit={handleSubmit}>
      
        <input className="newaddress" name="address" placeholder="what's the address?" required></input>
        <button type="submit">Add Address!</button>
        <button
          onClick={(event) => {
            setShowAddAddress(false);
          }}
        >
          nevermind!{" "}
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
