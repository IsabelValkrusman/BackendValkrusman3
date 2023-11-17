App.js
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: '',
    active: false,
    stock: 0,
    categoryId: 0,
  });
  const [isUsd, setUsd] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://localhost:7254/api/Product');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      await fetch('https://localhost:7254/api/Product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`https://localhost:7024/api/Product/delete/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await fetch(`https://localhost:7024/api/Product/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  async function tellida(summ, index) {
    try {
      const response = await fetch(`https://localhost:7024/api/Product/pay/${summ}/${index}`);
      if (response.ok) {
        let payLink = await response.text();

        payLink = payLink.replace(/^"|"$/g, '');
        window.open(payLink, '_blank');
      } else {
        console.error('Payment failed.');
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  }

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                <button onClick={() => tellida(product.price.toFixed(2), index)} id='Pay'>Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Product</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
      </div>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;