document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        fetchProduct(productId);
    } else {
        document.getElementById('product-detail').innerHTML = '<p>Product not found</p>';
    }
});

const productsApiUrl = "https://www.idkweb.site/wp-json/wc/v3/products";
const username = "ck_3d16c949afed57021de723f818515b17c3881454";
const password = "cs_ad53cee6bd8b9b19130fcea30b16e1dc941cd80e";
const headers = new Headers({
    'Authorization': 'Basic ' + btoa(username + ':' + password)
});

async function fetchProduct(productId) {
    try {
        let response = await fetch(`${productsApiUrl}/${productId}`, { headers: headers });
        if (response.ok) {
            let product = await response.json();
            displayProductDetail(product);
        } else {
            document.getElementById('product-detail').innerHTML = '<p>Product not found</p>';
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        document.getElementById('product-detail').innerHTML = '<p>Something went wrong</p>';
    }
}

function displayProductDetail(product) {
    const container = document.getElementById('product-detail');

    let productDiv = document.createElement("div");
    productDiv.className = "product-detail";

    let productImage = document.createElement("img");
    if (product.images.length > 0) {
        productImage.src = product.images[0].src;
    }
    productDiv.appendChild(productImage);

    let productInfo = document.createElement("div");
    productInfo.className = "product-info";

    let productName = document.createElement("h1");
    productName.textContent = product.name;
    productInfo.appendChild(productName);

    let productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;
    productInfo.appendChild(productPrice);

    let productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;
    productInfo.appendChild(productDescription);

    let addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.className = "addToCart";
    addToCartButton.addEventListener("click", () => {
        
    });
    productInfo.appendChild(addToCartButton);

    productDiv.appendChild(productInfo);
    container.appendChild(productDiv);
}
