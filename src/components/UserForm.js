import React, { useEffect, useState } from "react";
import { AddAddress, UpdateName } from "./";

// GOES INTO API INDEX
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`

async function getMyAddresses(id){
    try {
        const response = await fetch(`${BASE}/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error
    }

}


// END OF "goes into API Index"


const UserForm = ({userDataObj, token}) =>{
    const[showAddAddress, setShowAddAddress] = useState(false)
    const[myAddresses, setMyAddresses] = useState([]);
    const[showUpdateName, setShowUpdateName] = useState(false);

const addressArray = async () => {
    const addyResponse = await getMyAddresses(userDataObj.id)
    const result= addyResponse.address
    setMyAddresses(result); 
};

useEffect(()=>{
    addressArray();
}, []);

const MappedAddresses = 
    myAddresses.length > 0
    ? myAddresses.map((address, index) => {
        return (
            <div key={index}>
                {address.address}
            </div>
        );
    })
    :null;


    return(
        <div>
           <h1>Hello {userDataObj.name}</h1>
           <div>Change Password</div>
           <div>Name: {userDataObj.name} <button onClick={(event)=> {setShowUpdateName(true)}}>update</button></div>
           <div>
            {showUpdateName ? <UpdateName setShowUpdateName={setShowUpdateName} userDataObj={userDataObj} token ={token}/> :null}
           </div>
           <div>Email: {userDataObj.email}</div>
           <div>Address:</div>
           <div><button
                onClick={(event) => {
                setShowAddAddress(true)
              }}>Add A New Address</button></div>
              <div>
                {showAddAddress ?
                <AddAddress setShowAddAddress={setShowAddAddress} userDataObj={userDataObj} token={token}/> :null}
              </div>
              <div>{MappedAddresses}</div>

           
          
        </div>
        
    )
}



export default UserForm