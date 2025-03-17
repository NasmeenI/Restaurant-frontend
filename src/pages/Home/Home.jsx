import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import RestaurantDisplay from '../../components/RestaurantDisplay/RestaurantDisplay.jsx'
import AppDownloads from '../../components/AppDownloads/AppDownloads.jsx'
import axios from 'axios';

const url = "http://localhost:8080";
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hc21lZW4yNTAzQGdtYWlsLmNvbSIsImV4cCI6MTc0MjI1MzY1NSwicm9sZSI6ImFkbWluIn0.PKi_cR9SHCAvllyIyfmFRuzp2CanWqrtZH4saJmdXqY";

const Home = () => {

  const [category, setCategory] = useState('Italian');
  const [restaurantList, setRestaurantList] = useState([]);

  const fetchRestaurantList = async () => {
    try {
        const response = await axios.get(`${url}/restaurant/category/${category}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        console.log("API: fetch food list ", response.data);
        setRestaurantList(response.data);
    } catch (error) {
        console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
      fetchRestaurantList();
  }, [category]);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <RestaurantDisplay category={category} restaurantList={restaurantList} />
      <AppDownloads />
    </div>
  )
}

export default Home