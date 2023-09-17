
const productApiUrl = 'https://www.idkweb.site/wp-json/wp/v2/product';
const mediaApiUrl = 'https://www.idkweb.site/wp-json/wp/v2/media';

async function fetchProductsAndMedia() {
	let productsResponse = await fetch(productApiUrl);
	let mediaResponse = await fetch(mediaApiUrl);

	let products = await productsResponse.json();
	let media = await mediaResponse.json();

	// Display the latest product in 'feature-product' section
	if (products && products.length > 0) {
		displayProduct(products[0], 'feature-product', media);
	}

	// Display the next 3 products in 'idkproducts-latest' section
	let latestProducts = products.slice(1, 4);
	displayProducts(latestProducts, 'idkproducts-latest', media);
}

function truncateContent(content, limit = 60) {
	const strippedContent = content.replace(/<[^>]+>/g, ''); // Remove HTML tags
	return strippedContent.length > limit
		? strippedContent.substr(0, limit) + '...'
		: strippedContent;
}


function getImageFromMedia(product, media) {
	let mediaItem = media.find((item) => item.id === product.featured_media);
	return mediaItem ? mediaItem.source_url : null;
}

function displayProduct(product, sectionId, media) {
	const section = document.getElementById(sectionId);

	let productDiv = document.createElement('div');
	productDiv.className = 'product';

	let productImage = document.createElement('img');
	let imageUrl = getImageFromMedia(product, media);
	if (imageUrl) {
		productImage.src = imageUrl;
		productDiv.appendChild(productImage);
	}

	let productTitle = document.createElement('h3');
	productTitle.textContent = product.title.rendered;

	let productContent = document.createElement('p');
	productContent.innerHTML = truncateContent(product.content.rendered);

    let productPrice = document.createElement('p');
		productPrice.textContent = `$29.99`;

    let productLink = document.createElement('a');
		productLink.href = `productDetail.html?id=${product.id}`;
		productLink.textContent = 'View Details';

	let addToCartButton = document.createElement('button');
	addToCartButton.innerText = 'Add to Cart';
    addToCartButton.className = 'addToCart';
	addToCartButton.addEventListener('click', () => {
	});

	

	productDiv.appendChild(productTitle);
    productDiv.appendChild(productImage);
	productDiv.appendChild(productContent);
    productDiv.appendChild(productLink);
    productDiv.appendChild(productPrice);
	productDiv.appendChild(addToCartButton);
	section.appendChild(productDiv);
}

function displayProducts(products, sectionId, media) {
	products.forEach((product) => displayProduct(product, sectionId, media));
}



// Call the main function
fetchProductsAndMedia();
