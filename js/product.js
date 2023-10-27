//awaits the HTML Content to load before executing the code btwn{...}
document.addEventListener("DOMContentLoaded", () => {
  //line 4 to 9 retrieves different HTML elements
  const productImage = document.querySelector(".product-image");
  const productName = document.querySelector(".product-name");
  const productPrice = document.querySelector(".product-price");
  const productDescription = document.querySelector(".product-description");
  const productRating = document.querySelector(".product-rating");
  const addToCartButton = document.getElementById("add-to-cart");
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log(productId);
  /**
   * LocalStorage saves strings only and in from of key/value pairs
   * To save data use localStorage.setItem(key, value);
   * to read from local storage use localStorage.getItem(key);
   * To remove data from local storage use localStorage.removeItem(key);
   * To clear local storage use localStorage.clear();
   * Teturn an object i,e localstorage object
   * key(): Passed a number to retrieve the key of a localStorage
   */

  /**
   * The code below adds products to the cart using a function that passes productId as it argument
   * Products to be stored in localstorage
   * attempts to get data from local storage using cart as the key => localStorage.getItem("cart")
   * JSON is a string format. Accessed by square or dot notation
   * if empty deffaults to an empty array
   * Save data to local storage in object data type
   */
  function addtoCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push(productId);

      localStorage.setItem("cart", JSON.stringify(cart));

  }

  // Fetch the product details using the specific productId
  fetch(`https://fakestoreapi.com/products/${productId}`)
    //part of a promise. converts response to json format.
    .then((res) => res.json())
    //set product details depending on the data received
    .then((data) => {
      // Display the product details on the page
      productImage.src = data.image;
      productImage.alt = data.title;
      productName.textContent = data.title;
      productPrice.textContent = `$ ${data.price}`;
      productDescription.textContent = data.description;
      productRating.textContent = `Rating: ${data.rating.rate} (${data.rating.count} reviews)`;

      // Add to cart functionality
      addToCartButton.addEventListener("click", () => {
        addtoCart(productId);
        alert("Product added to cart!");
      });
    })
    .catch((error) => console.log("Error fetching product details", error));
});
