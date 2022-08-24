import React from "react";
import { updateName } from "../api";
import { storeUserData } from "../auth";

const UpdateName = ({ setShowUpdateName, userDataObj, setUserDataObj }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id;
    const name = event.target.newName.value;
    const email = userDataObj.email;
    const updateObj = {};
    updateObj.name = name;
    updateObj.email = email;
    updateObj.id = userId;

    await updateName(userId, updateObj), setShowUpdateName(false);
    setUserDataObj(updateObj);
    storeUserData(updateObj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Name: </label>
        </div>
        <div>
          <input
            className="newName"
            name="newName"
            placeholder="There is no Dana, only ZUUL"
            required
          ></input>
        </div>
        <div>
          <button type="submit">update!</button>
          <button
            onClick={(event) => {
              setShowUpdateName(false);
            }}
          >
            nevermind!
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateName;
