import React from 'react';
import { cartIcon } from '../../../assets/images';
//import MobileMenu from './mobile-menu'

export default function CartIcon() {
  return (
    <div className="p-2 rounded-full cart-icon">
      <img src={cartIcon} alt="cart" />
    </div>
  );
}
