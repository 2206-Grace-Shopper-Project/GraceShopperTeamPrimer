const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

const {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  updateUser,
  getAllUsers,
  addAddress,
  updateAddress,
  deleteAddress,
  getAllUserData
} = require("../db");
const { requireUser } = require("./utils");

// POST - register
router.post("/register", async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "errorUserExists",
        message: `${email} already has an account.`,
        error: "error",
      });
    }
    if (password.length < 8) {
      next({
        name: "errorPasswordLength",
        message: "Password Too Short! Must be at least 8 characters",
        error: "error",
      });
    }
    const user = await createUser({ email, name, password });
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      expiresIn: "1w",
    });
    res.send({
      message: "Thanks for signing up!",
      token,
      user,
    });
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// POST - Login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body, "this is the body");
  console.log(email, password, "here's some more stuff");
  if (!email || !password) {
    next({
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUserByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "You're Logged In!", user, token });
    } else {
      next({ message: "email or password is incorrect" });
    }
  } catch (error) {
    next(error);
  }
});

// PATCH - update user info
router.patch("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { email, name, password } = req.body;
  const updatedUserData = {};
  try {
    const _user = await getUserByEmail(email);
    if (_user) {
      next({
        name: "errorUserExists",
        message: `${email} is already associated with an account.`,
        error: "error",
      });
    }
    if (password.length < 8) {
      next({
        name: "errorPasswordLength",
        message: "Password Too Short! Must be at least 8 characters",
        error: "error",
      });
    }

    const user = await getUserById(userId);
    updatedUserData.id = userId;
    updatedUserData.name = name;
    updatedUserData.email = email;
    updatedUserData.password = password;
    if (user.id == req.user.id) {
      const updatedData = await updateUser(updatedUserData);
      res.send(updatedData);
    } else if (user.id != req.user.id) {
      next({
        name: "errorWrongUser",
        message: "Error: You can't change someone else's info",
        error: "error",
      });
    }
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// POST - Add Address
router.post("/address/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { address } = req.body;
  const userData = {};
  try {
    userData.userId = userId;
    userData.address = address;
    const newAddress = await addAddress(userData);

    res.send(newAddress);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// PATCH - Edit Address
router.patch("/address/:userDataId", requireUser, async (req, res, next) => {
  const { userDataId } = req.params;
  const { address } = req.body;
  const { id } = req.user;
  const addressCheck = getAllUserData({ id });
  try {
    addressCheck.address.forEach((addressEntry) => {
      if (address === addressEntry) {
        next({
          name: "DuplicateAddressError",
          message: "Address Already Exists!",
          error: `DuplicateAddressError`,
        });
      }
      const updatedAddress = updateAddress({ userDataId, address });
      res.send(updatedAddress);
    });
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// DELETE - get rid of an old address
router.delete("/address/:userDataId", async (req, res, next) => {
  const { userDataId } = req.params;

  try {
    const deletedAddress = deleteAddress({ userDataId });
    res.send(deletedAddress);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// GET - list of all users (admin)
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await getAllUserData({id});
    res.send(user);
  } catch (error) {
    next();
  }
});

// GET - lost password (stretch goal: send email with a reset link to a )

module.exports = router;
