import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import restaurantData from "../public/data/DATA.json";

document.addEventListener("DOMContentLoaded", () => {
  const navEl = document.querySelector("#nav");
  const navItem = document.querySelector(".nav-item");
  const hamburger = document.querySelector(".hamburger");

  // Function to toggle menu
  const toggleMenu = () => {
    navItem.classList.toggle("active");
    hamburger.classList.toggle("active");
  };

  // Event listener for hamburger button
  hamburger.addEventListener("click", toggleMenu);

  // Close menu when a nav link is clicked
  navItem.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navItem.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navEl.classList.add("navbar-active");
    } else {
      navEl.classList.remove("navbar-active");
    }
  });

  // Function to display restaurants
  const displayRestaurants = (restaurants) => {
    const restoListEl = document.querySelector(".resto-list");
    restoListEl.innerHTML = "";
    restaurants.forEach((restaurant) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${restaurant.pictureId}" alt="${
        restaurant.name
      }" class="resto-thumb">
        <div class="card-text">
          <h3 class="card-title">${restaurant.name}</h3>
          <div class="resto-rate">Rating: <span class="rate">${
            restaurant.rating
          }</span></div>
          <p>${restaurant.description.slice(0, 150)}...</p>
        </div>
        <div class="resto-place">${restaurant.city}</div>
      `;
      restoListEl.appendChild(card);
    });
  };

  // Display restaurants
  try {
    const restaurants = restaurantData.restaurants;
    displayRestaurants(restaurants);
  } catch (error) {
    console.error("Error loading restaurant data:", error);
    const restoListEl = document.querySelector(".resto-list");
    restoListEl.innerHTML =
      "<p>Failed to load restaurant data. Please try again later.</p>";
  }
});
