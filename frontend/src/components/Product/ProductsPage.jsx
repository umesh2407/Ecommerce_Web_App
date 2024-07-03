import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const products = [
  {
    id: 1,
    name: 'WWE 2k20',
    image: 'path/to/wwe2k20.jpg',
    price: 1500,
    rating: 2,
    reviews: 1,
  },
  {
    id: 2,
    name: 'Apple MacBook Pro (8GB RAM, 256GB SSD, 33.78cm, Space Grey)',
    image: 'path/to/macbook.jpg',
    price: 16000,
    rating: 5,
    reviews: 1,
  },
  {
    id: 3,
    name: 'Trigger Unisex Shoes Puma Black | Everything Black',
    image: 'path/to/shoes.jpg',
    price: 4499,
    rating: 5,
    reviews: 1,
  },
  {
    id: 4,
    name: 'OnePlus 9 Pro 256 GB, 12 GB RAM, Pine Green, Smartphone',
    image: 'path/to/oneplus.jpg',
    price: 24000,
    rating: 4,
    reviews: 1,
  },
  {
    id: 5,
    name: 'OnePlus 9 Pro 256 GB, 12 GB RAM, Pine Green, Smartphone',
    image: 'path/to/oneplus.jpg',
    price: 24000,
    rating: 4,
    reviews: 1,
  },
];

const ProductsPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">Products</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg mb-4 md:mb-0">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Price</h3>
              <input type="range" className="w-full" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-blue-500">Laptop</li>
                <li className="cursor-pointer hover:text-blue-500">Footwear</li>
                <li className="cursor-pointer hover:text-blue-500">Bottom</li>
                <li className="cursor-pointer hover:text-blue-500">Tops</li>
                <li className="cursor-pointer hover:text-blue-500">Attire</li>
                <li className="cursor-pointer hover:text-blue-500">Camera</li>
                <li className="cursor-pointer hover:text-blue-500">SmartPhones</li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Ratings Above</h3>
              <input type="range" className="w-full" />
            </div>
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mb-2 rounded" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <div className="flex items-center mb-1">
                  <span className="text-yellow-500">
                    {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                  </span>
                  <span className="text-gray-600 ml-2">({product.reviews} Reviews)</span>
                </div>
                <div className="text-red-500 font-semibold">₹{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductsPage;
