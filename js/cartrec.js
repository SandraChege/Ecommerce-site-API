// Display items from local storage
const cartItemsContainer = document.querySelector(".cartitems");
const cartTotal = document.querySelector(".cartTotal");
const clearCart = document.querySelector(".clearcart");

// Function to fetch and display cart items
function displayCartItems() {
  // Fetch cart data from the local storage and see if it contains an array of products
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productQuantity = {};

    if (cart.length > 0) {
        cartItemsContainer.innerHTML = "";
      let mytotal = 0;
      const productQuantity = {}; 
      
      cart.forEach((productId) => {
        if (productQuantity[productId]) {
          productQuantity[productId]++;
        } else {
          productQuantity[productId] = 1;
        }
      });
       const uniqueProductIds = [...new Set(cart)]; // Get unique product IDs
       uniqueProductIds.forEach((productId) => {
         // Fetch product details from the API using productId
         fetch(`https://fakestoreapi.com/products/${productId}`)
           .then((res) => res.json())
           .then((productData) => {
             const itemContainer = document.createElement("div");
             itemContainer.classList.add("cart-item-container");
             itemContainer.innerHTML = `
                                        <img src="${productData.image}" alt="${productData.title}">
                                        <h3>${productData.title}</h3>
                                        <p>${productData.description}</p>
                                        <p class="price">$${productData.price}</p>
                                        <p>Rating:${productData.rating.rate}</p>
                                        <p>Quantity: ${productQuantity[productId]}</p>
                                    `;

             cartItemsContainer.appendChild(itemContainer);

             mytotal += productData.price * productQuantity[productId];
             let total = mytotal.toFixed(2);
             cartTotal.textContent = `Cart Total: $ ${total}`;

             const removeButton = document.createElement("button");
             removeButton.classList.add("remove-item-btn");
             removeButton.textContent = "Remove item";
             itemContainer.appendChild(removeButton);

             removeButton.addEventListener("click", () => {
               // Remove the product from the cart and update the local storage
               const cart = JSON.parse(localStorage.getItem("cart")) || [];
               const productIndex = cart.indexOf(productId);
               if (productIndex !== -1) {
                 cart.splice(productIndex, 1);
                 localStorage.setItem("cart", JSON.stringify(cart));
                 displayCartItems();
               }
               /**
                * Mehod 2 of calling a function
                */
               // productToRemove = productId;
               // removeItemsFromCart(productToRemove);
             });
             clearCart.addEventListener("click", () => {
               clearCartItems();
             });
           })
           .catch((error) => {
             console.error("Error fetching product data from the API:", error);
           });
       });
  }else {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total:$0.00";
  }
}
// function removeItemsFromCart(productId) {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const productIndex = cart.indexOf(productId);
//     if (productIndex !== -1) {
//         cart.splice(productIndex, 1);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         displayCartItems();
//     }
// }
function clearCartItems() {
  localStorage.clear("cart");
  displayCartItems();
}

// Call the function to display cart items when the page loads
displayCartItems();
