import React, { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import RestaurantDisplay from '../../components/RestaurantDisplay/RestaurantDisplay.jsx'
import AppDownloads from '../../components/AppDownloads/AppDownloads.jsx'
import axios from 'axios';

const Home = () => {

  const {url} = useContext(StoreContext)

  const [category, setCategory] = useState('Italian');
  const [restaurantList, setRestaurantList] = useState([]);

  const fetchRestaurantList = async () => {
    try {
        const response = await axios.get(`${url}/restaurant/category/${category}`);

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