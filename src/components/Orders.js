import React, { useState, useEffect } from "react";
import { getUserOrders, getCartById } from "../api";

const Orders = ({ userDataObj }) => {
  const [orders, setOrder] = useState([]);
  const [orderCarts, setOrderCarts] = useState([]);

  const getUserOrderInfo = async () => {
    let user = userDataObj;
    let userId = user.id;
    const userOrders = await getUserOrders(userId);
    setOrder(userOrders);
  };

  const getCartsInOrders = async () => {
    let cartIds = orders.map((order) => {
      return order.cartId;
    });
    let order = [];
    for await (const id of cartIds) {
      const response = await getCartById(id);
      order.push(response[0]);
    }
    setOrderCarts(order);
  };

  useEffect(() => {
    getUserOrderInfo();
  }, []);

  useEffect(() => {
    getCartsInOrders();
  }, [orders]);

  return (
    <div>
      {orders.length ? (
        <div className="order-history">
          <h1>Order History</h1>

          <div className="ordersbox">
            {orders.map((order, index) => {
              let orderDate = Number(order.date);
              let dateObj = new Date(orderDate);
              let finalDateFormat = dateObj.toLocaleString();

              return (
                <div id="orders" key={index}>
                  <p>Date Purchased: {finalDateFormat}</p>
                  {orderCarts.length ? (
                    orderCarts.map((cart) => {
                      return (
                        <div>
                          {cart.id === order.cartId
                            ? cart.movies.map((movie, idx) => {
                                return (
                                  <div className="ordermovietitle" key={idx}>
                                    <span>
                                      <img
                                        src={movie.poster}
                                        id="movie-poster"
                                      ></img>
                                    </span>
                                    <p>
                                      {movie.title}{" "}
                                      <span id="order-quantity">
                                        (Qty: {movie.quantity})
                                      </span>
                                    </p>
                                  </div>
                                );
                              })
                            : null}{" "}
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  <div id="price-and-address">
                    <p className="order-history-price">Price: ${order.price}</p>
                    <p>Sent To: {order.address}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No Past Orders</p>
      )}
    </div>
  );
};

export default Orders;
