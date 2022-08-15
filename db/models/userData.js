const client = require("../client");
const {getUserById} = require("./user")


const addAddress = async ({userId, address}) => {
    try {
       const {rows: [userAddress]} = await client.query(`
       INSERT INTO userData("userId", address)
       VALUES ($1, $2)
       RETURNING *;
       `, [userId, address])


       return userAddress
    } catch (error) {
        console.error('error in addAdrress function')
        throw error
    }
}

const getAllUserData = async ({userId}) =>{
try {
    const {rows: userAddresses} = await client.query(`
       SELECT userData.address, userData.id
       FROM userData
       WHERE userData."userId"=$1;
       `, [userId])
    const userData = await getUserById(userId)
    userData.address = userAddresses

       return userData
} catch (error) {
    console.error('error in getAllUserData function')
    throw error
}
}

const updateAddress = async ({id, address}) =>{
    try {
       const {rows: [newAddress]} = await client.query(`
       UPDATE userData
       SET address=$1
       WHERE id=$2
       RETURNING *; 
       `, [address, id])
        
        return newAddress
    } catch (error) {
        console.error('Error in update address function')
        throw error
    }
}

const deleteAddress = async ({id}) =>{
    try {
        const {rows: [deletedAddress]} = await client.query(`
        DELETE FROM userData
        WHERE id=$1
        RETURNING *;
        `,[id])

        return deletedAddress

    } catch (error) {
        console.error('error in delete address')
        throw error
    }
}





module.exports = {
    addAddress,
    getAllUserData,
    updateAddress,
    deleteAddress
  };