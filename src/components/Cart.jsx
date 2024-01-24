import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);
    }
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Sepet</h1>
            <h2 className="font-semibold text-2xl">{cartItems?.length} Ürün</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Ürün Detayı
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Adet
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Fiyat
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Toplam
            </h3>
          </div>
          {cartItems.map((cart) => (
            <div
              key={cart.id}
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={cart?.image} alt={cart?.title} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{cart?.title}</span>
                  <span className="text-red-500 text-xs capitalize">
                    {cart?.category}
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="text-center font-semibold">
                  {cart.quantity}
                </span>
              </div>
              <span className="text-center w-1/5 font-semibold">
                ${cart.price}
              </span>
              <span className="text-center w-1/5 font-semibold">
                ${cart.price * cart.quantity}
              </span>
            </div>
          ))}
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Sipariş Özeti
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Parçalar {cartItems?.length}
            </span>
            <span className="font-semibold text-sm">
              $
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Uygula
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Toplam Tutar</span>
              <span>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </span>
            </div>
            <Link
              to="/"
              className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
