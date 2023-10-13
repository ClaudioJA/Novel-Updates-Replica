import React, { useEffect, useState } from 'react';
import './styles/Footer-Style.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-fill'>
          <Link to="" className='footer-item'>
            Privacy Policy 
          </Link>
          |
          <Link to="" className='footer-item'>
            Terms of Service 
          </Link>
          |
          <Link to="" className='footer-item'>
            Contact Us
          </Link> 
          |
        </div>
    </div>
  );
}

export default Footer;