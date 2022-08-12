const client = require("../client");


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
    }
}

const getAllUserData = async ({userId}) =>{
try {
    const {rows: [userData]} = await client.query(`
       SELECT userData.*, users.name, users.email
       FROM userData
       JOIN users ON userData."userId"=users.id
       WHERE userData."userId"=$1;
       `, [userId])


       return userData
} catch (error) {
    console.error('error in getAllUserData function')
    throw error
}
}





module.exports = {
    addAddress,
    getAllUserData
  };