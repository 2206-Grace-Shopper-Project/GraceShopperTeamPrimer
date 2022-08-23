import React from "react";
import { NewAddress } from "../api";
import "./extra.css"

const AddAddress = ({ token, userDataObj, setShowAddAddress }) => {
  const handleSubmit = async (event) => {
    console.log(token, "Angelina Jolie");
    event.preventDefault();
    const userId = userDataObj.id;
    const address = event.target.address.value;

    await NewAddress(token, userId, address);
    setShowAddAddress(false);
  };

  return (
    <div>
      <div>Add Address Below</div>
      <form onSubmit={handleSubmit}>
      
        <input className="newaddress" name="address" placeholder="what's the address?"></input>
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
