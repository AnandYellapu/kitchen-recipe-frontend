import React from "react"
import Img from '../assets/images/Foody.jpg'
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="about-page-container">
            <img src={Img} className="about-foody-image" alt="" />
            <div className="about-page-content">
                <h1>Discover new flavors on your next adventure.</h1>
                <p>Our mission is to enhance your trip with delicious and diverse cuisine. Our team is passionate about finding the best local foods and sharing them with fellow foodies.</p>
                <p>We're committed to ensuring your food journey is just as memorable as your destination.</p>
            </div>
            <div className="about-page-cta">
                <h2>Satisfy your hunger with our selection of mouth-watering dishes.</h2>
                <Link className="link-button" to="/foods">Explore our foods</Link>
            </div>
        </div>
    );
}