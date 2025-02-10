import React, { useState } from 'react';
import products from './CrudProducts.json';
import { Box, Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';

const initialFormState = { id: '', name: '', description: '', quantity: '', price: '', mfgDate: '' };

const CrudProduct = () => {
  const [productList, setProductList] = useState(products);
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProduct = (action, id) => {
    if (action === 'add') {
      if (form.id && form.name) {
        setProductList([...productList, form]);
      }
    } else if (action === 'update') {
      setProductList(productList.map(product => product.id === id ? form : product));
    } else if (action === 'delete') {
      setProductList(productList.filter(product => product.id !== id));
    }
    setForm(initialFormState);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <form className="mb-4 flex gap-2">
        <TextField label="ID" name="id" value={form.id} onChange={handleChange} size="small" />
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} size="small" />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} size="small" />
        <TextField label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} size="small" />
        <TextField label="Price" name="price" value={form.price} onChange={handleChange} size="small" />
        <TextField type="date" name="mfgDate" value={form.mfgDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
        <Button variant="contained" color="primary" onClick={() => handleProduct('add')}>Add</Button>
        <Button variant="contained" color="success" onClick={() => handleProduct('update', form.id)}>Update</Button>
      </form>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {productList.map(product => (
          <Card key={product.id} sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                {product.name}
              </Typography>
              <Typography variant="h5" component="div">
                {product.description}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Qty: {product.quantity}</Typography>
              <Typography variant="body2">
                Price: ₹{product.price}
                <br />
                Mfg Date: {product.mfgDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setForm(product)}>Edit</Button>
              <Button size="small" color="error" onClick={() => handleProduct('delete', product.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default CrudProduct;
