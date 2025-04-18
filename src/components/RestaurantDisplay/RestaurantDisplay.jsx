import React from 'react'
import './RestaurantDisplay.css'
import RestaurantItem from '../RestaurantItem/RestaurantItem'
import { foodImages } from '../../assets/assets'

const RestaurantDisplay = ({restaurantList}) => {

  const getRandomRestaurantImage = () => {
    const randomIndex = Math.floor(Math.random() * foodImages.length);
    return foodImages[randomIndex];
  };

  return (
    <div className='restaurant-display' id='restaurant-display'>
      <h2>Top dishes near you</h2>
      <div className="restaurant-display-list">
        {restaurantList.map((item, index) => {
          return <RestaurantItem key={index} restaurant={item} image={getRandomRestaurantImage()} />
        })}
      </div>
    </div>
  )
}

export default RestaurantDisplay