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
    console.log(limitNumber, 'limitNumber')
    console.log(offsetNumber, 'offsetNumber')
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

    const [pageNumber, setPageNumber] = useState(1)
    const [limitNumber, setLimitNumber] = useState(10)
    const [offsetNumber, setOffsetNumber] = useState(0)
    const [showOrderPagination, setShowOrderPagination] = useState(true)

    const getAllUserOrders = async(passedInPage) => {
        const offsetNumber = (passedInPage - 1) * 10
        setOffsetNumber(offsetNumber)
        console.log(offsetNumber, 'line 54')
        // const ordersList = await getAllOrders()
        const ordersList = await getAllSpecificOrders(limitNumber, offsetNumber)
        console.log(ordersList, 'ordersList')
        setOrders(ordersList)
    }

    const handlePaginationPrev = (event) =>{
        event.preventDefault()
        setPageNumber(pageNumber - 1)
        getAllUserOrders(Number(event.target.value))
        }
    
        const handlePaginationNext = (event) =>{
            event.preventDefault()
        setPageNumber(pageNumber + 1)
        getAllUserOrders(Number(event.target.value))
        }
        const handlePageClick = (event) =>{
            event.preventDefault()
            console.log(event.target)
            setPageNumber(Number(event.target.id))
            getAllUserOrders(Number(event.target.id))
        }

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
        getAllUserOrders(pageNumber);
    }, [])
    
    useEffect(() => {
        getMoviesOnOrders()
    }, [orders])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [pageNumber])

    return (
        <div> 
          
        {(userDataObj.id === 5 || userDataObj.id === 8 || userDataObj.id === 9 || userDataObj.id === 11) ? 
        <div>
            <h1 className='all-orders-title'>All Orders</h1>
            {showOrderPagination ?  <div className="paginationContainer">
                {pageNumber !== 1 ? <button id="paginationPrev" className="paginationButton" value={pageNumber - 1} onClick={handlePaginationPrev}>Prev</button> : <></>}
                 <a href="#" className={pageNumber === 1 ? "pagination activePage" : "pagination" } id={1} onClick={(handlePageClick)}>1</a>
                 <a href="#" className={pageNumber === 2 ? "pagination activePage" : "pagination" } id={2} onClick={handlePageClick}>2</a>
                 <a href="#" className={pageNumber === 3 ? "pagination activePage" : "pagination" } id={3} onClick={handlePageClick}>3</a>
                 <a href="#" className={pageNumber === 4 ? "pagination activePage" : "pagination" } id={4} onClick={handlePageClick}>4</a>
                 <a href="#" className={pageNumber === 5 ? "pagination activePage" : "pagination" } id={5} onClick={handlePageClick}>5</a>
                 <a href="#" className={pageNumber === 6 ? "pagination activePage" : "pagination" } id={6} onClick={handlePageClick}>6</a>
                 <a href="#" className={pageNumber === 7 ? "pagination activePage" : "pagination" } id={7} onClick={handlePageClick}>7</a>
                 <a href="#" className={pageNumber === 8 ? "pagination activePage" : "pagination" } id={8} onClick={handlePageClick}>8</a>
                 <a href="#" className={pageNumber === 9 ? "pagination activePage" : "pagination" } id={9} onClick={handlePageClick}>9</a>
                 <a href="#" className={pageNumber === 10 ? "pagination activePage" : "pagination" } id={10} onClick={handlePageClick}>10</a>

                 {pageNumber !== 10 ? <button id="paginationNext" className="paginationButton" value={pageNumber + 1} onClick={handlePaginationNext}>Next</button>: <></>}
                 </div> : <></>}

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
                    {order.email ? <p>Email: {order.email}</p> : null}
                </div>
            )
        })} </div>
        : <h1>nice try buddy</h1> }
        
  
    </div>
    )
}

export default AllOrders