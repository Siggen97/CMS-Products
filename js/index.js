document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

const productsApiUrl = "https://www.idkweb.site/wp-json/wc/v3/products";
const username = "ck_3d16c949afed57021de723f818515b17c3881454";
const password = "cs_ad53cee6bd8b9b19130fcea30b16e1dc941cd80e";
const headers = new Headers({
    'Authorization': 'Basic ' + btoa(username + ':' + password)
});

async function fetchProducts() {
    try {
        let response = await fetch(productsApiUrl, {headers: headers});
        let products = await response.json();

        displayProducts(products, 'products-container');
        displayFeaturedProducts(products, 'featured-products-container');
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach((product) => displayProduct(product, container));
}

function displayFeaturedProducts(products, containerId) {
    const container = document.getElementById(containerId);
    const featuredProducts = products.filter(product => product.featured);
    featuredProducts.forEach((product) => displayProduct(product, container));
}

function displayProduct(product, container) {
    let productDiv = document.createElement("div");
    productDiv.className = "product";

    let productLink = document.createElement("a");
    productLink.href = `productDetail.html?id=${product.id}`; 

    let productImage = document.createElement("img");
    if (product.images.length > 0) {
        productImage.src = product.images[0].src;
    }

    productLink.appendChild(productImage);
    productDiv.appendChild(productLink);

    let productTitle = document.createElement("h3");
    let productTitleLink = document.createElement("a");
    productTitleLink.href = `productDetail.html?id=${product.id}`;
    productTitleLink.textContent = product.name;

    productTitle.appendChild(productTitleLink);
    productDiv.appendChild(productTitle);

    let productDescription = document.createElement("p");
    productDescription.innerHTML = product.short_description;

    let productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;

    let viewDetailsLink = document.createElement("a");
    viewDetailsLink.href = `productDetail.html?id=${product.id}`;
    viewDetailsLink.textContent = "View Details";

    let addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.className = "addToCart";
    addToCartButton.addEventListener("click", () => {
       
    });

    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(viewDetailsLink);
    productDiv.appendChild(addToCartButton);

    container.appendChild(productDiv);
}

