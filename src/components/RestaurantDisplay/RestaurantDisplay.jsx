import React from 'react'
import './RestaurantDisplay.css'
import RestaurantItem from '../RestaurantItem/RestaurantItem'
import { foodImages } from '../../assets/assets'

const RestaurantDisplay = ({category, restaurantList}) => {

  const getRandomRestaurantImage = () => {
    const randomIndex = Math.floor(Math.random() * foodImages.length);
    return foodImages[randomIndex];
  };

  return (
    <div className='restaurant-display' id='restaurant-display'>
      <h2>Top dishes near you</h2>
      <div className="restaurant-display-list">
        {restaurantList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return  <RestaurantItem key={index} id={item.id} name={item.name} description={item.description} open_time={item.open_time} close_time={item.close_time} image={getRandomRestaurantImage()} />
          }
        })}
      </div>
    </div>
  )
}

export default RestaurantDisplay