import React, { useState, useEffect } from 'react';

const UpdateInventory = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch existing products from the backend (API call)
  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle selection of a product
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
    setProductName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImagePreview(product.imageUrl);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (productName && description && price && quantity) {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('quantity', quantity);
      if (image) formData.append('image', image);

      // API call to update the product
      fetch(`/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Product updated successfully!');
        })
        .catch((error) => {
          alert('Error updating product: ' + error.message);
        });
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Product Inventory</h2>

      <form onSubmit={handleSubmit}>
        {/* Select Product */}
        <div className="mb-4">
          <label htmlFor="productSelect" className="block text-sm font-medium text-gray-700">Select Product</label>
          <select
            id="productSelect"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={handleProductSelect}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-bakery-primary text-white px-6 py-2 rounded"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInventory;
