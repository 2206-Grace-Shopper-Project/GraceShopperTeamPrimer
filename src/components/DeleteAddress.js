import React from "react";
import { deleteAddy } from "../api";

const DeleteAddress = ({
  token,
  userDataObj,
  setShowDeleteAddress,
  clickId,
  address,
  myAddresses,
  setMyAddresses,
}) => {
  return (
    <div>
      <div>Are you sure you want to DELETE {address.address}</div>
      <div>
        <button
          onClick={async (event) => {
            await deleteAddy(address.id);
            const updatedAddresses = [...myAddresses];
            updatedAddresses.forEach((element, index) => {
              if (element.id === address.id) {
                updatedAddresses.splice(index, 1);
              }
            });
            setMyAddresses(updatedAddresses);
            setShowDeleteAddress(false);
          }}
        >
          Yep!
        </button>

        <button
          onClick={(event) => {
            setShowDeleteAddress(false);
          }}
        >
          I changed my mind
        </button>
      </div>
    </div>
  );
};

export default DeleteAddress;
