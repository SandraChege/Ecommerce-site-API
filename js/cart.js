// Display items from local storage
const cartItemsContainer = document.querySelector(".cartitems");
const cartTotal = document.querySelector(".cartTotal");

// Function to fetch and display cart items
function displayCartItems() {
  // Fetch cart data from the local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((productId) => {
        // Fetch product details from the API using productId
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((productData) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("cart-item");
            itemContainer.innerHTML = `
                            <img src="${productData.image}" alt="${productData.title}">
                            <h3>${productData.title}</h3>
                            <p>${productData.description}</p>
                            <p class="price">Price: $${productData.price}</p>
                            <p>Rating:${productData.rating.rate}</p>
                        `;
            cartItemsContainer.appendChild(itemContainer);

            total += productData.price;
            cartTotal.textContent = `$ ${total}`;
            })
            .catch((error) => {
            console.error("Error fetching product data from the API:", error);
            });
        });
    } else {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total:$0.00";
    }
}

// Call the function to display cart items when the page loads
displayCartItems();
