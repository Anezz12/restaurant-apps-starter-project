import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import restaurantData from "../public/data/DATA.json";

document.addEventListener("DOMContentLoaded", () => {
  // Data for featured dishes and testimonials
  const featuredDishes = [
    {
      name: "Nasi Goreng Spesial",
      description: "Nasi goreng dengan bumbu rahasia dan telur mata sapi",
      image: "images/dishes/nasi-goreng.jpg",
    },
    {
      name: "Sate Ayam Madura",
      description: "Sate ayam khas Madura dengan bumbu kacang yang lezat",
      image: "images/dishes/sate-ayam.jpg",
    },
    {
      name: "Gado-gado Jakarta",
      description: "Sayuran segar dengan bumbu kacang khas Jakarta",
      image: "images/dishes/gado-gado.jpg",
    },
  ];

  const testimonials = [
    {
      text: "Makanan di sini sangat lezat! Saya sangat merekomendasikan Nasi Goreng Spesial mereka.",
      author: "Budi Santoso",
    },
    {
      text: "Pelayanan yang ramah dan suasana yang nyaman. Pasti akan kembali lagi!",
      author: "Siti Rahma",
    },
    {
      text: "Harga terjangkau dengan kualitas makanan yang luar biasa. Thumbs up!",
      author: "Agus Pratama",
    },
  ];

  // Function to create and append elements
  const createElement = (tag, className, innerHTML) => {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = innerHTML;
    return element;
  };

  // Function to display featured dishes
  const displayFeaturedDishes = () => {
    const dishesContainer = document.querySelector(".dishes-container");
    featuredDishes.forEach((dish) => {
      const dishCard = createElement(
        "div",
        "dish-card",
        `
        <img src="${dish.image}" alt="${dish.name}" class="dish-image">
        <div class="dish-info">
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-description">${dish.description}</p>
        </div>
      `
      );
      dishesContainer.appendChild(dishCard);
    });
  };

  // Function to display testimonials
  const displayTestimonials = () => {
    const testimonialContainer = document.querySelector(
      ".testimonials-container"
    );
    testimonials.forEach((testimonial) => {
      const testimonialCard = createElement(
        "div",
        "testimonial-card",
        `
        <p class="testimonial-text">"${testimonial.text}"</p>
        <p class="testimonial-author">- ${testimonial.author}</p>
      `
      );
      testimonialContainer.appendChild(testimonialCard);
    });
  };

  // Toggle menu functionality
  const toggleMenu = () => {
    const navItem = document.querySelector(".nav-item");
    const hamburger = document.querySelector(".hamburger");
    navItem.classList.toggle("active");
    hamburger.classList.toggle("active");
  };

  // Event listeners for menu
  document.querySelector(".hamburger").addEventListener("click", toggleMenu);
  document.querySelectorAll(".nav-item .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.querySelector(".nav-item").classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navEl = document.querySelector("#nav");
    navEl.classList.toggle("navbar-active", window.scrollY > 50);
  });

  // Function to display restaurants
  const displayRestaurants = (restaurants) => {
    const restoListEl = document.querySelector(".resto-list");
    restoListEl.innerHTML = ""; // Clear existing content
    restaurants.forEach((restaurant) => {
      const card = createElement(
        "div",
        "card",
        `
        <img src="${restaurant.pictureId}" alt="${
          restaurant.name
        }" class="resto-thumb">
        <div class="card-text">
          <h3 class="card-title">${restaurant.name}</h3>
          <div class="resto-rate">Rating: <span class="rate">${
            restaurant.rating
          } ⭐</span></div>
          <p>${restaurant.description.slice(0, 150)}...</p>
        </div>
        <div class="resto-place">${restaurant.city}</div>
      `
      );
      restoListEl.appendChild(card);
    });
  };

  // Display restaurants and handle errors
  try {
    const restaurants = restaurantData.restaurants;
    displayRestaurants(restaurants);
    displayFeaturedDishes();
    displayTestimonials();
  } catch (error) {
    console.error("Error loading data:", error);
    const restoListEl = document.querySelector(".resto-list");
    restoListEl.innerHTML =
      "<p>Failed to load data. Please try again later.</p>";
  }
});
