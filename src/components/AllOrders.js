import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../api";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function getCartById(id) {
    // console.log(id, 'id in get cartsbyid')
    try {
        const response = await fetch (`${BASE}/carts/cartid/${id}`, {
            headers: {
                "Content-Type": "application/json"
              }
        })
        const result = await response.json()
        // console.log(result, 'result from getCartById')
        return result
    } catch (error) {
        throw error
    }
}

export async function getAllSpecificOrders(limitNumber, offsetNumber) {
    try {
      const response = await fetch(`${BASE}/orders/${limitNumber}/${offsetNumber}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result, "result from getAllOrders");
      return result;
    } catch (error) {
      throw error;
    }
  }


const AllOrders = ({userDataObj}) =>{
    const [orders, setOrders] = useState([])
    const [orderCarts, setOrderCarts] = useState([])

    // const [pageNumber, setPageNumber] = useState(1)
    // const [limitNumber, setLimitNumber] = useState(10)
    // const [offsetNumber, setOffsetNumber] = useState(0)
    // const [showOrderPagination, setShowOrderPagination] = useState(true)
    // let navigate = useNavigate()

    const getAllUserOrders = async() => {
        // const offsetNumber = (passedInPage - 1) * 10
        // setOffsetNumber(offsetNumber)
        const ordersList = await getAllOrders()
        // const ordersList = await getAllSpecificOrders(limitNumber, offsetNumber)
        setOrders(ordersList)
    }

    // const handlePaginationPrev = (event) =>{
    //     event.preventDefault()
    //     setPageNumber(pageNumber - 1)
    //     getCurrentPageMovies(Number(event.target.value))
    //     }
    
    //     const handlePaginationNext = (event) =>{
    //         event.preventDefault()
    //     setPageNumber(pageNumber + 1)
    //     getCurrentPageMovies(Number(event.target.value))
    //     }
    //     const handlePageClick = (event) =>{
    //         event.preventDefault()
    //         console.log(event.target)
    //         setPageNumber(Number(event.target.id))
    //         getCurrentPageMovies(Number(event.target.id))
    //     }

    const getMoviesOnOrders = async() => {
        let cartIds = orders.map((order)=>{
            return order.cartId
        })
        let order = []
        for await(const id of cartIds){
            const response = await getCartById(id)
            order.push(response[0])
        }
        setOrderCarts(order)
    }

    useEffect(() => {
        getAllUserOrders();
    }, [])
    
    useEffect(() => {
        getMoviesOnOrders()
    }, [orders])

    return (
        <div> 
          
        {userDataObj.id === 5 || userDataObj.id === 8 || userDataObj.id === 9 || userDataObj.id === 11 ? 
        <div>
            {/* {showOrderPagination ?  <div className="paginationContainer">
                {pageNumber !== 1 ? <button id="paginationPrev" className="paginationButton" value={pageNumber - 1} onClick={handlePaginationPrev}>Prev</button> : <></>}
                 <a href="#" className={pageNumber === 1 ? "pagination activePage" : "pagination" } id={1} onClick={(handlePageClick)}>1</a>
                 <a href="#" className={pageNumber === 2 ? "pagination activePage" : "pagination" } id={2} onClick={handlePageClick}>2</a>
                 <a href="#" className={pageNumber === 3 ? "pagination activePage" : "pagination" } id={3} onClick={handlePageClick}>3</a>
                 <a href="#" className={pageNumber === 4 ? "pagination activePage" : "pagination" } id={4} onClick={handlePageClick}>4</a>
                 <a href="#" className={pageNumber === 5 ? "pagination activePage" : "pagination" } id={5} onClick={handlePageClick}>5</a>
                 <a href="#" className={pageNumber === 6 ? "pagination activePage" : "pagination" } id={6} onClick={handlePageClick}>6</a>

                 {pageNumber !== 6 ? <button id="paginationNext" className="paginationButton" value={pageNumber + 1} onClick={handlePaginationNext}>Next</button>: <></>} */}

        <h1 className='all-orders-title'>All Orders</h1>
        {orders.map((order, index) => {
            let orderDate = Number(order.date)
            let dateObj = new Date(orderDate)
            let finalDateFormat = dateObj.toLocaleString()

            return (
                <div key={index} id="all-orders">
                    {orderCarts.length ? orderCarts.map((cart)=>{
                        return (
                            <div>
                        {(cart.id === order.cartId) ? 
                                (cart.movies.map((movie, idx)=>{
                                    return (
                                        <div className ='ordermovietitle' key={idx}>
                                            <span><img src={movie.poster} id='movie-poster'></img></span>
                                            <p>{movie.title} (Qty: {movie.quantity})</p>
                                        </div>
                                    )
                                }))
                            : null } </div>)
                    }) : <></>}
                    <p>Customer Name: {order.name}</p>
                    <p>Date Purchased: {finalDateFormat}</p>
                    <p>Price: ${order.price}</p>
                    <p>Sent To: {order.address}</p>
                    <p>Email: {order.email}</p>
                </div>
            )
        })} </div>
        : <h1>nice try buddy</h1> }
        
    </div>
    )
}

export default AllOrders