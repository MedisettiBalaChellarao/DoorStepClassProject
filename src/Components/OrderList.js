import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveOrders = async () => {
    try {
      const ordersData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, ordersData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, ordersData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchOrders();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteOrders = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting Order:", error);
    }
  };

  const editOrders = (orders) => {
    setEditingId(orders._id);
    setName(orders.name);
    setAge(orders.age);
    setGrade(orders.grade);
  };

  return (
    <div>
      <h2>Orders List</h2>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="Age" 
        type="number"
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
      />
      <input 
        placeholder="Grade" 
        value={grade} 
        onChange={(e) => setGrade(e.target.value)} 
      />
      <button onClick={saveOrders}>
        {editingId ? "Update Orders" : "Add Orders"}
      </button>
      
      <ul>
        {orders.map(orders => (
          <li key={orders._id}>
            {orders.name} - Age: {orders.age}, Grade: {orders.grade}
            <button onClick={() => editOrders(orders)}>Edit</button>
            <button onClick={() => deleteOrders(orders._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;