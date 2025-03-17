import React, { useEffect, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { foodImages } from '../../assets/assets'
import axios from 'axios';

const url = "http://localhost:8080";
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hc21lZW4yNTAzQGdtYWlsLmNvbSIsImV4cCI6MTc0MjI1MzY1NSwicm9sZSI6ImFkbWluIn0.PKi_cR9SHCAvllyIyfmFRuzp2CanWqrtZH4saJmdXqY";

const FoodDisplay = ({restaurantId}) => {

  const getRandomFoodImage = () => {
    const randomIndex = Math.floor(Math.random() * foodImages.length);
    return foodImages[randomIndex];
  };

  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
        const response = await axios.get(`${url}/food/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        console.log("API: fetch food list ", response.data);
        setFoods(response.data);
    } catch (error) {
        console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [restaurantId]);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foods.map((item, index) => {
          return <FoodItem key={index} food={item} image={getRandomFoodImage()} />
        })}
      </div>
    </div>
  )
}

export default FoodDisplay