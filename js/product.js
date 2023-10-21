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
        // You can implement the logic to add the product to the cart here
        // For example, you can use local storage or a server to manage the cart.
        alert("Product added to cart!");
      });
    })
    .catch((error) => console.log("Error fetching product details", error));
});
