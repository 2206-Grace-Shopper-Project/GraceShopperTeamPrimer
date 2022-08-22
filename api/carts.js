const { Router } = require("express");
const express = require("express");
const router = express.Router();

const {
  createCart,
  getCartById,
  getCartByUser,
  deleteCart,
} = require("../db/models/cart");

//create cart
router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
    //ableToCreate is checking to see if there is already a cart with unpurchased items then it will send that cart insted of creating one.
    const ableToCreate = await getCartByUser(userId);

    if (ableToCreate.isPurchased === false) {
      res.send(ableToCreate);
    } else {
      const response = await createCart({ userId });

      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

//get cart by user
router.get("/:userId", async (req, res, next) => {
  console.log("made it in the grab carts function");
  try {
    const { userId } = req.params;
    console.log(userId, "userID!!");
    const response = await getCartByUser(userId);
    console.log(response, "this is cart response");
    res.send(response);
  } catch (error) {
    next(error);
  }
});
//effectivley delete cart for the user but just changes isPurchased to true so it wont be accesible anymore...
router.patch("/:id", async (req, res, next) =>{
    try {
        const {id} =  req.params
        const response = await deleteCart(id)
        console.log(response, "response from delete")
      res.send(response)
    } catch (error) {
        next(error);
    }
})

router.get("cartid/:id", async (req, res, next) => {
  try {
      const {id} = req.params
          console.log(id, 'cart id')
      const response = await getCartById(id)
          console.log(response)
      res.send(response)
  } catch  (error){
      next (error)
  }
})

module.exports = router;
