import React, { useContext }  from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({food, image}) => {

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  const cartItem = cartItems.find(item => item.id === food.id);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
        { 
          !cartItem
            ? <img className='add' onClick={() => addToCart(food)} src={assets.add_icon_white} alt='' /> 
            : <div className="food-item-counter">
              <img onClick={() => removeFromCart(food)} src={assets.remove_icon_red} alt="" />
              <p>{cartItem.quantity}</p>
              <img onClick={() => addToCart(food)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{food.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{food.description}</p>
        <p className="food-item-price">${food.price}</p>
      </div>
    </div>
  )
}

export default FoodItem