// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');


const SALT_COUNT = 10;

// DB user functions

async function createUser({email, name, password}){
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try{
    const {rows: [user]} = await client.query(`
      INSERT INTO users (email, name, password)
      VALUES ($1, $2. $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING email, name, id;
    `, [email, name, hashedPassword]);
    return user
  }
  catch (error) {
    console.error("error in createUser")
    throw error;
  }
}

async function getUser({email, password}){
  const user = await getUserByEmail(email);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword)

  try {
    if(isValid){
      if(!user){
        return
      }
      delete user.password
        return user;
    }
  } catch (error) {
    console.error("error in getUser")
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user]} = await client.query(`
      SELECT id, name
      FROM users
      WHERE id = $1;
    `, [userId]);

    return user;
  } catch (error) {
    console.error("error in getUserById")
    throw error;
  }
}

async function getUserByEmail(email) {
  try{
    const {rows: [user]} = await client.query(`
    SELECT id, name, email
    FROM users
    WHERE email = $1;
    `, [email]);

    return user;
  } catch (error) {
    console.error ("error in getUserByEmail")
    throw error;
  }
}

async function updateUser ({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(',');
  
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [user]} = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

    return user;
  } catch (error) {
    console.error("error in updateUser")
    throw error;
  }
}

async function getAllUsers() {
  try{
    const allUsers = await client.query(`
    SELECT *
    FROM users;
    `);

    return {allUsers}
  } catch (error){
    console.error("error in getAllUsers")
    throw error;
  }
}


module.exports = {
  // add your database adapter fns here
  getAllUsers,
  getUser,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser
};