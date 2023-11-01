document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    document.getElementById('searchInput').addEventListener('input', searchProducts);
    document.getElementById('sortSelect').addEventListener('change', sortProducts);
});

const productsApiUrl = "https://www.idkweb.site/wp-json/wc/v3/products";
const username = "ck_3d16c949afed57021de723f818515b17c3881454";
const password = "cs_ad53cee6bd8b9b19130fcea30b16e1dc941cd80e";
const headers = new Headers({
    'Authorization': 'Basic ' + btoa(username + ':' + password)
});

let allProducts = [];

async function fetchProducts() {
    try {
        let response = await fetch(productsApiUrl, { headers: headers });
        let products = await response.json();
        allProducts = products;
        displayProducts(products, 'products-container');
        displayFeaturedProducts(products, 'featured-products-container');
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing products
    products.forEach((product) => displayProduct(product, container));
}

function displayFeaturedProducts(products, containerId) {
    const container = document.getElementById(containerId);
    const featuredProducts = products.filter(product => product.featured);
    container.innerHTML = '';
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

function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchInput) || 
        (product.description && product.description.toLowerCase().includes(searchInput))
    );
    displayProducts(filteredProducts, 'products-container');
}

function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    let sortedProducts = [...allProducts];
    if (sortValue === 'low-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'high-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'newest') {
        sortedProducts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    } else if (sortValue === 'popular') {
    }
    displayProducts(sortedProducts, 'products-container');
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    products.forEach((product) => displayProduct(product, container));
}
