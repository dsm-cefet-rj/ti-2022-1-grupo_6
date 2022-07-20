import './style.css';
import { OrderCard } from '../../components/orderCard';
import { useEffect, useState } from 'react';
import { SubTotalCart } from '../../components/SubTotalCart';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../redux/features/authSlice';
import { updateCart } from '../../redux/features/cartSlice';
import axios from 'axios';

export function Order() {
  const auth = useSelector(selectAuth); 
  const dispatch = useDispatch();
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    getOrdersList()
  }, [])

  async function getOrdersList() {
    const token = localStorage.getItem('TechBuy.token');

    const user = auth.user

    const userId = user._id;

    const clientOrders = (await (axios.get(
      `${process.env.REACT_APP_BASE_URL}/order/client-orders/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ))).data  

    setOrdersList(clientOrders.orders);
  } 

  return (
    (
      <div className="container">
        {ordersList.map((order) => <OrderCard product={order.product} />)}
        
      </div>
    )
  )


}
