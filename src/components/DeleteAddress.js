import React from "react";
import { NewAddress } from "../api";
import "./extra.css"

// goin' over to the API index

const BASE = `https://radiant-citadel-20620.herokuapp.com/api`

export async function deleteAddy (addressId){
  console.log(addressId, "eric Stoltz")
  try {
    const response = await fetch(`${BASE}/users/address/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}


// end of goin' over to the API index


const DeleteAddress = ({ token, userDataObj, setShowDeleteAddress, clickId, address, myAddresses, setMyAddresses }) => {

  return (
    <div>
      <div>Are you sure you want to DELETE {address.address}</div>
      <div>
        <button
        onClick={async (event) =>{
       
          await deleteAddy(address.id)
          const updatedAddresses = [...myAddresses]
          updatedAddresses.forEach((element, index)=>{
            if (element.id === address.id) {
              updatedAddresses.splice(index, 1)
              console.log(updatedAddresses, "post-splice")
            }
          })
          console.log(updatedAddresses, "peter Greene")
          console.log(address.id, "here's address.id")
          setMyAddresses(updatedAddresses)
          setShowDeleteAddress(false);
          
        }}
        >Yep!</button>

      
      
     
      
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
