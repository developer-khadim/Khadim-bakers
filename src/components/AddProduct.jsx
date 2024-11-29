import React, { useState } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and API call to add product
    if (productName && description && price && category && image) {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('image', image);

      // Example API call (adjust according to your backend setup)
      fetch('/api/add-product', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          alert('Product added successfully!');
          // Reset form after submission
          setProductName('');
          setDescription('');
          setPrice('');
          setCategory('');
          setImage(null);
          setImagePreview('');
        })
        .catch(error => alert('Error adding product: ' + error.message));
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      
      <form onSubmit={handleSubmit}>
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

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required 
          >
            <option value="">Select Category</option>
            <option value="Cakes">Cakes</option>
            <option value="Breads">Breads</option>
            <option value="Pastries">Pastries</option>
            <option value="Cookies">Cookies</option>
          </select>
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
            required 
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-bakery-primary text-white px-6 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
