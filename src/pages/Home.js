import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>Explore the world through its flavors.</h1>
            <p>Experience the diverse and delicious cuisines of different countries and cultures on your next road trip. From savory street food to gourmet meals, we've got you covered.</p>
            <Link to="/login">Find your next food adventure</Link>
        </div>
    )
};