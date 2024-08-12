import React from 'react';
import { login } from '../assets/images';

function Cart() {
  return (
    <>
      <div
        className="-mb-14 relative flex items-center justify-center w-full h-screen text-center bg-center bg-cover"
        style={{
          background: `linear-gradient(0deg, rgba(19, 20, 68, 0.70) 0%, rgba(19, 20, 68, 0.70) 100%), url(${login}), lightgray 50%`,
        }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900 opacity-75"></div>

        <div className="z-20 flex flex-col items-center justify-center w-full h-screen text-white">
          <h1 className="mb-5 text-5xl">
            <b>Coming Soon!</b>
          </h1>
          <p>Stay tuned for something amazing!!!</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
