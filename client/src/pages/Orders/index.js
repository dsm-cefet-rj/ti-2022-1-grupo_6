import './style.css';
import { ProductCart } from '../../components/ProductCart';
import { useEffect, useState } from 'react';
import { SubTotalCart } from '../../components/SubTotalCart';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../redux/features/cartSlice';
import axios from 'axios';

export function Order() {
  const dispatch = useDispatch();
  const [ordersList, setOrdersList] = useState();

  useEffect(() => {
    getOrdersList()
  }, [])

  async function getOrdersList() {
    const token = localStorage.getItem('TechBuy.token');

    const cart = (await (axios.get(
      `${process.env.REACT_APP_BASE_URL}/cart`,
      { headers: { Authorization: `Bearer ${token}` } }
    ))).data
    
    dispatch(updateCart({cart}));
  }

 


  return (
      <div>
          pedidos
      </div>
  )
      
  
}
