import React from 'react';
import { Email, Phone, Facebook, Twitter, Instagram } from '@mui/icons-material';
import './About.css';

const AboutPage = () => {
  const openEmail = () => {
    window.open("mailto:anandsaiii1200@outlook.com");
  };

  const openPhone = () => {
    window.open("tel:+918374161339");
  };

  const openFacebook = () => {
    window.open("https://facebook.com/profile.php?id=100094380152207");
  };

  const openTwitter = () => {
    window.open("https://twitter.com/ianand1200");
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/nanduu1200");
  };

  return (
    <div className="about-page1">
      <h1 className='tag'>About Us</h1>
      <p className='tag1'>Welcome to our website!</p>

      <h2 className='tag'>Contact Us</h2>
      <p className='tag1'>If you have any questions or inquiries, feel free to get in touch with us:</p>

      <div className="contact-link1" onClick={openEmail}>
        <Email className="icon1" />
        <span className='contact-text1'>anandsaiii1200@outlook.com</span>
      </div>
      <br />

      <div className="contact-link1" onClick={openPhone}>
        <Phone className="icon" />
        <span className="contact-text1">+91 8374161339</span>
      </div>

      <h2 className='tag'>Follow Us</h2>
      <p className='tag1'>Stay connected with us on social media:</p>

      <div className="social-icons-container">
        <div className="social-link1" onClick={openFacebook}>
          <Facebook className="icon icon-animation1" />
        </div>

        <div className="social-link1" onClick={openTwitter}>
          <Twitter className="icon icon-animation1" />
        </div>

        <div className="social-link1" onClick={openInstagram}>
          <Instagram className="icon icon-animation1" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
