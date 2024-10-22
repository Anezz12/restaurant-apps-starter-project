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

  const createElement = (tag, className, innerHTML, ariaAttributes = {}) => {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = innerHTML;

    Object.entries(ariaAttributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  };

  const displayFeaturedDishes = () => {
    const dishesContainer = document.querySelector(".dishes-container");
    featuredDishes.forEach((dish, index) => {
      const dishCard = createElement(
        "div",
        "dish-card",
        `
        <img src="${dish.image}" alt="${dish.name}" class="dish-image">
        <div class="dish-info">
          <h3 class="dish-name" id="dish-${index}">${dish.name}</h3>
          <p class="dish-description">${dish.description}</p>
        </div>
      `,
        {
          role: "article",
          "aria-labelledby": `dish-${index}`,
          tabindex: "0",
        }
      );
      dishesContainer.appendChild(dishCard);
    });
  };

  // Function to display testimonials
  const displayTestimonials = () => {
    const testimonialContainer = document.querySelector(
      ".testimonials-container"
    );
    testimonials.forEach((testimonial, index) => {
      const testimonialCard = createElement(
        "div",
        "testimonial-card",
        `
        <p class="testimonial-text" id="testimonial-${index}">"${testimonial.text}"</p>
        <p class="testimonial-author">- ${testimonial.author}</p>
      `,
        {
          role: "article",
          "aria-labelledby": `testimonial-${index}`,
          tabindex: "0",
        }
      );
      testimonialContainer.appendChild(testimonialCard);
    });
  };

  // Enhanced toggle menu functionality with accessibility
  const toggleMenu = () => {
    const navItem = document.querySelector(".nav-item");
    const hamburger = document.querySelector(".hamburger");
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";

    navItem.classList.toggle("active");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", !isExpanded);
  };

  // Enhanced menu event listeners
  const hamburgerBtn = document.querySelector(".hamburger");
  hamburgerBtn.addEventListener("click", toggleMenu);
  hamburgerBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  document.querySelectorAll(".nav-item .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.querySelector(".nav-item").classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Enhanced navbar scroll functionality
  window.addEventListener("scroll", () => {
    const navEl = document.querySelector("#nav");
    navEl.classList.toggle("navbar-active", window.scrollY > 50);
  });

  // Enhanced restaurant display function with improved accessibility
  const displayRestaurants = (restaurants) => {
    const restoListEl = document.querySelector(".resto-list");
    restoListEl.innerHTML = "";

    restaurants.forEach((restaurant, index) => {
      const card = createElement(
        "div",
        "card",
        `
        <img src="${restaurant.pictureId}" alt="${
          restaurant.name
        }" class="resto-thumb">
        <div class="card-text">
          <h3 class="card-title" id="resto-${index}">${restaurant.name}</h3>
          <div class="resto-rate" aria-label="Rating ${
            restaurant.rating
          } dari 5">
            Rating: <span class="rate">${restaurant.rating} ⭐</span>
          </div>
          <p>${restaurant.description.slice(0, 150)}...</p>
        </div>
        <div class="resto-place">${restaurant.city}</div>
      `,
        {
          role: "article",
          "aria-labelledby": `resto-${index}`,
          tabindex: "0",
        }
      );

      // Add keyboard interaction
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          // Add your restaurant detail navigation logic here
          console.log(`Navigating to restaurant: ${restaurant.name}`);
        }
      });

      restoListEl.appendChild(card);
    });
  };

  // Handle skip to content
  const skipLink = document.querySelector(".skip-to-content");
  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector("#maincontent");
    mainContent.focus();
    mainContent.scrollIntoView();
  });

  // Display content and handle errors with accessibility improvements
  try {
    const restaurants = restaurantData.restaurants;
    displayRestaurants(restaurants);
    displayFeaturedDishes();
    displayTestimonials();
  } catch (error) {
    console.error("Error loading data:", error);
    const restoListEl = document.querySelector(".resto-list");
    restoListEl.innerHTML = createElement(
      "p",
      "error-message",
      "Failed to load data. Please try again later.",
      {
        role: "alert",
        "aria-live": "polite",
      }
    ).outerHTML;
  }
});
