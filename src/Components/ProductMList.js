import React, { useEffect, useState } from 'react';
import axios from 'axios';



function ProductMList() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_PRODUCTS_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const saveProduct = async () => {
    try {
      const productData = { name, price, category };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, productData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, productData);
      }

      setName('');
      setPrice('');
      setCategory('');
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
  };

  return (
    <div>
      <h2>Product List</h2>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="Price" 
        type="number"
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />
      <input 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
      />
      <button onClick={saveProduct}>
        {editingId ? "Update Product" : "Add Product"}
      </button>
      
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - Price: ${product.price}, Category: {product.category}
            <button onClick={() => editProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductMList;
