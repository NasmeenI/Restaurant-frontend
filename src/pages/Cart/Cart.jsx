import React, { useContext, useState, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Cart = () => {

  const {url, token} = useContext(StoreContext);
  const [reservationList, SetReservationList] = useState([]);

  const fetchReservation = async () => {
    try {
      // Step 1: Get user's reservations
      const response = await axios.get(`${url}/reservation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const reservations = response.data;

      try {
        const enhancedReservationsPromises = reservations.map(async (reservation) => {
          try {
            const restaurantResponse = await axios.get(`${url}/restaurants/${reservation.restaurantId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            // Return a new object with the reservation data plus the restaurant info
            return {
              ...reservation,
              restaurant: restaurantResponse.data.restaurant
            };
          } catch (error) {
            console.error(`Error fetching restaurant ${reservation.restaurantId}:`, error);
            // Return the original reservation if we can't get restaurant data
            return {
              ...reservation,
              restaurant: null
            };
          }
        });
        
        const result = await Promise.all(enhancedReservationsPromises);
        SetReservationList(result);
        console.log("result :", result)
      } catch (error) {
        console.error("Error enhancing reservations:", error);
      }

    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  const navigate = useNavigate();

  const editItem = () => {
    const restaurant = {
    };
    navigate('/order', { state: restaurant });
  };

  const deleteItem = async (item) => {
    try {
      const response = await axios.delete(`${url}/reservation/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReservation();
      console.log("Delete reservation successful:", response.data);
    } catch (error) {
      console.error("Error Delete reservations:", error);
    }
  };

  return (
    <div className="cart">
      <div className="cart items">
        <div className="cart-items-title">
          <p>Restaurant</p>
          <p>Name</p>
          <p>Open Time</p>
          <p>Close Time</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {reservationList.map((item) => {
          return (
            <div>
              <div className="cart-items-title cart-items-item" key={item.id}>
                <img src={item.image} />
                <p>{item.restaurant.name}</p>
                <p>{item.restaurant.openTime}</p>
                <p>{item.restaurant.closeTime}</p>
                <p>${item.price * item.quantity}</p>
                {/* <p onClick={() => editItem(item)} className="edit">✏️</p> */}
                <p onClick={() => deleteItem(item)} className="cross">x</p>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart