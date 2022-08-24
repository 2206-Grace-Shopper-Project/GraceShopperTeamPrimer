import React from "react";
import { NewAddress } from "../api";
import "./extra.css"

// goin' over to the API index

const BASE = `https://radiant-citadel-20620.herokuapp.com/api`

export async function deleteAddy (token, addressId){
  try {
    const response = await fetch(`${BASE}/address/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}


// end of goin' over to the API index


const DeleteAddress = ({ token, userDataObj, setShowDeleteAddress, address }) => {

console.log(address, "kathy griffin")

  return (
    <div>
      <div>Are you sure you want to DELETE {address.address}</div>
      <div>
        <button
        onClick={async (event) =>{
         
          const confirmation = await deleteAddy(token, address.id)
          console.log(confirmation, "steve buscemi")
          setShowDeleteAddress(false);
          // if (confirmation.success){
          //  setMyInfo({...myInfo ,posts:myInfo.posts.filter((post)=> {
          //      return(post._id !== singlePost._id)
          // })})
          // }
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
