import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const location = useLocation();
  const { name, type, openTime, closeTime, image } = location.state || {};

  const {url, token} = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
        const response = await axios.get(`${url}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API: fetch User ", response.data);
        setUser(response.data);
    } catch (error) {
        console.error("Error fetching User:", error);
    }
  };

  useEffect(() => {
    console.log("token from useEffect:", token, typeof token);
    if (token) {
      fetchUser();
    } else {
      console.log("Token is falsy, not fetching user data");
    }
  }, [token]); 

  const handleReservation = async () => {
    const requestBody = {
      seats: 2,
      startTime: "2025-10-01T12:00:00Z",
      endTime: "2025-10-01T14:00:00Z"
    };

    try { 
      const response = await axios.post(`${url}/reservation/${id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      console.log("Reservation successful:", response.data);
    } catch (error) {
      console.error("Reservation failed:", error);
    }
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">User Information</p>
        <div className="multi-fields">
          <input type="email" placeholder='Email' defaultValue={user?.email} />
          <input type="text" placeholder='Username' defaultValue={user?.username} />
        </div>
        <input type="text" placeholder='Phone' defaultValue={user?.phone} />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
        <h2>Restaurant Information</h2>
          <div>
            <div className="cart-total-details">
              <p>Name</p>
              <p>{name}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Type</p>
              <p>{type}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Open Time</p>
              <p>{openTime}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Close Time</p>
              <p>{closeTime}</p>
            </div>
          </div>
          <button onClick={handleReservation}>PROCEED TO RESERVE</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder