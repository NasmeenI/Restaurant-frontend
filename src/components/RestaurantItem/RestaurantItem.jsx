import React from 'react'
import './RestaurantItem.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const RestaurantItem = ({id, name, description, open_time, close_time, image}) => {
  console.log("Restaurant ID:", id); 

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/restaurant/${id}`)}  className='restaurant-item'>
      <div className="restaurant-item-img-container">
        <img className='restaurant-item-image' src={image} alt="" />
      </div>
      <div className="restaurant-item-info">
        <div className="restaurant-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='restaurant-item-desc'>{description}</p>
        <p className="restaurant-item-price">{formatTime(open_time)} - {formatTime(close_time)}</p>
      </div>
    </div>
  )
}

export default RestaurantItem