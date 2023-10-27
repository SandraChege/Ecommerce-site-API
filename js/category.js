const productCategoryList = document.querySelector(".product-category-list");
/**
 * extracts product category fromu rl
 * 1.const currentPage = window.location.href; gets current page url
 * 2.const category = currentPage.split("/").pop().split(".")[0]; 
 * splits the url .pop(). get the last part of it ie. (jewelery.html)
 * 3. split(".")[0] removes the extension(.html) and save jewelery
 */
// Function to extract the category from the current page's URL

function getCategoryFromURL() {
  const currentPage = window.location.href;
  const category = currentPage
    .split("/")
    .pop()
    .split(".")[0]
    .replace(/-/g, " ")
  console.log(category);
  return category;
}

// Function to fetch and display products for a specific category
function displayProductCategory(category) {

  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // Clear existing products in the productCategoryList div
      productCategoryList.innerHTML = "";

      // Display the products
      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item")
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.title}"/>
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p class="price">$ ${product.price}</p>
          <p>Rate: ${product.rating.rate}</p>
          `;
        productDiv.addEventListener("click", (e) => {
          window.location.href = `product.html?id=${product.id}`;
        }); 
        
        productCategoryList.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Main code to handle category selection and display products
document.addEventListener("DOMContentLoaded", () => {
  const category = getCategoryFromURL();

  // Check if the category is valid and not empty
  if (category) {
    displayProductCategory(category);
  } else {
    console.error("Invalid or missing category in the URL.");
  }
});
