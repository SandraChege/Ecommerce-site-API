let productList = document.querySelector(".product-list");

//fetch all products from the Fake Store API
/**
 * Fetch is a promise
 * data is the response of res.json()
 */
fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        displayProducts(data);
    })
    .catch ((error) => console.log("Error fetching products", error));

function displayProducts(products) {
    productList.innerHTML = ""; 
    
    products.forEach((product) => {
        let productContainer = document.createElement("div");
        productContainer.classList.add("product");
        productContainer.addEventListener("click", (e) => {
            window.location.href = `product.html?id=${product.id}`;
        })

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.title;
        productImage.classList.add("product-image");

        const productName = document.createElement("h3");
        productName.textContent = product.title;
        productName.classList.add("product-name");

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;
        productPrice.classList.add("product-price");

        // Append all elements to the product container
        productContainer.appendChild(productImage);
        productContainer.appendChild(productName);
        productContainer.appendChild(productPrice);

        // Append the product container to the product list
        productList.appendChild(productContainer);
    });
}

