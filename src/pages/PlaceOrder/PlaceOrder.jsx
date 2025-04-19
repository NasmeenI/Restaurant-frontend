import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const location = useLocation();
  const { _id, name, type, address, phone, openTime, closeTime, maxSeats, image } = location.state || {};

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

  const handleReservation = async (event) => {
    event.preventDefault();

    const form = event.target;
    const requestBody = {
      startTime: form.startTime.value,
      endTime: form.endTime.value,
      seats: parseInt(form.seats.value, 10),
    };
    console.log(`handleReservation triggered! : ${_id}`, requestBody);
    try { 
      const response = await axios.post(`${url}/reservation/${_id}`, requestBody, {
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
    <form className='place-order' onSubmit={handleReservation}>
      <div className="place-order-left">
        <p className="title">User Information</p>
        <div className="multi-fields">
          <input type="email" name="email" placeholder='Email' defaultValue={user?.email} />
          <input type="text" name="username" placeholder='Username' defaultValue={user?.username} />
        </div>
        <input type="text" placeholder='Phone' defaultValue={user?.phone} />
        <div className="multi-fields">
          <input type="text" name="startTime" placeholder='Start Time' defaultValue="2025-04-20T18:41:00.439Z" />
          <input type="text" name="endTime" placeholder='End Time' defaultValue="2025-05-13T18:40:00.439Z" />
        </div>
        <input type="text" name="seats" placeholder='Seats' defaultValue="5" />
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
              <p>Address</p>
              <p>{address}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phone</p>
              <p>{phone}</p>
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
            <hr />
            <div className="cart-total-details">
              <p>Max Seats</p>
              <p>{maxSeats}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO RESERVE</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder