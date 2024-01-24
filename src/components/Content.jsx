import React, { useState, useEffect } from "react";

const Content = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const handleProductClick = (productId) => {
    const localStorageItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (!localStorageItems.find((item) => item.id === productId)) {
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      localStorageItems.push({ ...selectedProduct, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(localStorageItems));
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="relative h-48 rounded overflow-hidden border border-opacity-50 mb-4">
                <img
                  alt={product.title}
                  className="object-contain object-center w-full h-full block"
                  src={product.image}
                />
                <button
                  onClick={() => handleProductClick(product.id)}
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-2 cursor-pointer"
                >
                  Sepete Ekle
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.title}
                </h2>
                <p className="mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Content;
