import React from "react";
import { updateEmail } from "../api";
import { storeUserData } from "../auth";

const UpdateEmail = ({ setShowUpdateEmail, userDataObj, setUserDataObj }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id;
    const name = userDataObj.name;
    const email = event.target.newEmail.value;
    const updateObj = {};
    updateObj.name = name;
    updateObj.email = email;
    updateObj.id = userId;

    await updateEmail(userId, updateObj), setShowUpdateEmail(false);
    setUserDataObj(updateObj);
    storeUserData(updateObj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Email:</label>
        </div>
        <div>
          <input
            className="newEmail"
            name="newEmail"
            placeholder="ShopGirl@aol.com is already taken"
            required
          ></input>
        </div>
        <div>
          <button type="submit">update!</button>
          <button
            onClick={(event) => {
              setShowUpdateEmail(false);
            }}
          >
            nevermind!
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmail;
