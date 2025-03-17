import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './Restaurant.css'
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownloads from '../../components/AppDownloads/AppDownloads.jsx'
import axios from 'axios';

const url = "http://localhost:8080";
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hc21lZW4yNTAzQGdtYWlsLmNvbSIsImV4cCI6MTc0MjI1MzY1NSwicm9sZSI6ImFkbWluIn0.PKi_cR9SHCAvllyIyfmFRuzp2CanWqrtZH4saJmdXqY";
const restaurantId = "67d867f20dee20fde7fbe039";
const Restaurant = () => {

  const { id } = useParams();
  
  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
        const response = await axios.get(`${url}/restaurant/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        console.log("API: fetch food list ", response.data.foods);
        setFoodList(response.data.foods);
    } catch (error) {
        console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
      fetchFoodList();
  }, [id]);

  return (
    <div>
      <Header />
      <FoodDisplay restaurantId={id} />
    </div>
  )
}

export default Restaurant