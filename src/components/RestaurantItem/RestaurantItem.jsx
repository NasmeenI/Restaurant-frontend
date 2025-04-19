import React from 'react'
import './RestaurantItem.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const RestaurantItem = ({restaurant, image}) => {
  console.log("Restaurant ID:", restaurant._id); 

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/order', { state: restaurant });
  };

  return (
    <div onClick={handleClick}  className='restaurant-item'>
      <div className="restaurant-item-img-container">
        <img className='restaurant-item-image' src={image} alt="" />
      </div>
      <div className="restaurant-item-info">
        <div className="restaurant-item-name-rating">
          <p>{restaurant.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='restaurant-item-desc'>{restaurant.address}</p>
        <p className="restaurant-item-price">{restaurant.openTime} - {restaurant.closeTime}</p>
      </div>
    </div>
  )
}

export default RestaurantItem