let intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page
const scrollButton = document.querySelector(".scroll"); // Reference to our scroll button

const scrollStep = () => {
  // Check if we're at the top already. If so, stop scrolling by clearing the interval
  if (window.pageYOffset === 0) {
    clearInterval(intervalId);
  }
  window.scroll(0, window.pageYOffset - 50);
};

const scrollToTop = () => {
  // Call the function scrollStep() every 16.66 millisecons
  intervalId = setInterval(scrollStep, 16.66);
};

// When the DOM is loaded, this click handler is added to our scroll button
scrollButton.addEventListener("click", scrollToTop);
